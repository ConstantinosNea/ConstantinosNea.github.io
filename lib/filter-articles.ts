import type { Article } from "./types";

/**
 * Pure, filesystem-free filtering logic — safe to import from Client
 * Components. Article search/filtering runs entirely in the browser since
 * this site is statically exported and has no server to read query params
 * against at request time.
 */
export interface ArticleFilterOptions {
  category?: string;
  tag?: string;
  query?: string;
}

export function filterArticleList(articles: Article[], filters: ArticleFilterOptions): Article[] {
  let results = articles;

  if (filters.category) {
    results = results.filter((a) => a.category === filters.category);
  }

  if (filters.tag) {
    results = results.filter((a) => a.tags.includes(filters.tag!));
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.subtitle?.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return results;
}
