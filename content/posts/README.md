# MDX posts (Next.js)

Locale folders are the source of truth. One file per language, **same slug**:

```
content/posts/
  en/my-article.mdx
  el/my-article.mdx
```

## Frontmatter

- Translate: `title`, `description`, `category`, and the MDX body
- Keep aligned when possible: `date`, `updated`, `coverImage`, `ogImage`, `tags`
- Never put both languages in one MDX file

## Fallback

If `content/posts/el/{slug}.mdx` is missing, the Next.js app serves the English file so routes do not 404 mid-migration.

## Preview

```bash
npm run dev:next
```

Then open `/en` and `/el` (or `/`, which redirects to `/en`).
