/* Public Health Blog — shared front-end behaviour (no dependencies) */

document.addEventListener("DOMContentLoaded", () => {
  canonicalizeArchiveLocation();
  initStickyScrollOffset();
  initLanguageToggle();
  initMobileNav();
  initNavCurrent();
  initArticleToc();
  // Hydrate ?q= into the search box before archive URL sync runs.
  initSearch();
  initArticleSort();
  initArticleFilters();
  initCurrentYear();
  initShareLinks();
  // Homepage featured (most viewed) + recent cards sync before reader counts attach.
  initHomepageFeaturedAndRecent().finally(() => {
    initReaderCounts();
  });
});

const LANG_STORAGE_KEY = "site-lang";

function getStoredLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) === "el" ? "el" : "en";
}

function formatSiteDate(iso, lang) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const locale = lang === "el" ? "el-GR" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatReaderLabel(count, lang, compact = false) {
  const n = Number(count);
  if (!Number.isFinite(n) || n < 0) return null;
  const formatted = n.toLocaleString(lang === "el" ? "el-GR" : "en-US");
  if (compact) {
    if (lang === "el") return `${formatted} αναγν.`;
    return `${formatted} readers`;
  }
  if (lang === "el") {
    return `${formatted} ${n === 1 ? "αναγνώστης" : "αναγνώστες"}`;
  }
  return `${formatted} ${n === 1 ? "reader" : "readers"}`;
}

/** Card footers are narrow (~300px in the 3-col grid). Shorten read-time
 *  labels so EN+EL .lang-stack width still fits date · read · readers on one line. */
function compactCardMetaReadLabels(root = document) {
  root.querySelectorAll(".card-meta").forEach((meta) => {
    meta.querySelectorAll('[data-lang="en"]').forEach((el) => {
      if (el.closest(".reader-count")) return;
      const next = el.textContent.trim().replace(/^(\d+)\s*min(?:utes?)?(?:\s*read)?$/i, "$1 min");
      if (next) el.textContent = next;
    });
    meta.querySelectorAll('[data-lang="el"]').forEach((el) => {
      if (el.closest(".reader-count")) return;
      const next = el.textContent.trim().replace(/^(\d+)\s*λεπτά(?:\s+ανάγνωσης)?$/i, "$1 λεπτά");
      if (next) el.textContent = next;
    });
  });
}

/** Build or refresh a two-language .lang-stack inside a host element. */
function ensureLangStackContent(host, enText, elText) {
  if (!host || enText == null || elText == null) return null;
  let stack = host.querySelector(":scope > .lang-stack");
  if (!stack) {
    host.textContent = "";
    stack = document.createElement("span");
    stack.className = "lang-stack";
    stack.setAttribute("data-lang-stack-auto", "");
    const enEl = document.createElement("span");
    enEl.setAttribute("data-lang", "en");
    enEl.setAttribute("lang", "en");
    const elEl = document.createElement("span");
    elEl.setAttribute("data-lang", "el");
    elEl.setAttribute("lang", "el");
    stack.append(enEl, elEl);
    host.append(stack);
  }
  const enEl = stack.querySelector('[data-lang="en"]');
  const elEl = stack.querySelector('[data-lang="el"]');
  if (enEl) enEl.textContent = enText;
  if (elEl) elEl.textContent = elText;
  return stack;
}

/**
 * Dates and reader labels used to swap a single text node on toggle.
 * On narrow card-meta rows that changes sibling widths, so read-time
 * .lang-stacks reflow (1 line ↔ 2) and the page grows/shrinks. Stack both
 * forms so the flex row reserves max(EN, EL) width continuously.
 */
function ensureStackedDates(root = document) {
  root.querySelectorAll("time[datetime]").forEach((el) => {
    if (el.closest("a.brand")) return;
    const iso = (el.getAttribute("datetime") || "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return;
    const en = formatSiteDate(iso, "en");
    const elTxt = formatSiteDate(iso, "el");
    if (!en || !elTxt) return;
    ensureLangStackContent(el, en, elTxt);
  });
}

function applyLocalizedDates(lang) {
  ensureStackedDates(document);
  document.querySelectorAll("time[datetime]").forEach((el) => {
    applyLanguageToTree(el, lang);
  });
}

function refreshReaderLabels(lang) {
  document.querySelectorAll("[data-reader-count]").forEach((el) => {
    const raw = el.getAttribute("data-reader-value-num");
    if (raw === null || raw === "") {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    const compact = Boolean(el.closest(".card-meta"));
    const en = formatReaderLabel(raw, "en", compact);
    const elTxt = formatReaderLabel(raw, "el", compact);
    if (!en || !elTxt) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    ensureLangStackContent(el, en, elTxt);
    applyLanguageToTree(el, lang);
  });
}

/** Wrap adjacent [data-lang=en]+[data-lang=el] siblings in .lang-stack. */
function wrapBilingualPairs(root = document) {
  root.querySelectorAll('[data-lang="en"]').forEach((el) => el.setAttribute("lang", "en"));
  root.querySelectorAll('[data-lang="el"]').forEach((el) => el.setAttribute("lang", "el"));

  const ens = Array.from(root.querySelectorAll('[data-lang="en"]'));
  ens.forEach((en) => {
    if (en.closest("a.brand")) return;
    if (en.closest(".lang-stack, .header-lang-stack")) return;
    const sibling = en.nextElementSibling;
    if (!sibling || sibling.getAttribute("data-lang") !== "el") return;
    const wrap = document.createElement("span");
    wrap.className = "lang-stack";
    wrap.setAttribute("data-lang-stack-auto", "");
    en.before(wrap);
    wrap.append(en, sibling);
  });
}

function applyLanguageToTree(root, lang) {
  root.querySelectorAll("[data-lang]").forEach((el) => {
    if (el.closest("a.brand")) return;
    const match = el.getAttribute("data-lang") === lang;
    const parent = el.parentElement;
    if (
      parent?.classList.contains("lang-stack") ||
      parent?.classList.contains("header-lang-stack")
    ) {
      el.hidden = false;
      el.classList.toggle("is-lang-active", match);
      el.classList.toggle("is-lang-inactive", !match);
      el.setAttribute("aria-hidden", match ? "false" : "true");
      el.querySelectorAll("a, button, input, select, textarea").forEach((ctrl) => {
        if (match) ctrl.removeAttribute("tabindex");
        else ctrl.setAttribute("tabindex", "-1");
      });
      return;
    }
    el.hidden = !match;
    el.classList.remove("is-lang-active", "is-lang-inactive");
    el.removeAttribute("aria-hidden");
  });
}

/* EN / EL language toggle: swaps [data-lang] content via the `hidden` attribute
   and persists the choice in localStorage. */
function initLanguageToggle() {
  const TRANSLATED_ATTRS = {
    alt: "data-el-alt",
    "aria-label": "data-el-aria-label",
    placeholder: "data-el-placeholder",
    title: "data-el-title",
  };

  /* Adjacent EN+EL siblings that are not already stacked cause mobile CLS:
     Greek wraps to more lines, document height changes, and scroll anchoring
     then shifts titles/header content even when one body anchor is preserved.
     Wrap pairs once so both languages reserve the taller/wider slot. */
  ensureStackedDates(document);
  wrapBilingualPairs(document);
  compactCardMetaReadLabels(document);

  function findViewportAnchor() {
    const header = document.querySelector("header");
    const headerBottom = header
      ? header.getBoundingClientRect().bottom
      : 0;
    const minTop = headerBottom + 2;
    const maxTop = window.innerHeight * 0.6;
    const selectors = [
      ".featured-article",
      ".article-card",
      ".section-heading",
      ".topic-card",
      "main h1",
      "main h2",
      "main h3",
      "article",
      ".about-hero",
      ".editorial-section",
      "main section",
    ];
    let best = null;
    let bestScore = Infinity;
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (!el.getClientRects().length) return;
      if (el.closest("header, a.brand, .lang-toggle")) return;
      const top = el.getBoundingClientRect().top;
      if (top < minTop - 40 || top > maxTop) return;
      const score = Math.abs(top - minTop);
      if (score < bestScore) {
        bestScore = score;
        best = el;
      }
    });
    if (best) return best;
    const x = Math.min(Math.max(window.innerWidth / 2, 24), window.innerWidth - 24);
    const y = Math.min(minTop + 28, window.innerHeight - 8);
    const hit = document.elementsFromPoint(x, y);
    return (
      hit.find(
        (el) =>
          el &&
          el !== document.documentElement &&
          el !== document.body &&
          !el.closest("header, .lang-toggle"),
      ) || null
    );
  }

  function preserveViewportAnchor(anchor, anchorTopBefore) {
    if (!anchor || !document.contains(anchor)) return;
    const delta = anchor.getBoundingClientRect().top - anchorTopBefore;
    if (Math.abs(delta) <= 0.5) return;
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollBy(0, delta);
    root.style.scrollBehavior = prevBehavior;
  }

  function applyLanguage(lang) {
    const atTop = window.scrollY < 1;
    const root = document.documentElement;
    let anchor = null;
    let anchorTop = 0;
    if (!atTop) {
      anchor = findViewportAnchor();
      if (anchor) anchorTop = anchor.getBoundingClientRect().top;
      // Prevent browser scroll anchoring from fighting our compensation.
      root.style.overflowAnchor = "none";
    }

    root.setAttribute("lang", lang);

    applyLanguageToTree(document, lang);

    Object.entries(TRANSLATED_ATTRS).forEach(([attr, elAttr]) => {
      document.querySelectorAll(`[${elAttr}]`).forEach((el) => {
        const enCacheAttr = `data-en-cache-${attr}`;
        if (!el.hasAttribute(enCacheAttr)) {
          el.setAttribute(enCacheAttr, el.getAttribute(attr) || "");
        }
        const value =
          lang === "el" ? el.getAttribute(elAttr) : el.getAttribute(enCacheAttr);
        if (value !== null) el.setAttribute(attr, value);
      });
    });

    document.querySelectorAll("[data-el-text]").forEach((el) => {
      if (!el.hasAttribute("data-en-cache-text")) {
        el.setAttribute("data-en-cache-text", el.textContent);
      }
      el.textContent =
        lang === "el"
          ? el.getAttribute("data-el-text")
          : el.getAttribute("data-en-cache-text");
    });

    const titleEn = root.getAttribute("data-title-en");
    const titleEl = root.getAttribute("data-title-el");
    if (titleEn && titleEl) document.title = lang === "el" ? titleEl : titleEn;

    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(lang === "el"));
      btn.querySelectorAll("[data-lang-option]").forEach((opt) => {
        opt.classList.toggle(
          "is-active",
          opt.getAttribute("data-lang-option") === lang,
        );
      });
    });

    applyLocalizedDates(lang);
    refreshReaderLabels(lang);

    // Keep archive results-count in sync with the active language.
    if (document.querySelector("#results-count")) {
      applyFilters();
    }

    if (atTop) {
      if (window.scrollY !== 0) {
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        root.style.scrollBehavior = "";
      }
    } else {
      preserveViewportAnchor(anchor, anchorTop);
      root.style.overflowAnchor = "";
    }
  }

  applyLanguage(getStoredLang());

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getStoredLang() === "en" ? "el" : "en";
      localStorage.setItem(LANG_STORAGE_KEY, next);
      applyLanguage(next);
    });
  });
}

/* Homepage Featured + Recent:
   - Featured = highest Abacus reader count (ties → newest publish date)
   - Recent = 3 newest archive articles excluding the featured slug
   Syncs from /articles/ so archive cards remain the source of truth. */
function articleSlugFromHref(href) {
  if (!href) return "";
  const clean = href.split("?")[0].split("#")[0];
  const file = clean.split("/").pop() || "";
  if (!file.endsWith(".html") || file === "index.html") return "";
  return file.replace(/\.html$/, "");
}

function cardPublishTime(card) {
  const iso = (card.querySelector("time[datetime]")?.getAttribute("datetime") || "").slice(0, 10);
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : 0;
}

function rewriteCardForHomepage(card) {
  card.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src") || "";
    if (src.startsWith("../images/")) {
      img.setAttribute("src", src.replace("../images/", "images/"));
    }
  });
  card.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
      return;
    }
    if (href.startsWith("articles/")) return;
    const file = href.replace(/^\.\//, "").split("/").pop();
    if (file && file.endsWith(".html") && file !== "index.html") {
      a.setAttribute("href", `articles/${file}`);
    }
  });
  card.querySelectorAll(".reader-count").forEach((el) => el.remove());
}

function applyHomepageCardLanguage(root, lang) {
  ensureStackedDates(root);
  wrapBilingualPairs(root);
  compactCardMetaReadLabels(root);
  applyLanguageToTree(root, lang);
  root.querySelectorAll("img[data-el-alt]").forEach((img) => {
    if (!img.hasAttribute("data-en-cache-alt")) {
      img.setAttribute("data-en-cache-alt", img.getAttribute("alt") || "");
    }
    img.setAttribute(
      "alt",
      lang === "el" ? img.getAttribute("data-el-alt") || "" : img.getAttribute("data-en-cache-alt") || "",
    );
  });
}

const ABACUS_NAMESPACE = "constantinosnea.github.io";
const ABACUS_API = "https://abacus.jasoncameron.dev";

async function fetchAbacusCount(slug, hit = false) {
  if (!slug) return 0;
  const path = hit
    ? `${ABACUS_API}/hit/${encodeURIComponent(ABACUS_NAMESPACE)}/${encodeURIComponent(slug)}`
    : `${ABACUS_API}/get/${encodeURIComponent(ABACUS_NAMESPACE)}/${encodeURIComponent(slug)}`;
  const res = await fetch(path);
  if (!hit && res.status === 404) return 0;
  if (!res.ok) throw new Error("counter failed");
  const data = await res.json();
  return Number(data.value ?? data.count ?? 0);
}

async function fetchHomepageArchiveItems() {
  const res = await fetch("articles/");
  if (!res.ok) throw new Error("archive fetch failed");
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll(".card-grid [data-card-topic]"))
    .map((card) => {
      const slug = articleSlugFromHref(card.querySelector("h3 a")?.getAttribute("href"));
      return { card, slug, time: cardPublishTime(card) };
    })
    .filter((item) => item.slug);
}

function populateFeaturedFromArchiveCard(featuredEl, archiveCard) {
  const source = archiveCard.cloneNode(true);
  rewriteCardForHomepage(source);

  const img = source.querySelector(".card-media img");
  const tags = source.querySelector(".card-tags");
  const titleLink = source.querySelector("h3 a");
  const excerpt = source.querySelector(".card-excerpt");
  const meta = source.querySelector(".card-meta");
  const href = titleLink?.getAttribute("href") || "#";
  const topic = source.getAttribute("data-card-topic");

  const media = featuredEl.querySelector(".featured-media");
  const body = featuredEl.querySelector(".featured-body");
  if (!media || !body || !titleLink) return;

  if (topic) featuredEl.setAttribute("data-card-topic", topic);
  else featuredEl.removeAttribute("data-card-topic");

  if (img) {
    const nextImg = img.cloneNode(true);
    nextImg.setAttribute("fetchpriority", "high");
    nextImg.removeAttribute("loading");
    media.replaceChildren(nextImg);
  }

  body.replaceChildren();
  if (tags) body.appendChild(tags.cloneNode(true));

  const h3 = document.createElement("h3");
  h3.appendChild(titleLink.cloneNode(true));
  body.appendChild(h3);

  if (excerpt) body.appendChild(excerpt.cloneNode(true));

  if (meta) {
    const metaClone = meta.cloneNode(true);
    metaClone.querySelectorAll(".reader-count").forEach((el) => el.remove());
    body.appendChild(metaClone);
  }

  const ctaWrap = document.createElement("p");
  ctaWrap.style.marginTop = "var(--space-5)";
  const cta = document.createElement("a");
  cta.className = "btn btn-outline";
  cta.setAttribute("href", href);
  cta.innerHTML =
    '<span data-lang="en">Read the full article</span><span data-lang="el" hidden>Διαβάστε ολόκληρο το άρθρο</span>';
  ctaWrap.appendChild(cta);
  body.appendChild(ctaWrap);
}

async function initHomepageFeaturedAndRecent() {
  const featured = document.querySelector(".featured-article");
  const grid = document.querySelector("#recent-articles-grid");
  if (!featured && !grid) return;

  try {
    const items = await fetchHomepageArchiveItems();
    if (!items.length) return;

    const withViews = await Promise.all(
      items.map(async (item) => {
        let views = 0;
        try {
          views = await fetchAbacusCount(item.slug, false);
        } catch (_) {
          views = 0;
        }
        return { ...item, views: Number.isFinite(views) ? views : 0 };
      }),
    );

    const byViews = [...withViews].sort((a, b) => {
      if (b.views !== a.views) return b.views - a.views;
      if (b.time !== a.time) return b.time - a.time;
      return a.slug.localeCompare(b.slug);
    });
    const top = byViews[0];
    const featuredSlug = top?.slug || "";

    if (featured && top) {
      populateFeaturedFromArchiveCard(featured, top.card);
      applyHomepageCardLanguage(featured, getStoredLang());
    }

    if (grid) {
      const limit = Number.parseInt(grid.getAttribute("data-recent-count") || "3", 10) || 3;
      const recent = withViews
        .filter((item) => item.slug !== featuredSlug)
        .sort((a, b) => {
          if (b.time !== a.time) return b.time - a.time;
          return a.slug.localeCompare(b.slug);
        })
        .slice(0, limit);

      if (recent.length) {
        const frag = document.createDocumentFragment();
        recent.forEach(({ card }) => {
          const clone = card.cloneNode(true);
          rewriteCardForHomepage(clone);
          frag.appendChild(clone);
        });
        grid.replaceChildren(frag);
        applyHomepageCardLanguage(grid, getStoredLang());
      }
    }
  } catch (_) {
    /* Keep the static homepage cards if the archive/counts cannot be fetched. */
  }
}

/* Mobile navigation toggle */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    backdrop && backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    backdrop && backdrop.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  backdrop && backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

function normalizePathname(pathname) {
  let path = String(pathname || "/");
  try {
    path = decodeURIComponent(path);
  } catch (_) {
    /* keep raw */
  }
  path = path.replace(/\\/g, "/").replace(/\/index\.html$/i, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  if (!path || /^\/?index\.html$/i.test(path)) path = "/";
  return path.toLowerCase();
}

/* Exact page match only — article detail URLs must not claim "Articles" is the page. */
function initNavCurrent() {
  const links = document.querySelectorAll(".main-nav .nav-links a[href]");
  if (!links.length) return;

  links.forEach((link) => link.removeAttribute("aria-current"));

  const here = normalizePathname(window.location.pathname);
  let current = null;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^(mailto:|tel:|https?:|\/\/|#)/i.test(href)) return;
    let target;
    try {
      target = normalizePathname(new URL(href, window.location.href).pathname);
    } catch (_) {
      return;
    }
    if (target === here) current = link;
  });

  if (current) current.setAttribute("aria-current", "page");
}

/* Keep TOC labels in lockstep with article H2s (EN/EL) — headings are the source of truth. */
function initArticleToc() {
  const toc = document.querySelector(".toc-list");
  const body = document.querySelector(".article-body");
  if (!toc || !body) return;

  const headings = Array.from(body.querySelectorAll("h2[id]"));
  if (!headings.length) return;

  const lang = getStoredLang();
  const frag = document.createDocumentFragment();

  headings.forEach((heading) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${heading.id}`;

    const en = heading.querySelector('[data-lang="en"]');
    const el = heading.querySelector('[data-lang="el"]');

    if (en || el) {
      if (en) {
        const span = document.createElement("span");
        span.setAttribute("data-lang", "en");
        span.textContent = en.textContent.trim();
        a.appendChild(span);
      }
      if (el) {
        const span = document.createElement("span");
        span.setAttribute("data-lang", "el");
        span.textContent = el.textContent.trim();
        a.appendChild(span);
      }
      wrapBilingualPairs(a);
      applyLanguageToTree(a, lang);
    } else {
      a.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    }

    li.appendChild(a);
    frag.appendChild(li);
  });

  toc.replaceChildren(frag);
}

/* Canonical archive listing path is always …/articles/ (trailing slash).
   Bare …/articles and …/articles/index.html break relative nav (index.html
   resolves to the site root) and can drop query strings on some hosts. */
function isArchiveListingPath(pathname) {
  const path = String(pathname || "").replace(/\\/g, "/");
  return /\/articles\/?$/i.test(path) || /\/articles\/index\.html$/i.test(path);
}

function canonicalizeArchivePathname(pathname) {
  let path = String(pathname || "").replace(/\\/g, "/");
  if (!isArchiveListingPath(path)) return path;
  path = path.replace(/\/index\.html$/i, "/");
  if (/\/articles$/i.test(path)) path += "/";
  return path;
}

function canonicalizeArchiveLocation() {
  if (!isArchiveListingPath(window.location.pathname)) return false;
  const url = new URL(window.location.href);
  const nextPath = canonicalizeArchivePathname(url.pathname);
  if (nextPath === url.pathname) return false;
  url.pathname = nextPath;
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  return true;
}

/* Canonical archive topic URLs: /articles/?topic=slug
   Hash fallback (#topic=slug) survives hosts that strip ?topic= on
   …/index.html → …/ redirects (e.g. some local static servers). */
function normalizeArchivePathname(pathname) {
  return canonicalizeArchivePathname(pathname);
}

function parseArchiveTopicFromHash(hash) {
  const raw = String(hash || "").replace(/^#/, "").trim();
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const topic = params.get("topic");
  if (!topic || topic === "all") return null;
  return topic;
}

function getRequestedArchiveTopic() {
  const fromQuery = new URLSearchParams(window.location.search).get("topic");
  if (fromQuery) return fromQuery;
  return parseArchiveTopicFromHash(window.location.hash);
}

function syncFilterChipPressed(filterBar) {
  filterBar.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.classList.contains("is-active")));
  });
}

function setActiveFilterChip(filterBar, chip) {
  filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
  chip.classList.add("is-active");
  syncFilterChipPressed(filterBar);
}

function getRequestedLatestLimit() {
  const raw = new URLSearchParams(window.location.search).get("latest");
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

function getRequestedSort() {
  const sort = new URLSearchParams(window.location.search).get("sort");
  return ARCHIVE_SORT_VALUES.has(sort) ? sort : "newest";
}

function getActiveArchiveSort() {
  const sortSelect = document.querySelector("#article-sort");
  if (sortSelect && ARCHIVE_SORT_VALUES.has(sortSelect.value)) {
    return sortSelect.value;
  }
  return getRequestedSort();
}

function cardDateValue(card) {
  const dt = card.querySelector("time")?.getAttribute("datetime");
  if (!dt) return 0;
  const t = Date.parse(dt);
  return Number.isFinite(t) ? t : 0;
}

function cardViewCount(card) {
  const raw = card
    .querySelector("[data-reader-count]")
    ?.getAttribute("data-reader-value-num");
  if (raw == null || raw === "") return -1;
  const n = Number(raw);
  return Number.isFinite(n) ? n : -1;
}

function cardReadMinutes(card) {
  const en = card.querySelector(".card-meta [data-lang='en']");
  const match = (en?.textContent || "").match(/(\d+)\s*min/i);
  return match ? Number(match[1]) : 0;
}

const ARCHIVE_SORT_VALUES = new Set([
  "newest",
  "views",
  "read-asc",
  "read-desc",
]);

function applyCardSort() {
  const grid = document.querySelector(".card-grid");
  if (!grid) return;
  const sort = getActiveArchiveSort();
  const cards = Array.from(grid.querySelectorAll("[data-card-topic]"));
  cards.sort((a, b) => {
    if (sort === "views") {
      const va = cardViewCount(a);
      const vb = cardViewCount(b);
      if (va < 0 && vb < 0) return cardDateValue(b) - cardDateValue(a);
      if (va < 0) return 1;
      if (vb < 0) return -1;
      if (vb !== va) return vb - va;
      return cardDateValue(b) - cardDateValue(a);
    }
    if (sort === "read-asc" || sort === "read-desc") {
      const ra = cardReadMinutes(a);
      const rb = cardReadMinutes(b);
      if (ra !== rb) return sort === "read-asc" ? ra - rb : rb - ra;
      return cardDateValue(b) - cardDateValue(a);
    }
    return cardDateValue(b) - cardDateValue(a);
  });
  cards.forEach((card) => grid.appendChild(card));
}

function getLatestCardSet(limit) {
  return new Set(
    Array.from(document.querySelectorAll("[data-card-topic]"))
      .slice()
      .sort((a, b) => cardDateValue(b) - cardDateValue(a))
      .slice(0, limit),
  );
}

function syncArchiveQueryParams({ topic, q, latest, sort, replace = true }) {
  const url = new URL(window.location.href);
  url.pathname = canonicalizeArchivePathname(url.pathname);

  if (topic && topic !== "all") {
    url.searchParams.set("topic", topic);
    url.hash = `topic=${encodeURIComponent(topic)}`;
  } else {
    url.searchParams.delete("topic");
    if (parseArchiveTopicFromHash(url.hash)) url.hash = "";
  }

  if (typeof q === "string" && q.trim()) url.searchParams.set("q", q.trim());
  else if (q === "") url.searchParams.delete("q");

  if (typeof latest === "number" && latest > 0) {
    url.searchParams.set("latest", String(latest));
  } else if (latest === null || latest === "") {
    url.searchParams.delete("latest");
  }

  if (sort && sort !== "newest" && ARCHIVE_SORT_VALUES.has(sort)) {
    url.searchParams.set("sort", sort);
  } else if (sort === "newest" || sort === null || sort === "") {
    url.searchParams.delete("sort");
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${canonicalizeArchivePathname(window.location.pathname)}${window.location.search}${window.location.hash}`;
  if (next === current) return;

  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", next);
}

function initArticleSort() {
  const sortSelect = document.querySelector("#article-sort");
  if (!sortSelect) return;

  sortSelect.value = getRequestedSort();
  sortSelect.addEventListener("change", () => {
    const searchInput = document.querySelector("#article-search");
    syncArchiveQueryParams({
      topic: document.querySelector(".filter-chip.is-active")?.dataset.filter,
      q: searchInput ? searchInput.value : undefined,
      latest: getRequestedLatestLimit(),
      sort: sortSelect.value,
    });
    applyFilters();
  });
}

/* Article archive: category filter chips */
function initArticleFilters() {
  const filterBar = document.querySelector(".filter-bar");
  const cards = document.querySelectorAll("[data-card-topic]");
  if (!filterBar || !cards.length) return;

  const applyTopicFromLocation = () => {
    const requestedTopic = getRequestedArchiveTopic();
    let chip = null;
    if (requestedTopic) {
      chip = filterBar.querySelector(
        `.filter-chip[data-filter="${CSS.escape(requestedTopic)}"]`,
      );
    }
    if (!chip) chip = filterBar.querySelector('.filter-chip[data-filter="all"]');
    if (chip) setActiveFilterChip(filterBar, chip);

    syncArchiveQueryParams({
      topic: filterBar.querySelector(".filter-chip.is-active")?.dataset.filter,
      q:
        document.querySelector("#article-search")?.value ||
        new URLSearchParams(window.location.search).get("q") ||
        "",
      latest: getRequestedLatestLimit(),
      sort: getActiveArchiveSort(),
    });
    applyFilters();
  };

  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    setActiveFilterChip(filterBar, chip);
    const searchInput = document.querySelector("#article-search");
    /* Topic browsing uses the full archive; keep latest= only for the dedicated CTA. */
    syncArchiveQueryParams({
      topic: chip.dataset.filter,
      q: searchInput ? searchInput.value : undefined,
      latest: chip.dataset.filter === "all" ? getRequestedLatestLimit() : null,
      sort: getActiveArchiveSort(),
    });
    applyFilters();
  });

  window.addEventListener("hashchange", () => {
    if (!document.querySelector(".filter-bar")) return;
    applyTopicFromLocation();
  });

  applyTopicFromLocation();
}

/* Normalize for search: lowercase, strip diacritics, collapse punctuation/space. */
function normalizeSearchText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(query) {
  return normalizeSearchText(query).split(" ").filter(Boolean);
}

/* Allow only light inflection tails (e.g. NCDs←NCD, τηλεϋγείας←τηλεϋγεία).
   Reject mid-word hits such as heat inside health. */
function isLightInflectionSuffix(suffix) {
  return /^(s|es|ς|ας|ες|ης|ων|ου|ος|εις)?$/u.test(suffix);
}

function tokenMatchesHaystack(haystack, token) {
  if (!token) return true;
  const words = normalizeSearchText(haystack).split(/\s+/).filter(Boolean);
  return words.some((word) => {
    if (word === token) return true;
    if (word.startsWith(token) && isLightInflectionSuffix(word.slice(token.length))) {
      return true;
    }
    if (token.startsWith(word) && isLightInflectionSuffix(token.slice(word.length))) {
      return true;
    }
    return false;
  });
}

function matchesSearchQuery(haystack, query) {
  const tokens = queryTokens(query);
  if (!tokens.length) return true;
  return tokens.every((token) => tokenMatchesHaystack(haystack, token));
}

/* Archive search uses article titles only (EN + EL), never body/excerpt/tags/metadata. */
function cardTitleSearchHaystack(card) {
  const titleRoot =
    card.querySelector("h3 a, h2 a") || card.querySelector("h3, h2");
  if (!titleRoot) return "";

  const en = titleRoot.querySelector('[data-lang="en"]')?.textContent || "";
  const el = titleRoot.querySelector('[data-lang="el"]')?.textContent || "";
  const parts = [en, el].map((part) => part.trim()).filter(Boolean);
  if (parts.length) return parts.join(" ");

  return titleRoot.textContent || "";
}

/* Article archive: live search against bilingual titles only */
function initSearch() {
  const searchInput = document.querySelector("#article-search");
  if (!searchInput) return;

  let debounceTimer = 0;
  searchInput.addEventListener("input", () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      const activeChip = document.querySelector(".filter-chip.is-active");
      syncArchiveQueryParams({
        topic: activeChip?.dataset.filter,
        q: searchInput.value,
        latest: getRequestedLatestLimit(),
        sort: getActiveArchiveSort(),
      });
      applyFilters();
    }, 120);
  });

  const requestedQuery = new URLSearchParams(window.location.search).get("q");
  if (requestedQuery) {
    searchInput.value = requestedQuery;
    applyFilters();
  }
}

function applyFilters() {
  const activeChip = document.querySelector(".filter-chip.is-active");
  const activeTopic = activeChip ? activeChip.dataset.filter : "all";
  const searchInput = document.querySelector("#article-search");
  const query = searchInput ? searchInput.value.trim() : "";
  const latestLimit = getRequestedLatestLimit();
  const latestSet = latestLimit ? getLatestCardSet(latestLimit) : null;

  const cards = document.querySelectorAll("[data-card-topic]");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesTopic = activeTopic === "all" || card.dataset.cardTopic === activeTopic;
    const matchesQuery = matchesSearchQuery(cardTitleSearchHaystack(card), query);
    const matchesLatest = !latestSet || latestSet.has(card);
    const visible = matchesTopic && matchesQuery && matchesLatest;
    card.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });

  const resultsMeta = document.querySelector("#results-count");
  if (resultsMeta) {
    const lang = getStoredLang();
    resultsMeta.textContent =
      lang === "el"
        ? `Εμφάνιση ${visibleCount} άρθρ${visibleCount === 1 ? "ου" : "ων"}`
        : `Showing ${visibleCount} article${visibleCount === 1 ? "" : "s"}`;
  }

  const noResults = document.querySelector(".no-results");
  if (noResults) {
    noResults.classList.toggle("is-visible", visibleCount === 0);
  }

  applyCardSort();
}

function initCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* Keep in-page anchors clear of the sticky header on every viewport size. */
function initStickyScrollOffset() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const apply = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty(
      "--sticky-header-offset",
      `${Math.max(height, 64)}px`,
    );
  };

  apply();
  window.addEventListener("resize", apply, { passive: true });
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(apply).observe(header);
  }
}

function setCopyFeedback(btn, lang, ok) {
  const feedback =
    lang === "el"
      ? ok
        ? "Ο σύνδεσμος αντιγράφηκε"
        : "Αποτυχία αντιγραφής"
      : ok
        ? "Link copied"
        : "Copy failed";
  const original = btn.getAttribute("data-en-cache-aria-label") || btn.getAttribute("aria-label") || "";
  btn.setAttribute("aria-label", feedback);
  btn.classList.toggle("is-copied", ok);
  btn.classList.toggle("is-copy-failed", !ok);
  const labelEl = btn.querySelector(".share-btn-label");
  if (labelEl && !labelEl.querySelector("[data-lang]")) {
    if (!labelEl.hasAttribute("data-en-cache-label")) {
      labelEl.setAttribute("data-en-cache-label", labelEl.textContent);
    }
    labelEl.textContent = feedback;
  }
  window.setTimeout(() => {
    const restoreLang = getStoredLang();
    const elLabel = btn.getAttribute("data-el-aria-label");
    const enLabel = btn.getAttribute("data-en-cache-aria-label") || original;
    btn.setAttribute("aria-label", restoreLang === "el" && elLabel ? elLabel : enLabel);
    btn.classList.remove("is-copied", "is-copy-failed");
    if (labelEl && !labelEl.querySelector("[data-lang]")) {
      const en = labelEl.getAttribute("data-en-cache-label") || "Copy link";
      const el = labelEl.getAttribute("data-el-label") || "Αντιγραφή συνδέσμου";
      labelEl.textContent = restoreLang === "el" ? el : en;
    }
  }, 1800);
}

function closeShareFallback() {
  document.querySelectorAll(".share-fallback").forEach((el) => el.remove());
}

/* Last-resort copy UX when Clipboard API / execCommand are unavailable. */
function offerManualLinkCopy(anchorBtn, url, lang) {
  closeShareFallback();

  const host = anchorBtn.closest(".share-links") || anchorBtn.parentElement || document.body;
  const panel = document.createElement("div");
  panel.className = "share-fallback";
  panel.setAttribute("role", "dialog");
  panel.setAttribute(
    "aria-label",
    lang === "el" ? "Αντιγραφή συνδέσμου" : "Copy link",
  );

  const label = document.createElement("p");
  label.className = "share-fallback-label";
  label.textContent =
    lang === "el"
      ? "Αντιγράψτε τον σύνδεσμο χειροκίνητα:"
      : "Copy the link manually:";

  const row = document.createElement("div");
  row.className = "share-fallback-row";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "share-fallback-input";
  input.value = url;
  input.setAttribute("readonly", "");
  input.setAttribute("aria-label", lang === "el" ? "Σύνδεσμος άρθρου" : "Article link");

  const done = document.createElement("button");
  done.type = "button";
  done.className = "share-fallback-close";
  done.textContent = lang === "el" ? "Κλείσιμο" : "Close";

  row.append(input, done);
  panel.append(label, row);
  host.appendChild(panel);

  input.focus();
  input.select();

  const dismiss = () => {
    closeShareFallback();
    document.removeEventListener("keydown", onKey);
  };
  const onKey = (e) => {
    if (e.key === "Escape") dismiss();
  };
  done.addEventListener("click", dismiss);
  document.addEventListener("keydown", onKey);

  const soft =
    lang === "el" ? "Αντιγράψτε από το πεδίο" : "Copy from the field";
  const original =
    anchorBtn.getAttribute("data-en-cache-aria-label") ||
    anchorBtn.getAttribute("aria-label") ||
    "";
  if (!anchorBtn.hasAttribute("data-en-cache-aria-label") && original) {
    anchorBtn.setAttribute("data-en-cache-aria-label", original);
  }
  anchorBtn.setAttribute("aria-label", soft);
  anchorBtn.classList.add("is-copy-failed");
  window.setTimeout(() => {
    if (!document.body.contains(panel)) return;
    const restoreLang = getStoredLang();
    const elLabel = anchorBtn.getAttribute("data-el-aria-label");
    const enLabel = anchorBtn.getAttribute("data-en-cache-aria-label") || original;
    anchorBtn.setAttribute(
      "aria-label",
      restoreLang === "el" && elLabel ? elLabel : enLabel,
    );
    anchorBtn.classList.remove("is-copy-failed");
  }, 2400);
}

async function copyPageLink(btn) {
  const lang = getStoredLang();
  const url = window.location.href.split("#")[0];

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(btn, lang, true);
      closeShareFallback();
      return true;
    }
  } catch (_) {
    /* fall through */
  }

  try {
    const input = document.createElement("input");
    input.value = url;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    if (ok) {
      setCopyFeedback(btn, lang, true);
      closeShareFallback();
      return true;
    }
  } catch (_) {
    /* fall through */
  }

  offerManualLinkCopy(btn, url, lang);
  return false;
}

/* Wire share-intent URLs onto [data-share] controls using this page's own URL/title. */
function initShareLinks() {
  const shareLinks = document.querySelectorAll("[data-share]");
  if (!shareLinks.length) return;

  const pageUrl = window.location.href.split("#")[0];
  const pageTitle = document.title.replace(/ — Health in Blog$/, "");
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(pageTitle);
  const shareData = {
    title: pageTitle,
    text: pageTitle,
    url: pageUrl,
  };

  shareLinks.forEach((link) => {
    const kind = link.dataset.share;
    if (kind === "linkedin") {
      link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else if (kind === "email") {
      link.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    } else if (kind === "native") {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        if (typeof navigator.share === "function") {
          try {
            await navigator.share(shareData);
            return;
          } catch (err) {
            if (err && err.name === "AbortError") return;
          }
        }
        await copyPageLink(link);
      });
    } else if (kind === "copy") {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        copyPageLink(link);
      });
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          copyPageLink(link);
        }
      });
    }
  });
}

/* Live reader counts via Abacus (free counting API for static sites).
   Permanent blog rule: article pages increment once per browser session only
   after the reader stays on the page for more than 25 seconds of visible time.
   Opening and leaving sooner must not count. Listing cards only display counts. */
function initReaderCounts() {
  const HIT_DELAY_MS = 25000;

  function slugFromHref(href) {
    return articleSlugFromHref(href);
  }

  async function fetchCount(slug, hit) {
    return fetchAbacusCount(slug, hit);
  }

  function setCount(el, count) {
    if (!Number.isFinite(count) || count < 0) {
      el.removeAttribute("data-reader-value-num");
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.setAttribute("data-reader-value-num", String(count));
    const compact = Boolean(el.closest(".card-meta"));
    const en = formatReaderLabel(count, "en", compact);
    const elTxt = formatReaderLabel(count, "el", compact);
    if (!en || !elTxt) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    ensureLangStackContent(el, en, elTxt);
    applyLanguageToTree(el, getStoredLang());
    if (
      document.querySelector("#article-sort") &&
      getActiveArchiveSort() === "views"
    ) {
      applyCardSort();
    }
  }

  function scheduleEngagedHit(slug, el, sessionKey) {
    let remainingMs = HIT_DELAY_MS;
    let deadline = 0;
    let timeoutId = 0;

    const clearTimer = () => {
      if (!timeoutId) return;
      window.clearTimeout(timeoutId);
      timeoutId = 0;
    };

    const pause = () => {
      if (!timeoutId) return;
      remainingMs = Math.max(0, deadline - Date.now());
      clearTimer();
    };

    const registerHit = async () => {
      if (sessionStorage.getItem(sessionKey) === "1") return;
      try {
        const count = await fetchCount(slug, true);
        sessionStorage.setItem(sessionKey, "1");
        setCount(el, count);
      } catch (_) {
        /* Keep the previously displayed get-count if the hit fails. */
      }
    };

    const start = () => {
      if (timeoutId || remainingMs <= 0) return;
      deadline = Date.now() + remainingMs;
      timeoutId = window.setTimeout(() => {
        timeoutId = 0;
        remainingMs = 0;
        document.removeEventListener("visibilitychange", onVisibility);
        registerHit();
      }, remainingMs);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else pause();
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (document.visibilityState === "visible") start();
    else pause();
  }

  // Ensure listing cards have a reader-count target derived from their article link.
  document.querySelectorAll(".article-card, .featured-article").forEach((card) => {
    const link = card.querySelector("h2 a, h3 a");
    const meta = card.querySelector(".card-meta");
    if (!link || !meta) return;
    const slug = slugFromHref(link.getAttribute("href"));
    if (!slug) return;
    if (meta.querySelector(`[data-article-slug="${slug}"]`)) return;
    const span = document.createElement("span");
    span.className = "dot reader-count";
    span.dataset.readerCount = "";
    span.dataset.articleSlug = slug;
    span.hidden = true;
    meta.appendChild(span);
  });

  // Normalize any legacy markup that still nests value/label spans.
  document.querySelectorAll("[data-reader-count]").forEach((el) => {
    if (el.querySelector("[data-reader-value], [data-lang]")) {
      el.textContent = "";
      el.hidden = true;
    }
  });

  const targets = Array.from(
    document.querySelectorAll("[data-reader-count][data-article-slug]"),
  );
  if (!targets.length) return;

  targets.forEach(async (el) => {
    const slug = el.getAttribute("data-article-slug");
    if (!slug) return;
    const shouldHit = el.hasAttribute("data-reader-hit");
    const sessionKey = `phm-read-${slug}`;
    const alreadyHit = sessionStorage.getItem(sessionKey) === "1";

    try {
      const count = await fetchCount(slug, false);
      setCount(el, count);
    } catch (_) {
      el.hidden = true;
      el.textContent = "";
      /* Still schedule an engaged hit below — a transient get failure must not
         permanently prevent counting after the 25s dwell. */
    }

    if (shouldHit && !alreadyHit) {
      scheduleEngagedHit(slug, el, sessionKey);
    }
  });
}
