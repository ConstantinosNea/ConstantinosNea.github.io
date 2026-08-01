import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  getDictionary,
  isLocale,
  localeToHtmlLang,
  locales,
  type Locale,
} from "@/lib/i18n";
import "@/app/globals.css";

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

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeToHtmlLang(locale)}
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
          {dict.skipToContent}
        </a>
        <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-16 pt-0 sm:px-6">
          <Header locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
