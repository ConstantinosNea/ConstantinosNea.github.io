import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Medical and informational disclaimer for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
  robots: { index: false },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink">Disclaimer</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated: a placeholder date — update before launch.</p>

      <div className="mt-10">
        <LegalNotice />
      </div>

      <div className="article-body">
        <h2>Not medical advice</h2>
        <p>
          Content published on {siteConfig.name} is for informational and educational purposes only. It is not,
          and should not be treated as, medical advice, diagnosis, or treatment. Always seek the advice of a
          qualified physician or other healthcare provider with any questions you may have regarding a medical
          condition. Never disregard professional medical advice or delay seeking it because of something you
          have read on this site.
        </p>

        <h2>Not a substitute for professional judgement</h2>
        <p>
          Articles on policy, environment, and technology reflect independent research and analysis. They are not
          a substitute for professional, legal, financial, or clinical judgement specific to your circumstances.
        </p>

        <h2>Author's background</h2>
        <p>
          {siteConfig.author.name} writes as a researcher and independent analyst, not as a licensed medical
          practitioner. Where an article discusses clinical topics, it does so from a public health, policy, or
          evidence-synthesis perspective, not a clinical one.
        </p>

        <h2>Evidence changes over time</h2>
        <p>
          Scientific and policy understanding evolves. Articles reflect the evidence available and the author's
          analysis at the time of publication (see each article's "last updated" date) and may not reflect the
          most current research at the time you are reading.
        </p>

        <h2>In an emergency</h2>
        <p>
          If you are experiencing a medical emergency, contact your local emergency services immediately. Do not
          rely on this website for emergency guidance.
        </p>
      </div>
    </div>
  );
}
