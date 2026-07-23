import { TriangleAlert } from "lucide-react";

export function LegalNotice() {
  return (
    <div className="mb-10 flex gap-3 rounded-lg border border-amber-600/30 bg-amber-600/5 px-5 py-4 text-sm leading-relaxed text-ink-muted dark:bg-amber-400/10">
      <TriangleAlert size={16} className="mt-0.5 shrink-0 text-amber-600" />
      <p>
        This is placeholder text intended to demonstrate site structure. It has not been reviewed by a legal
        professional and must be adapted to your jurisdiction and actual data practices before this site is
        launched publicly.
      </p>
    </div>
  );
}
