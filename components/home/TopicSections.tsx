import Link from "next/link";
import {
  HeartPulse,
  Wind,
  Landmark,
  Building2,
  Cpu,
  FlaskConical,
  Newspaper,
  MessageSquareQuote,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/types";
import type { CategoryCount } from "@/lib/articles";

const CATEGORY_META: Record<Category, { icon: LucideIcon; description: string }> = {
  "Public Health": {
    icon: HeartPulse,
    description: "Population health, prevention, and the systems that keep communities well.",
  },
  "Environmental Health": {
    icon: Wind,
    description: "Climate, air quality, and the environmental exposures that shape human health.",
  },
  "Health Policy": {
    icon: Landmark,
    description: "The decisions, funding, and governance behind how health systems function.",
  },
  "Healthcare Systems": {
    icon: Building2,
    description: "How care is organised, delivered, and managed on the ground.",
  },
  "Digital Health & AI": {
    icon: Cpu,
    description: "Technology's growing role in diagnosis, care delivery, and health data.",
  },
  Research: {
    icon: FlaskConical,
    description: "Explainers grounded in peer-reviewed evidence and primary research.",
  },
  "News & Analysis": {
    icon: Newspaper,
    description: "Commentary on current developments, with evidence and context.",
  },
  Opinion: {
    icon: MessageSquareQuote,
    description: "Considered, clearly labelled perspective on debates that matter.",
  },
};

export function TopicSections({ categories }: { categories: CategoryCount[] }) {
  return (
    <section className="mx-auto max-w-wide px-6 py-16 sm:py-20">
      <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Explore by Topic Area</h2>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Every article fits into one of these areas — browse by the theme most relevant to you.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ category, count }) => {
          const meta = CATEGORY_META[category];
          const Icon = meta.icon;
          return (
            <Link
              key={category}
              href={`/articles?category=${encodeURIComponent(category)}`}
              className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
            >
              <Icon size={22} className="text-accent-strong" />
              <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{category}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{meta.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-faint">
                <span>
                  {count} {count === 1 ? "article" : "articles"}
                </span>
                <ArrowRight size={14} className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent-strong" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
