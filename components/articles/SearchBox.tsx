"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "" }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/articles?${params.toString()}`);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
      <label htmlFor="article-search" className="sr-only">
        Search articles
      </label>
      <input
        id="article-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles, topics, tags…"
        className="w-full rounded-full border border-border-strong bg-surface py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus-visible:border-ink"
      />
    </form>
  );
}
