import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/types";
import { CategoryBadge } from "@/components/articles/CategoryBadge";
import { ArticleMeta } from "@/components/articles/ArticleMeta";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="mx-auto max-w-wide px-6 py-16 sm:py-20">
      <p className="text-sm font-medium tracking-wide uppercase text-ink-faint">Featured</p>
      <article className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <Link href={`/articles/${article.slug}`} className="group relative block aspect-[16/10] overflow-hidden rounded-xl bg-paper-alt">
          <Image
            src={article.featuredImage}
            alt={article.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        <div>
          <CategoryBadge category={article.category} href={`/articles?category=${encodeURIComponent(article.category)}`} />
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink text-balance sm:text-4xl">
            <Link href={`/articles/${article.slug}`} className="hover:text-accent-strong transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{article.excerpt}</p>
          <ArticleMeta publishDate={article.publishDate} readingTime={article.readingTime} className="mt-5" />
          <Link
            href={`/articles/${article.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-strong hover:underline underline-offset-4"
          >
            Read the full article <ArrowRight size={15} />
          </Link>
        </div>
      </article>
    </section>
  );
}
