import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 627 };
export const contentType = "image/png";

/** Default Open Graph image (generated at build time — works with static export). */
export default function OpenGraphImage() {
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
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: "90%",
          }}
        >
          {siteConfig.title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a3a3a3" }}>
          {siteConfig.description.slice(0, 120)}
        </div>
      </div>
    ),
    { ...size },
  );
}
