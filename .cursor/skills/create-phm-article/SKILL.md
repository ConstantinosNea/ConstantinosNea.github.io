---
name: create-phm-article
description: >-
  Create or publish bilingual (EN/EL) Health in Blog articles: single HTML,
  thumb/OG images, charts from statistics when sources support them (column,
  bar, pie/share, line, area, combo, callout, and other supported forms —
  choose type for the data and story; real cited data only; never invent
  stats for a chart), at least 4 authoritative sources
  (European and American/international where relevant), topic category only
  (no content-type taxonomy), evidence-led authored voice throughout
  (evidence → interpretation → significance → implication as a flexible
  editorial principle, not a rigid per-section formula; strong closing;
  no labelled opinion box), archive card, counts, JSON-LD, homepage, and
  sitemap. Always run bilingual language/terminology QA treating Greek as a
  natural Public Health adaptation of the English meaning (not a literal
  translation; grammatically correct but translated-sounding Greek fails),
  before an article is finished. Use when writing a new article, translating
  PHM content, regenerating/rewriting copy, or when the user says they
  drag-and-dropped an article and need listings updated.
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
| Topic | one `data-topic` from [reference.md](reference.md) — topic/category only; do **not** assign a content type |
| Titles / subtitle / excerpt | EN + EL |
| Date | ISO `YYYY-MM-DD` |
| Read time | integer minutes |
| Body outline | H2 sections with `id`s for TOC; ensure the outline leaves room for authorial reasoning (not sources-only bullets) — shape and emphasis should fit the topic, not a fixed per-section template |
| Sources | **≥4** authoritative URLs (see Sources gate); else sources-pending only for demos |
| Related articles | up to 3 existing site articles |
| Charts? | If sources provide useful stats — plan chart(s) only when data support a clear visualisation; choose type for the data/story (see Charts section) |

Copy header/footer/share/author chrome from a **live UTF-8** article under `articles/` (prefer the newest published article whose Greek chrome is intact, e.g. `ncds-premature-deaths.html`) or [template.html](template.html). Do **not** invent chrome from a temp dump.

### Epidemiology research support (optional — separate skill)

When the topic needs burden, rates, trends, inequities, surveillance, or careful comparison of estimates, read and follow [../epidemiology-research/SKILL.md](../epidemiology-research/SKILL.md) **before or while** outlining sources/charts. Use its **Article evidence pack** output as input to this skill — then write the article with the **authorial arc** in § Writing voice (evidence remains central; interpretation and implications are still required in the prose).

- **epidemiology-research** owns epi framing, appraisal, and interpretation only
- **This skill** still owns HTML, bilingual QA, chart markup, ≥4 sources gate, and Path B
- Do not let epidemiology-research edit the site or publish; do not re-implement Path A/B there

If epi data are not necessary for the topic, skip that skill and continue here.

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
| Naturalness | Greek reads as if **originally written** by a fluent Greek Public Health writer — **not** a direct or literal EN translation |
| Terminology | Correct Public Health / medical / epi / policy terms in **both** languages |
| Equivalence | Same intended scientific meaning, nuance, qualifications, evidence, and conclusions; no important omissions, distortions, simplifications, or false friends |
| Voice | Evidence-informed and authored **throughout** both languages — interpretation and significance, not only a late closing; keep EN/EL editorial tone aligned without forcing word-for-word mirror; never use a labelled opinion box |

**Greek is an adaptation, not a translation (permanent):**

- English is the reference for **meaning**, evidence, argument, nuance, and level of detail
- Greek must **not** preserve English sentence structure, idioms, or word order when natural Greek would say it differently
- Do **not** aim for sentence-by-sentence resemblance; aim for the **same intellectual content** in natural Greek syntax, flow, and expression
- Grammatically correct Greek that still *feels translated* is a **fail** — rewrite until it sounds authored in Greek
- Do **not** lose, soften, invent, or inflate meaning to make Greek smoother

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

**Review scope:** title, subtitle, lead, takeaways, body, chart captions/labels/alts, medical disclaimer, image `alt`/`data-el-alt`, related-card titles/excerpts, and any mirrored strings in `articles/index.html` / homepage when titles change.

**Pass/fail:** Article is **not** finished until both EN and EL pass. Fix issues in place before Path B (or before reporting done). See also [reference.md](reference.md#bilingual-language--terminology-qa) and `.cursor/rules/article-bilingual-language-qa.mdc`.

### Category (topic only)

Keep the topic consistent across: header topic tag (must be an `<a class="tag">` to `../articles/?topic={{slug}}#topic={{slug}}`, same as sidebar), sidebar topic link, `article:section` / JSON-LD `articleSection`, and archive `data-card-topic`. Labels: [reference.md](reference.md).

**Do not** assign or render a content-type classification (`data-type`, Explainer / Analysis / Evidence Overview / Commentary labels, or equivalent). Topic/category is enough. Distinguish evidence from interpretation **in the prose** (attribute sourced findings; guide the reader through what the evidence means, why it matters, and what public-health implications follow; deepen that arc in the closing), not via a formal type taxonomy or a separate opinion label.

### HTML structure (required order)

1. Head: meta, canonical, OG/Twitter, fonts, `../css/style.css`, BlogPosting + BreadcrumbList JSON-LD
2. Skip link + site header
3. `<article>`: header (breadcrumbs, tags, H1, subtitle, byline with `data-article-slug` **and engaged reader-count markup**), hero media, body + sidebar
4. Body: lead, takeaways, `h2[id]` sections (with data-based charts when sources support them — see below), references (≥4 authoritative sources), author card, share, medical disclaimer
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

### Writing voice (permanent — every article)

Evidence-informed, non-sensational, and **authored** — this is Constantinos Nearchou’s Public Health blog, not an anonymous institutional digest, academic abstract, or policy brief. Evidence remains central and must not be weakened; the reader should still leave knowing **what the evidence shows**, **how the author reads it**, **why it matters**, and **what broader public-health implications follow**.

Distinguish evidence from interpretation **in the prose itself** — not with a bolted-on labelled box. No unfinished citations as sources. Use the **shared site-wide medical disclaimer** from the template (same EN/EL on every article — do not write topic-specific variants).

#### Authorial arc (editorial principle — not a template)

Guide the reader with this compass:

**Evidence → interpretation → significance → implication**

Treat it as an **editorial principle**, not a rigid four-beat formula. Different articles — and different sections within an article — should feel genuinely distinct. Let subject, evidence, and argument decide where interpretation sits, how much weight each element gets, and how the narrative unfolds. Do **not** force every H2 through the same sequence, cadence, or mini-structure.

| Element | What it does | Constraint |
|---------|--------------|------------|
| Evidence | Sourced findings, figures, definitions, method notes | Attribute clearly; no invented numbers |
| Interpretation | What the finding means in public-health terms | Grounded in the cited evidence; mark uncertainty |
| Significance | Why this deserves attention (scale, inequity, preventability, system failure, etc.) | Not hype; not unsupported moralising |
| Implication | What follows for practice, policy, systems, or how we frame the problem | Inference, not new factual claims |

Across the piece as a whole (lead, body, closing), the reader should encounter all four kinds of thinking — but **not** as a repeating checklist. Some sections may stay closer to evidence and limits; others may lean into significance or implication. What fails is stacking agency/study summaries and saving almost all interpretation for the end — even if that closing is strong.

#### Where voice belongs

| Part | Expectation |
|------|-------------|
| Lead / opening | Frame the problem in the author’s public-health lens: what is at stake and why this article exists — still evidence-led, not a hot take. Opening shape may vary by topic |
| Body sections | After presenting sourced material, let interpretation emerge where the argument needs it: what the evidence shows or does not show, what deserves attention, what follows. Do not leave the body as “agency paragraph → next agency paragraph,” and do not impose the same four-step rhythm on every section |
| Takeaways | Capture the article’s authored reading of the evidence (what matters), not only restated statistics — wording and emphasis can vary |
| Closing | **Required culmination** — deepen synthesis, priorities, and implications in a way that fits *this* article. Must not be the *first* place the author’s reasoning appears |

#### How to sound authored (without weakening credibility)

- Prefer **interpretive craft** over stock opinion markers: framing, selective emphasis, critical questions, comparisons the reader should not miss, and clear public-health reasoning.
- First person is fine when natural (“I read…”, “the better test is…”, “the figure I keep returning to…”). Do **not** rely on repetitive “I think…” / “in my opinion…” / «νομίζω…» / «κατά τη γνώμη μου…».
- Keep facts separable from inference: attribute findings to sources; signal when you move from evidence to judgement (“this suggests…”, “the practical test is…”, “what matters more than the headline rate is…”).
- Disagreement with common framings is welcome when grounded in the evidence and stated carefully.
- Tone: serious, professional, accessible to a general audience — recognisably a person writing, **not** an agency report rewritten in softer prose.

#### What must not change

- Quantitative claims stay accurate and sourced
- Methodological caution and limits stay visible where relevant
- ≥4 authoritative sources, charts rules, and bilingual QA remain mandatory
- Do **not** invent facts, inflate certainty, or blur attribution to sound more “opinionated”

#### Labels and layout — do not

Do **not** use a separate bold label such as **Author’s perspective:** / **Οπτική του συγγραφέα:** or *Opinion:* / *Γνώμη:*. Do **not** put judgement in a special box, callout, or differently styled block. Voice lives in ordinary paragraphs.

#### Closing (required, but not the whole of the voice)

A clear authored closing near the end remains **required**. Usually one or two paragraphs that synthesise priorities, the test the author applies, or the implication readers should not miss. Calibrate depth by topic. The closing **complements** voice already present in the body; it does **not** replace body-level interpretation, sources, charts, or the ≥4-sources gate.

#### Pass/fail examples

| Weak (fail) | Strong (pass) |
|-------------|---------------|
| Body is mostly paraphrased WHO/OECD/CDC findings; voice appears only in the last section | Authorial reasoning runs through the piece naturally; structure and emphasis fit the topic rather than a repeated template |
| Restates an agency finding in softer words | States what the author prioritises and why it changes practice, policy, or framing |
| Generic “more research is needed” with no stance | Names a real test or priority when the argument calls for one (budgets, exclusion, quiet prevention, equity, systems capacity, etc.) — not the same stock ending every time |
| Sounds like a briefing note or literature summary | Reads as authored public-health writing a general reader can follow; articles on different topics feel distinct |
| Every section marches through the same four beats in the same order | Flexible narrative: the editorial principle is present overall without predictable section-by-section rhythm |
| Separate **Author’s perspective:** label or opinion box | Continuous editorial voice; closing deepens reasoning already underway |
| “I think” / “in my opinion” as the main signal of voice | Interpretation through framing and reasoning; first person only when it earns its keep |

#### Bilingual voice (EN + EL)

Apply the same authored guidance in **both** languages. In Greek especially:

- Treat Greek as a **natural Public Health adaptation** of the English meaning — not a direct translation
- Preserve correct scientific / PH terminology and full intellectual equivalence
- Prefer natural, idiomatic editorial Greek over EN calques, English word order, or stiff institutional phrasing
- Do not “translate the summary tone” into Greek — write Greek that also interprets and guides
- Keep EN/EL meaning aligned without forcing word-for-word or sentence-by-sentence mirroring
- Grammatically correct but still translated-sounding Greek is a **fail**

This applies to **every article**, across all topic categories. Complete this check before Path B / publish.

### Sources (permanent gate — never skip)

Every article must meet these requirements before it is treated as finished or publishable:

- Every article must use **at least 4 credible sources**.
- Sources should come **only from authoritative and reputable organisations/institutions**, including both **European and American/international sources** where relevant.
- Prefer official public-health bodies, government health agencies, major scientific/medical institutions, and other high-quality primary sources. Avoid weak, commercial, or questionable sources.

**Operational rules:**

| Requirement | Detail |
|-------------|--------|
| Count | ≥4 distinct cited sources in the article References list (real `<ol>` links) |
| Authority | WHO, ECDC, EEA, Eurostat, national ministries/institutes (e.g. CDC, NIH, NHS, RKI), OECD, UN agencies, peer-reviewed journals, official statistical offices — not blogs, SEO health sites, press-release-only outlets, or vendor marketing |
| Geography | Include European **and** American/international authorities when the topic is not strictly one-region; do not rely on a single geography if both are relevant |
| Verification | Live, citable URLs; unfinished or unverified citations → sources-pending copy, **not** fake evidence |
| Charts | Every chart figure must be traceable to one of these cited sources |

Demo/template stubs may keep sources-pending; real published articles may **not**. See [reference.md](reference.md#sources).

### Charts and visual data (permanent requirements)

Whenever the available sources provide useful statistics, include **data-based charts or visualisations** where they genuinely improve the article.

**Selection principle (permanent):** Choose the chart type that **best represents the available data and the story being told** — not for visual novelty. Variety across the site is welcome **only** when different data shapes call for different forms.

**Only create a chart when all of the following are true:**

1. Cited sources provide suitable **real** statistics (rates, counts, shares, time series, or clear comparisons)
2. That data **genuinely supports** the chosen visualisation (right shape for the claim)
3. The chart **adds understanding** the prose alone would not convey as clearly

**Never** invent, estimate, interpolate, or reshape numbers just to make a preferred chart type possible. If the sources do not support a chart, skip it.

Decide during outline (before writing HTML):

| Include chart(s) | Skip charts |
|------------------|-------------|
| Sources give clear rates, counts, shares, trends, or comparisons the reader should see | No useful quantitative figures in the cited sources |
| A visualisation clarifies magnitude, gap, composition, or trend better than prose alone | Pure process / how-to with little quantitative claim |
| | Closing interpretation without cited figures (still no invented stats) |

**Supported forms** (use site CSS / inline SVG — see [reference.md](reference.md#charts-from-statistics)):

| Form | Typical use |
|------|-------------|
| **Column chart** (vertical bars) | Few categories, same unit — compare magnitudes |
| **Bar chart** (horizontal) | Same as columns; often better for long labels |
| **Pie / share** | Parts of a whole (few slices; avoid many tiny wedges) |
| **Line chart** | Trend over time (few verified points) |
| **Area chart** | Trend with emphasis on cumulative/volume feel |
| **Combined column + line** | Two related series with different scales/roles (both from cited data) |
| **Callout** | Single standout magnitude |
| **Package / list figure** | Named policy packages (non-quantitative structure) |
| Other existing site patterns | When they fit better than the above |

Rules:

- Use **verified** statistics only; cite the same source in References; **never invent** numbers for a chart
- Prefer **static** markup (HTML/CSS or inline SVG) — no Chart.js / CDN chart libraries
- Match form to data (table above); do **not** default to the same bar or callout pattern on every article when another form fits better
- Add CSS for a new pattern in `css/style.css` when needed; keep it minimal and bilingual-friendly
- Bilingual caption + source line (`data-lang` EN/EL); keep labels short so Greek fits
- Place the chart **inside** the section that discusses those numbers (not in the hero)
- Typically **1–2** charts per article when stats support them; one clear comparison beats a dashboard
- Include an accessible text alternative (`visually-hidden` summary, or `aria-labelledby` + readable values)
- Markup patterns: [reference.md](reference.md#charts-from-statistics)

### After creating

1. Complete the **Sources** gate (≥4 authoritative sources; European + American/international where relevant).
2. Complete the **Charts** check (include data-based visuals only when sources support them; choose type for the data/story; real cited data only — never invent stats for a chart).
3. Complete the **authorial voice** check (reasoning present through the piece **and** a strong closing; flexible structure by topic — not a repeated four-beat formula; not a neutral agency summary with late opinion; no separate **Author’s perspective:** label; evidence standards intact).
4. Complete the **Bilingual language & terminology QA** gate above (EN + EL). Do not publish with known calques, false friends, or meaning drift.
5. Immediately run **Path B** for the new slug (unless the user only wanted a draft file and said not to list it yet).
6. If titles/excerpts/alts changed during QA, sync the same Greek strings on archive/homepage/related cards in Path B.

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

Title EN/EL, excerpt, topic, labels, date, read time, thumb `src`/`alt`/`data-el-alt`, published ISO. Build `data-search-index` with EN+EL keywords.

### B2 — `articles/index.html` (required)

1. Insert archive `<article class="article-card">` as the **first** card in `.card-grid`
2. Update `#results-count` `data-count` + EN/EL "Showing N …" (see [reference.md](reference.md) for Greek forms)
3. Rebuild JSON-LD `numberOfItems` + `itemListElement` newest-first to match card order

Archive card pattern: see existing cards; href is `{slug}.html`; image src is `../images/…`.

### B3 — `sitemap.xml` (required)

Add article `<url>` (`changefreq` yearly, `priority` 0.8). Bump `<lastmod>` on `/` and `/articles/` to today. Do not list templates/404/`articles.html`.

### B4 — Homepage `index.html` (default: yes)

Unless user opts out:

1. Do **not** hardcode a new article as featured. Featured is chosen at runtime by **highest Abacus view count** (`initHomepageFeaturedAndRecent()` in `js/main.js`). Ties break to newest `time[datetime]`.
2. Keep **exactly 3** recent cards in `#recent-articles-grid` as a no-JS fallback (newest-first). Runtime rebuilds them from `articles/`, **excluding** the current most-viewed featured slug (no duplicate).
3. Still add/update the new article’s **archive card** in `articles/index.html` — that card is the source of truth for both Featured (when it leads views) and Recent.

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
- [ ] **If the article body was created or rewritten:** ≥4 credible sources from authoritative organisations; European and American/international sources included where relevant; no weak/commercial/questionable citations
- [ ] **If the article body was created or rewritten:** charts/visualisations added only when cited sources provide suitable real statistics **and** the chart improves understanding; chart type chosen for the data/story (column, bar, pie/share, line, area, combo, callout, or other supported form — not novelty); figures use real cited data only — never invent or reshape numbers for a chart type
- [ ] **If the article body/titles were created or rewritten:** bilingual language & terminology QA passed for EN and EL (natural Greek, correct PH terms, meaning equivalence); listing cards use the same corrected titles/excerpts/alts
- [ ] **If the article body was created or rewritten:** authored voice present throughout as an editorial principle (evidence, interpretation, significance, implication) without forcing the same section-by-section formula; closing deepens rather than debuts that voice; evidence claims remain attributed and distinguishable from inference; the piece feels distinct for its topic

### B6 — Report

List files updated and whether featured changed; note missing images.

### Out of scope unless asked

Rewriting related sidebars on older posts; git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>"/push.

## References

- Topics, counts, charts, sources, path table: [reference.md](reference.md)
- Skeleton: [template.html](template.html)
- Live examples: `articles/*.html` (prefer `heatwaves-climate-mortality.html`)
- Epidemiology research (evidence packs only; no publishing): [../epidemiology-research/SKILL.md](../epidemiology-research/SKILL.md)