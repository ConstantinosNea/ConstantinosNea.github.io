import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink">Terms of Use</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated: a placeholder date — update before launch.</p>

      <div className="mt-10">
        <LegalNotice />
      </div>

      <div className="article-body">
        <h2>Acceptance of terms</h2>
        <p>
          By accessing {siteConfig.name}, you agree to these Terms of Use. If you do not agree, please do not use
          this site.
        </p>

        <h2>Content and intellectual property</h2>
        <p>
          Unless otherwise noted, articles, text, and original graphics on this site are the intellectual property
          of {siteConfig.author.name}. You may share links and short excerpts with attribution and a link back to
          the original article. Reproducing full articles without permission is not permitted.
        </p>

        <h2>No professional advice</h2>
        <p>
          Content on this site is provided for informational and educational purposes only. It does not
          constitute medical, legal, financial, or other professional advice. See the{" "}
          <a href="/disclaimer">Disclaimer</a> for more detail.
        </p>

        <h2>External links</h2>
        <p>
          This site links to external sources and references. Those sites are operated independently, and{" "}
          {siteConfig.name} is not responsible for their content or availability.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Content is provided "as is" without warranties of any kind. To the fullest extent permitted by law,{" "}
          {siteConfig.author.name} is not liable for any damages arising from use of this site or reliance on its
          content.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may be updated periodically. Continued use of the site after changes constitutes acceptance
          of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent via the <a href="/contact">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
