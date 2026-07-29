import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getPostUrl, slugifyCategory } from "@/lib/posts";
import { formatArchiveDate } from "@/lib/archive";
import { siteConfig } from "@/lib/site";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-zinc-200 py-7 last:border-b-0">
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="min-w-0 space-y-2.5">
          {post.category ? (
            <p>
              <Link
                href={`/?category=${slugifyCategory(post.category)}`}
                className="text-[0.7rem] font-medium tracking-[0.08em] text-[#3859e4] uppercase transition-opacity hover:opacity-70"
              >
                {post.category}
              </Link>
            </p>
          ) : null}

          <Link
            href={getPostUrl(post.slug)}
            className="group block space-y-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3859e4] focus-visible:ring-offset-4"
          >
            <h2 className="font-serif text-[1.375rem] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-[#3859e4] sm:text-[1.5rem]">
              {post.title}
            </h2>
            <p className="font-serif text-[1.02rem] leading-relaxed text-zinc-500">
              {post.description}
            </p>
            <p className="pt-1 text-[0.7rem] font-medium tracking-[0.06em] text-zinc-500">
              <time dateTime={post.date}>{formatArchiveDate(post.date)}</time>
              <span aria-hidden="true" className="mx-1.5">
                ·
              </span>
              <span className="uppercase">{siteConfig.author.name}</span>
            </p>
          </Link>
        </div>

        {post.coverImage ? (
          <Link
            href={getPostUrl(post.slug)}
            tabIndex={-1}
            aria-hidden="true"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-zinc-100 sm:aspect-auto sm:h-[88px] sm:w-[132px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
