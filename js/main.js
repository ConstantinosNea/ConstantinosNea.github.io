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

/* EN / EL language toggle: swaps [data-lang] content via the `hidden` attribute
   and persists the choice in localStorage. */
function initLanguageToggle() {
  const STORAGE_KEY = "site-lang";
  const TRANSLATED_ATTRS = {
    alt: "data-el-alt",
    "aria-label": "data-el-aria-label",
    placeholder: "data-el-placeholder",
    title: "data-el-title",
  };

  function getStoredLang() {
    return localStorage.getItem(STORAGE_KEY) === "el" ? "el" : "en";
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-lang]").forEach((el) => {
      // Brand lockup (logo + name + tagline) stays English in both languages.
      if (el.closest("a.brand")) return;
      el.hidden = el.getAttribute("data-lang") !== lang;
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

    const titleEn = document.documentElement.getAttribute("data-title-en");
    const titleEl = document.documentElement.getAttribute("data-title-el");
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
  }

  applyLanguage(getStoredLang());

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getStoredLang() === "en" ? "el" : "en";
      localStorage.setItem(STORAGE_KEY, next);
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
    const lang = localStorage.getItem("site-lang") === "el" ? "el" : "en";
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

/* Wire real share-intent URLs onto [data-share] links using this page's own URL/title. */
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
    }
  });
}

/* Live reader counts via Abacus (free counting API for static sites).
   Article pages increment once per browser session; cards only display.
   CounterAPI.dev was previously used but became unreliable (server errors). */
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

  function formatCount(n) {
    return Number(n || 0).toLocaleString("en-US");
  }

  function readerLabelHtml() {
    return (
      '<span data-reader-value>—</span> ' +
      '<span data-lang="en">readers</span>' +
      '<span data-lang="el" hidden>αναγνώστες</span>'
    );
  }

  function applyLangVisibility(root) {
    const lang = localStorage.getItem("site-lang") === "el" ? "el" : "en";
    root.querySelectorAll("[data-lang]").forEach((el) => {
      if (el.closest("a.brand")) return;
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
  }

  async function fetchCount(slug, hit) {
    const path = hit
      ? `${API}/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(slug)}`
      : `${API}/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(slug)}`;
    const res = await fetch(path);
    if (!res.ok) throw new Error("counter failed");
    const data = await res.json();
    // Abacus returns { value }; keep fallbacks for other counter shapes.
    return Number(data.value ?? data.count ?? 0);
  }

  function setValue(el, count) {
    const valueEl = el.querySelector("[data-reader-value]");
    if (valueEl) valueEl.textContent = formatCount(count);
    el.hidden = false;
  }

  // Ensure listing cards have a reader-count target derived from their article link.
  document
    .querySelectorAll(".article-card, .featured-article")
    .forEach((card) => {
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
      span.innerHTML = readerLabelHtml();
      applyLangVisibility(span);
      meta.appendChild(span);
    });

  const targets = Array.from(document.querySelectorAll("[data-reader-count][data-article-slug]"));
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
      setValue(el, count);
    } catch (_) {
      // If increment fails, still try to show the last known total.
      if (doHit) {
        try {
          const count = await fetchCount(slug, false);
          setValue(el, count);
        } catch (_) {
          /* keep placeholder */
        }
      }
    }
  });
}
