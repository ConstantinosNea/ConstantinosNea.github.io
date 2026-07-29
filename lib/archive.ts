import type { PostMeta } from "@/lib/posts";

export type PostMonthGroup = {
  key: string;
  label: string;
  posts: PostMeta[];
};

/** Groups posts by calendar month (newest first), Substack-archive style. */
export function groupPostsByMonth(posts: PostMeta[]): PostMonthGroup[] {
  const groups = new Map<string, PostMonthGroup>();

  for (const post of posts) {
    const date = new Date(post.date);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("en-US", {
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

export function formatArchiveDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(date))
    .toUpperCase();
}
