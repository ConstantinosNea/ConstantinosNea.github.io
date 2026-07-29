import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-5 border-t border-zinc-200 py-16 text-center dark:border-zinc-800">
      <p className="text-[0.7rem] font-medium tracking-[0.08em] text-zinc-500 uppercase">
        404
      </p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Page not found
      </h1>
      <p className="font-serif leading-relaxed text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-full bg-[#3859e4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c46c0]"
      >
        Back to archive
      </Link>
    </div>
  );
}
