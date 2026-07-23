import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-10">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-paper-alt">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 680px, 100vw" />
      </div>
      {caption && <figcaption className="mt-2.5 text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}
