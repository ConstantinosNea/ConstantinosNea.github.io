import {
  getFeaturedArticle,
  getLatestArticles,
  getPopularArticles,
  getAllCategories,
} from "@/lib/articles";
import { Hero } from "@/components/home/Hero";
import { FeaturedArticle } from "@/components/home/FeaturedArticle";
import { LatestInsights } from "@/components/home/LatestInsights";
import { TopicSections } from "@/components/home/TopicSections";
import { AboutPreview } from "@/components/home/AboutPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { PopularArticles } from "@/components/home/PopularArticles";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles({ excludeSlug: featured.slug, limit: 6 });
  const popular = getPopularArticles(3).filter((a) => a.slug !== featured.slug);
  const categories = getAllCategories();

  return (
    <>
      <Hero latestArticleSlug={featured.slug} />
      <FeaturedArticle article={featured} />
      <LatestInsights articles={latest} />
      <TopicSections categories={categories} />
      <AboutPreview />
      <NewsletterSection />
      <PopularArticles articles={popular} />
      <FinalCTA />
    </>
  );
}
