"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/category-filter";
import { PostCard } from "@/components/post-card";
import { groupPostsByMonth } from "@/lib/archive";
import type { Locale } from "@/lib/i18n";
import {
  filterPostsByCategory,
  type CategoryCount,
  type PostMeta,
} from "@/lib/post-meta";
import { siteConfig } from "@/lib/site";

type ArchiveLabels = {
  archive: string;
  post: string;
  posts: string;
  inCategory: string;
  noPostsInCategory: string;
  noPostsYet: string;
  latest: string;
  categories: string;
  all: string;
};

type ArchiveViewProps = {
  locale: Locale;
  posts: PostMeta[];
  categories: CategoryCount[];
  labels: ArchiveLabels;
};

export function ArchiveView({
  locale,
  posts: allPosts,
  categories,
  labels,
}: ArchiveViewProps) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;
  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeSlug = activeCategory?.slug;
  const posts = useMemo(
    () => filterPostsByCategory(allPosts, activeSlug),
    [allPosts, activeSlug],
  );
  const groups = useMemo(
    () => groupPostsByMonth(posts, locale),
    [posts, locale],
  );

  return (
    <div className="space-y-8">
      <section aria-labelledby="home-heading" className="space-y-3">
        <h1
          id="home-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
        >
          {activeCategory ? activeCategory.name : labels.archive}
        </h1>
        <p className="max-w-xl font-serif text-[1.05rem] leading-relaxed text-zinc-500">
          {activeCategory
            ? `${activeCategory.count} ${activeCategory.count === 1 ? labels.post : labels.posts} ${labels.inCategory} ${activeCategory.name}.`
            : siteConfig.description}
        </p>
      </section>

      {categories.length > 0 ? (
        <CategoryFilter
          locale={locale}
          categories={categories}
          activeSlug={activeSlug}
          totalCount={allPosts.length}
          labels={{ categories: labels.categories, all: labels.all }}
        />
      ) : null}

      {posts.length === 0 ? (
        <div className="border-t border-zinc-200 py-16 text-center">
          <p className="leading-relaxed text-zinc-500">
            {activeCategory
              ? labels.noPostsInCategory.replace("{name}", activeCategory.name)
              : labels.noPostsYet}
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-1 flex items-center justify-between gap-4">
            <p className="text-[0.8125rem] font-medium text-zinc-500">
              {labels.latest}
            </p>
            <p className="text-[0.8125rem] text-zinc-500">
              {posts.length} {posts.length === 1 ? labels.post : labels.posts}
              {activeCategory ? ` · ${activeCategory.name}` : null}
            </p>
          </div>

          {groups.map((group, groupIndex) => (
            <section key={group.key} aria-labelledby={`month-${group.key}`}>
              {groupIndex > 0 ? (
                <h2
                  id={`month-${group.key}`}
                  className="mt-8 border-b border-zinc-200 pb-3 font-serif text-xl font-semibold tracking-tight text-zinc-900"
                >
                  {group.label}
                </h2>
              ) : (
                <h2 id={`month-${group.key}`} className="sr-only">
                  {group.label}
                </h2>
              )}
              <ul>
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
