"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — no-op.
    }
  }

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on LinkedIn`}
        className="flex size-9 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors hover:border-ink hover:text-ink"
      >
        <LinkedInIcon size={15} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        className="flex items-center gap-2 rounded-full border border-border-strong px-3.5 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
      >
        {copied ? <Check size={14} className="text-accent-strong" /> : <Link2 size={14} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
