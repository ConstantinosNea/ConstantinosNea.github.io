import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/forms/ContactForm";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.author.name} — professional enquiries, collaborations, research discussions, speaking opportunities, and media enquiries.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-medium tracking-wide uppercase text-accent-strong">Contact</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-ink text-balance">Let&apos;s talk</h1>
          <p className="mt-5 leading-relaxed text-ink-muted">
            I welcome professional enquiries, collaboration proposals, research discussions, speaking
            opportunities, media enquiries, and general feedback on the site. I read every message myself and aim
            to reply within a few working days.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="flex items-center gap-3 text-ink-muted hover:text-ink"
            >
              <Mail size={17} /> {siteConfig.author.email}
            </a>
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink-muted hover:text-ink"
            >
              <LinkedInIcon size={17} /> Connect on LinkedIn
            </a>
          </div>

          <p className="mt-10 max-w-sm text-xs leading-relaxed text-ink-faint">
            This site has no backend — the form below opens your email client with your message pre-filled.
            Nothing is stored or shared. See the <a href="/privacy-policy" className="underline">Privacy Policy</a> for details.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
