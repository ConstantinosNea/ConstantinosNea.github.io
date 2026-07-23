import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author.name} and ${siteConfig.name} — an independent publication on public health, environment, and health policy.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.role,
      url: `${siteConfig.url}/about`,
      sameAs: [siteConfig.author.linkedin],
    },
  };

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <JsonLd data={personJsonLd} />

      <p className="text-sm font-medium tracking-wide uppercase text-accent-strong">About</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
        Curious about health, systems, and the evidence behind them
      </h1>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-paper-alt">
          <Image src={siteConfig.author.photo} alt={`Portrait of ${siteConfig.author.name}`} fill className="object-cover" />
        </div>
        <div>
          <p className="font-serif text-xl font-semibold text-ink">{siteConfig.author.name}</p>
          <p className="mt-1 text-ink-muted">{siteConfig.author.role}</p>
          <p className="mt-1 text-sm text-ink-faint">{siteConfig.author.location}</p>
        </div>
      </div>

      <div className="article-body mt-12">
        {siteConfig.author.bioLong.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <h2>Why this platform exists</h2>
        <p>
          Most health and environmental reporting is written for one of two audiences: general readers who need a
          simplified headline, or specialists who need the full technical detail. There's less written for people
          who want something in between — enough context and evidence to actually evaluate a claim, without
          needing a background in the field to follow it.
        </p>
        <p>
          {siteConfig.name} is an attempt to write for that middle audience: policy-interested readers,
          professionals adjacent to health and environment, and anyone who wants to understand not just what
          happened, but why it matters and what the evidence actually supports.
        </p>

        <h2>What I write about</h2>
        <ul>
          <li>Public health — prevention, population health, and health system design</li>
          <li>Environmental health — climate change, air quality, and other exposures that affect health outcomes</li>
          <li>Health policy — how decisions get made, funded, and implemented, and what that means for citizens</li>
          <li>Healthcare innovation — digital health and artificial intelligence, evaluated against the evidence rather than the hype</li>
          <li>News analysis — commentary on current developments, with a particular interest in Cyprus and the wider European context</li>
        </ul>

        <h2>My approach to research and writing</h2>
        <p>
          I try to work from primary sources — peer-reviewed research, official statistics, and government or
          institutional publications — rather than relying on secondary summaries. Where I'm offering opinion or
          interpretation rather than reporting established evidence, I try to say so explicitly rather than
          blurring the two. You can read more about these commitments on the{" "}
          <a href="/editorial-standards">Editorial Standards</a> page.
        </p>
        <p>
          I'm a researcher and writer, not a physician, and I don't present this platform as a source of medical
          advice. My interest is in systems, evidence, and policy — the layer above individual clinical care,
          where decisions about funding, regulation, and priority-setting happen. Where a topic touches on
          individual health decisions, I try to be clear about the limits of what general commentary can
          responsibly say.
        </p>

        <h2>Professional interests</h2>
        <p>
          Beyond writing, I'm interested in the practical side of how health systems function: programme and
          project management, healthcare operations, and the operational realities that determine whether good
          policy actually translates into better outcomes. If you're working on something in this space and think
          there's a reason to talk, I'd like to hear from you.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border pt-10">
        <ButtonLink href="/contact" variant="primary">
          Get in touch
        </ButtonLink>
        <a
          href={siteConfig.author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          <LinkedInIcon size={15} /> Connect on LinkedIn
        </a>
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          <Mail size={15} /> {siteConfig.author.email}
        </a>
      </div>
    </div>
  );
}
