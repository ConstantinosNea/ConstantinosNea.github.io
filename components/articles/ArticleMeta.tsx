import { Clock, Calendar } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ArticleMeta({
  publishDate,
  readingTime,
  className,
}: {
  publishDate: string;
  readingTime: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-xs text-ink-faint", className)}>
      <span className="flex items-center gap-1.5">
        <Calendar size={13} />
        <time dateTime={publishDate}>{formatDateShort(publishDate)}</time>
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={13} />
        {readingTime} min read
      </span>
    </div>
  );
}
