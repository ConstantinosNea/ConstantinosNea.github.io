# Public Health Matters

Evidence-informed public health writing by Constantinos Nearchou.

Static site (HTML/CSS/JS) served from the repository root for [GitHub Pages](https://constantinosnea.github.io/).

## Run locally

From the repository root, start any static file server. Examples:

```bash
npx --yes serve -l 3000
```

or:

```bash
python -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Live site

https://constantinosnea.github.io/

## How to add a new article

1. Copy `_templates/article-template.html` to `articles/your-slug.html`.
2. Replace every `{{TOKEN}}` and fill both EN and EL strings.
3. Remove the `noindex` robots meta once the article is ready to publish.
4. Add the article to `articles/index.html`, the homepage (if featured/recent), and `sitemap.xml`.

The template lives under `_templates/` so it is not listed with published articles. Because this site uses `.nojekyll`, that folder remains reachable by direct URL; the template itself is `noindex` and clearly marked as a development template, and it is excluded from navigation and `sitemap.xml`.

## Notes

- Language preference is stored in `localStorage` under `site-lang` (`en` | `el`).
- Canonical archive URL: `/articles/`. A small `articles.html` shim redirects there with `noindex` for compatibility.
