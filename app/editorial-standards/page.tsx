import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: `The editorial principles behind ${siteConfig.name} — evidence, sourcing, corrections, and how opinion is distinguished from reporting.`,
  alternates: { canonical: `${siteConfig.url}/editorial-standards` },
};

const principles = [
  {
    title: "Evidence over sensationalism",
    body: "I prioritise peer-reviewed research, official statistics, and primary institutional sources over secondary reporting, and I avoid headlines or framing designed to provoke alarm rather than inform.",
  },
  {
    title: "Evidence and opinion are clearly separated",
    body: "Articles distinguish factual reporting and scientific evidence from analysis, interpretation, and personal opinion, using labelled callout sections so readers always know which they're reading.",
  },
  {
    title: "Transparent sourcing",
    body: "Claims that rely on specific data or research are linked to their original source wherever possible, listed in a references section at the end of the article.",
  },
  {
    title: "Corrections are made openly",
    body: "When a factual error is identified, the article is corrected and the update is reflected in its \"last updated\" date. Material corrections are noted transparently rather than silently edited.",
  },
  {
    title: "Conflicts of interest are disclosed",
    body: "If I have a professional, financial, or personal connection relevant to a topic I'm writing about, I disclose it in the article rather than presenting the piece as fully independent.",
  },
  {
    title: "Acknowledging uncertainty and limitations",
    body: "Where evidence is mixed, preliminary, or contested, articles say so explicitly through a dedicated \"what remains uncertain\" section, rather than presenting a false sense of consensus.",
  },
  {
    title: "Responsible health communication",
    body: "Health-related content is written for general understanding and policy context, not as a substitute for medical advice. Articles avoid alarmist framing of individual risk and link to authoritative sources for anyone seeking personal health guidance.",
  },
  {
    title: "Respect for privacy",
    body: "Individuals discussed in articles are treated with care and accuracy, and private or sensitive personal information is not published without clear public-interest justification.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <p className="text-sm font-medium tracking-wide uppercase text-accent-strong">Trust &amp; Standards</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-ink">Editorial Standards</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        {siteConfig.name} is an independent publication. These are the principles that guide how articles are
        researched, written, sourced, and corrected.
      </p>

      <div className="mt-14 space-y-10">
        {principles.map((principle, i) => (
          <div key={principle.title} className="flex gap-5 border-t border-border pt-8">
            <span className="font-serif text-2xl text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-serif text-xl font-semibold text-ink">{principle.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{principle.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-border bg-paper-alt p-6 text-sm leading-relaxed text-ink-muted">
        If you believe an article falls short of these standards — a factual error, a missing disclosure, or a
        source that needs re-examining — please <a href="/contact" className="text-accent-strong underline">get in touch</a>.
        Feedback like this is read carefully and taken seriously.
      </div>
    </div>
  );
}
