"use client";

import { useId, useState } from "react";
import { CircleCheckBig, Info } from "lucide-react";
import { newsletterSchema } from "@/lib/validations";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = "idle" | "success" | "error" | "not-connected";

const isConnected = siteConfig.newsletter.actionUrl.length > 0;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  function handleSubmit(e: React.FormEvent) {
    setError(null);

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      e.preventDefault();
      setError(result.error.issues[0]?.message ?? "Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!isConnected) {
      e.preventDefault();
      setStatus("not-connected");
      return;
    }

    // Valid submission with a provider configured: let the browser submit
    // the native form POST to siteConfig.newsletter.actionUrl.
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-ink" role="status">
        <CircleCheckBig size={16} className="text-accent-strong" />
        You&apos;re subscribed. Thank you.
      </p>
    );
  }

  return (
    <form action={siteConfig.newsletter.actionUrl || undefined} method="post" onSubmit={handleSubmit} noValidate>
      <div className={cn("flex gap-2", compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row")}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-invalid={status === "error"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="w-full min-w-0 flex-1 rounded-full border border-border-strong bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus-visible:border-ink"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
        >
          Subscribe
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm text-accent-strong">
          {error}
        </p>
      )}
      {status === "not-connected" && (
        <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-ink-faint">
          <Info size={13} className="mt-0.5 shrink-0" />
          This form isn&apos;t connected to an email provider yet — see the README for how to enable it.
        </p>
      )}
      {!compact && status !== "not-connected" && (
        <p className="mt-3 text-xs leading-relaxed text-ink-faint">{siteConfig.newsletter.privacyNote}</p>
      )}
    </form>
  );
}
