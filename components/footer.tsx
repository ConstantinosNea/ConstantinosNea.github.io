import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const dict = getDictionary(locale);

  return (
    <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <p className="text-center text-[0.8125rem] leading-relaxed text-zinc-500">
        © {year} {siteConfig.name}
        <span aria-hidden="true" className="mx-1.5">
          ·
        </span>
        <a
          href={siteConfig.author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          {dict.linkedIn}
        </a>
      </p>
    </footer>
  );
}
