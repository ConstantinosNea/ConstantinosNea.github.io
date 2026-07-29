/**
 * Site-wide configuration used for SEO, Open Graph, and layout chrome.
 * Update these values before deploying.
 */
export const siteConfig = {
  name: "Public Health Matters",
  shortName: "PHI",
  initials: "PH",
  title: "Public Health Matters",
  description:
    "Clear, evidence-based writing on public health — what matters, what’s changing, and what it means for you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepublichealthinsight.com",
  locale: "en_US",
  author: {
    name: "Public Health Matters",
    url: "https://thepublichealthinsight.com",
    twitter: "@pubhealthinsight",
    linkedin: "https://www.linkedin.com/in/constantinos-nearchou/",
  },
  /** Shown as primary CTA in the header (Substack-style Subscribe). */
  subscribeUrl: "https://www.linkedin.com/in/constantinos-nearchou/",
  subscribeLabel: "Subscribe",
  /** Default LinkedIn/OG image (1200×627 via /og route). */
  ogImage: "/og",
} as const;

export type SiteConfig = typeof siteConfig;
