import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/**
 * Extracts h2/h3 headings from raw markdown for the table of contents.
 * Uses the same slugger as rehype-slug (applied to the compiled MDX body)
 * so the generated ids match the in-page anchors exactly.
 */
export function extractHeadings(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(source)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim().replace(/[*_`]/g, "");
    entries.push({ id: slugger.slug(text), text, depth });
  }

  return entries;
}
