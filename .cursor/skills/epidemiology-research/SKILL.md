---
name: epidemiology-research
description: >-
  Epidemiological research and analysis for Health in Blog: frame questions by
  population, place, and time; search and open authoritative sources; verify
  figures in context (year, geography, population, definition, measure, method);
  check for newer editions; appraise conflicts and comparability; produce an
  Article evidence pack with a claim-ready ledger for create-phm-article and
  evidence-review. Use for epi questions, burden/rates/trends/inequities, or
  whenever an article will state prevalence, incidence, mortality, risk, or
  similar measures. Does not create or publish articles, edit the website,
  run evidence-review as sole finisher, or git/GitHub actions.
---

# Epidemiology Research Analyst

Specialised **epidemiological research and interpretation** for this project.

This skill **complements** [create-phm-article](../create-phm-article/SKILL.md). It does **not** replace it.

| Skill | Owns |
|-------|------|
| **create-phm-article** | Article HTML, bilingual EN/EL, images, charts markup, ≥4 sources gate, listings, sitemap, homepage wiring, Path A/B |
| **epidemiology-research** (this skill) | Question framing, evidence search/appraisal, verified epi figures, Article evidence pack / claim-ready ledger |
| **evidence-review** | Independent second-pass verification before an article is finished |

## Hard boundaries (never cross)

- Do **not** create/edit `articles/*.html`, `index.html`, archive cards, `sitemap.xml`, images, or CSS/JS for publishing.
- Do **not** run Path B, commits, pushes, PRs, or GitHub Actions.
- Do **not** invent statistics, fabricate citations, or present unverified figures as fact.
- Do **not** mark a figure “verified” without opening/checking the underlying authoritative source.
- Do **not** duplicate or override create-phm-article editorial, bilingual, chart-markup, or listing rules.
- Do **not** replace **evidence-review**; this skill prepares evidence, it does not grant final Pass.
- When the user wants a **published article**, finish research here (or hand back an evidence pack), then let **create-phm-article** own writing; **evidence-review** must still Pass before finished.

## When to use

**Use this skill when:**

- The user asks an epidemiological question without requesting an article
- A topic needs burden, rates, trends, inequities, outbreak, or surveillance interpretation
- Estimates from different agencies/years/methods must be compared carefully
- create-phm-article will state **epidemiological / population-health** measures — **prevalence, incidence, mortality, burden, risk, trend, or inequality** (or similar) — **required**, not optional
- create-phm-article (or the user) asks for an evidence pack before drafting

**Do not force epi into every topic.** Say clearly when quantitative epi adds little (e.g. pure process explainers without measurable claims) and stop or keep the brief qualitative. If the planned article has **no** epidemiological / population-health quantitative claims, create-phm-article may skip this skill. **Other** major quantitative claims (budgets, non-epi counts, etc.) still need the Claim & Evidence Register, open-source verification, and **evidence-review** — they do **not** by themselves make this skill mandatory.

## Modes

### Mode 1 — Independent investigation

User wants understanding, not a site article.

1. Run the workflow below
2. Deliver a **Research briefing** (template below)
3. Stop — no website changes

### Mode 2 — Article support (handoff)

User is creating/updating an article and needs epi depth.

1. Run the workflow below
2. Deliver an **Article evidence pack** (template below)
3. Hand off to **create-phm-article** for HTML, bilingual copy, Claim & Evidence Register, charts markup, and bilingual QA
4. **create-phm-article** must still obtain **evidence-review Pass** before the article is finished or Path B runs after create/rewrite — this pack does **not** skip that gate and does **not** authorise publishing
5. Do not start Path A/B yourself unless the user explicitly switches to article creation **and** you then read create-phm-article (Path B only after evidence-review Pass when the body was created/rewritten)

## Workflow

Copy and track:

```
Epi research:
- [ ] 1. Frame question (population, place, time, outcome, comparison)
- [ ] 2. Necessity check (epi useful? what would change the answer?)
- [ ] 3. Identify evidence (official + peer-reviewed as needed)
- [ ] 4. Verify each candidate figure in the source (open URL/document)
- [ ] 5. Recency check (newer authoritative edition/dataset?)
- [ ] 6. Appraise (design, bias, generalisability, comparability, conflicts)
- [ ] 7. Synthesize (what is known / uncertain / not comparable)
- [ ] 8. Deliver briefing or evidence pack (+ claim-ready ledger rows)
```

### 1 — Frame the question

State explicitly:

| Element | Ask / define |
|---------|----------------|
| Outcome | Disease, death, risk factor, service gap, etc. |
| Population | Who is included/excluded |
| Place | Country, region, global; urban/rural if relevant |
| Time | Year(s), period, pre/post event |
| Measure | Counts, incidence, prevalence, mortality, DALYs, rates, ratios, etc. |
| Comparison | Time trend, geography, sex/age/SES, intervention vs none |
| Decision need | What the user must conclude or write |

If the question is vague, ask the minimum clarifying questions — then proceed with stated assumptions if the user wants speed.

### 2 — Necessity check

Decide one of:

| Verdict | Meaning |
|---------|---------|
| **Epi essential** | Claims about burden, risk, trend, or inequity need quantitative evidence |
| **Epi helpful** | Numbers would strengthen interpretation but are not the whole story |
| **Epi optional / skip** | Narrative, ethics, process, or commentary does not depend on rates |

If **skip**, say why in 2–4 sentences and do not pad with decorative statistics.

### 3 — Identify evidence

Prefer **authoritative primary sources**, then high-quality peer-reviewed literature. Prefer live URLs. See [reference.md](reference.md) for source families and measure notes.

Search order (adapt to topic):

1. WHO / UN / OECD and global burden or indicator databases
2. European: ECDC, EEA, Eurostat, EMA (as relevant), national institutes (e.g. RKI, Santé publique France, UKHSA/ONS)
3. Americas / international: CDC, NIH, PAHO, national statistical/health institutes
4. Peer-reviewed syntheses (systematic reviews, major cohort/registry studies) when official estimates conflict, are outdated, or lack mechanism/detail
5. Avoid blogs, SEO health sites, vendor marketing, and press-release-only claims as primary evidence

For each candidate estimate, capture: source, year, geography, population, case definition, measure, numerator/denominator if stated, and URL.

### 4 — Verify in the source (mandatory before recommending a figure)

Do **not** recommend a number for article use from memory, a news paraphrase, or an unverified secondary page.

For each figure you intend to put in the evidence pack as “safe to write”:

1. Open the authoritative URL or official PDF/report.
2. Locate the figure (table, chart, indicator, paragraph).
3. Record locator (table/figure/section) when possible.
4. Confirm unit, population, place, and time match what you will recommend.
5. If you cannot access or locate the figure → leave it out or mark **unverified — do not use**.

### 5 — Recency check

Before locking a “current” burden or rate:

- Search/check whether a **newer** edition of the same series, fact sheet, GHO indicator, surveillance report, or guideline exists.
- If a newer release changes the figure or framing, prefer the newer source for “current” claims, or explicitly justify using an older series (e.g. long trend with consistent methods).
- Note the publication/release date in the pack.

### 6 — Appraise with epidemiological reasoning

For every key claim, consider:

- **Study / system type** — surveillance, vital registration, survey, cohort, case–control, trial, model/estimate
- **Frequency & burden** — absolute counts vs rates; crude vs adjusted; which denominator
- **Time** — period vs point measures; trend artefacts (coding, testing intensity, catch-up)
- **Place & groups** — geographic coverage; age/sex/SES stratification; inequities
- **Comparability** — same definition? same age standardisation? same ICD era? overlapping years?
- **Uncertainty** — intervals, model assumptions, incomplete ascertainment, under-reporting
- **Bias & limits** — selection, misclassification, confounding, ecological fallacy, healthy-worker, etc.
- **Conflict** — when sources disagree, explain *why* before picking a “winner”; never silently pick the easiest number

Never treat modelled global estimates and local registry counts as interchangeable without comment.

### 7 — Synthesize

Lead with what is **reasonably established**, then **uncertainty**, then **what cannot be concluded**. Prefer precise, non-sensational language aligned with Health in Blog’s evidence-informed voice — but this skill outputs **analysis**, not bilingual article HTML.

### Sufficiency (not just “found four links”)

Research is enough for handoff only when:

- Every **recommended** numeric claim has a verified source locator
- Population / place / time / measure are stated for each
- Material conflicts are assessed
- Recency was considered for “current” claims
- Open gaps are listed honestly

Collecting four URLs without verified figures is **not** sufficient.

### 8 — Deliver

Use the matching template. Cite URLs. Flag any figure that must not be charted or quoted until verified live.

## Output templates

### Research briefing (Mode 1)

```markdown
# [Question / topic]

## Verdict on epi usefulness
Essential | Helpful | Skip — [one sentence why]

## Framed question
- Population:
- Place:
- Time:
- Outcome / measure:
- Comparison:

## Key findings
1. [Finding] — [measure, population, place, time] — [source + URL]
2. …

## Comparability & conflicts
[What can/cannot be compared; why estimates differ]

## Uncertainty & limitations
[Bullets]

## Bottom line
[Short interpretation for decision-making]
```

### Article evidence pack (Mode 2 → create-phm-article)

Produce a pack the article skill can consume **without** rewriting publishing rules:

```markdown
# Evidence pack: [topic]

## Epi usefulness
Essential | Helpful | Skip — [implication for article: include numbers / keep qualitative]

## Recommended claims (safe to write ONLY if source was opened and figure located)
| ID | Claim (plain language) | Figure + unit | Measure | Population | Place | Time | Definition / method notes | Source | URL | Locator | Verified? | Chart-worthy? |
|----|------------------------|------------|---------|------------|-------|------|---------------------------|--------|-----|----------|-----------|---------------|
| Q1 | … | … | … | … | … | … | … | … | … | … | yes — opened [date] | yes/no — why |

## Do not claim / easy overreach
- [Overinterpretation to avoid]

## Conflicts assessed
- [Source A vs B — why different — which to use]

## Recency
- [Newest relevant releases checked; any superseded sources avoided or labelled]

## Source shortlist for References (≥4 when article proceeds)
1. [Org] — [title] — URL — [EU / US-int'l / other]
2. …

## Notes for charts (data only — markup is create-phm-article’s job)
- [Series and exact figures that are verified]
- [Suggested comparison the data actually support]
- [Skip chart if:] 

## Open gaps
- [Missing years, geographies, or definitions]
```

Only rows with **Verified? = yes** may enter the article Claim & Evidence Register as candidates for publication. Unverified rows must not be charted or stated as fact.

Geography mix for articles still follows create-phm-article’s ≥4 authoritative sources gate (European **and** American/international where relevant). This pack should make that easy — it does not replace the gate. Handoff path: **evidence pack → create-phm-article (draft) → evidence-review Pass → then finished / Path B**. The pack alone never finishes or publishes an article.

## Quality bar

- Prefer primary/official estimates over secondary news summaries
- Separate **description** (what the data show) from **inference** (what they might mean)
- State denominators and standardisation when rates are discussed
- If evidence is thin, say so; do not fill with speculative precision
- Never recommend an unverified figure for article use
- Medical disclaimer / clinical advice: out of scope here; articles keep the site-wide disclaimer via create-phm-article

## Additional resources

- Source families, common measures, appraisal prompts: [reference.md](reference.md)
- Article creation / publish workflow: [../create-phm-article/SKILL.md](../create-phm-article/SKILL.md)
- Independent verification gate: [../evidence-review/SKILL.md](../evidence-review/SKILL.md)
