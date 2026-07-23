import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AboutPreview() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-wide px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[auto_1fr]">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-paper-alt sm:size-36">
            <Image src={siteConfig.author.photo} alt={`Portrait of ${siteConfig.author.name}`} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium tracking-wide uppercase text-accent-strong">About the author</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">{siteConfig.author.name}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">{siteConfig.author.bioShort}</p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong hover:underline underline-offset-4"
            >
              More about this project <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
