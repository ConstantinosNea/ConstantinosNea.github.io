import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topics } from "@/lib/topics-config";
import { getArticlesByTags } from "@/lib/articles";
import { TopicIcon } from "@/components/topics/TopicIcon";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Topics",
  description: `Browse ${siteConfig.name} by topic — from prevention and mental health to climate change and digital health policy.`,
  alternates: { canonical: `${siteConfig.url}/topics` },
};

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Topics</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          A closer look at the specific themes this publication returns to most often, from prevention and health
          inequalities to climate change and artificial intelligence.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const count = getArticlesByTags(topic.tagMatch).length;
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
            >
              <TopicIcon name={topic.icon} size={22} className="text-accent-strong" />
              <h2 className="mt-4 font-serif text-lg font-semibold text-ink">{topic.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{topic.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-faint">
                <span>{count === 0 ? "Coming soon" : `${count} ${count === 1 ? "article" : "articles"}`}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:text-accent-strong" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
