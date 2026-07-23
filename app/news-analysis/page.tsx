import type { Metadata } from "next";
import { getArticlesByCategory } from "@/lib/articles";
import { NewsAnalysisCard } from "@/components/articles/NewsAnalysisCard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "News & Analysis",
  description: "Commentary on current health, environment, and policy developments — what happened, why it matters, and what the evidence says.",
  alternates: { canonical: `${siteConfig.url}/news-analysis` },
};

export default function NewsAnalysisPage() {
  const articles = getArticlesByCategory("News & Analysis");

  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">News &amp; Analysis</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Shorter commentary on current developments in health, environment, and policy — what happened, why it
          matters, and what the evidence says. Not a substitute for breaking news, but an attempt to add context
          to it.
        </p>
      </div>

      <div className="mt-12 max-w-3xl">
        {articles.length === 0 ? (
          <p className="text-ink-muted">No news analysis posts yet — check back soon.</p>
        ) : (
          articles.map((article) => <NewsAnalysisCard key={article.slug} article={article} />)
        )}
      </div>
    </div>
  );
}
