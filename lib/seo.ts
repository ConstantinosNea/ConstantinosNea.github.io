import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveImage(image?: string): string {
  if (!image) return absoluteUrl(siteConfig.ogImage);
  if (image.startsWith("http")) return image;
  return absoluteUrl(image);
}

/**
 * Builds Next.js Metadata optimized for LinkedIn, Twitter, and search.
 * LinkedIn prefers ~1200×627 images, clear titles (≤70 chars), and strong descriptions.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = resolveImage(image);

  return {
    metadataBase: new URL(siteConfig.url),
    // Plain segment so root `title.template` can append the site name once.
    title: title ?? siteConfig.title,
    description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: title ?? siteConfig.title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime: modifiedTime ?? publishedTime,
        authors: [siteConfig.author.name],
        tags,
      }),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 627,
          alt: title ?? siteConfig.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.title,
      description,
      creator: siteConfig.author.twitter,
      images: [ogImage],
    },
  };
}
