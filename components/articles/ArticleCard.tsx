import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { CategoryBadge } from "./CategoryBadge";
import { ArticleMeta } from "./ArticleMeta";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  variant = "grid",
}: {
  article: Article;
  variant?: "grid" | "list";
}) {
  const isList = variant === "list";

  return (
    <article
      className={cn(
        "group",
        isList && "flex flex-col gap-5 sm:flex-row sm:items-start"
      )}
    >
      <Link
        href={`/articles/${article.slug}`}
        className={cn(
          "relative block overflow-hidden rounded-lg bg-paper-alt",
          isList ? "aspect-[16/10] sm:w-64 sm:shrink-0" : "aspect-[16/10] w-full"
        )}
      >
        <Image
          src={article.featuredImage}
          alt={article.imageAlt}
          fill
          sizes={isList ? "256px" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className={cn("flex flex-col", isList ? "flex-1" : "mt-4")}>
        <CategoryBadge category={article.category} href={`/articles?category=${encodeURIComponent(article.category)}`} />
        <h3 className={cn("mt-2 font-serif font-semibold text-ink text-balance", isList ? "text-xl" : "text-lg")}>
          <Link href={`/articles/${article.slug}`} className="hover:text-accent-strong transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className={cn("mt-2 text-ink-muted leading-relaxed", isList ? "text-[15px]" : "text-sm line-clamp-2")}>
          {article.excerpt}
        </p>
        <ArticleMeta publishDate={article.publishDate} readingTime={article.readingTime} className="mt-3" />
      </div>
    </article>
  );
}
