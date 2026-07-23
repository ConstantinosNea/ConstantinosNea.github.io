export function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <figure className="not-prose my-10 border-y border-border py-8 sm:px-6">
      <blockquote className="font-serif text-2xl leading-snug text-ink text-balance sm:text-[1.75rem]">
        &ldquo;{children}&rdquo;
      </blockquote>
      {cite && <figcaption className="mt-3 text-sm text-ink-muted">— {cite}</figcaption>}
    </figure>
  );
}
