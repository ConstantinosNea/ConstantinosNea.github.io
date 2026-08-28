# Evidence review — reference

Supporting detail for [SKILL.md](SKILL.md).

## What counts as a major quantitative claim

Treat as **major** (must appear in the Claim & Evidence Register and must be source-checked) any statement that asserts:

- A specific number, rate, percentage, ratio, count, or range used to support the article’s argument
- Prevalence, incidence, mortality, CFR, DALY/YLL/YLD, attributable fraction
- Trend language tied to numbers (“rose from X to Y”, “doubled”, “declined by 20%”)
- Inequality or group comparison with numeric evidence
- Risk/association magnitudes (RR, OR, HR, % increase) presented as findings
- Chart/callout values and axis-defining figures
- “X million people”, “1 in N”, “$X billion”, bed-days, coverage %, etc. when used as evidence

**Usually not major** (still must not invent): round illustrative wording with no numeric precision (“many countries”, “a large share”) — prefer avoiding fake precision.

If unsure, treat as major.

## Claim & Evidence Register (canonical fields)

create-phm-article builds this during Path A; evidence-review consumes it.

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | Stable ID (Q1, Q2, …) |
| `claim_en` | yes | Plain-language claim as in the article |
| `figure` | yes | Exact number(s) + unit |
| `measure` | yes | e.g. prevalence, incidence, age-standardised mortality |
| `population` | yes | Who |
| `place` | yes | Geography |
| `time` | yes | Year or period |
| `definition_notes` | if material | Case definition, ICD, survey vs registry, modelled vs observed |
| `source_org` | yes | WHO, ECDC, CDC, … |
| `source_url` | yes | URL actually used for verification |
| `source_locator` | recommended | Table/figure/section name if possible |
| `chart_ids` | if any | Which charts use this figure |
| `status` | yes | `pending` → after review `pass` / `revise` / `fail` |
| `verification_notes` | after review | What was checked / mismatches |

Register may be a markdown table in the agent’s working notes or a short block in the evidence pack. It must exist before evidence-review can Pass.

## Recency guidance

- Prefer the latest **official** edition of a recurring indicator series when citing “current” burden.
- For slow-moving structural facts, an older definitive source may remain appropriate — document why.
- Guidelines: prefer current version; if citing superseded guidance, label it historically.
- Do not rely on a 2015 fact sheet for a “today” claim if a 2023–2026 update exists on the same indicator.

## Domain

Canonical site URL for new citations and examples: `https://healthinblog.com` (not the old GitHub Pages hostname).
