import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
      style={{ colorScheme: "only light", backgroundColor: "#ffffff" }}
    >
      <body
        className="min-h-dvh bg-white font-sans text-zinc-900"
        style={{ backgroundColor: "#ffffff", color: "#18181b" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#3859e4] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-16 pt-0 sm:px-6">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
