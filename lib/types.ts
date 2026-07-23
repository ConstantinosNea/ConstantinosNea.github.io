export const CATEGORIES = [
  "Public Health",
  "Environmental Health",
  "Health Policy",
  "Healthcare Systems",
  "Digital Health & AI",
  "Research",
  "News & Analysis",
  "Opinion",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ARTICLE_TYPES = [
  "long-form-analysis",
  "news-commentary",
  "opinion",
  "research-explainer",
  "policy-analysis",
  "short-insight",
] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  "long-form-analysis": "Long-Form Analysis",
  "news-commentary": "News Commentary",
  opinion: "Opinion",
  "research-explainer": "Research Explainer",
  "policy-analysis": "Policy Analysis",
  "short-insight": "Short Insight",
};

export interface Reference {
  label: string;
  url: string;
}

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: Category;
  tags: string[];
  articleType: ArticleType;
  author: string;
  publishDate: string;
  updatedDate?: string;
  featuredImage: string;
  imageAlt: string;
  featured?: boolean;
  popular?: boolean;
  references?: Reference[];
  relatedSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article extends ArticleFrontmatter {
  readingTime: number;
  wordCount: number;
}

export interface TopicConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
  tagMatch: string[];
}
