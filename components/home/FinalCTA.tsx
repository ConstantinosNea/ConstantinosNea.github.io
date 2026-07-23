import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-ink text-paper">
      <div className="mx-auto max-w-wide px-6 py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-lg">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Read, subscribe, or get in touch</h2>
            <p className="mt-3 text-paper/70">
              New analysis on health, environment, and policy is published regularly. Explore the archive, subscribe for
              occasional updates, or connect on LinkedIn.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/articles" variant="secondary" className="!border-paper/30 !text-paper hover:!bg-paper/10 hover:!border-paper/60">
              Explore articles <ArrowRight size={15} />
            </ButtonLink>
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              <LinkedInIcon size={15} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
