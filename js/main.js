/* Public Health Blog — shared front-end behaviour (no dependencies) */

document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initMobileNav();
  initArticleFilters();
  initSearch();
  initForms();
  initCurrentYear();
  initShareLinks();
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

/* Article archive: live search */
function initSearch() {
  const searchInput = document.querySelector("#article-search");
  if (!searchInput) return;
  searchInput.addEventListener("input", () => applyFilters());

  const requestedQuery = new URLSearchParams(window.location.search).get("q");
  if (requestedQuery) {
    searchInput.value = requestedQuery;
    applyFilters();
  }
}

function applyFilters() {
  const activeChip = document.querySelector(".filter-chip.is-active");
  const activeTopic = activeChip ? activeChip.dataset.filter : "all";
  const searchInput = document.querySelector("#article-search");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const cards = document.querySelectorAll("[data-card-topic]");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesTopic = activeTopic === "all" || card.dataset.cardTopic === activeTopic;
    const haystack = (card.dataset.searchIndex || card.textContent || "").toLowerCase();
    const matchesQuery = query === "" || haystack.includes(query);
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

/* Front-end-only form handling (newsletter + contact) */
function initForms() {
  const FORM_STATUS_MESSAGES = {
    newsletter: {
      en: "Thank you — this is a front-end placeholder. Connect an email provider to activate sign-ups.",
      el: "Ευχαριστούμε — πρόκειται για προσωρινή λειτουργία. Συνδέστε έναν πάροχο email για να ενεργοποιηθούν οι εγγραφές.",
    },
    contact: {
      en: "Thank you — this is a front-end placeholder. Connect a backend or form service to receive messages.",
      el: "Ευχαριστούμε — πρόκειται για προσωρινή λειτουργία. Συνδέστε ένα backend ή υπηρεσία φορμών για να λαμβάνετε μηνύματα.",
    },
  };

  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) {
        const lang = localStorage.getItem("site-lang") === "el" ? "el" : "en";
        const messages = FORM_STATUS_MESSAGES[form.dataset.form] || FORM_STATUS_MESSAGES.contact;
        status.textContent = messages[lang];
        status.classList.add("is-visible");
      }
      form.reset();
    });
  });
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
