/* Public Health Blog — shared front-end behaviour (no dependencies) */

document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initMobileNav();
  initArticleFilters();
  initSearch();
  initCurrentYear();
  initShareLinks();
  initReaderCounts();
});

const LANG_STORAGE_KEY = "site-lang";

function getStoredLang() {
  return localStorage.getItem(LANG_STORAGE_KEY) === "el" ? "el" : "en";
}

function formatSiteDate(iso, lang) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const locale = lang === "el" ? "el-GR" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatReaderLabel(count, lang) {
  const n = Number(count);
  if (!Number.isFinite(n) || n < 0) return null;
  const formatted = n.toLocaleString(lang === "el" ? "el-GR" : "en-US");
  if (lang === "el") {
    return `${formatted} ${n === 1 ? "αναγνώστης" : "αναγνώστες"}`;
  }
  return `${formatted} ${n === 1 ? "reader" : "readers"}`;
}

function applyLocalizedDates(lang) {
  document.querySelectorAll("time[datetime]").forEach((el) => {
    const iso = (el.getAttribute("datetime") || "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return;
    const formatted = formatSiteDate(iso, lang);
    if (formatted) el.textContent = formatted;
  });
}

function refreshReaderLabels(lang) {
  document.querySelectorAll("[data-reader-count]").forEach((el) => {
    const raw = el.getAttribute("data-reader-value-num");
    if (raw === null || raw === "") {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    const label = formatReaderLabel(raw, lang);
    if (!label) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = label;
  });
}

/* EN / EL language toggle: swaps [data-lang] content via the `hidden` attribute
   and persists the choice in localStorage. */
function initLanguageToggle() {
  const TRANSLATED_ATTRS = {
    alt: "data-el-alt",
    "aria-label": "data-el-aria-label",
    placeholder: "data-el-placeholder",
    title: "data-el-title",
  };

  function findViewportAnchor() {
    const header = document.querySelector("header");
    const headerBottom = header
      ? header.getBoundingClientRect().bottom
      : 0;
    const minTop = headerBottom + 2;
    const maxTop = window.innerHeight * 0.6;
    const selectors = [
      ".featured-article",
      ".article-card",
      ".section-heading",
      ".topic-card",
      "main h1",
      "main h2",
      "main h3",
      "article",
      ".about-hero",
      ".editorial-section",
      "main section",
    ];
    let best = null;
    let bestScore = Infinity;
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (!el.getClientRects().length) return;
      if (el.closest("header, a.brand, .lang-toggle")) return;
      const top = el.getBoundingClientRect().top;
      if (top < minTop - 40 || top > maxTop) return;
      const score = Math.abs(top - minTop);
      if (score < bestScore) {
        bestScore = score;
        best = el;
      }
    });
    if (best) return best;
    const x = Math.min(Math.max(window.innerWidth / 2, 24), window.innerWidth - 24);
    const y = Math.min(minTop + 28, window.innerHeight - 8);
    const hit = document.elementsFromPoint(x, y);
    return (
      hit.find(
        (el) =>
          el &&
          el !== document.documentElement &&
          el !== document.body &&
          !el.closest("header, .lang-toggle"),
      ) || null
    );
  }

  function preserveViewportAnchor(anchor, anchorTopBefore) {
    if (!anchor || !document.contains(anchor)) return;
    const delta = anchor.getBoundingClientRect().top - anchorTopBefore;
    if (Math.abs(delta) <= 0.5) return;
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollBy(0, delta);
    root.style.scrollBehavior = prevBehavior;
  }

  function applyLanguage(lang) {
    const atTop = window.scrollY < 1;
    const root = document.documentElement;
    let anchor = null;
    let anchorTop = 0;
    if (!atTop) {
      anchor = findViewportAnchor();
      if (anchor) anchorTop = anchor.getBoundingClientRect().top;
      // Prevent browser scroll anchoring from fighting our compensation.
      root.style.overflowAnchor = "none";
    }

    root.setAttribute("lang", lang);

    document.querySelectorAll("[data-lang]").forEach((el) => {
      // Brand lockup (logo + name + tagline) stays English in both languages.
      if (el.closest("a.brand")) return;
      const match = el.getAttribute("data-lang") === lang;
      // Stacked bilingual slots: both languages stay in layout (taller/wider wins).
      const parent = el.parentElement;
      if (
        parent?.classList.contains("lang-stack") ||
        parent?.classList.contains("header-lang-stack")
      ) {
        el.hidden = false;
        el.classList.toggle("is-lang-active", match);
        el.classList.toggle("is-lang-inactive", !match);
        el.setAttribute("aria-hidden", match ? "false" : "true");
        el.querySelectorAll("a, button, input, select, textarea").forEach((ctrl) => {
          if (match) ctrl.removeAttribute("tabindex");
          else ctrl.setAttribute("tabindex", "-1");
        });
        return;
      }
      el.hidden = !match;
      el.classList.remove("is-lang-active", "is-lang-inactive");
      el.removeAttribute("aria-hidden");
    });

    Object.entries(TRANSLATED_ATTRS).forEach(([attr, elAttr]) => {
      document.querySelectorAll(`[${elAttr}]`).forEach((el) => {
        const enCacheAttr = `data-en-cache-${attr}`;
        if (!el.hasAttribute(enCacheAttr)) {
          el.setAttribute(enCacheAttr, el.getAttribute(attr) || "");
        }
        const value =
          lang === "el" ? el.getAttribute(elAttr) : el.getAttribute(enCacheAttr);
        if (value !== null) el.setAttribute(attr, value);
      });
    });

    document.querySelectorAll("[data-el-text]").forEach((el) => {
      if (!el.hasAttribute("data-en-cache-text")) {
        el.setAttribute("data-en-cache-text", el.textContent);
      }
      el.textContent =
        lang === "el"
          ? el.getAttribute("data-el-text")
          : el.getAttribute("data-en-cache-text");
    });

    const titleEn = root.getAttribute("data-title-en");
    const titleEl = root.getAttribute("data-title-el");
    if (titleEn && titleEl) document.title = lang === "el" ? titleEl : titleEn;

    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(lang === "el"));
      btn.querySelectorAll("[data-lang-option]").forEach((opt) => {
        opt.classList.toggle(
          "is-active",
          opt.getAttribute("data-lang-option") === lang,
        );
      });
    });

    applyLocalizedDates(lang);
    refreshReaderLabels(lang);

    // Keep archive results-count in sync with the active language.
    if (document.querySelector("#results-count")) {
      applyFilters();
    }

    if (atTop) {
      if (window.scrollY !== 0) {
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        root.style.scrollBehavior = "";
      }
    } else {
      preserveViewportAnchor(anchor, anchorTop);
      root.style.overflowAnchor = "";
    }
  }

  applyLanguage(getStoredLang());

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getStoredLang() === "en" ? "el" : "en";
      localStorage.setItem(LANG_STORAGE_KEY, next);
      applyLanguage(next);
    });
  });
}

/* Mobile navigation toggle */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    backdrop && backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    backdrop && backdrop.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  backdrop && backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

/* Article archive: category filter chips */
function initArticleFilters() {
  const filterBar = document.querySelector(".filter-bar");
  const cards = document.querySelectorAll("[data-card-topic]");
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    applyFilters();
  });

  const requestedTopic = new URLSearchParams(window.location.search).get("topic");
  if (requestedTopic) {
    const matchingChip = filterBar.querySelector(
      `.filter-chip[data-filter="${CSS.escape(requestedTopic)}"]`,
    );
    if (matchingChip) {
      filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      matchingChip.classList.add("is-active");
    }
  }

  applyFilters();
}

/* Normalize for search: lowercase, strip diacritics, collapse punctuation/space. */
function normalizeSearchText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(query) {
  return normalizeSearchText(query).split(" ").filter(Boolean);
}

function matchesSearchQuery(haystack, query) {
  const tokens = queryTokens(query);
  if (!tokens.length) return true;
  const normalized = normalizeSearchText(haystack);
  return tokens.every((token) => normalized.includes(token));
}

function cardSearchHaystack(card) {
  if (card.dataset.searchFull) return card.dataset.searchFull;
  const title = card.querySelector("h3, h2")?.textContent || "";
  const excerpt = card.querySelector(".card-excerpt")?.textContent || "";
  const tags = card.querySelector(".card-tags")?.textContent || "";
  const seed = card.dataset.searchIndex || "";
  return [seed, title, excerpt, tags].join(" ");
}

/* Fetch each linked article and index title + body (EN + EL) for full-text search.
   Related-article blocks are excluded so other posts' titles don't pollute matches. */
async function enrichArticleSearchIndexes() {
  const cards = Array.from(document.querySelectorAll("[data-card-topic]"));
  if (!cards.length) return;

  await Promise.all(
    cards.map(async (card) => {
      if (card.dataset.searchFull) return;

      const link = card.querySelector("h3 a, h2 a");
      const href = link && link.getAttribute("href");
      const localBits = [
        card.dataset.searchIndex || "",
        card.querySelector("h3, h2")?.textContent || "",
        card.querySelector(".card-excerpt")?.textContent || "",
        card.querySelector(".card-tags")?.textContent || "",
      ];

      let articleBits = "";
      if (href) {
        try {
          const res = await fetch(href);
          if (res.ok) {
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            doc.querySelectorAll(".related-section").forEach((el) => el.remove());

            const title = doc.querySelector(".article-header h1")?.textContent || "";
            const subtitle = doc.querySelector(".article-subtitle")?.textContent || "";
            const bodyEl = doc.querySelector(".article-body");
            if (bodyEl) {
              bodyEl
                .querySelectorAll(".related-section, .share-section")
                .forEach((el) => el.remove());
            }
            const body = bodyEl?.textContent || "";
            articleBits = [title, subtitle, body].join(" ");
          }
        } catch (_) {
          /* Keep title/excerpt search if fetch fails (e.g. file://). */
        }
      }

      card.dataset.searchFull = normalizeSearchText(
        [...localBits, articleBits].join(" "),
      );
    }),
  );
}

/* Article archive: live search across titles, excerpts, and article body */
function initSearch() {
  const searchInput = document.querySelector("#article-search");
  if (!searchInput) return;

  let debounceTimer = 0;
  searchInput.addEventListener("input", () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => applyFilters(), 120);
  });

  const requestedQuery = new URLSearchParams(window.location.search).get("q");
  if (requestedQuery) {
    searchInput.value = requestedQuery;
    applyFilters();
  }

  enrichArticleSearchIndexes().then(() => {
    if (searchInput.value.trim()) applyFilters();
  });
}

function applyFilters() {
  const activeChip = document.querySelector(".filter-chip.is-active");
  const activeTopic = activeChip ? activeChip.dataset.filter : "all";
  const searchInput = document.querySelector("#article-search");
  const query = searchInput ? searchInput.value.trim() : "";

  const cards = document.querySelectorAll("[data-card-topic]");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesTopic = activeTopic === "all" || card.dataset.cardTopic === activeTopic;
    const matchesQuery = matchesSearchQuery(cardSearchHaystack(card), query);
    const visible = matchesTopic && matchesQuery;
    card.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });

  const resultsMeta = document.querySelector("#results-count");
  if (resultsMeta) {
    const lang = getStoredLang();
    resultsMeta.textContent =
      lang === "el"
        ? `Εμφάνιση ${visibleCount} άρθρ${visibleCount === 1 ? "ου" : "ων"}`
        : `Showing ${visibleCount} article${visibleCount === 1 ? "" : "s"}`;
  }

  const noResults = document.querySelector(".no-results");
  if (noResults) {
    noResults.classList.toggle("is-visible", visibleCount === 0);
  }
}

function initCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function setCopyFeedback(btn, lang, ok) {
  const feedback =
    lang === "el"
      ? ok
        ? "Ο σύνδεσμος αντιγράφηκε"
        : "Αποτυχία αντιγραφής"
      : ok
        ? "Link copied"
        : "Copy failed";
  const original = btn.getAttribute("data-en-cache-aria-label") || btn.getAttribute("aria-label") || "";
  btn.setAttribute("aria-label", feedback);
  btn.classList.add("is-copied");
  const labelEl = btn.querySelector(".share-btn-label");
  if (labelEl) {
    if (!labelEl.hasAttribute("data-en-cache-label")) {
      labelEl.setAttribute("data-en-cache-label", labelEl.textContent);
    }
    labelEl.textContent = feedback;
  }
  window.setTimeout(() => {
    const restoreLang = getStoredLang();
    const elLabel = btn.getAttribute("data-el-aria-label");
    const enLabel = btn.getAttribute("data-en-cache-aria-label") || original;
    btn.setAttribute("aria-label", restoreLang === "el" && elLabel ? elLabel : enLabel);
    btn.classList.remove("is-copied");
    if (labelEl) {
      const en = labelEl.getAttribute("data-en-cache-label") || "Copy link";
      const el = labelEl.getAttribute("data-el-label") || "Αντιγραφή συνδέσμου";
      labelEl.textContent = restoreLang === "el" ? el : en;
    }
  }, 1800);
}

async function copyPageLink(btn) {
  const lang = getStoredLang();
  const url = window.location.href.split("#")[0];
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(btn, lang, true);
      return;
    }
  } catch (_) {
    /* fall through */
  }

  try {
    const input = document.createElement("input");
    input.value = url;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    setCopyFeedback(btn, lang, ok);
  } catch (_) {
    setCopyFeedback(btn, lang, false);
  }
}

/* Wire share-intent URLs onto [data-share] controls using this page's own URL/title. */
function initShareLinks() {
  const shareLinks = document.querySelectorAll("[data-share]");
  if (!shareLinks.length) return;

  const pageUrl = window.location.href.split("#")[0];
  const pageTitle = document.title.replace(/ — Public Health Matters$/, "");
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(pageTitle);

  shareLinks.forEach((link) => {
    const kind = link.dataset.share;
    if (kind === "linkedin") {
      link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else if (kind === "email") {
      link.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    } else if (kind === "copy") {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        copyPageLink(link);
      });
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          copyPageLink(link);
        }
      });
    }
  });
}

/* Live reader counts via Abacus (free counting API for static sites).
   Article pages increment once per browser session; cards only display. */
function initReaderCounts() {
  const NAMESPACE = "constantinosnea.github.io";
  const API = "https://abacus.jasoncameron.dev";

  function slugFromHref(href) {
    if (!href) return "";
    const clean = href.split("?")[0].split("#")[0];
    const file = clean.split("/").pop() || "";
    if (!file.endsWith(".html") || file === "index.html") return "";
    return file.replace(/\.html$/, "");
  }

  async function fetchCount(slug, hit) {
    const path = hit
      ? `${API}/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(slug)}`
      : `${API}/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(slug)}`;
    const res = await fetch(path);
    if (!res.ok) throw new Error("counter failed");
    const data = await res.json();
    return Number(data.value ?? data.count ?? 0);
  }

  function setCount(el, count) {
    if (!Number.isFinite(count) || count < 0) {
      el.removeAttribute("data-reader-value-num");
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.setAttribute("data-reader-value-num", String(count));
    const label = formatReaderLabel(count, getStoredLang());
    if (!label) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = label;
  }

  // Ensure listing cards have a reader-count target derived from their article link.
  document.querySelectorAll(".article-card, .featured-article").forEach((card) => {
    const link = card.querySelector("h2 a, h3 a");
    const meta = card.querySelector(".card-meta");
    if (!link || !meta) return;
    const slug = slugFromHref(link.getAttribute("href"));
    if (!slug) return;
    if (meta.querySelector(`[data-article-slug="${slug}"]`)) return;
    const span = document.createElement("span");
    span.className = "dot reader-count";
    span.dataset.readerCount = "";
    span.dataset.articleSlug = slug;
    span.hidden = true;
    meta.appendChild(span);
  });

  // Normalize any legacy markup that still nests value/label spans.
  document.querySelectorAll("[data-reader-count]").forEach((el) => {
    if (el.querySelector("[data-reader-value], [data-lang]")) {
      el.textContent = "";
      el.hidden = true;
    }
  });

  const targets = Array.from(
    document.querySelectorAll("[data-reader-count][data-article-slug]"),
  );
  if (!targets.length) return;

  targets.forEach(async (el) => {
    const slug = el.getAttribute("data-article-slug");
    if (!slug) return;
    const shouldHit = el.hasAttribute("data-reader-hit");
    const sessionKey = `phm-read-${slug}`;
    const alreadyHit = sessionStorage.getItem(sessionKey) === "1";
    const doHit = shouldHit && !alreadyHit;

    try {
      const count = await fetchCount(slug, doHit);
      if (doHit) sessionStorage.setItem(sessionKey, "1");
      setCount(el, count);
    } catch (_) {
      if (doHit) {
        try {
          const count = await fetchCount(slug, false);
          setCount(el, count);
        } catch (_) {
          el.hidden = true;
          el.textContent = "";
        }
      } else {
        el.hidden = true;
        el.textContent = "";
      }
    }
  });
}
