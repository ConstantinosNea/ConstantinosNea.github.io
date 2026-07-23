# Content Guide — Adding an Article

Every article is a single `.mdx` file in `content/articles/`. Nothing else needs to be touched — the archive,
homepage, topics pages, sitemap, and RSS-equivalent listings all read from this folder automatically at build
time.

## 1. Create the file

Add a new file: `content/articles/your-article-slug.mdx`. The filename doesn't have to match the `slug`
frontmatter field, but keeping them identical avoids confusion.

## 2. Frontmatter

Every article starts with a YAML frontmatter block:

```yaml
---
slug: "your-article-slug"
title: "Your Article Title"
subtitle: "An optional one-sentence subtitle shown under the title."
excerpt: "A 1–2 sentence summary used on cards and in meta descriptions."
category: "Public Health"          # see allowed values below
tags: ["prevention", "climate-change"]  # free-form, used for the /topics pages
articleType: "long-form-analysis"  # see allowed values below
author: "Elena Michaelides"
publishDate: "2026-07-23"
updatedDate: "2026-07-25"          # optional — omit if never updated
featuredImage: "/images/covers/public-health.svg"
imageAlt: "Description of the cover image for accessibility"
featured: false                    # set true on ONE article to feature it on the homepage
popular: false                     # set true to include it in "Selected & Most Read"
seoTitle: "Optional override for <title>"
seoDescription: "Optional override for the meta description"
relatedSlugs: ["another-article-slug"]  # optional — otherwise related articles are auto-matched
references:
  - label: "Source name — what it is"
    url: "https://example.com/source"
---
```

**Allowed `category` values:** `Public Health`, `Environmental Health`, `Health Policy`, `Healthcare Systems`,
`Digital Health & AI`, `Research`, `News & Analysis`, `Opinion`.

**Allowed `articleType` values:** `long-form-analysis`, `news-commentary`, `opinion`, `research-explainer`,
`policy-analysis`, `short-insight`.

**Tags** are free text, but if a tag matches one of the curated topics in `lib/topics-config.ts` (e.g.
`prevention`, `climate-change`, `cyprus-health`), the article will automatically show up on that topic's page. To
add a brand-new topic to `/topics`, add an entry to that file.

Reading time and word count are computed automatically from the article body — you don't set them.

## 3. Writing the body

The body is standard Markdown (GitHub-flavoured — tables, strikethrough, etc. all work) plus a set of custom
components for editorial structure. Below is every supported component.

### Headings

Use `##` and `###` — both are automatically picked up by the table of contents (which appears once an article has
3+ headings).

### Callouts

Use these to visually separate evidence, analysis, and opinion — the distinction the brief for this site cares
about most.

```mdx
<Callout type="evidence" title="Scientific Evidence">
A finding backed by cited research.
</Callout>

<Callout type="analysis">
Your interpretation of what the evidence means.
</Callout>

<Callout type="opinion" title="Author's Opinion">
Your personal take — clearly labelled as such.
</Callout>

<Callout type="caution" title="Important Caveat">
A limitation or risk readers should know about.
</Callout>

<Callout type="uncertainty" title="What Remains Uncertain">
What the evidence doesn't yet settle.
</Callout>
```

`type` is one of `evidence | analysis | opinion | caution | uncertainty`. `title` is optional — each type has a
sensible default label.

### Key takeaways

```mdx
<KeyTakeaways>
- First takeaway
- Second takeaway
- Third takeaway
</KeyTakeaways>
```

### Pull quotes

```mdx
<PullQuote cite="Source of the quote">
The quoted text goes here.
</PullQuote>
```

### Data highlights

```mdx
<DataHighlight source="Name of the data source, year">
  <Stat value="42%" label="What this percentage represents" />
  <Stat value="1,000+" label="What this number represents" />
</DataHighlight>
```

Use 1–3 `<Stat>` children. **Important:** `DataHighlight` takes `<Stat>` children, not an array prop — passing a
JS array/object directly as a JSX attribute (e.g. `stats={[...]}`) does not reliably pass through the MDX
compiler used here.

### Figures (images with captions)

```mdx
<Figure
  src="/images/figures/your-image.svg"
  alt="Accessible description of the image"
  caption="Caption shown under the image."
/>
```

### Tables

Standard Markdown tables work directly and are automatically styled and wrapped for horizontal scroll on mobile:

```markdown
| Column A | Column B |
|---|---|
| Value | Value |
```

### References

Don't add a references section manually in the body — list sources in the `references` frontmatter field instead
(see above). The article template renders them automatically in a numbered, linked list at the end.

For a complete worked example using every component together, see
`content/articles/artificial-intelligence-healthcare-systems.mdx`.

## 4. Images

- Cover images live in `public/images/covers/`. The site currently uses one abstract SVG illustration per
  category — reuse an existing one or add a new `.svg` following the same style (warm paper background, terracotta
  accent shapes, no literal photography needed as a placeholder).
- In-article figures live in `public/images/figures/`.
- Always fill in `imageAlt` / `alt` — this is required for accessibility and is enforced by the frontmatter schema
  for cover images.

## 5. Featuring an article

Set `featured: true` on exactly one article to make it the homepage hero feature and the "Featured" block at the
top of `/articles`. If none is marked, the most recent article is used automatically. Set `popular: true` on a
few articles to include them in the homepage's "Selected & Most Read" section.

## 6. Publishing

Commit the new `.mdx` file (and any new images) and push to `main`. The GitHub Actions workflow
(`.github/workflows/deploy.yml`) rebuilds and republishes the whole site automatically — the new article gets its
own static page at `/articles/your-article-slug/`.
