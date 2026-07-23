# Evidently

An independent, editorial-style publication on public health, environment, health policy, and healthcare
innovation — built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX, and deployed as a fully static
site to GitHub Pages.

**Live site:** https://constantinosnea.github.io

## Stack

- **Next.js 16** (App Router) + **TypeScript**, statically exported (`output: "export"`) — no server required
- **Tailwind CSS v4** (CSS-first config, see `app/globals.css`)
- **MDX** articles (`content/articles/*.mdx`), parsed with `gray-matter` and compiled with `next-mdx-remote/rsc`
- `next-themes` for light/dark mode, `zod` for form validation, `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build → static site in /out
npm run lint
```

## How the site is deployed

This repo is a GitHub Pages **user site** (`<username>.github.io`), so it's served at the domain root. Every push
to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and publishes the `out/` folder via
GitHub Pages. There is nothing to configure per-article — adding a new `.mdx` file and pushing is enough.

One manual one-time step: in the repo's **Settings → Pages**, set **Build and deployment → Source** to
**GitHub Actions**.

If this project is ever moved to a *project* page instead (`<username>.github.io/repo-name`), uncomment the
`NEXT_PUBLIC_BASE_PATH` line in `.github/workflows/deploy.yml` and update `lib/site-config.ts`'s `url`.

## Adding a new article

See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) — covers frontmatter fields, images, categories/tags,
featuring an article, and the full list of MDX components available in the article body (callouts, pull quotes,
data highlights, figures, tables).

## Project structure

```
app/                    Routes (App Router) — one folder per page
components/
  layout/                Header, footer, mobile nav, theme toggle
  home/                   Homepage sections
  articles/               Article cards, grid, filters, search, pagination
  article/                Article detail page pieces (TOC, share, related, etc.)
  mdx/                    Components usable inside article bodies
  forms/                  Newsletter + contact forms
  ui/                     Small shared primitives
content/articles/*.mdx    All article content — one file per article
lib/
  site-config.ts          Single source of truth for branding/author/social links
  topics-config.ts         The curated /topics taxonomy
  articles.ts              Content data-access layer (reads content/articles)
  types.ts                 Article/category/type definitions
public/images/             Cover illustrations, author photo placeholder
docs/                     Content guide + design decisions
```

## Rebranding

`lib/site-config.ts` is the single file to edit to change the site name, tagline, author bio, email, LinkedIn
link, and navigation — nothing else needs to change.

## Connecting real newsletter/contact backends

This site has no server, so:

- **Newsletter** (`components/forms/NewsletterForm.tsx`): set `siteConfig.newsletter.actionUrl` to your
  provider's hosted form action (Buttondown, ConvertKit, and Mailchimp all support a plain HTML form POST with no
  API key). Until set, the form clearly shows a "not yet connected" state instead of silently discarding
  submissions.
- **Contact form** (`components/forms/ContactForm.tsx`): currently opens the visitor's email client with a
  pre-filled message (no backend needed). To collect submissions server-side instead, point it at a form backend
  such as Formspree or Getform.

## Moving to a headless CMS later

`lib/articles.ts` is the only module that knows articles live in `.mdx` files — every page reads through its
exported functions (`getAllArticles`, `getArticleBySlug`, etc.). Swapping to Sanity/Contentful/Ghost/Strapi later
means reimplementing that one file; no page or component needs to change.

## Design & technical decisions

See [docs/DESIGN_DECISIONS.md](docs/DESIGN_DECISIONS.md).
