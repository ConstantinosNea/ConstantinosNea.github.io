import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { KeyTakeaways } from "./KeyTakeaway";
import { PullQuote } from "./PullQuote";
import { DataHighlight, Stat } from "./DataHighlight";
import { Figure } from "./Figure";

function isExternal(href: string) {
  return /^https?:\/\//.test(href) && !href.includes("evidently.example.com");
}

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => (
    <a
      href={href}
      {...props}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  table: ({ children, ...props }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table {...props}>{children}</table>
    </div>
  ),
  Callout,
  KeyTakeaways,
  PullQuote,
  DataHighlight,
  Stat,
  Figure,
};
