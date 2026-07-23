"use client";

import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { siteConfig } from "@/lib/site-config";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "success" | "error";

const REASONS: ContactInput["reason"][] = [
  "Professional enquiry",
  "Collaboration",
  "Research discussion",
  "Speaking opportunity",
  "Media enquiry",
  "Feedback",
  "Other",
];

const initialValues = { name: "", email: "", reason: REASONS[0], message: "" };

// This site is static (built for GitHub Pages) and has no backend to
// deliver form submissions. Validated messages are handed off to the
// visitor's own email client via a pre-filled mailto: link. To collect
// submissions server-side instead, point this form at a form backend
// (e.g. Formspree, Getform) and POST to it directly.
function buildMailtoUrl(values: ContactInput) {
  const subject = `[Evidently] ${values.reason} — from ${values.name}`;
  const body = `${values.message}\n\n—\n${values.name}\n${values.email}`;
  const params = new URLSearchParams({ subject, body });
  return `mailto:${siteConfig.author.email}?${params.toString()}`;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const errors: Partial<Record<keyof ContactInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setStatus("error");
      return;
    }

    window.location.href = buildMailtoUrl(result.data);
    setStatus("success");
    setValues(initialValues);
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-border bg-paper-alt p-6" role="status">
        <CircleCheckBig size={20} className="mt-0.5 shrink-0 text-accent-strong" />
        <div>
          <p className="font-medium text-ink">Almost done.</p>
          <p className="mt-1 text-sm text-ink-muted">
            Your email client should now open with this message ready to send. If it didn&apos;t, email{" "}
            <a href={`mailto:${siteConfig.author.email}`} className="underline">
              {siteConfig.author.email}
            </a>{" "}
            directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {fieldErrors.name && <div id="name-error"><FieldError>{fieldErrors.name}</FieldError></div>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {fieldErrors.email && <div id="email-error"><FieldError>{fieldErrors.email}</FieldError></div>}
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason for contact</Label>
        <Select id="reason" value={values.reason} onChange={(e) => update("reason", e.target.value as ContactInput["reason"])}>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          rows={6}
        />
        {fieldErrors.message && <div id="message-error"><FieldError>{fieldErrors.message}</FieldError></div>}
      </div>

      <p className="text-xs leading-relaxed text-ink-faint">
        This site has no backend, so sending opens your email client with the message pre-filled, addressed to{" "}
        {siteConfig.author.email}.
      </p>

      <Button type="submit">Send message</Button>
    </form>
  );
}
