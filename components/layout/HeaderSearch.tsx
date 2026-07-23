"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/articles?q=${encodeURIComponent(value.trim())}`);
      setOpen(false);
      setValue("");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search articles"
        className="flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-alt hover:text-ink"
      >
        <Search size={18} />
      </button>
    );
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex items-center gap-1 rounded-full border border-border-strong bg-surface pl-4 pr-1.5 py-1"
    >
      <Search size={16} className="text-ink-faint shrink-0" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles…"
        aria-label="Search articles"
        className="w-36 sm:w-48 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none"
      />
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close search"
        className="flex size-7 items-center justify-center rounded-full text-ink-faint hover:bg-paper-alt hover:text-ink"
      >
        <X size={15} />
      </button>
    </form>
  );
}
