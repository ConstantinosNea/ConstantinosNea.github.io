import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles, getFeaturedArticle } from "@/lib/articles";
import { ArticlesExplorer } from "@/components/articles/ArticlesExplorer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Articles",
  description: `All articles from ${siteConfig.name} — evidence-based analysis on public health, environment, policy, and technology.`,
  alternates: { canonical: `${siteConfig.url}/articles` },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();

  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Articles &amp; Insights</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Evidence-based analysis, explainers, and commentary on public health, environment, policy, and healthcare
          innovation.
        </p>
      </div>

      <Suspense>
        <ArticlesExplorer articles={articles} featuredArticle={featured} />
      </Suspense>
    </div>
  );
}
