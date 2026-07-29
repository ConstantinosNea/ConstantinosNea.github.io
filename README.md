# Public Health Matters

This project now serves the **exact** static site from your Claude build (`localhost:8080`).

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The live site files are in [`site/`](site/) — HTML, CSS, JS, images, and articles matching the Claude version.

## Note

The earlier Next.js/MDX prototype remains in `app/`, `content/`, and `components/` if you want it later (`npm run dev:next`). The default `npm run dev` serves the Claude site so the experience matches `http://localhost:8080/` exactly.
