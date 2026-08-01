import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return buildMetadata({ noIndex: true });
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return buildMetadata({
    title: dict.about,
    description: `${dict.about} ${siteConfig.name} — ${siteConfig.description}`,
    path: `/${locale}/about/`,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="text-[0.7rem] font-medium tracking-[0.08em] text-zinc-500 uppercase">
          {dict.about}
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="font-serif text-lg leading-relaxed text-zinc-500">
          {siteConfig.description}
        </p>
      </header>

      <div className="space-y-6 font-serif text-[1.0625rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          {dict.aboutBlurb.replace("{name}", siteConfig.name)}{" "}
          <Link
            href={`/${locale}/`}
            className="font-medium text-[#3859e4] underline decoration-[#3859e4]/30 underline-offset-4 hover:decoration-[#3859e4]"
          >
            {dict.archive.toLowerCase()}
          </Link>
          .
        </p>
        <p>
          {dict.preferLinkedIn}{" "}
          <a
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#3859e4] underline decoration-[#3859e4]/30 underline-offset-4 hover:decoration-[#3859e4]"
          >
            {dict.followThere}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
