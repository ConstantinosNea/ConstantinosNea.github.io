# Design & Technical Decisions

A summary of the choices behind this build, and why.

## Positioning

Tagline: *"Evidence-based perspectives on health, environment, technology, and the policies shaping our future."*
The brand deliberately avoids two clichés for this subject matter: an all-green "eco" palette and a clinical
medical blue. Instead it uses a warm terracotta/copper accent on off-white paper and near-black ink — closer to a
policy journal or research publication than a clinic or newsroom.

## Visual identity

- **Colour:** one accent (terracotta/copper) plus warm neutral paper/ink tones, defined as CSS custom properties
  in `app/globals.css` and re-themed for dark mode via a `.dark` class (toggled by `next-themes`).
- **Type:** Source Serif 4 for headings (editorial, authoritative, comfortable at large sizes) and Inter for UI
  and body copy (neutral, highly legible at small sizes), both loaded via `next/font` (self-hosted, no external
  requests, no layout shift).
- **Article typography:** a dedicated `.article-body` style block (not a generic typography plugin) tuned
  specifically for long-form reading — 68ch measure, 1.75 line-height, serif body text — with hand-built
  components (callouts, pull quotes, data highlights) rather than relying on default Markdown styling.
- **Motion:** limited to short, purposeful transitions (hover states, image scale-on-hover, theme toggle) and
  respects `prefers-reduced-motion` globally.

## Information architecture

The brief describes two overlapping taxonomies (broad "topic areas" and a longer list of specific themes like
"Prevention" or "Cyprus Health"). These were reconciled into two distinct concepts to avoid a confusing, redundant
filter UI:

- **Category** — 8 broad editorial sections, used for primary navigation, badges, and the archive's category
  filter (kept short deliberately, per "do not overcrowd the interface with too many filters").
- **Tags → Topics** — free-form tags on each article; `/topics` is a curated, hand-described view over a subset
  of tags (with icon + explanation + article count), giving the finer-grained taxonomy its own dedicated,
  explorable page without cluttering the main archive filters.

**News & Analysis** is both a category and its own route, with a visually distinct, image-light, compact card
format — deliberately different from the magazine-style cards used for long-form articles elsewhere, so the two
content types read as different at a glance.

## Content architecture (and the CMS migration path)

Articles are `.mdx` files with a Zod-validated frontmatter schema (`lib/articles.ts`). All page components read
through a small set of exported functions (`getAllArticles`, `getArticleBySlug`, `getRelatedArticles`, etc.) — no
component ever touches the filesystem directly. This means the entire content layer can later be swapped for a
headless CMS (Sanity, Contentful, Ghost, Strapi) by reimplementing that one file; no page or component changes.

Article bodies compile via `next-mdx-remote/rsc`, which renders custom components (`Callout`, `PullQuote`,
`DataHighlight`, `Figure`, `KeyTakeaways`) as real React Server Components — this is what lets factual reporting,
scientific evidence, analysis, and opinion be visually distinguished throughout an article, which the brief calls
out as a specific requirement.

## Hosting: static export for GitHub Pages

The site is deployed as a static export (`output: "export"` in `next.config.ts`) to GitHub Pages, per the actual
deployment target — not Vercel. This had real architectural consequences worth noting:

- **No server-rendered search params.** The `/articles` archive's search/filter/pagination logic runs entirely
  client-side (`ArticlesExplorer`, a Client Component reading `useSearchParams()`), operating over the full
  article list that's embedded in the page at build time. With only a handful of articles this is instant and
  needs no external search service; it will comfortably scale to hundreds of articles before a real search index
  would be worth the added complexity.
- **No API routes.** Route Handlers can't run on GitHub Pages, so the contact form opens a pre-filled `mailto:`
  link (validated client-side first) instead of POSTing to a backend, and the newsletter form is wired to POST
  directly to a third-party provider's hosted endpoint (Buttondown/ConvertKit/Mailchimp all support this with no
  API key) — see the README for how to activate it.
- **Per-article static files.** Every article gets its own `articles/<slug>/index.html` via
  `generateStaticParams`, matching the "each article is a separate file" publishing model this repo uses — adding
  an `.mdx` file and pushing is the entire publishing workflow.
- **OG images are generated at build time**, not on-demand, using Next's `ImageResponse` — this also only works
  because each article's OG image route has its own `generateStaticParams`.

## Accessibility & performance

- Skip-to-content link, visible focus rings, semantic landmarks, and labelled form fields throughout.
- Only interactive pieces (nav menu, search, forms, theme toggle, share buttons, table-of-contents scroll-spy) are
  Client Components; everything else is a Server Component, keeping shipped JS minimal.
- All imagery is local (no external image hosts), so there's nothing to break or slow-load from third parties.
