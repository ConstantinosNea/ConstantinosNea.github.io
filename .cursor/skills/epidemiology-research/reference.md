# Epidemiology research — reference

Supporting detail for [SKILL.md](SKILL.md). Read when identifying sources or clarifying measures.

## Preferred source families

Use as a **starting map**, not an exclusive whitelist. Prefer the most topic-relevant primary authority.

### Global / multinational

| Family | Typical use |
|--------|-------------|
| WHO (incl. GHO, fact sheets, situation reports) | Definitions, global/regional burden, guidance |
| IHME / GBD (when cited via peer-reviewed or official releases) | Modelled burden; always note modelled nature |
| OECD Health Statistics | Comparable system/risk indicators across members |
| UN / UNICEF / UNAIDS / World Bank | Topic-specific indicators (child, HIV, financing) |
| IPCC / WMO (environment–health) | Climate exposure context; pair with health outcome sources |

### Europe

| Family | Typical use |
|--------|-------------|
| ECDC | Communicable disease surveillance, threats |
| EEA | Environmental exposures |
| Eurostat | Demography, causes of death, health determinants (official stats) |
| EMA | Regulated products/context (not general disease burden) |
| National PH institutes (e.g. RKI, SpF, UKHSA, ISS, …) | Country surveillance and reports |
| National statistics offices (e.g. Destatis, INSEE, ONS, ELSTAT) | Vital stats, surveys |

### Americas / wider international

| Family | Typical use |
|--------|-------------|
| CDC (incl. MMWR, WONDER, NCHS) | US surveillance, vital stats, methods notes |
| NIH / NCI / NHLBI (as relevant) | Research syntheses, condition-specific stats |
| PAHO | Regional Americas PH data |
| Other national institutes/ministries | Local burden and policy context |

### Peer-reviewed literature

Prefer when:

- Official series conflict or omit needed strata
- Causal inference or intervention effect is central
- Methods detail is required to judge bias

Favour systematic reviews/meta-analyses and large registry/cohort studies in reputable journals. Still report design limits; a peer-reviewed estimate is not automatically “better” than high-quality vital registration.

### Avoid as primary evidence

SEO health blogs, unverified social posts, vendor white papers, and news articles that do not link through to primary data (news may be a discovery hint only).

## Common measures (quick definitions)

| Measure | Plain meaning | Watch-outs |
|---------|---------------|------------|
| Count | Absolute events/cases/deaths | Population size drives magnitude |
| Incidence | New events in a period / population at risk | Requires clear case definition and time window |
| Prevalence | Existing cases at a time or period / population | Duration of disease affects prevalence |
| Mortality rate | Deaths / population (often per 100k) | Crude vs age-standardised |
| CFR | Deaths among **cases** | Sensitive to testing and case definition |
| DALY / YLL / YLD | Burden composites | Often modelled; methods versions matter |
| Risk ratio / rate ratio / OR | Relative comparison | OR ≠ risk when outcomes are common |
| Attributable fraction | Share linked to an exposure | Depends on causal assumptions and prevalence of exposure |

Always note **per what** (per 100k, per 1000 live births, etc.) and **which population**.

## Comparability checklist

Before stating “higher than” / “rising” / “worse in group A”:

- [ ] Same outcome definition (and ICD revision if causes of death)
- [ ] Same age structure or age-standardised rates
- [ ] Overlapping or clearly labelled time periods
- [ ] Similar ascertainment (testing, screening, registry completeness)
- [ ] Same geography level (national vs selected cities)
- [ ] Clear whether figures are observed, survey-based, or modelled

If several boxes fail, describe each estimate separately instead of forcing a ranking.

## Appraisal prompts by evidence type

### Surveillance / notifiable disease

- Notification completeness? Changing case definitions? Testing intensity over time?

### Vital registration / causes of death

- Registration coverage? Garbage codes? Transition between ICD revisions?

### Population survey

- Sampling frame, response rate, self-report vs measured, weighting?

### Cohort / case–control

- Selection into study, loss to follow-up, exposure/outcome misclassification, confounding control?

### Modelled estimates (e.g. some global burden products)

- Input data sparse for this country/year? Which covariates? Interval width? Version/year of release?

## Handoff to create-phm-article

This skill stops at analysis and evidence packs.

create-phm-article remains responsible for:

- Bilingual EN/EL prose and terminology QA
- HTML structure, images, chart **markup**, medical disclaimer
- ≥4 authoritative References with European + American/international mix where relevant
- Archive, homepage, sitemap (Path B)

Do not copy those rules into outputs beyond what the evidence pack templates already ask for.
