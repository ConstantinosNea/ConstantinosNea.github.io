"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Archive" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 -mx-5 mb-8 border-b border-zinc-200/80 bg-white/95 px-5 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 text-zinc-900 transition-opacity hover:opacity-80"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3859e4] text-[0.7rem] font-semibold tracking-tight text-white"
          >
            {siteConfig.initials}
          </span>
          <span className="font-serif text-[0.95rem] font-medium leading-tight tracking-tight sm:text-[1.05rem]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-1 text-[0.8125rem] text-zinc-600 dark:text-zinc-400">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "rounded-full bg-zinc-100 px-3 py-1.5 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                          : "rounded-full px-3 py-1.5 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href={siteConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#3859e4] px-3.5 py-1.5 text-[0.8125rem] font-medium text-white transition-colors hover:bg-[#2c46c0]"
          >
            {siteConfig.subscribeLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
