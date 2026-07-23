import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderSearch } from "./HeaderSearch";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between px-6">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-ink">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {siteConfig.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-muted transition-colors hover:bg-paper-alt hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <HeaderSearch />
          </div>
          <a
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Evidently on LinkedIn"
            className="hidden md:flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-alt hover:text-ink"
          >
            <LinkedInIcon size={17} />
          </a>
          <ThemeToggle />
          <div className="hidden md:block ml-1">
            <ButtonLink href="/#newsletter" size="sm" variant="primary">
              Subscribe
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
