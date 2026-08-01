# Public Health Matters

Evidence-informed public health writing by Constantinos Nearchou.

**Live site:** [https://constantinosnea.github.io/](https://constantinosnea.github.io/)  
**Stack:** Next.js App Router + MDX, static export to GitHub Pages (`en` / `el`).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` redirects to `/en/`).

Preview the static export locally:

```bash
npm run build
npm start
```

## Deploy to GitHub Pages

The repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). On every push to `master`/`main` it runs `next build` (`output: 'export'`) and deploys the `out/` folder.

### One-time GitHub settings

1. Push this branch to GitHub (`git push`).
2. Repo **Settings → Pages**:
   - **Source:** GitHub Actions (not “Deploy from a branch”).
3. After the first successful workflow run, the site is live at `https://constantinosnea.github.io/`.

### Manual deploy (optional)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://constantinosnea.github.io npm run build
```

Then upload the contents of `out/` with the Actions workflow (preferred) or any Pages-compatible method. Do **not** serve the repo root HTML anymore — only `out/`.

## MDX posts (EN / EL)

```
content/posts/en/my-article.mdx
content/posts/el/my-article.mdx
```

Same slug in both folders. See [`content/posts/README.md`](content/posts/README.md).

## Notes

- Static export cannot use Next.js middleware or dynamic `/og?title=` routes. Locale root redirect is `app/page.tsx`; default OG image is `app/opengraph-image.tsx`.
- `public/.nojekyll` keeps GitHub Pages from treating `_next` as a Jekyll folder.
- Older static HTML in the repo root is legacy and is **not** what Pages serves once the Actions workflow is active.
