import { Info } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-paper-alt px-5 py-4 text-sm leading-relaxed text-ink-muted">
      <Info size={16} className="mt-0.5 shrink-0 text-ink-faint" />
      <p>
        This article is for informational and educational purposes only and does not constitute medical advice.
        Always consult a qualified healthcare professional regarding individual health decisions. See the{" "}
        <a href="/disclaimer" className="underline underline-offset-2 hover:text-ink">
          full disclaimer
        </a>{" "}
        for more detail.
      </p>
    </div>
  );
}
