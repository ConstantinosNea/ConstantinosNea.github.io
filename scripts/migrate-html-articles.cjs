/**
 * Migrate bilingual HTML articles under articles/*.html into
 * content/posts/{en,el}/{slug}.mdx and copy cover images to public/images/.
 *
 * Usage: node scripts/migrate-html-articles.cjs
 */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.join(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "articles");
const IMAGES_SRC = path.join(ROOT, "images");
const IMAGES_DEST = path.join(ROOT, "public", "images");
const OUT_EN = path.join(ROOT, "content", "posts", "en");
const OUT_EL = path.join(ROOT, "content", "posts", "el");

const MONTHS = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

const SKIP = new Set(["index.html", "_TEMPLATE.html"]);

function decode(text) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textOf(el, lang) {
  if (!el) return "";
  const clone = el.cloneNode(true);
  clone.querySelectorAll(`[data-lang]:not([data-lang="${lang}"])`).forEach((n) => n.remove());
  clone.querySelectorAll("[data-lang]").forEach((n) => {
    while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
    n.remove();
  });
  return decode(clone.textContent || "");
}

function htmlInline(el, lang) {
  if (!el) return "";
  const clone = el.cloneNode(true);
  clone.querySelectorAll(`[data-lang]:not([data-lang="${lang}"])`).forEach((n) => n.remove());
  clone.querySelectorAll("[data-lang]").forEach((n) => {
    while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
    n.remove();
  });
  // Convert a few inline tags to markdown
  let html = clone.innerHTML || "";
  html = html
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decode(
    html
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " "),
  );
}

function parseDate(bylineText) {
  const m = bylineText.match(/·\s*(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s*·/);
  if (!m) return "2026-01-01";
  const day = m[1].padStart(2, "0");
  const month = MONTHS[m[2]] || "01";
  return `${m[3]}-${month}-${day}`;
}

function yamlEscape(s) {
  if (/[:#"'\n]/.test(s) || s.includes("'")) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `"${s.replace(/"/g, '\\"')}"`;
}

function bodyToMdx(body, lang) {
  const parts = [];
  const children = [...body.children];

  for (const child of children) {
    const tag = child.tagName?.toLowerCase();
    if (!tag) continue;

    if (tag === "p") {
      const t = htmlInline(child, lang);
      if (t) parts.push(t);
      continue;
    }

    if (tag === "h2") {
      const t = textOf(child, lang);
      if (t) parts.push(`## ${t}`);
      continue;
    }

    if (tag === "h3") {
      const t = textOf(child, lang);
      if (t) parts.push(`### ${t}`);
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = [...child.querySelectorAll(":scope > li")].map((li) => {
        const t = htmlInline(li, lang);
        return `- ${t}`;
      });
      if (items.length) parts.push(items.join("\n"));
      continue;
    }

    if (tag === "blockquote") {
      const quote = htmlInline(child, lang);
      // Strip cite if nested — get main quote from spans only
      const quoteSpan = child.querySelector(`[data-lang="${lang}"]`);
      const cite = child.querySelector("cite");
      const q = quoteSpan ? htmlInline(quoteSpan, lang) : quote;
      const c = cite ? textOf(cite, lang) : "";
      let block = `> ${q}`;
      if (c) block += `\n>\n> ${c}`;
      parts.push(block);
      continue;
    }

    if (child.classList?.contains("takeaways-box")) {
      const heading = textOf(child.querySelector("h3"), lang) || (lang === "el" ? "Βασικά συμπεράσματα" : "Key takeaways");
      parts.push(`### ${heading}`);
      const items = [...child.querySelectorAll("li")].map((li) => `- ${htmlInline(li, lang)}`);
      if (items.length) parts.push(items.join("\n"));
      continue;
    }

    if (child.classList?.contains("disclaimer-box")) {
      const t = htmlInline(child, lang);
      if (t) parts.push(`> ${t}`);
      continue;
    }

    if (child.classList?.contains("references-section") || tag === "section") {
      const heading = textOf(child.querySelector("h2"), lang);
      if (heading) parts.push(`## ${heading}`);
      const items = [...child.querySelectorAll("ol > li, ul > li")].map((li) => {
        // Prefer main description, drop placeholder span noise lightly
        const clone = li.cloneNode(true);
        clone.querySelectorAll(".ref-placeholder").forEach((n) => n.remove());
        return `1. ${htmlInline(clone, lang)}`;
      });
      if (items.length) parts.push(items.join("\n"));
      continue;
    }

    if (child.classList?.contains("author-note")) {
      const heading = textOf(child.querySelector("h3"), lang);
      const p = htmlInline(child.querySelector("p"), lang);
      if (heading) parts.push(`### ${heading}`);
      if (p) parts.push(p);
      continue;
    }

    if (
      child.classList?.contains("share-section") ||
      child.classList?.contains("medical-disclaimer")
    ) {
      if (child.classList?.contains("medical-disclaimer")) {
        const t = htmlInline(child.querySelector("p") || child, lang);
        if (t) parts.push(`---\n\n*${t}*`);
      }
      continue;
    }
  }

  return parts.join("\n\n").trim() + "\n";
}

function migrateFile(filename) {
  const slug = filename.replace(/\.html$/, "");
  const html = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const h1 = doc.querySelector("article h1");
  const subtitle = doc.querySelector(".article-subtitle");
  const topic = doc.querySelector(".tag[data-topic]");
  const byline = doc.querySelector(".article-byline");
  const coverImg = doc.querySelector(".article-hero-media img");
  const body = doc.querySelector(".article-body");

  if (!h1 || !body) {
    console.warn(`Skip ${filename}: missing h1 or body`);
    return;
  }

  const titleEn = textOf(h1, "en");
  const titleEl = textOf(h1, "el");
  const descEn = textOf(subtitle, "en");
  const descEl = textOf(subtitle, "el");
  const catEn = textOf(topic, "en");
  const catEl = textOf(topic, "el");
  const date = parseDate(byline?.textContent || "");

  let coverImage = "/opengraph-image.png";
  if (coverImg) {
    const src = coverImg.getAttribute("src") || "";
    const base = path.basename(src);
    const srcPath = path.join(IMAGES_SRC, base);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(IMAGES_DEST, base));
      coverImage = `/images/${base}`;
    }
  }

  const tags = [];
  const topicSlug = topic?.getAttribute("data-topic");
  if (topicSlug) tags.push(topicSlug);
  const type = doc.querySelector(".content-type")?.getAttribute("data-type");
  if (type) tags.push(type);

  function writeMdx(locale, title, description, category, content) {
    const front = [
      "---",
      `title: ${yamlEscape(title)}`,
      `description: ${yamlEscape(description)}`,
      `date: "${date}"`,
      `category: ${yamlEscape(category)}`,
      "tags:",
      ...tags.map((t) => `  - ${t}`),
      `ogImage: "/opengraph-image.png"`,
      `coverImage: "${coverImage}"`,
      "---",
      "",
      content,
    ].join("\n");
    const outDir = locale === "en" ? OUT_EN : OUT_EL;
    fs.writeFileSync(path.join(outDir, `${slug}.mdx`), front, "utf8");
  }

  writeMdx("en", titleEn, descEn, catEn, bodyToMdx(body, "en"));
  writeMdx("el", titleEl || titleEn, descEl || descEn, catEl || catEn, bodyToMdx(body, "el"));
  console.log(`Migrated ${slug}`);
}

function main() {
  fs.mkdirSync(IMAGES_DEST, { recursive: true });
  fs.mkdirSync(OUT_EN, { recursive: true });
  fs.mkdirSync(OUT_EL, { recursive: true });

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".html") && !SKIP.has(f));

  for (const f of files) migrateFile(f);
  console.log(`Done: ${files.length} articles`);
}

main();
