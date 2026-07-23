import Link from "next/link";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryBadge({
  category,
  href,
  className,
}: {
  category: Category;
  href?: string;
  className?: string;
}) {
  const classes = cn(
    "text-xs font-semibold tracking-wide uppercase text-accent-strong",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "hover:underline underline-offset-2")}>
        {category}
      </Link>
    );
  }

  return <span className={classes}>{category}</span>;
}
