import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import { cn } from "@/lib/utils";

function buildHref(current: URLSearchParams, updates: Record<string, string | undefined>) {
  const params = new URLSearchParams(current);
  params.delete("page");
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }
  const query = params.toString();
  return query ? `/articles?${query}` : "/articles";
}

export function ArticleFilters({
  activeCategory,
  activeTag,
  query,
}: {
  activeCategory?: string;
  activeTag?: string;
  query?: string;
}) {
  const base = new URLSearchParams();
  if (query) base.set("q", query);
  if (activeTag) base.set("tag", activeTag);

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(base, { category: undefined })}
        className={cn(
          "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
          !activeCategory
            ? "border-ink bg-ink text-paper"
            : "border-border-strong text-ink-muted hover:border-ink hover:text-ink"
        )}
      >
        All
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={buildHref(base, { category: activeCategory === category ? undefined : category })}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            activeCategory === category
              ? "border-ink bg-ink text-paper"
              : "border-border-strong text-ink-muted hover:border-ink hover:text-ink"
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
