import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

/**
 * Dynamic Open Graph image sized for LinkedIn link previews (1200×627).
 * Example: /og?title=Writing%20Less%2C%20Shipping%20More
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || siteConfig.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 52 : 64,
            lineHeight: 1.15,
            maxWidth: "90%",
            fontWeight: 500,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#737373",
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
    },
  );
}
