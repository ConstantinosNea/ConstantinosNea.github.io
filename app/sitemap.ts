import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAllPosts, getPostUrl } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/${locale}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const posts = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${siteConfig.url}${getPostUrl(post.slug, locale)}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticEntries,
    ...posts,
  ];
}
