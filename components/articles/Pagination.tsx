import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(page: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return query ? `/articles?${query}` : "/articles";
  }

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors",
          currentPage === 1 ? "pointer-events-none opacity-40" : "hover:border-ink hover:text-ink"
        )}
      >
        <ChevronLeft size={16} />
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm transition-colors",
            page === currentPage ? "bg-ink text-paper" : "text-ink-muted hover:bg-paper-alt hover:text-ink"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors",
          currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:border-ink hover:text-ink"
        )}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
