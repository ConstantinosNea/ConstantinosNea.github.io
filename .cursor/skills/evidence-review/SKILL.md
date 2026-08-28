---
name: evidence-review
description: >-
  Independent evidence-quality and fact-check review for Health in Blog
  articles: re-verify major quantitative claims against underlying
  authoritative sources; check year, geography, population, definition,
  measure, and method context; flag outdated, conflicting,
  non-comparable, or insufficiently supported statistics; confirm charts
  use only verified figures; separate evidence from interpretation. Use
  after a draft (or claim register) exists and before an article is treated
  as finished or Path B publish. Does not write article prose, create HTML,
  run bilingual QA as primary owner, edit listings, or git/GitHub publish.
---

# Evidence Review (independent gate)

Specialised **independent** check of the evidence behind a Health in Blog article draft.

This skill **complements** [create-phm-article](../create-phm-article/SKILL.md) and [epidemiology-research](../epidemiology-research/SKILL.md). It does **not** replace them.

| Skill | Owns |
|-------|------|
| **create-phm-article** | Prose, HTML, bilingual QA, charts markup, ≥4 sources, Path A/B publishing |
| **epidemiology-research** | Epi framing, primary evidence search/appraisal, Article evidence pack |
| **evidence-review** (this skill) | Second-pass verification of claims vs sources; pass/fail before “finished” |

## Why this skill exists

The writer that selected and phrased the evidence must **not** be the sole judge that the evidence is sound. Before an article is finished or Path B runs after a create/rewrite, this review must run and **pass** (or the draft must be revised and re-reviewed).

## Hard boundaries (never cross)

- Do **not** rewrite article voice, structure, or bilingual adaptation as your primary job (flag issues; create-phm-article fixes copy).
- Do **not** invent replacement statistics.
- Do **not** run Path B, commits, pushes, or listing updates.
- Do **not** skip fetching/opening the cited source for any **major quantitative claim** under review.
- Do **not** rubber-stamp: if you cannot verify, mark **Fail** or **Revise**, not Pass.

## When to use

**Always** before Path A create/regenerate/substantial rewrite is treated as finished (create-phm-article invokes this gate).

Also use when the user asks to fact-check, audit evidence, or verify statistics in a draft.

## Inputs required

Obtain from create-phm-article (or build if missing — then Fail until complete):

1. Article draft path or draft text (EN at minimum; EL if already written)
2. **Claim & Evidence Register** (see [reference.md](reference.md))
3. References list / intended URLs
4. Chart data notes (if any)
5. Epidemiology evidence pack (if epi claims were in scope)

If the Claim & Evidence Register is missing or incomplete for major quantitative claims → **Fail** (incomplete audit trail).

## Workflow

```
Evidence review:
- [ ] 1. Inventory major quantitative + epi claims from draft + register
- [ ] 2. For each claim: open underlying source; extract supporting figure/context
- [ ] 3. Recency check (newer authoritative edition/dataset?)
- [ ] 4. Conflict / comparability check
- [ ] 5. Charts: every plotted value maps to a Pass claim
- [ ] 6. Evidence vs interpretation: flag blurred attribution
- [ ] 7. Deliver verdict: Pass | Revise | Fail
```

### 1 — Inventory

List every **major quantitative claim** (see reference.md). Cross-check the register: each major claim needs a row. Orphan claims in the draft without register rows → **Revise**.

### 2 — Source verification (mandatory for majors)

For each major claim:

1. Open the cited URL (or official document it points to).
2. Locate the figure (table, chart, paragraph, indicator).
3. Confirm the draft’s number, unit, and direction match the source.
4. Record: year/period, geography, population, definition/measure, any critical method note.
5. If the source does not support the claim as written → **Revise** or **Fail** that claim.

Secondary news/blog summaries are **not** sufficient verification for a major claim.

### 3 — Recency

For each key indicator, ask: is there a **newer** authoritative release, dataset edition, guideline, or surveillance update that materially changes the figure or its framing?

- If yes and the draft uses the older figure without acknowledging the update → **Revise**.
- If the older figure remains the right series for a trend, say so explicitly in notes; do not silently ignore newer data.

### 4 — Conflicts & comparability

If multiple authoritative estimates exist:

- Do not accept “whatever was easiest.”
- Require a short assessment: why they differ (definition, population, year, modelled vs observed, etc.) and which estimate the article uses and why.
- Non-comparable “higher than / rising / worse in group A” claims without matching definitions → **Revise**.

### 5 — Charts

Every value in a chart/callout must correspond to a register row with status **Pass**. Invented, rounded-beyond-source, or register-Fail figures → **Fail** the chart.

### 6 — Evidence vs interpretation

Flag sentences that present author judgement as if it were a sourced statistic, or that omit attribution where a number is stated. create-phm-article must fix wording; this skill records the finding.

### 7 — Verdict

| Verdict | Meaning |
|---------|---------|
| **Pass** | All major quantitative claims verified; context adequate; charts clean; no blocking conflicts; register complete |
| **Revise** | Fixable issues; list required changes; article **not** finished until re-review Pass |
| **Fail** | Missing sources, unverifiable majors, fabricated/unsupported numbers, or incomplete register |

**Pass is required** before create-phm-article may treat Path A as finished or run Path B after create/rewrite.

## Output template

```markdown
# Evidence review: [slug or topic]

## Verdict
Pass | Revise | Fail

## Summary
[2–4 sentences]

## Claim checks
| ID | Claim (short) | Source checked (URL) | Match? | Context OK? | Recency OK? | Status | Notes |
|----|---------------|----------------------|--------|-------------|-------------|--------|-------|
| Q1 | … | … | Y/N | Y/N | Y/N | Pass/Revise/Fail | … |

## Charts
| Chart | Values verified? | Status | Notes |
|-------|------------------|--------|-------|
| … | Y/N | Pass/Revise/Fail | … |

## Conflicts / comparability
[None | assessment]

## Evidence vs interpretation issues
[None | list]

## Blocking issues (must fix before finished)
1. …
2. …

## Non-blocking notes
- …
```

## Quality bar

- Prefer primary/official documents over secondary summaries
- Prefer precision with context over a lonely headline number
- If verification is impossible (paywall with no accessible official summary, dead link, vague citation), do **not** Pass that claim
- Stay within Health in Blog’s evidence-informed standards; do not demand academic systematic-review machinery for every article, but **do** demand real source checks for majors

## Additional resources

- Claim register fields, major-claim definition: [reference.md](reference.md)
- Article workflow owner: [../create-phm-article/SKILL.md](../create-phm-article/SKILL.md)
- Epi evidence packs: [../epidemiology-research/SKILL.md](../epidemiology-research/SKILL.md)
