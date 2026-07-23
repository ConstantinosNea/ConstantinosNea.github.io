import type { TopicConfig } from "./types";

/**
 * Curated topic taxonomy shown on /topics. Each topic maps to one or more
 * article tags — counts and article lists are computed at build time from
 * whatever tags exist in content/articles/*.mdx.
 */
export const topics: TopicConfig[] = [
  {
    slug: "prevention",
    name: "Prevention",
    description:
      "Why preventive care and public health infrastructure remain chronically underfunded compared with treatment — and what that costs societies over time.",
    icon: "ShieldCheck",
    tagMatch: ["prevention"],
  },
  {
    slug: "mental-health",
    name: "Mental Health",
    description:
      "The systems, policies, and social determinants shaping population mental health, and the gap between need and service capacity.",
    icon: "Brain",
    tagMatch: ["mental-health"],
  },
  {
    slug: "climate-change",
    name: "Climate Change",
    description:
      "Climate change as a health issue: heat, extreme weather, shifting disease patterns, and the case for treating it as a public health priority.",
    icon: "Thermometer",
    tagMatch: ["climate-change"],
  },
  {
    slug: "environmental-risks",
    name: "Environmental Risks",
    description:
      "Air quality, pollution, and other environmental exposures, and what the evidence says about their effects on human health.",
    icon: "Wind",
    tagMatch: ["environmental-risks"],
  },
  {
    slug: "healthcare-operations",
    name: "Healthcare Operations",
    description:
      "How health systems are run day to day — capacity planning, workforce, service delivery, and the operational decisions behind the headlines.",
    icon: "Building2",
    tagMatch: ["healthcare-operations"],
  },
  {
    slug: "health-inequalities",
    name: "Health Inequalities",
    description:
      "How access, outcomes, and risk are distributed unevenly across populations, and what drives those gaps.",
    icon: "Scale",
    tagMatch: ["health-inequalities"],
  },
  {
    slug: "digital-health",
    name: "Digital Health",
    description:
      "Digital tools, data, and platforms in healthcare — their promise, their limits, and the governance questions they raise.",
    icon: "Smartphone",
    tagMatch: ["digital-health"],
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    description:
      "AI's expanding role in healthcare delivery, diagnostics, and research, examined with attention to evidence and risk, not hype.",
    icon: "Cpu",
    tagMatch: ["artificial-intelligence"],
  },
  {
    slug: "european-health-policy",
    name: "European Health Policy",
    description:
      "Policy developments from EU institutions and member states, and what they mean in practice for citizens and health systems.",
    icon: "Landmark",
    tagMatch: ["european-health-policy"],
  },
  {
    slug: "cyprus-health",
    name: "Cyprus Health",
    description:
      "Public health and health-system developments in Cyprus, from GESY implementation to climate exposure in the Eastern Mediterranean.",
    icon: "MapPin",
    tagMatch: ["cyprus-health"],
  },
  {
    slug: "sustainability",
    name: "Sustainability",
    description:
      "The intersection of environmental sustainability and health — where climate action and public health goals reinforce one another.",
    icon: "Leaf",
    tagMatch: ["sustainability"],
  },
  {
    slug: "population-health",
    name: "Population Health",
    description:
      "Health outcomes at the level of populations rather than individuals, and the factors — social, environmental, economic — that shape them.",
    icon: "Users",
    tagMatch: ["population-health"],
  },
];

export function getTopicBySlug(slug: string): TopicConfig | undefined {
  return topics.find((t) => t.slug === slug);
}
