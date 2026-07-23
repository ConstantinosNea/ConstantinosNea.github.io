import { ListChecks } from "lucide-react";

export function KeyTakeaways({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose rounded-xl border border-border bg-surface px-6 py-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <ListChecks size={16} className="text-accent-strong" />
        Key Takeaways
      </div>
      <div className="mt-3 font-sans text-[0.95rem] leading-relaxed text-ink-muted [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_li]:marker:text-accent">
        {children}
      </div>
    </div>
  );
}
