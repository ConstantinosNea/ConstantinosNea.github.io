# Public Health Matters

Evidence-informed public health writing by Constantinos Nearchou.

**Live site:** [https://constantinosnea.github.io/](https://constantinosnea.github.io/)  
**Stack:** Static HTML / CSS / JS (forest-green theme), bilingual EN | ΕΛ.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the static site on every push to `master`/`main`.

### One-time GitHub settings

1. Repo **Settings → Pages** → **Source: GitHub Actions**
2. Push to `master` (or run the workflow manually)
3. Site: https://constantinosnea.github.io/

## Site structure

| Path | Purpose |
|------|---------|
| `index.html` | Home |
| `about.html` | About |
| `topics.html` | Topics |
| `articles/` | Article pages |
| `css/`, `js/`, `images/` | Assets |
