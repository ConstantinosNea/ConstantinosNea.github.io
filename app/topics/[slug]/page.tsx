import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { topics, getTopicBySlug } from "@/lib/topics-config";
import { getArticlesByTags } from "@/lib/articles";
import { TopicIcon } from "@/components/topics/TopicIcon";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical: `${siteConfig.url}/topics/${topic.slug}` },
  };
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const articles = getArticlesByTags(topic.tagMatch);

  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <Link href="/topics" className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={14} /> All topics
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft">
          <TopicIcon name={topic.icon} size={22} className="text-accent-strong" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">{topic.name}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">{topic.description}</p>
        </div>
      </div>

      <div className="mt-14">
        {articles.length === 0 ? (
          <div className="rounded-xl border border-border bg-paper-alt px-6 py-16 text-center">
            <p className="text-ink-muted">No articles on this topic yet — check back soon.</p>
          </div>
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </div>
    </div>
  );
}
