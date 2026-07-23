import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH to "/your-repo-name" when deploying to a GitHub
// Pages *project* page (https://username.github.io/your-repo-name). Leave
// unset for a custom domain or a user/org page (https://username.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: GitHub Pages serves plain files, with no Node.js server —
  // this produces a fully static `out/` directory (one HTML file per route,
  // including one per article) instead of relying on server rendering.
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // No image optimization server is available on static hosting; images
    // are served as-is. All imagery in this project is local and pre-sized.
    unoptimized: true,
    // Local, self-authored SVG cover illustrations only — safe to allow.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
