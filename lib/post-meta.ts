export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  /** Primary category shown in homepage filters. */
  category?: string;
  tags?: string[];
  draft?: boolean;
  /** Absolute or site-relative image URL for LinkedIn / OG previews (1200×627 recommended). */
  ogImage?: string;
  /** Optional archive thumbnail (Substack-style right-rail image). */
  coverImage?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

export type CategoryCount = {
  name: string;
  count: number;
  slug: string;
};

export function slugifyCategory(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0370-\u03ff\u1f00-\u1fff]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

/** Unique categories from published posts, sorted by frequency then name. */
export function getAllCategories(posts: PostMeta[]): CategoryCount[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    if (!post.category) continue;
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: slugifyCategory(name),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function filterPostsByCategory(
  posts: PostMeta[],
  categorySlug?: string,
): PostMeta[] {
  if (!categorySlug || categorySlug === "all") return posts;
  return posts.filter(
    (post) => post.category && slugifyCategory(post.category) === categorySlug,
  );
}

export function getPostUrl(slug: string, locale: string = "en"): string {
  return `/${locale}/blog/${slug}/`;
}
