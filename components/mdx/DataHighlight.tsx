import { Children } from "react";
import { cn } from "@/lib/utils";

export function DataHighlight({ children, source }: { children: React.ReactNode; source?: string }) {
  const count = Children.count(children);

  return (
    <div className="not-prose my-8">
      <div
        className={cn(
          "grid gap-6 rounded-xl border border-border bg-paper-alt px-6 py-6",
          count === 1 && "grid-cols-1",
          count === 2 && "grid-cols-2",
          count >= 3 && "grid-cols-2 sm:grid-cols-3"
        )}
      >
        {children}
      </div>
      {source && <p className="mt-2 text-xs text-ink-faint">Source: {source}</p>}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl font-semibold text-accent-strong sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm leading-snug text-ink-muted">{label}</p>
    </div>
  );
}
