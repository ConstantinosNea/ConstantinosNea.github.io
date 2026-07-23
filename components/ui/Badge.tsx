import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "neutral" | "outline";

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase",
        variant === "accent" && "bg-accent-soft text-accent-strong",
        variant === "neutral" && "bg-paper-alt text-ink-muted",
        variant === "outline" && "border border-border text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
