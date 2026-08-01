import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { formatArchiveDate } from "@/lib/archive";
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import {
  getPostBySlug,
  getPostSlugs,
  getPostUrl,
  slugifyCategory,
} from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale)
      .map((slug) => getPostBySlug(slug, locale))
      .filter((post) => !post.draft)
      .map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) {
    return buildMetadata({ title: "Not found", noIndex: true });
  }
  const locale = localeParam as Locale;

  try {
    const post = getPostBySlug(slug, locale);
    if (post.draft) return buildMetadata({ noIndex: true, title: post.title });

    return buildMetadata({
      title: post.title,
      description: post.description,
      path: getPostUrl(post.slug, locale),
      image: post.ogImage ?? siteConfig.ogImage,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    });
  } catch {
    return buildMetadata({ title: "Not found", noIndex: true });
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  let post;
  try {
    post = getPostBySlug(slug, locale);
  } catch {
    notFound();
  }

  if (post.draft) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale === "el" ? "el" : "en",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${getPostUrl(post.slug, locale)}`,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10 space-y-5 border-b border-zinc-200 pb-10 dark:border-zinc-800">
        <p>
          <Link
            href={`/${locale}/`}
            className="text-[0.8125rem] text-zinc-500 transition-colors hover:text-[#3859e4]"
          >
            {dict.backToArchive}
          </Link>
        </p>

        <h1 className="font-serif text-[2rem] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[2.35rem]">
          {post.title}
        </h1>
        <p className="font-serif text-lg leading-relaxed text-zinc-500">
          {post.description}
        </p>
        <p className="text-[0.7rem] font-medium tracking-[0.06em] text-zinc-500">
          {post.category ? (
            <>
              <Link
                href={`/${locale}/?category=${slugifyCategory(post.category)}`}
                className="text-[#3859e4] uppercase transition-opacity hover:opacity-70"
              >
                {post.category}
              </Link>
              <span aria-hidden="true" className="mx-1.5">
                ·
              </span>
            </>
          ) : null}
          <time dateTime={post.date}>
            {formatArchiveDate(post.date, locale)}
          </time>
          <span aria-hidden="true" className="mx-1.5">
            ·
          </span>
          <span className="uppercase">{siteConfig.author.name}</span>
          <span aria-hidden="true" className="mx-1.5">
            ·
          </span>
          <span className="normal-case tracking-normal">{post.readingTime}</span>
        </p>
      </header>

      {post.coverImage ? (
        <div className="mb-10 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt=""
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      ) : null}

      <div>
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
