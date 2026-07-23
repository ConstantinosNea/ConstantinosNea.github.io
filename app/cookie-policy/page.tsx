import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
  robots: { index: false },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink">Cookie Policy</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated: a placeholder date — update before launch.</p>

      <div className="mt-10">
        <LegalNotice />
      </div>

      <div className="article-body">
        <h2>What are cookies</h2>
        <p>
          Cookies are small text files stored on your device that help websites function and, in some cases,
          collect information about how the site is used.
        </p>

        <h2>Cookies used on this site</h2>
        <p>
          In its current form, this site uses only a strictly necessary cookie or local storage value to remember
          your light/dark theme preference. No advertising or third-party tracking cookies are set by default.
        </p>

        <h2>If analytics are added</h2>
        <p>
          Should analytics tooling (such as a privacy-focused analytics provider) be added in future, this section
          should be updated to describe what is collected, its purpose, and how visitors can opt out.
        </p>

        <h2>Managing cookies</h2>
        <p>
          Most browsers allow you to refuse or delete cookies through their settings. Doing so may affect
          functionality such as theme preference persistence.
        </p>
      </div>
    </div>
  );
}
