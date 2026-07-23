import type { Reference } from "@/lib/types";

export function ReferenceList({ references }: { references: Reference[] }) {
  if (references.length === 0) return null;

  return (
    <section aria-labelledby="references-heading" className="not-prose mt-4">
      <h2 id="references-heading" className="font-serif text-xl font-semibold text-ink scroll-mt-24">
        References &amp; Sources
      </h2>
      <ol className="mt-4 space-y-2.5 border-t border-border pt-4 font-sans text-sm text-ink-muted">
        {references.map((ref, i) => (
          <li key={ref.url} className="flex gap-3">
            <span className="text-ink-faint tabular-nums">{i + 1}.</span>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-strong underline decoration-border-strong underline-offset-2 hover:decoration-accent-strong"
            >
              {ref.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
