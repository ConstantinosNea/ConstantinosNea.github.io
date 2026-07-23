import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/types";
import { ArticleMeta } from "./ArticleMeta";

export function NewsAnalysisCard({ article }: { article: Article }) {
  return (
    <article className="group border-b border-border py-7 first:pt-0 last:border-b-0">
      <ArticleMeta publishDate={article.publishDate} readingTime={article.readingTime} />
      <h3 className="mt-2.5 font-serif text-xl font-semibold text-ink text-balance sm:text-2xl">
        <Link href={`/articles/${article.slug}`} className="hover:text-accent-strong transition-colors">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{article.excerpt}</p>
      <Link
        href={`/articles/${article.slug}`}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong opacity-0 transition-opacity group-hover:opacity-100"
      >
        Read analysis <ArrowRight size={13} />
      </Link>
    </article>
  );
}
