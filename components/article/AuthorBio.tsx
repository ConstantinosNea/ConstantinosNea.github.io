import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function AuthorBio() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-paper-alt p-6 sm:flex-row sm:items-start">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-surface">
        <Image src={siteConfig.author.photo} alt={`Portrait of ${siteConfig.author.name}`} fill className="object-cover" />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide uppercase text-ink-faint">Written by</p>
        <h3 className="mt-1 font-serif text-lg font-semibold text-ink">{siteConfig.author.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{siteConfig.author.bioShort}</p>
        <div className="mt-3 flex items-center gap-4">
          <Link href="/about" className="text-sm font-medium text-accent-strong hover:underline underline-offset-4">
            More about the author
          </Link>
          <a
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
          >
            <LinkedInIcon size={14} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
