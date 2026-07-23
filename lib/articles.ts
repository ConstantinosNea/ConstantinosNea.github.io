import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { ARTICLE_TYPES, CATEGORIES, type Article, type Category } from "./types";
import { calculateReadingTime, wordCount } from "./utils";

const CONTENT_DIR = path.join(process.cwd(), "content/articles");

const frontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  excerpt: z.string(),
  category: z.enum(CATEGORIES as unknown as [Category, ...Category[]]),
  tags: z.array(z.string()).default([]),
  articleType: z.enum(ARTICLE_TYPES),
  author: z.string(),
  publishDate: z.string(),
  updatedDate: z.string().optional(),
  featuredImage: z.string(),
  imageAlt: z.string(),
  featured: z.boolean().optional().default(false),
  popular: z.boolean().optional().default(false),
  references: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  relatedSlugs: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

let articleCache: Article[] | null = null;
let sourceCache: Map<string, string> | null = null;

function loadAll(): { articles: Article[]; sources: Map<string, string> } {
  if (articleCache && sourceCache) {
    return { articles: articleCache, sources: sourceCache };
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const sources = new Map<string, string>();

  const articles = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = frontmatterSchema.parse(data);

    sources.set(frontmatter.slug, content);

    const article: Article = {
      ...frontmatter,
      readingTime: calculateReadingTime(content),
      wordCount: wordCount(content),
    };

    return article;
  });

  articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  articleCache = articles;
  sourceCache = sources;
  return { articles, sources };
}

export function getAllArticles(): Article[] {
  return loadAll().articles;
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticleSource(slug: string): string | undefined {
  return loadAll().sources.get(slug);
}

export function getFeaturedArticle(): Article {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function getLatestArticles(options: { excludeSlug?: string; limit?: number } = {}): Article[] {
  const { excludeSlug, limit } = options;
  const all = getAllArticles().filter((a) => a.slug !== excludeSlug);
  return typeof limit === "number" ? all.slice(0, limit) : all;
}

export function getPopularArticles(limit = 4): Article[] {
  const all = getAllArticles();
  const popular = all.filter((a) => a.popular);
  const pool = popular.length > 0 ? popular : all;
  return pool.slice(0, limit);
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTags(tags: string[]): Article[] {
  return getAllArticles().filter((a) => a.tags.some((t) => tags.includes(t)));
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);

  if (article.relatedSlugs && article.relatedSlugs.length > 0) {
    const explicit = article.relatedSlugs
      .map((slug) => all.find((a) => a.slug === slug))
      .filter((a): a is Article => Boolean(a));
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  const scored = all
    .map((candidate) => {
      let score = 0;
      if (candidate.category === article.category) score += 2;
      score += candidate.tags.filter((t) => article.tags.includes(t)).length;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((s) => s.candidate);

  return scored.slice(0, limit);
}

export function getPrevNextArticles(slug: string): { prev: Article | null; next: Article | null } {
  const all = getAllArticles();
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  };
}

export interface TagCount {
  tag: string;
  count: number;
}

export function getAllTags(): TagCount[] {
  const counts = new Map<string, number>();
  for (const article of getAllArticles()) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export interface CategoryCount {
  category: Category;
  count: number;
}

export function getAllCategories(): CategoryCount[] {
  const counts = new Map<Category, number>();
  for (const article of getAllArticles()) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }
  return CATEGORIES.filter((c) => counts.has(c)).map((category) => ({
    category,
    count: counts.get(category) ?? 0,
  }));
}

