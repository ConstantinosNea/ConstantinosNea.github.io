"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-alt"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper px-6 py-8">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-serif text-xl text-ink hover:bg-paper-alt"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
            <a
              href={siteConfig.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
