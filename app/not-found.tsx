import Link from "next/link";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { defaultLocale, getDictionary } from "@/lib/i18n";
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
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <body className="min-h-dvh bg-white font-sans text-zinc-900">
        <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col justify-center px-5 py-16 sm:px-6">
          <div className="space-y-5 border-t border-zinc-200 py-16 text-center">
            <p className="text-[0.7rem] font-medium tracking-[0.08em] text-zinc-500 uppercase">
              {dict.notFoundKicker}
            </p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900">
              {dict.notFoundTitle}
            </h1>
            <p className="font-serif leading-relaxed text-zinc-500">
              {dict.notFoundBody}
            </p>
            <Link
              href={`/${defaultLocale}/`}
              className="inline-flex rounded-full bg-[#3859e4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c46c0]"
            >
              {dict.backToArchive}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
