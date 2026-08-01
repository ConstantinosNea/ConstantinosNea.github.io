import Link from "next/link";
import type { CategoryCount } from "@/lib/post-meta";
import type { Locale } from "@/lib/i18n";

type CategoryFilterProps = {
  locale: Locale;
  categories: CategoryCount[];
  activeSlug?: string;
  totalCount: number;
  labels: {
    categories: string;
    all: string;
  };
};

export function CategoryFilter({
  locale,
  categories,
  activeSlug,
  totalCount,
  labels,
}: CategoryFilterProps) {
  const isAll = !activeSlug || activeSlug === "all";
  const homeHref = `/${locale}/`;

  return (
    <nav aria-label={labels.categories} className="border-b border-zinc-200 pb-5">
      <p className="mb-3 text-[0.7rem] font-medium tracking-[0.08em] text-zinc-500 uppercase">
        {labels.categories}
      </p>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={homeHref}
            aria-current={isAll ? "page" : undefined}
            className={
              isAll
                ? "inline-flex items-center gap-1.5 rounded-full bg-[#3859e4] px-3.5 py-1.5 text-[0.8125rem] font-medium text-white"
                : "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            }
          >
            {labels.all}
            <span className={isAll ? "text-white/80" : "text-zinc-400"}>
              {totalCount}
            </span>
          </Link>
        </li>
        {categories.map((category) => {
          const active = activeSlug === category.slug;
          return (
            <li key={category.slug}>
              <Link
                href={`/${locale}/?category=${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "inline-flex items-center gap-1.5 rounded-full bg-[#3859e4] px-3.5 py-1.5 text-[0.8125rem] font-medium text-white"
                    : "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
                }
              >
                {category.name}
                <span className={active ? "text-white/80" : "text-zinc-400"}>
                  {category.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
