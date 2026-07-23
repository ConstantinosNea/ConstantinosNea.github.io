import { ImageResponse } from "next/og";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? siteConfig.name;
  const category = article?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#fbf8f4",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#1c1810" }}>{siteConfig.name}</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          {category && (
            <div style={{ display: "flex", fontSize: 26, color: "#ae4b25", fontWeight: 600, marginBottom: 20 }}>
              {category.toUpperCase()}
            </div>
          )}
          <div style={{ display: "flex", fontSize: 56, fontWeight: 600, color: "#1c1810", lineHeight: 1.2 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6b6255" }}>{siteConfig.author.name}</div>
      </div>
    ),
    { ...size }
  );
}
