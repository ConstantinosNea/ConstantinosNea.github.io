import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { topics } from "@/lib/topics-config";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/articles",
  "/topics",
  "/news-analysis",
  "/about",
  "/contact",
  "/editorial-standards",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" || route === "/articles" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteConfig.url}/articles/${article.slug}`,
    lastModified: article.updatedDate ?? article.publishDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const topicEntries: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...articleEntries, ...topicEntries];
}
