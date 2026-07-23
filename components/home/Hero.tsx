import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";

export function Hero({ latestArticleSlug }: { latestArticleSlug: string }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-wide px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide uppercase text-accent-strong">
            {siteConfig.author.role}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl">
            Exploring the forces shaping public health, society, and our environment.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            {siteConfig.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href={`/articles/${latestArticleSlug}`} variant="primary">
              Read the latest article <ArrowRight size={15} />
            </ButtonLink>
            <ButtonLink href="/topics" variant="secondary">
              Explore all insights
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
