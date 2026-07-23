import { Lightbulb, FlaskConical, MessageSquareQuote, TriangleAlert, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "evidence" | "analysis" | "opinion" | "caution" | "uncertainty";

const config: Record<CalloutType, { icon: React.ElementType; label: string; classes: string }> = {
  evidence: {
    icon: FlaskConical,
    label: "Scientific Evidence",
    classes: "border-l-emerald-700/60 bg-emerald-700/5 dark:bg-emerald-400/5",
  },
  analysis: {
    icon: Lightbulb,
    label: "Analysis",
    classes: "border-l-accent bg-accent-soft/60",
  },
  opinion: {
    icon: MessageSquareQuote,
    label: "Author's Opinion",
    classes: "border-l-ink-muted bg-paper-alt",
  },
  caution: {
    icon: TriangleAlert,
    label: "Important Caveat",
    classes: "border-l-amber-600/70 bg-amber-600/5 dark:bg-amber-400/10",
  },
  uncertainty: {
    icon: CircleHelp,
    label: "What Remains Uncertain",
    classes: "border-l-ink-faint bg-paper-alt",
  },
};

export function Callout({
  type = "analysis",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, classes } = config[type];

  return (
    <div className={cn("not-prose rounded-r-lg border-l-4 px-5 py-4", classes)}>
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-ink-muted">
        <Icon size={14} />
        {title ?? label}
      </div>
      <div className="mt-2 font-sans text-[0.95rem] leading-relaxed text-ink [&_p]:mt-2 [&_p:first-child]:mt-0">
        {children}
      </div>
    </div>
  );
}
