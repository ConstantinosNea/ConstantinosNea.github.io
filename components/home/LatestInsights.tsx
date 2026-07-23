import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/types";
import { ArticleGrid } from "@/components/articles/ArticleGrid";

export function LatestInsights({ articles }: { articles: Article[] }) {
  return (
    <section className="border-t border-border bg-paper-alt/50">
      <div className="mx-auto max-w-wide px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Latest Insights</h2>
          <Link
            href="/articles"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent-strong hover:underline underline-offset-4 sm:flex"
          >
            View all articles <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10">
          <ArticleGrid articles={articles} />
        </div>
        <div className="mt-10 sm:hidden">
          <Link href="/articles" className="flex items-center gap-1.5 text-sm font-medium text-accent-strong">
            View all articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
