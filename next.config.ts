import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (user site: constantinosnea.github.io).
 * No basePath — the site is served from the domain root.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
