import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/articles/ArticleCard";

export function PopularArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-wide px-6 py-16 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Selected &amp; Most Read</h2>
        <p className="mt-3 max-w-2xl text-ink-muted">Articles readers return to most often.</p>
        <div className="mt-10 space-y-10">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="list" />
          ))}
        </div>
      </div>
    </section>
  );
}
