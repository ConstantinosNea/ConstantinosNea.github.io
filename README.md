# Health in Blog

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



## Notes

- Language preference is stored in `localStorage` under `site-lang` (`en` | `el`).
- Canonical archive URL: `/articles/`. A small `articles.html` shim redirects there with `noindex` for compatibility.
