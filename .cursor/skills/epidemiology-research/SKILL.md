---
name: epidemiology-research
description: >-
  Epidemiological research and analysis for Health in Blog: frame questions by
  population, place, and time; evaluate official and peer-reviewed evidence;
  interpret frequency, burden, trends, group differences, study design,
  comparability, uncertainty, and limitations; judge when epi data are useful
  vs unnecessary. Use when investigating an epidemiological question, comparing
  estimates, assessing surveillance or study findings, or when create-phm-article
  needs a deeper evidence pack before writing. Does not create or publish
  articles, edit the website, or run git/GitHub actions.
---

# Epidemiology Research Analyst

Specialised **epidemiological research and interpretation** for this project.

This skill **complements** [create-phm-article](../create-phm-article/SKILL.md). It does **not** replace it.

| Skill | Owns |
|-------|------|
| **create-phm-article** | Article HTML, bilingual EN/EL, images, charts markup, ≥4 sources gate, listings, sitemap, homepage wiring, Path A/B |
| **epidemiology-research** (this skill) | Question framing, evidence search/appraisal, epi reasoning, structured findings for the user or for handoff |

## Hard boundaries (never cross)

- Do **not** create/edit `articles/*.html`, `index.html`, archive cards, `sitemap.xml`, images, or CSS/JS for publishing.
- Do **not** run Path B, commits, pushes, PRs, or GitHub Actions.
- Do **not** invent statistics, fabricate citations, or present unverified figures as fact.
- Do **not** duplicate or override create-phm-article editorial, bilingual, chart-markup, or listing rules.
- When the user wants a **published article**, finish research here (or hand back an evidence pack), then let **create-phm-article** own writing and publishing.

## When to use

**Use this skill when:**

- The user asks an epidemiological question without requesting an article
- A topic needs burden, rates, trends, inequities, outbreak, or surveillance interpretation
- Estimates from different agencies/years/methods must be compared carefully
- create-phm-article (or the user) asks for an evidence pack before drafting

**Do not force epi into every topic.** Say clearly when quantitative epi adds little (e.g. pure process explainers, opinion-led commentary without measurable claims) and stop or keep the brief qualitative.

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
3. Hand off to create-phm-article for HTML, bilingual copy, charts markup, and Path B
4. Do not start Path A/B yourself unless the user explicitly switches to article creation **and** you then read create-phm-article

## Workflow

Copy and track:

```
Epi research:
- [ ] 1. Frame question (population, place, time, outcome, comparison)
- [ ] 2. Necessity check (epi useful? what would change the answer?)
- [ ] 3. Identify evidence (official + peer-reviewed as needed)
- [ ] 4. Appraise (design, bias, generalisability, comparability)
- [ ] 5. Synthesize (what is known / uncertain / not comparable)
- [ ] 6. Deliver briefing or evidence pack
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

### 4 — Appraise with epidemiological reasoning

For every key claim, consider:

- **Study / system type** — surveillance, vital registration, survey, cohort, case–control, trial, model/estimate
- **Frequency & burden** — absolute counts vs rates; crude vs adjusted; which denominator
- **Time** — period vs point measures; trend artefacts (coding, testing intensity, catch-up)
- **Place & groups** — geographic coverage; age/sex/SES stratification; inequities
- **Comparability** — same definition? same age standardisation? same ICD era? overlapping years?
- **Uncertainty** — intervals, model assumptions, incomplete ascertainment, under-reporting
- **Bias & limits** — selection, misclassification, confounding, ecological fallacy, healthy-worker, etc.
- **Conflict** — when sources disagree, explain *why* before picking a “winner”

Never treat modelled global estimates and local registry counts as interchangeable without comment.

### 5 — Synthesize

Lead with what is **reasonably established**, then **uncertainty**, then **what cannot be concluded**. Prefer precise, non-sensational language aligned with Health in Blog’s evidence-informed voice — but this skill outputs **analysis**, not bilingual article HTML.

### 6 — Deliver

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

## Recommended claims (safe to write if URLs verify)
| Claim (plain language) | Measure | Population | Place | Time | Source | URL | Chart-worthy? |
|------------------------|---------|------------|-------|------|--------|-----|---------------|
| … | … | … | … | … | … | … | yes/no — why |

## Do not claim / easy overreach
- [Overinterpretation to avoid]

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

Geography mix for articles still follows create-phm-article’s ≥4 authoritative sources gate (European **and** American/international where relevant). This pack should make that easy — it does not replace the gate.

## Quality bar

- Prefer primary/official estimates over secondary news summaries
- Separate **description** (what the data show) from **inference** (what they might mean)
- State denominators and standardisation when rates are discussed
- If evidence is thin, say so; do not fill with speculative precision
- Medical disclaimer / clinical advice: out of scope here; articles keep the site-wide disclaimer via create-phm-article

## Additional resources

- Source families, common measures, appraisal prompts: [reference.md](reference.md)
- Article creation / publish workflow (separate skill): [../create-phm-article/SKILL.md](../create-phm-article/SKILL.md)
