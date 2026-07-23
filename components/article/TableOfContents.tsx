"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/mdx";

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="text-xs font-semibold tracking-wide uppercase text-ink-faint">On this page</p>
      <ul className="mt-3 space-y-2.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              style={{ paddingLeft: heading.depth === 3 ? "2rem" : "1rem" }}
              className={cn(
                "block border-l-2 -ml-px text-sm leading-snug transition-colors",
                activeId === heading.id
                  ? "border-accent-strong text-ink font-medium"
                  : "border-transparent text-ink-muted hover:text-ink"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
