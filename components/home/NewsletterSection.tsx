import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="border-t border-border bg-paper-alt/50 scroll-mt-20">
      <div className="mx-auto max-w-wide px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full border border-border-strong">
            <Mail size={18} className="text-accent-strong" />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-ink sm:text-3xl">
            {siteConfig.newsletter.heading}
          </h2>
          <p className="mt-3 text-ink-muted">{siteConfig.newsletter.description}</p>
          <div className="mt-7 mx-auto max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
