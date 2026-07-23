import type { Article } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <p className="text-ink-muted">No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} variant="grid" />
      ))}
    </div>
  );
}
