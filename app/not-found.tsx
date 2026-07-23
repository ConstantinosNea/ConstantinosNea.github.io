import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-wide flex-col items-center px-6 py-32 text-center">
      <p className="font-serif text-7xl font-semibold text-ink-faint">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you're looking for doesn't exist, may have moved, or the link may be out of date.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/" variant="primary">
          Back to homepage
        </ButtonLink>
        <ButtonLink href="/articles" variant="secondary">
          Browse articles <ArrowRight size={15} />
        </ButtonLink>
      </div>
    </div>
  );
}
