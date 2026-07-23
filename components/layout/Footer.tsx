import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { topics } from "@/lib/topics-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function Footer() {
  const year = new Date().getFullYear();
  const featuredTopics = topics.slice(0, 6);

  return (
    <footer className="border-t border-border bg-paper-alt">
      <div className="mx-auto max-w-wide px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="font-serif text-xl font-semibold text-ink">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Email"
                className="flex size-9 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Topics</h3>
            <ul className="mt-4 space-y-2.5">
              {featuredTopics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/topics/${topic.slug}`} className="text-sm text-ink-muted hover:text-ink">
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="newsletter-footer">
            <h3 className="text-sm font-semibold text-ink">Stay informed</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {siteConfig.newsletter.description}
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-ink-faint hover:text-ink-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
