export const locales = ["en", "el"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : defaultLocale;
}

/** Swap the locale prefix in a pathname, preserving the rest of the path. */
export function replaceLocaleInPathname(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/");
  // pathname like "/en/about" -> ["", "en", "about"]
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  const rest = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${nextLocale}${rest === "/" ? "" : rest}`;
}

type Dictionary = {
  archive: string;
  about: string;
  subscribe: string;
  categories: string;
  all: string;
  latest: string;
  post: string;
  posts: string;
  inCategory: string;
  noPostsInCategory: string;
  noPostsYet: string;
  backToArchive: string;
  skipToContent: string;
  notFoundKicker: string;
  notFoundTitle: string;
  notFoundBody: string;
  preferLinkedIn: string;
  followThere: string;
  aboutBlurb: string;
  primaryNav: string;
  linkedIn: string;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    archive: "Archive",
    about: "About",
    subscribe: "Subscribe",
    categories: "Categories",
    all: "All",
    latest: "Latest",
    post: "post",
    posts: "posts",
    inCategory: "in",
    noPostsInCategory: "No posts in “{name}” yet.",
    noPostsYet: "No posts yet. Add an MDX file in content/posts/en (and content/posts/el).",
    backToArchive: "← Archive",
    skipToContent: "Skip to content",
    notFoundKicker: "404",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you’re looking for doesn’t exist or was moved.",
    preferLinkedIn: "Prefer LinkedIn?",
    followThere: "Follow along there",
    aboutBlurb:
      "{name} is a writing archive for clear, evidence-based public health insight — explaining what’s happening, why it matters, and what you can do with that knowledge. New posts appear at the top of the",
    primaryNav: "Primary",
    linkedIn: "LinkedIn",
  },
  el: {
    archive: "Αρχείο",
    about: "Σχετικά",
    subscribe: "Εγγραφή",
    categories: "Κατηγορίες",
    all: "Όλα",
    latest: "Πρόσφατα",
    post: "άρθρο",
    posts: "άρθρα",
    inCategory: "στην κατηγορία",
    noPostsInCategory: "Δεν υπάρχουν ακόμη άρθρα στην κατηγορία «{name}».",
    noPostsYet: "Δεν υπάρχουν ακόμη άρθρα. Προσθέστε MDX στο content/posts/en (και content/posts/el).",
    backToArchive: "← Αρχείο",
    skipToContent: "Μετάβαση στο περιεχόμενο",
    notFoundKicker: "404",
    notFoundTitle: "Η σελίδα δεν βρέθηκε",
    notFoundBody: "Η σελίδα που ζητήσατε δεν υπάρχει ή μετακινήθηκε.",
    preferLinkedIn: "Προτιμάτε το LinkedIn;",
    followThere: "Ακολουθήστε εκεί",
    aboutBlurb:
      "Το {name} είναι ένα αρχείο κειμένων για σαφή, τεκμηριωμένη ανάλυση δημόσιας υγείας — εξηγώντας τι συμβαίνει, γιατί έχει σημασία και τι μπορείτε να κάνετε με αυτή τη γνώση. Νέα άρθρα εμφανίζονται στην κορυφή του",
    primaryNav: "Κύριο",
    linkedIn: "LinkedIn",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function localeToHtmlLang(locale: Locale): string {
  return locale === "el" ? "el" : "en";
}

export function localeToOgLocale(locale: Locale): string {
  return locale === "el" ? "el_GR" : "en_US";
}
