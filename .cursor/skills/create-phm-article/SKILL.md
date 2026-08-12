---
name: create-phm-article
description: >-
  Create or publish bilingual (EN/EL) Health in Blog articles: single HTML,
  thumb/OG images, charts from statistics when the theme fits, topic category,
  archive card, counts, JSON-LD, homepage, and sitemap. Always run bilingual
  language/terminology QA (natural Greek, correct PH terms, EN–EL meaning
  equivalence) before an article is finished. Use when writing a new article,
  translating PHM content, regenerating/rewriting copy, or when the user says
  they drag-and-dropped an article and need listings updated.
---

# Create / publish Health in Blog article

This skill covers the full lifecycle in this website repo:

1. **Create** a new bilingual article (HTML + images) directly in `articles/` and `images/`
2. **Publish / wire listings** so it appears in the archive, homepage, and sitemap

## Which path?

| User intent | Path |
|-------------|------|
| "Create an article about …" / draft / translate | **Path A — Create**, then always finish with **Path B** |
| "I drag-and-dropped …" / update listings / references | **Path B — Publish only** (do not rewrite the article body) |

---

# Path A — Create article

Write files **in place** on this site (no separate package folder unless the user asks for one).

### Output files

```
articles/{slug}.html
images/thumb-{image-key}.webp
images/cover-{image-key}-og.png
```

HTML paths must assume the file lives in `articles/` (`../css/`, `../js/`, `../images/`, etc.).

### Before writing

Collect (ask if missing):

| Field | Notes |
|-------|--------|
| `slug` | kebab-case filename, no `.html` |
| `image-key` | short kebab key for assets (may differ from slug) |
| Topic | one `data-topic` from [reference.md](reference.md) |
| Content type | one `data-type` from [reference.md](reference.md) |
| Titles / subtitle / excerpt | EN + EL |
| Date | ISO `YYYY-MM-DD` |
| Read time | integer minutes |
| Body outline | H2 sections with `id`s for TOC |
| Sources | verified URLs only; else sources-pending copy |
| Related articles | up to 3 existing site articles |
| Charts? | If theme fits statistics — plan 1–2 sourced charts (see below) |

Copy header/footer/share/author chrome from a **live UTF-8** article under `articles/` (prefer the newest published article whose Greek chrome is intact, e.g. `ncds-premature-deaths.html`) or [template.html](template.html). Do **not** invent chrome from a temp dump.

### Encoding rules (critical — prevents Greek mojibake)

All site HTML must be saved as **UTF-8 without BOM**.

- **Never** create a chrome reference with PowerShell `git show … > file` / `Out-File` on Windows — that writes **UTF-16 LE** and corrupts Greek when re-copied into articles (nav shows `╬…` garbled text in ΕΛ).
- Prefer reading/copying chrome **directly** from an existing `articles/*.html` file already in the repo (editor / `fs.readFileSync(..., "utf8")` / `Get-Content -Encoding utf8`).
- After writing an article, sanity-check: the file must **not** contain box-drawing mojibake (`╬`) or classic mangled dashes (`ΓÇö`). Nav Greek must read as real words (`Αρχική`, `Άρθρα`, …).
- Article body Greek can be correct while header/footer/share/author chrome is corrupted — always check chrome specifically.

### Bilingual rules (critical)

Every user-facing string:

```html
<span data-lang="en">English</span><span data-lang="el" hidden>Ελληνικά</span>
```

Also set `data-title-en` / `data-title-el` on `<html>`, image `alt` + `data-el-alt`, and `data-el-*` aria/placeholder attributes where the site already uses them.

### Bilingual language & terminology QA (permanent gate — never skip)

Before any article is treated as finished, publishable, or ready after create / regenerate / substantial rewrite, run a **full EN + EL language review**. Listings updates alone (Path B without body rewrite) do not require rewriting Greek, but if Path A or a rewrite touched body/titles/excerpts/alts, this gate is mandatory.

**Standard (both languages must pass):**

| Check | Requirement |
|-------|-------------|
| Grammar & clarity | Correct grammar; clear, coherent, non-awkward prose |
| Naturalness | Greek reads as professional editorial Greek — **not** a literal EN calque |
| Terminology | Correct Public Health / medical / epi / policy terms in **both** languages |
| Equivalence | Same intended scientific meaning; no important omissions, distortions, or false friends |
| Voice | Evidence-informed; keep EN/EL editorial tone aligned without forcing word-for-word mirror |

**Do this in context** — decide the best wording from the passage; do not mechanically swap a fixed phrase list.

**High-risk calques / false friends (always scrutinize):**

| Prefer natural Greek | Avoid / fix when used as EN calque |
|----------------------|-------------------------------------|
| παράγοντας / καθοριστικός παράγοντας / τροφοδοτεί | οδηγός / οδηγοί for causal *driver(s)* |
| δαπάνη από την τσέπη / άμεσες πληρωμές | ιδιωτική δαπάνη for *out-of-pocket* |
| παρεμβάσεις «best buys» / υψηλού αντίκτυπου με καλή σχέση κόστους–οφέλους | καλύτερες αγορές for WHO *best buys* |
| ευημερία (WHO well-being definition) | ευεξία when translating formal *well-being* |
| ανάρρωση (mental health recovery) | ανάκαμψη when MH recovery is meant |
| ανεπάρκεια πόρων / υποχρηματοδότηση | υποστελέχωση πόρων for *under-resourcing* (υποστελέχωση = understaffing) |
| με εστίαση στην Ευρώπη | ευρωκεντρικό for *Europe-focused* (ευρωκεντρικό ≈ Eurocentric) |
| κλινικές κατευθυντήριες γραμμές | truncated «κλινικές κατευθυντήριες» alone |
| PM2.5 (Latin letters) | ΡΜ2.5 (Greek Ρ) |
| προλήψιμος | προλαμβανόμενος when *preventable* is meant |
| προβλήματα ψυχικής υγείας (natural PH Greek) | stiff κατάσταση(εις) ψυχικής υγείας calque |

**Review scope:** title, subtitle, lead, takeaways, body, chart captions/labels/alts, author note, medical disclaimer, image `alt`/`data-el-alt`, related-card titles/excerpts, and any mirrored strings in `articles/index.html` / homepage when titles change.

**Pass/fail:** Article is **not** finished until both EN and EL pass. Fix issues in place before Path B (or before reporting done). See also [reference.md](reference.md#bilingual-language--terminology-qa) and `.cursor/rules/article-bilingual-language-qa.mdc`.

### Category + content type

Keep consistent across: header tags, sidebar `../articles/?topic={{slug}}#topic={{slug}}` (directory URL + hash fallback; never `index.html?topic=`), `article:section` / JSON-LD `articleSection`, and archive `data-card-topic`. Labels: [reference.md](reference.md).

### HTML structure (required order)

1. Head: meta, canonical, OG/Twitter, fonts, `../css/style.css`, BlogPosting + BreadcrumbList JSON-LD
2. Skip link + site header
3. `<article>`: header (breadcrumbs, tags, H1, subtitle, byline with `data-article-slug` **and engaged reader-count markup**), hero media, body + sidebar
4. Body: optional commentary disclaimer, lead, takeaways, `h2[id]` sections (with charts when the theme fits — see below), references, author note, author card, share, medical disclaimer
5. Sidebar TOC + topic link — TOC list is rebuilt at runtime from `.article-body h2[id]` (labels stay in sync); keep a static fallback list in HTML for no-JS.
6. Related section (3 cards)
7. Footer + `../js/main.js`

### Reader counts (permanent — never omit)

This blog **always** counts engaged readers. Implemented in `js/main.js` (`initReaderCounts` / Abacus). Do **not** remove, bypass, or invent a different threshold.

**Rule:** a visit counts only after **more than 25 seconds** of **visible** time on the article page (tab must be visible; time pauses when the tab is hidden). Leaving sooner must not increment. One hit per browser session per slug.

**Required byline markup on every article** (inside `.article-byline`):

```html
<span class="reader-count" data-reader-count data-article-slug="{{SLUG}}" data-reader-hit hidden></span>
```

- `data-article-slug` must match the filename slug (no `.html`)
- `data-reader-hit` is **required on article pages** (listing cards must **not** have `data-reader-hit`; `main.js` injects display-only counts there)
- Keep the span `hidden` initially; JS reveals it when a count is available
- Never delete this span when regenerating/replacing an article

When creating, regenerating, or publishing an article, verify the byline still includes the markup above and that `../js/main.js` remains linked.

URLs:

- Canonical/OG: `https://constantinosnea.github.io/articles/{slug}.html`
- OG image: `https://constantinosnea.github.io/images/cover-{image-key}-og.png`
- Hero: `../images/thumb-{image-key}.webp` (800×500)

### Images

| File | Spec |
|------|------|
| `thumb-{image-key}.webp` | 800×500, calm documentary tone, no text/logos |
| `cover-{image-key}-og.png` | ~1200×630 for OG/Twitter/JSON-LD |

### Writing voice

Evidence-informed, non-sensational. Mark evidence vs opinion for commentary. No unfinished citations as sources. Topic-appropriate medical disclaimer.

### Charts from statistics (when the theme fits)

**When the theme for article FITS add charts based on statistics.**

Decide during outline (before writing HTML):

| Fits — add 1–2 charts | Skip charts |
|-----------------------|-------------|
| Evidence/explainer with clear population rates, deaths, exposure, comparisons, or trends | Pure process / how-to with little quantitative claim |
| Numbers the reader should compare (A vs B, before/after, age groups) | Commentary that is mainly opinion without cited figures |
| Verified source figures available (WHO, EEA, UNICEF, peer-reviewed, official stats) | Only vague or unverified estimates |

Rules:

- Use **verified** statistics only; cite the same source in References; never invent numbers for a chart
- Prefer **static** markup (HTML/CSS bar chart or inline SVG) — no Chart.js / CDN chart libraries
- Bilingual caption + source line (`data-lang` EN/EL); keep labels short so Greek fits
- Place the chart **inside** the section that discusses those numbers (not in the hero)
- Max **1–2** charts per article; one clear comparison beats a dashboard
- Include an accessible text alternative (table with `visually-hidden` or `aria-labelledby` + readable bar values)
- Markup and CSS classes: [reference.md](reference.md#charts-from-statistics)

### After creating

1. Complete the **Bilingual language & terminology QA** gate above (EN + EL). Do not publish with known calques, false friends, or meaning drift.
2. Immediately run **Path B** for the new slug (unless the user only wanted a draft file and said not to list it yet).
3. If titles/excerpts/alts changed during QA, sync the same Greek strings on archive/homepage/related cards in Path B.

---

# Path B — Publish / wire listings

When files are already in `articles/` (created here or drag-and-dropped), update site references. Do **not** rewrite the article body unless asked.

### Trigger phrases

- "I just drag and dropped an article"
- "Update the listings / references / archive / sitemap"
- New `{slug}.html` exists under `articles/` but is missing from `articles/index.html`

### B0 — Identify the article

1. List `articles/*.html` (exclude `index.html`)
2. Find files missing from `articles/index.html` (or use the named slug)
3. Confirm thumb + OG images exist under `images/`; warn if missing

### B1 — Extract metadata from `articles/{slug}.html`

Title EN/EL, excerpt, topic, type, labels, date, read time, thumb `src`/`alt`/`data-el-alt`, published ISO. Build `data-search-index` with EN+EL keywords.

### B2 — `articles/index.html` (required)

1. Insert archive `<article class="article-card">` as the **first** card in `.card-grid`
2. Update `#results-count` `data-count` + EN/EL "Showing N …" (see [reference.md](reference.md) for Greek forms)
3. Rebuild JSON-LD `numberOfItems` + `itemListElement` newest-first to match card order

Archive card pattern: see existing cards; href is `{slug}.html`; image src is `../images/…`.

### B3 — `sitemap.xml` (required)

Add article `<url>` (`changefreq` yearly, `priority` 0.8). Bump `<lastmod>` on `/` and `/articles/` to today. Do not list templates/404/`articles.html`.

### B4 — Homepage `index.html` (default: yes)

Unless user opts out:

1. Replace `.featured-article` with the new article (root paths: `images/…`, `articles/{slug}.html`)
2. Keep **exactly 3** recent cards in `#recent-articles-grid`, newest-first by `time[datetime]`, **excluding** the featured slug (no duplicate). Drop the oldest when inserting.
3. Runtime: `initHomepageRecentArticles()` rebuilds those 3 from `articles/` by publish date, so the archive card is the source of truth — still update the static HTML as a no-JS fallback.

`topics.html` needs no per-article change.

### B5 — Sanity checks

- [ ] CSS/JS paths on article OK
- [ ] Images exist
- [ ] Not `noindex` if public
- [ ] `data-card-topic` matches a filter chip
- [ ] JSON-LD count = archive cards = `data-count`
- [ ] Sitemap has the URL
- [ ] Homepage featured/recent consistent
- [ ] File is UTF-8; no `╬` / `ΓÇö` mojibake in header, footer, share, or author card
- [ ] ΕΛ nav labels are real Greek (`Αρχική`, `Άρθρα`, …), not symbols
- [ ] Byline has `data-reader-count` + `data-article-slug="{slug}"` + `data-reader-hit` (engaged reader counting; 25s visible dwell in `js/main.js`)
- [ ] **If the article body/titles were created or rewritten:** bilingual language & terminology QA passed for EN and EL (natural Greek, correct PH terms, meaning equivalence); listing cards use the same corrected titles/excerpts/alts

### B6 — Report

List files updated and whether featured changed; note missing images.

### Out of scope unless asked

Rewriting related sidebars on older posts; git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>"/push.

## References

- Topics, types, counts, charts, path table: [reference.md](reference.md)
- Skeleton: [template.html](template.html)
- Live examples: `articles/*.html` (prefer `heatwaves-climate-mortality.html`)