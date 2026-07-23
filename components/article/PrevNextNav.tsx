import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/types";

export function PrevNextNav({ prev, next }: { prev: Article | null; next: Article | null }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Article navigation" className="grid grid-cols-1 gap-4 border-y border-border py-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="group flex flex-col rounded-lg p-4 transition-colors hover:bg-paper-alt"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            <ArrowLeft size={13} /> Previous
          </span>
          <span className="mt-2 font-serif text-base font-semibold text-ink group-hover:text-accent-strong">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="group flex flex-col items-end rounded-lg p-4 text-right transition-colors hover:bg-paper-alt"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            Next <ArrowRight size={13} />
          </span>
          <span className="mt-2 font-serif text-base font-semibold text-ink group-hover:text-accent-strong">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
