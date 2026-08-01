import type { Metadata, Viewport } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...buildMetadata(),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/** Root layout stays minimal so `app/[locale]/layout.tsx` can own `html`/`body` + `lang`. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
