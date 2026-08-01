import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { defaultLocale, type Locale } from "@/lib/i18n";
import {
  getAllCategories,
  type Post,
  type PostFrontmatter,
  type PostMeta,
  type CategoryCount,
} from "@/lib/post-meta";

export type {
  Post,
  PostFrontmatter,
  PostMeta,
  CategoryCount,
} from "@/lib/post-meta";

export {
  getAllCategories,
  filterPostsByCategory,
  getPostUrl,
  slugifyCategory,
} from "@/lib/post-meta";

const postsDirectory = path.join(process.cwd(), "content/posts");

function isPublished(data: PostFrontmatter): boolean {
  return !data.draft;
}

function localePostsDir(locale: Locale): string {
  return path.join(postsDirectory, locale);
}

function readPostFile(slug: string, locale: Locale): Post | null {
  const fullPath = path.join(localePostsDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

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

function listSlugsInLocale(locale: Locale): string[] {
  const dir = localePostsDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Slugs for a locale. Non-default locales include English slugs too so
 * mid-migration posts still appear (content falls back to EN when EL is missing).
 */
export function getPostSlugs(locale: Locale = defaultLocale): string[] {
  const localized = listSlugsInLocale(locale);
  if (locale === defaultLocale) return localized;

  const fallback = listSlugsInLocale(defaultLocale);
  return Array.from(new Set([...localized, ...fallback]));
}

/**
 * Load a post for the given locale.
 * If the locale file is missing (e.g. mid-migration Greek), fall back to English.
 */
export function getPostBySlug(slug: string, locale: Locale = defaultLocale): Post {
  const localized = readPostFile(slug, locale);
  if (localized) return localized;

  if (locale !== defaultLocale) {
    const fallback = readPostFile(slug, defaultLocale);
    if (fallback) return fallback;
  }

  throw new Error(`Post not found: ${slug} (${locale})`);
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

export function getAllPosts(locale: Locale = defaultLocale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => toMeta(getPostBySlug(slug, locale)))
    .filter(isPublished)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllCategoriesFromLocale(
  locale: Locale = defaultLocale,
): CategoryCount[] {
  return getAllCategories(getAllPosts(locale));
}
