"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import type { Article } from "@/lib/types";
import { filterArticleList } from "@/lib/filter-articles";
import { ArticleFilters } from "./ArticleFilters";
import { ArticleGrid } from "./ArticleGrid";
import { ArticleCard } from "./ArticleCard";
import { Pagination } from "./Pagination";
import { SearchBox } from "./SearchBox";

const PAGE_SIZE = 9;

export function ArticlesExplorer({
  articles,
  featuredArticle,
}: {
  articles: Article[];
  featuredArticle: Article;
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const isFiltered = Boolean(category || tag || q);
  const allResults = filterArticleList(articles, { category, tag, query: q });
  const featured = !isFiltered && page === 1 ? featuredArticle : null;
  const results = featured ? allResults.filter((a) => a.slug !== featured.slug) : allResults;

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <ArticleFilters activeCategory={category} activeTag={tag} query={q} />
        <SearchBox defaultValue={q} />
      </div>

      {tag && (
        <div className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
          Filtering by tag <span className="font-medium text-ink">#{tag}</span>
          <Link href="/articles" className="flex items-center gap-1 text-accent-strong hover:underline">
            <X size={13} /> Clear
          </Link>
        </div>
      )}

      {featured && (
        <div className="mt-12">
          <p className="text-sm font-medium tracking-wide uppercase text-ink-faint">Featured</p>
          <div className="mt-5">
            <ArticleCard article={featured} variant="list" />
          </div>
        </div>
      )}

      <div className="mt-14">
        {results.length === 0 ? (
          <div className="rounded-xl border border-border bg-paper-alt px-6 py-16 text-center">
            <p className="text-ink-muted">No articles match your search or filters.</p>
            <Link href="/articles" className="mt-3 inline-block text-sm font-medium text-accent-strong hover:underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <ArticleGrid articles={pageResults} />
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} searchParams={{ category, tag, q }} />
    </>
  );
}
