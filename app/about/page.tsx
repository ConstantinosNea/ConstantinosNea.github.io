import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.description}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="text-[0.7rem] font-medium tracking-[0.08em] text-zinc-500 uppercase">
          About
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="font-serif text-lg leading-relaxed text-zinc-500">
          {siteConfig.description}
        </p>
      </header>

      <div className="space-y-6 font-serif text-[1.0625rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          {siteConfig.name} is a writing archive for clear, evidence-based
          public health insight — explaining what&apos;s happening, why it
          matters, and what you can do with that knowledge. New posts appear at
          the top of the{" "}
          <Link href="/" className="font-medium text-[#3859e4] underline decoration-[#3859e4]/30 underline-offset-4 hover:decoration-[#3859e4]">
            archive
          </Link>
          .
        </p>
        <p>
          Prefer LinkedIn?{" "}
          <a
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#3859e4] underline decoration-[#3859e4]/30 underline-offset-4 hover:decoration-[#3859e4]"
          >
            Follow along there
          </a>
          .
        </p>
      </div>
    </article>
  );
}
