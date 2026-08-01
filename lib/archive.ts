import type { PostMeta } from "@/lib/post-meta";
import type { Locale } from "@/lib/i18n";

export type PostMonthGroup = {
  key: string;
  label: string;
  posts: PostMeta[];
};

function dateLocale(locale: Locale): string {
  return locale === "el" ? "el-GR" : "en-US";
}

/** Groups posts by calendar month (newest first), Substack-archive style. */
export function groupPostsByMonth(
  posts: PostMeta[],
  locale: Locale = "en",
): PostMonthGroup[] {
  const groups = new Map<string, PostMonthGroup>();

  for (const post of posts) {
    const date = new Date(post.date);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat(dateLocale(locale), {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);

    const existing = groups.get(key);
    if (existing) {
      existing.posts.push(post);
    } else {
      groups.set(key, { key, label, posts: [post] });
    }
  }

  return Array.from(groups.values());
}

export function formatArchiveDate(date: string, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(dateLocale(locale), {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase();
}
