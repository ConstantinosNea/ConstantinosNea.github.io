import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, RefreshCw } from "lucide-react";
import type { Article } from "@/lib/types";
import { ARTICLE_TYPE_LABELS } from "@/lib/types";
import { CategoryBadge } from "@/components/articles/CategoryBadge";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={article.category} href={`/articles?category=${encodeURIComponent(article.category)}`} />
        <Badge variant="outline">{ARTICLE_TYPE_LABELS[article.articleType]}</Badge>
      </div>

      <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.15] text-ink text-balance sm:text-5xl">
        {article.title}
      </h1>

      {article.subtitle && (
        <p className="mt-4 text-xl leading-relaxed text-ink-muted text-balance">{article.subtitle}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-sm text-ink-muted">
        <span>
          By <span className="font-medium text-ink">{article.author}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
        </span>
        {article.updatedDate && (
          <span className="flex items-center gap-1.5">
            <RefreshCw size={14} />
            Updated <time dateTime={article.updatedDate}>{formatDate(article.updatedDate)}</time>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {article.readingTime} min read
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/articles?tag=${encodeURIComponent(tag)}`}
            className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl bg-paper-alt">
        <Image src={article.featuredImage} alt={article.imageAlt} fill priority sizes="(min-width: 768px) 680px, 100vw" className="object-cover" />
      </div>
    </header>
  );
}
