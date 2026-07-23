import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSource,
  getPrevNextArticles,
  getRelatedArticles,
} from "@/lib/articles";
import { extractHeadings } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleBody } from "@/components/article/ArticleBody";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/article/ShareButtons";
import { AuthorBio } from "@/components/article/AuthorBio";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { PrevNextNav } from "@/components/article/PrevNextNav";
import { Disclaimer } from "@/components/article/Disclaimer";
import { ReferenceList } from "@/components/mdx/ReferenceList";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const url = `${siteConfig.url}/articles/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate ?? article.publishDate,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const source = getArticleSource(slug);

  if (!article || !source) notFound();

  const headings = extractHeadings(source);
  const related = getRelatedArticles(article);
  const { prev, next } = getPrevNextArticles(slug);
  const url = `${siteConfig.url}/articles/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}${article.featuredImage}`,
    datePublished: article.publishDate,
    dateModified: article.updatedDate ?? article.publishDate,
    author: { "@type": "Person", name: article.author, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.author.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteConfig.url}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="mx-auto max-w-wide px-6 py-4">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="mx-auto w-full max-w-content lg:mx-0">
            <ArticleHeader article={article} />

            <div className="mt-10 flex items-center justify-between border-b border-border pb-6">
              <p className="text-sm text-ink-faint">Share this article</p>
              <ShareButtons title={article.title} url={url} />
            </div>

            <div className="mt-10">
              <ArticleBody source={source} />
            </div>

            {article.references && article.references.length > 0 && (
              <div className="mt-12">
                <ReferenceList references={article.references} />
              </div>
            )}

            <div className="mt-12">
              <Disclaimer />
            </div>

            <div className="mt-10">
              <AuthorBio />
            </div>

            <div className="mt-12">
              <PrevNextNav prev={prev} next={next} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-wide">
          <RelatedArticles articles={related} />
        </div>
      </article>

      <div className="mt-8">
        <NewsletterSection />
      </div>
    </>
  );
}
