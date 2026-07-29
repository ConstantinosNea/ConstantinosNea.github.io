import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const linkClassName =
  "font-medium text-[#3859e4] underline decoration-[#3859e4]/30 underline-offset-4 transition-colors hover:decoration-[#3859e4] dark:text-blue-400 dark:decoration-blue-400/30";

function Anchor({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http");

  if (href && !isExternal) {
    return (
      <Link href={href} className={linkClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={linkClassName}
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  h2: (props) => (
    <h2
      className="mt-12 scroll-mt-24 font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-mt-24 font-serif text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-5 font-serif text-[1.125rem] leading-[1.7] text-zinc-800 dark:text-zinc-200" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 font-serif text-[1.125rem] leading-[1.7] text-zinc-800 dark:text-zinc-200"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 font-serif text-[1.125rem] leading-[1.7] text-zinc-800 dark:text-zinc-200"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-zinc-300 pl-5 font-serif text-lg italic leading-relaxed text-zinc-600 dark:border-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.875em] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-8 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-zinc-200 dark:border-zinc-800" />,
  strong: (props) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
};
