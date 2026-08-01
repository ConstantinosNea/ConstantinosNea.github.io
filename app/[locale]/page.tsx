import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/archive-view";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return buildMetadata({ noIndex: true });
  const locale = localeParam as Locale;
  return buildMetadata({ path: `/${locale}/` });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const allPosts = getAllPosts(locale);
  const categories = getAllCategories(allPosts);

  return (
    <Suspense fallback={null}>
      <ArchiveView
        locale={locale}
        posts={allPosts}
        categories={categories}
        labels={{
          archive: dict.archive,
          post: dict.post,
          posts: dict.posts,
          inCategory: dict.inCategory,
          noPostsInCategory: dict.noPostsInCategory,
          noPostsYet: dict.noPostsYet,
          latest: dict.latest,
          categories: dict.categories,
          all: dict.all,
        }}
      />
    </Suspense>
  );
}
