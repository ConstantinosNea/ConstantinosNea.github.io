"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getLocaleFromPathname,
  locales,
  replaceLocaleInPathname,
  type Locale,
} from "@/lib/i18n";

const labels: Record<Locale, string> = {
  en: "EN",
  el: "ΕΛ",
};

type LanguageToggleProps = {
  locale?: Locale;
};

export function LanguageToggle({ locale: localeProp }: LanguageToggleProps) {
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = localeProp ?? getLocaleFromPathname(pathname);

  function switchTo(next: Locale) {
    if (next === current) return;
    let nextPath = replaceLocaleInPathname(pathname, next);
    // Keep trailingSlash consistent with next.config.
    if (!nextPath.endsWith("/")) nextPath = `${nextPath}/`;
    const query = searchParams?.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-zinc-200 bg-white p-0.5 text-[0.7rem] font-medium tracking-wide"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-pressed={active}
            className={
              active
                ? "rounded-full bg-zinc-900 px-2.5 py-1 text-white"
                : "rounded-full px-2.5 py-1 text-zinc-500 transition-colors hover:text-zinc-900"
            }
          >
            {labels[locale]}
          </button>
        );
      })}
    </div>
  );
}
