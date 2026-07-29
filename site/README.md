# Public Health Matters

A static, dependency-free personal blog focused on public health, environmental health, healthcare policy, prevention, mental health, and digital health.

No build step, no framework, no database — plain HTML, CSS, and a small amount of vanilla JavaScript. Everything runs entirely locally.

## Project structure

```
index.html              Home page
topics.html               Topic overview page
about.html                 Author / mission page
contact.html                Contact page (front-end-only form)
404.html                      Custom "page not found" page (noindex)
robots.txt                     Crawler rules + sitemap reference
sitemap.xml                     XML sitemap of all public pages
articles/                    Article archive + individual posts
  index.html                    Article archive (filter + search) — served at /articles/
  _TEMPLATE.html               Copy-source template for new articles (not a real page)
  air-quality-respiratory-health.html
  loneliness-public-health-issue.html
  telehealth-access-equity.html
  walkable-cities-prevention.html
  vaccine-hesitancy-communication.html
  healthcare-policy-debates.html
  heatwaves-climate-mortality.html
css/style.css               All design tokens, layout, and components
js/main.js                    Mobile nav, article filtering/search, share links, form handling, EN/EL language toggle
images/                        SVG cover art and icons (no external image dependencies)
```

`articles.html` doesn't exist as a separate file — the archive lives at `articles/index.html`, so `/articles/` serves it directly (the standard way every static host resolves a directory URL). This was chosen deliberately: an earlier version had both `articles.html` and an `articles/` folder side by side, which some hosts' "clean URL" rewriting (stripping `.html` from links) can turn into a real collision — requesting `/articles` gets rewritten to `/articles/`, finds the directory, and 404s because there's no `index.html` inside it. Nesting the archive as `articles/index.html` removes the collision entirely.

## Site configuration (do this before launch)

Every page's canonical URL, Open Graph tags, Twitter Card tags, and JSON-LD structured data use one placeholder domain throughout:

```
https://www.thepublichealthinsight.example
```

`.example` is a domain suffix reserved by IANA specifically for documentation, so it can never resolve to a real site — that's intentional, so nothing here can be mistaken for a live URL. Once you have a real domain, replace every occurrence in one pass:

```bash
grep -rl "www.thepublichealthinsight.example" --include="*.html" --include="*.xml" --include="*.txt" . | xargs sed -i 's/www\.thepublichealthinsight\.example/your-real-domain.com/g'
```

(On Windows PowerShell, use `Get-ChildItem -Recurse -Include *.html,*.xml,*.txt | ForEach-Object { (Get-Content $_.FullName) -replace 'www\.thepublichealthinsight\.example','your-real-domain.com' | Set-Content $_.FullName }`.)

This single value drives: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, every JSON-LD `url`/`@id`/`item` field, and the `Sitemap:` line in `robots.txt`.

## Running it locally

No installation or build tools are required. Pick one of the following:

**Option A — just open the file**
Double-click `index.html`, or open it directly in a browser. Nearly everything works this way; the only limitation is that `fetch`-based features would be blocked under `file://` (this site doesn't use any, so this is fine).

**Option B — a tiny local server (recommended)**
A local server gives you clean relative-path behaviour and is closer to how it will run once hosted. From the project folder:

```bash
npx http-server . -p 8000
```

or, if you have Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> Note: avoid `npx serve` for local testing — its default "clean URL" redirect strips query strings from requests like `articles/?topic=policy`, which breaks the topic links from the Topics page. `http-server` and Python's server don't have this problem.

## How to add a new, SEO-ready article

1. **Copy `articles/_TEMPLATE.html`** to a new file in `articles/`, named with a short, human-readable, hyphenated slug (e.g. `sleep-and-public-health.html`). This is the recommended starting point — it already contains every metadata field and JSON-LD block described below with `{{TOKEN}}` placeholders, plus a `noindex` meta tag you must remove once the article is real. (You can also copy an existing published article as a style reference, but `_TEMPLATE.html` is the one that won't accidentally carry over another article's structured data.)
2. **Fill in every `{{TOKEN}}`** in the template's `<head>`: SEO title, meta description (under ~160 characters), slug (must match the filename), publication date, modified date, topic/section, cover image filename, and social-sharing description. The template's JSON-LD (`BlogPosting` + `BreadcrumbList`) uses the same tokens — filling in the meta tags and JSON-LD together keeps them in sync.
3. **Remove the `<meta name="robots" content="noindex, nofollow">` line** — this is what keeps the template itself out of search results; a real article should not have it.
4. **Update the article header**: breadcrumb text, topic tag (`data-topic="..."`, matching one of `public-health`, `environment`, `policy`, `prevention`, `digital`, `mental`, `commentary`), content-type label (`data-type="evidence" | "analysis" | "commentary" | "explainer"`), title, subtitle, byline date, and reading time.
5. **Replace the cover image** — either reuse one of the existing SVGs in `images/`, or add your own (SVG, JPG, PNG, or WebP all work; use descriptive `alt` text that says what the image depicts, not just "image" or the article title again).
6. **Write the body** inside `<div class="article-body">`. Use `<h2>`/`<h3>` for section headings in order (don't skip from `<h2>` to `<h4>`), give each heading an `id` so it can be linked from the sidebar table of contents, `<p>` for paragraphs, `<blockquote>` for pull quotes, and `<ul>`/`<ol>` for lists.
7. **Update the "On this page" sidebar** (`.toc-list`) to match your headings' `id` attributes.
8. **Fill in the takeaways box, references section, and author note.** If a reference is a placeholder rather than a verified source, keep the `<span class="ref-placeholder">Placeholder — replace before publishing</span>` marker until you've confirmed it.
9. **Update the related-articles section** at the bottom to link to genuinely related pieces — this is real internal-linking equity, not decoration.
10. **List the new article** in `articles/` (add a matching `<article class="article-card" data-card-topic="...">` card with a `data-search-index` attribute covering its title/topic/keywords for the search box) and, if it should be featured, update the featured-article block in `index.html`.
11. **Add it to `sitemap.xml`** as a new `<url>` block, using its publish date as `<lastmod>` (see the comment at the top of that file for the full convention).
12. **Check internal links**: article pages live one folder deep, so links back to the site use `../` (e.g. `../index.html`, `../css/style.css`), while links to other articles in the same folder don't need a prefix (e.g. `other-article.html`).

### Updating an existing article later

If you edit a published article's substance, update its visible byline date, `article:modified_time` meta tag, and the JSON-LD `dateModified` field to the real edit date (keep `datePublished`/`article:published_time` unchanged). This is what "last-updated" transparency actually means — don't bump the date without a real, meaningful edit.

### Content-type labels, explained

Use these consistently so readers always know what kind of claim they're reading:

- **Evidence Overview** — a summary of what established research shows.
- **Analysis** — connecting evidence, data, or policy to real-world outcomes, with interpretation clearly attributed to the author.
- **Commentary** — personal opinion, explicitly labelled as such throughout the piece.
- **Public Health Explainer** — an accessible breakdown of a concept, model, or mechanism.

### Editing the design system

All colors, spacing, typography, and component styles live in `css/style.css`, organized with CSS custom properties at the top of the file (`:root`). Changing the palette, font sizes, or spacing scale in one place updates the whole site.

## Bilingual support (English / Greek)

Every page has an EN / ΕΛ toggle button in the header (inside `.main-nav`, next to "Get in touch"). It's a client-side-only toggle — no page reload, no separate URL structure, no build step — consistent with the rest of this site's dependency-free approach. This is a deliberate scope trade-off: it gives visitors an instant language switch, but it does **not** create separately crawlable Greek URLs, so it doesn't carry independent SEO/hreflang value. If that becomes a priority later, the realistic path is duplicating pages under a `/el/` prefix with `hreflang` alternates — a materially bigger structural change, not an extension of this mechanism.

**How it works:** every translatable string is written twice in the HTML, as a pair of sibling spans immediately next to each other:

```html
<span data-lang="en">English text</span><span data-lang="el" hidden>Greek text</span>
```

`js/main.js` (`initLanguageToggle`) reads/writes a `site-lang` key in `localStorage` and toggles the `hidden` attribute on every `[data-lang]` element to match — so exactly one of each pair is visible, and the choice persists across pages and reloads. This also works with nested inline tags (`<strong>`, `<em>`, `<a>`) — just wrap the entire text run, tags included, in each span.

For attributes that can't hold child markup (`alt`, `aria-label`, `placeholder`, `title`): keep the existing English value as the real attribute, and add a matching `data-el-alt` / `data-el-aria-label` / `data-el-placeholder` / `data-el-title` attribute with the Greek text — the JS swaps the real attribute automatically. For elements that can't hold child markup at all (`<option>`), add `data-el-text` instead — JS swaps `.textContent` directly.

**Rule of thumb:** never put `data-lang` (or `data-el-*`) directly on an element that has its own layout-controlling class (`.tag`, `.content-type`, `.takeaways-box`, a flex/grid container, etc.) — only wrap the innermost text node. This avoids `[hidden]` losing to a more specific `display` rule from that class.

Two more pieces of the toggle, added once per page:
- `<html data-title-en="..." data-title-el="...">` — lets the JS swap `document.title` for a nicer tab-title UX (the visible `<title>` tag itself stays English-only; this doesn't affect SEO).
- The toggle button markup itself, placed inside `<nav class="main-nav">` right after `.nav-links` and before `.nav-cta`:
  ```html
  <button type="button" class="lang-toggle" aria-label="Switch language / Αλλαγή γλώσσας" aria-pressed="false">
    <span class="lang-option is-active" data-lang-option="en">EN</span><span class="lang-option" data-lang-option="el">ΕΛ</span>
  </button>
  ```

**Adding a new article:** `articles/_TEMPLATE.html` already has this convention pre-wired for all shared chrome (nav, footer, common labels) — you only need to fill in the `{{... (EN)}}` / `{{... (EL)}}` token pairs for the article's own content. Keep these translations consistent with the rest of the site (a locked lookup table of already-translated terms follows below) so the same tag, content-type label, or cross-referenced article title reads identically everywhere it appears.

**Locked terms — reuse exactly, don't re-translate:**

| English | Greek |
|---|---|
| Home / Articles / Topics / About / Contact / Get in touch | Αρχική / Άρθρα / Θέματα / Σχετικά / Επικοινωνία / Επικοινωνήστε |
| Public Health / Environment & Health / Health Policy | Δημόσια Υγεία / Περιβάλλον & Υγεία / Πολιτική Υγείας |
| Prevention & Wellbeing / Digital Health / Mental Health | Πρόληψη & Ευεξία / Ψηφιακή Υγεία / Ψυχική Υγεία |
| Commentary & Current Affairs / Commentary | Σχόλιο & Επικαιρότητα / Σχόλιο |
| Evidence Overview / Analysis / Explainer / Public Health Explainer | Επισκόπηση Τεκμηρίων / Ανάλυση / Επεξήγηση / Επεξήγηση Δημόσιας Υγείας |
| On this page / Topic (sidebar) / Related articles | Σε αυτή τη σελίδα / Θέμα / Σχετικά άρθρα |
| Key takeaways / Sources & further reading | Βασικά συμπεράσματα / Πηγές & περαιτέρω ανάγνωση |
| A note from the author / Share this article | Σημείωμα του συγγραφέα / Κοινοποιήστε αυτό το άρθρο |
| "N min read" | "N λεπτά ανάγνωσης" |
| Placeholder — insert verified link | Προσωρινό — εισαγάγετε επαληθευμένο σύνδεσμο |
| Placeholder — replace with a specific verified citation before publishing | Προσωρινό — αντικαταστήστε με συγκεκριμένη επαληθευμένη παραπομπή πριν τη δημοσίευση |

Article titles, cover-image alt text, and homepage/archive excerpt sentences also have standing Greek translations already in place across `index.html`, `articles/index.html`, and each article page — when cross-linking to an existing article (e.g. in a "related articles" block), copy that article's exact EN and EL title/tag/alt text rather than retranslating from scratch.

## SEO and structured data — what's already in place

- **Metadata**: every page has a unique `<title>`, meta description, self-referencing canonical URL (absolute, using the `SITE_URL` placeholder above), `robots` meta (`index, follow` on real pages; `noindex, nofollow` on `404.html` and `articles/_TEMPLATE.html`), Open Graph tags (including `og:site_name`, `og:locale`, and article-specific `article:published_time` / `article:modified_time` / `article:author` / `article:section`), and matching Twitter Card tags.
- **Headings**: every page has exactly one `<h1>`, and heading levels never skip (no `<h2>` straight to `<h4>`). This is checked programmatically — see "Testing" below for how to re-run that check after editing.
- **Structured data (JSON-LD)**: `index.html` declares `WebSite`, `Person` (the author), and `Blog`. Each article declares `BlogPosting` (headline, description, image, author, publisher, `datePublished`/`dateModified`, `articleSection`, canonical `url`) plus a `BreadcrumbList`. `articles/`, `topics.html`, `about.html` (also `ProfilePage`), and `contact.html` (also `ContactPage`) each declare a `BreadcrumbList`. No `Organization` schema is used anywhere — this is a personal project, not a company, and inventing one would misrepresent it. The `Person` entity's `"name"` field is kept in sync with the visible byline/author name throughout (currently "Constantinos Nearchou") — if you ever change the visible name, update both together.
- **Crawlability**: `robots.txt` allows everything and points to `sitemap.xml`. The sitemap lists only the 12 real, published pages — not `404.html` or `articles/_TEMPLATE.html`, which are deliberately excluded.
- **Duplicate-content handling**: the article archive's topic filter (`articles/?topic=...`) is client-side JavaScript, not separate pages, and `articles/` self-canonicalizes to the plain URL — so filtered views are never treated as distinct, competing pages by search engines. Don't add a `Disallow` for `?topic=` in `robots.txt`; that would hide the canonical signal instead of helping it.
- **Internal linking**: topic tags on every article/card link to the filtered archive view, each article has a related-articles section, and every page carries breadcrumbs (visible + JSON-LD).

## What to replace before publishing

This site ships with realistic **sample content** so the design and structure can be evaluated properly — not lorem ipsum, but not verified for publication either. Before this goes live, replace:

- **Author photo**: the name is set (Constantinos Nearchou) across the site and in JSON-LD, and LinkedIn now points to the real profile; the avatar/photo is still a generic placeholder icon (home page, about page, article bylines, contact page) — replace with a real photo before publishing.
- **Email address**: every `hello@example.com` placeholder.
- **About page biography**: the bracketed description of your background, role, and areas of focus — do not invent degrees, qualifications, employers, or experience; write only what's true.
- **Contact page details**: name, email, and location placeholders in the contact info card.
- **Article references**: every reference marked `<span class="ref-placeholder">Placeholder — replace before publishing</span>` needs a verified, real citation before the article is considered publication-ready.
- **Newsletter form**: currently a front-end-only placeholder (see `js/main.js`, `initForms()`); connect a real email provider (e.g. Buttondown, Mailchimp, ConvertKit) before promoting sign-ups.
- **Contact form**: also front-end-only; connect a form backend (e.g. Formspree, Netlify Forms, or a custom endpoint) before relying on it to receive messages.
- **Site domain**: the `SITE_URL` placeholder (`https://www.thepublichealthinsight.example`) used in every canonical tag, Open Graph tag, JSON-LD block, `robots.txt`, and `sitemap.xml` — see "Site configuration" above.
- **X / Twitter link**: on the Contact page, the X/Twitter button is currently shown as disabled/inactive (no account linked yet). Either link it to a real profile or leave it as-is if you don't plan to use X.

### Social preview images (LinkedIn/Facebook) — a known limitation

The `og:image` / `twitter:image` tags currently point to the SVG cover illustrations in `images/`. Most modern crawlers (including LinkedIn's and Facebook's) render SVG previews fine, but support has historically been inconsistent across social platforms. If a preview image doesn't render correctly when you test a real share (see "Testing" below), export PNG versions of the cover images (1200×630px is the safe standard size) and point `og:image`/`twitter:image` at those instead — the SVGs can stay as the in-page `<img>` sources either way.

## Performance notes

- No JS framework, no build step, no external dependencies beyond Google Fonts — the whole site is one ~35KB CSS file and one small JS file.
- Every `<img>` has explicit `width`/`height` (or is inside an `aspect-ratio` container) to prevent layout shift while loading.
- The likely largest-contentful-paint image on each page (article hero images, the homepage featured-article image, the first card in a grid) loads eagerly; everything else below the fold uses `loading="lazy"`.
- `js/main.js` loads with `defer` so it never blocks rendering.
- **Known trade-off**: the Google Fonts stylesheet (`Source Serif 4` + `Inter`) is still loaded via a render-blocking `<link>`, mitigated with `rel="preconnect"` and `&display=swap` (so text renders in a fallback font immediately, then swaps once the webfont loads — no invisible-text delay). Fully eliminating that render-blocking request would mean self-hosting the font files, which trades one dependency for another (font files to manage/update) — a reasonable next step if you later want to squeeze out the last bit of Largest Contentful Paint, but not done here by default.

## Testing this build

A few checks are worth re-running any time you edit metadata, headings, or add a new page:

- **Heading hierarchy / single-H1 check** — run this from the project root (requires Node.js, no packages needed) to confirm every page still has exactly one `<h1>` and no heading-level skips:
  ```bash
  node -e "const fs=require('fs');for(const f of fs.readdirSync('.').filter(x=>x.endsWith('.html')).concat(fs.readdirSync('articles').filter(x=>x.endsWith('.html')&&!x.startsWith('_')).map(x=>'articles/'+x))){const c=fs.readFileSync(f,'utf8').replace(/<script[\s\S]*?<\/script>/g,'');const m=[...c.matchAll(/<h([1-6])[ >]/g)].map(x=>+x[1]);const skips=m.slice(1).filter((v,i)=>v>m[i]+1);console.log(f,'h1s:',m.filter(x=>x===1).length,'skips:',skips.length)}"
  ```
- **JSON-LD validity** — paste any page's `<script type="application/ld+json">` contents into [Google's Rich Results Test](https://search.google.com/test/rich-results) or [Schema.org's validator](https://validator.schema.org/) once the site is hosted (both require a live URL or pasted HTML).
- **Broken links** — with the local server running, click through every nav link, footer link, related-article link, and topic tag at least once after adding new content.
- **Sitemap/robots** — open `http://localhost:8000/sitemap.xml` and `http://localhost:8000/robots.txt` directly in the browser to confirm they load and are well-formed.
- **Responsive layout** — resize the browser (or use dev tools device emulation) across roughly 360px, 390px, 768px, 1024px, and 1440px widths, checking for horizontal scrolling, overlapping text, or cramped touch targets, especially on the mobile nav, article filter chips, and contact form.

## Notes on the sample articles

The seven sample articles are written to model good practice for this blog — clearly separating evidence from analysis and commentary, and marking illustrative references as placeholders rather than presenting them as verified sources. They are a starting template, not verified, publication-ready journalism. Before publishing any of them (or using them as-is), verify every factual claim and replace placeholder references with real, checked sources.
