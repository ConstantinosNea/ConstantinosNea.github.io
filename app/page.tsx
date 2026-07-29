import type { Metadata } from "next";
import { CategoryFilter } from "@/components/category-filter";
import { PostCard } from "@/components/post-card";
import { groupPostsByMonth } from "@/lib/archive";
import {
  filterPostsByCategory,
  getAllCategories,
  getAllPosts,
} from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type HomePageProps = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const { category: categorySlug } = await searchParams;
  const categories = getAllCategories();
  const active = categories.find((c) => c.slug === categorySlug);

  if (!active) return buildMetadata({ path: "/" });

  return buildMetadata({
    title: `${active.name} — Archive`,
    description: `${active.name} posts from ${siteConfig.name}. ${siteConfig.description}`,
    path: `/?category=${active.slug}`,
  });
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category: categorySlug } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories(allPosts);
  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeSlug = activeCategory?.slug;
  const posts = filterPostsByCategory(allPosts, activeSlug);
  const groups = groupPostsByMonth(posts);

  return (
    <div className="space-y-8">
      <section aria-labelledby="home-heading" className="space-y-3">
        <h1
          id="home-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
        >
          {activeCategory ? activeCategory.name : "Archive"}
        </h1>
        <p className="max-w-xl font-serif text-[1.05rem] leading-relaxed text-zinc-500">
          {activeCategory
            ? `${activeCategory.count} ${activeCategory.count === 1 ? "post" : "posts"} in ${activeCategory.name}.`
            : siteConfig.description}
        </p>
      </section>

      {categories.length > 0 ? (
        <CategoryFilter
          categories={categories}
          activeSlug={activeSlug}
          totalCount={allPosts.length}
        />
      ) : null}

      {posts.length === 0 ? (
        <div className="border-t border-zinc-200 py-16 text-center">
          <p className="leading-relaxed text-zinc-500">
            {activeCategory
              ? `No posts in “${activeCategory.name}” yet.`
              : "No posts yet. Add an MDX file in content/posts."}
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-1 flex items-center justify-between gap-4">
            <p className="text-[0.8125rem] font-medium text-zinc-500">Latest</p>
            <p className="text-[0.8125rem] text-zinc-500">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
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
                    <PostCard post={post} />
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
