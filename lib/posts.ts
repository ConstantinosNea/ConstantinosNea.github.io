import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

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

function isPublished(data: PostFrontmatter): boolean {
  return !data.draft;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    ogImage: frontmatter.ogImage,
    coverImage: frontmatter.coverImage,
    readingTime: stats.text,
    content,
  };
}

function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    category: post.category,
    tags: post.tags,
    draft: post.draft,
    ogImage: post.ogImage,
    coverImage: post.coverImage,
    readingTime: post.readingTime,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => toMeta(getPostBySlug(slug)))
    .filter(isPublished)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

export type CategoryCount = {
  name: string;
  count: number;
  slug: string;
};

export function slugifyCategory(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Unique categories from published posts, sorted by frequency then name. */
export function getAllCategories(posts: PostMeta[] = getAllPosts()): CategoryCount[] {
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

