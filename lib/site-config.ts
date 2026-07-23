/**
 * Single source of truth for site branding, author identity, and social links.
 * Change the values here to rebrand the entire site — nothing else needs editing.
 */
export const siteConfig = {
  name: "Evidently",
  tagline: "Evidence-based perspectives on health, environment, technology, and the policies shaping our future.",
  shortDescription:
    "An independent publication on public health, environment, health policy, and healthcare innovation.",
  url: "https://constantinosnea.github.io",
  locale: "en_US",

  author: {
    name: "Elena Michaelides",
    role: "Independent Writer & Public Health Researcher",
    bioShort:
      "I write about the evidence, policy, and systems shaping human health — from climate risk to health technology — for readers who want more than headlines.",
    bioLong: [
      "I'm a public health researcher and writer with a background in epidemiology and health systems, interested in how evidence moves — or fails to move — from research into policy and practice.",
      "Evidently started as a way to think in public: to slow down, read the underlying research and policy documents, and write about what they actually say, rather than what a headline implies. I write about public health, environmental health, health policy, and the technologies reshaping healthcare, with an occasional focus on Cyprus and the wider European context.",
      "I'm not a physician, and nothing here is medical advice. My interest is in systems, evidence, and policy — how societies decide what counts as a health priority, how that translates into services and regulation, and where the gaps between evidence and action tend to open up.",
    ],
    email: "hello@evidently.example.com",
    linkedin: "https://www.linkedin.com/in/example-profile",
    location: "Nicosia, Cyprus",
    photo: "/images/author-photo.svg",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Topics", href: "/topics" },
    { label: "News & Analysis", href: "/news-analysis" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  footerLinks: {
    explore: [
      { label: "Articles", href: "/articles" },
      { label: "Topics", href: "/topics" },
      { label: "News & Analysis", href: "/news-analysis" },
      { label: "About", href: "/about" },
    ],
    legal: [
      { label: "Editorial Standards", href: "/editorial-standards" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },

  newsletter: {
    heading: "Occasional analysis, directly to your inbox",
    description:
      "Occasional analysis on health, environment, technology, and policy — directly to your inbox. No noise, no daily emails.",
    privacyNote:
      "By subscribing you agree to receive occasional emails from Evidently. Unsubscribe anytime. See the Privacy Policy for details.",
    // This site is static (built for GitHub Pages), so there is no backend
    // to collect subscribers. Set this to your provider's hosted form
    // action URL (e.g. Buttondown, ConvertKit, Mailchimp all support a
    // plain HTML form POST — no API key needed) to activate the form.
    // Leave empty to show the form in a clearly-labelled "not yet
    // connected" state instead of silently discarding submissions.
    actionUrl: "",
  },
} as const;
