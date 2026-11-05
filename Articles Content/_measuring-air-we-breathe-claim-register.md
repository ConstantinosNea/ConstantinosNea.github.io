# Claim & Evidence Register — Are We Measuring the Air We Actually Breathe?

Slug: `measuring-air-we-breathe` · Topic: `environment` · Date: 2026-10-31

| id | claim_en | figure | measure | population | place | time | definition_notes | source_org | source_url | source_locator | chart_ids | status | verification_notes |
|----|----------|--------|---------|------------|-------|------|------------------|------------|------------|----------------|-----------|--------|---------------------|
| C1 | Up to 20% of monitoring stations in Europe still above current EU AQ standards, especially for PM10, O3 and BaP | ≤20% | share of stations | reporting stations | Europe (EEA network, 39 countries) | status report 2026 / data mainly 2024 | Station-level exceedance of *current* EU standards, not WHO AQG; not population exposure | EEA | https://www.eea.europa.eu/en/analysis/publications/air-quality-status-report-2026 | Key messages | chart-stations-eu | pass | Independent re-open 2026-10-31: key-message wording confirmed; ≤20% chart OK |
| C2 | More than 9 out of 10 Europeans exposed above WHO AQG levels (urban ≥90% claim not used — not confirmed on same EEA key-message wording) | >9/10 | population exposure estimate | Europeans | Europe (EEA 2026) | cited in EEA 2026 status | Exposure estimate vs WHO AQG, not vs current EU LVs; distinct from C1 | EEA | https://www.eea.europa.eu/en/analysis/publications/air-quality-status-report-2026 | Key messages | — | pass | Key message >9/10 Europeans verified; urban ≥90% left out of draft correctly |
| C3 | Annual PM2.5: WHO AQG 5 µg/m³; current EU LV 25 µg/m³; 2030 EU LV 10 µg/m³ | 5 / 25 / 10 | guideline / limit values | standards (not measured exposures) | WHO global / EU | WHO 2021; Directive 2024/2881 annex | Standards comparison chart — not station concentrations | WHO; EU | WHO AQG 2021; https://eur-lex.europa.eu/eli/dir/2024/2881/oj/eng | Annex I / EEA PM2.5 page | chart-pm25-standards | pass | EEA Table 2 + WHO 2021 AQG 5 confirmed; chart labelled standards-only |
| C4 | In 2024, 92.5% of PM2.5 reporting stations above WHO annual AQG; ~1% (23 stations) above current EU ALV; 60.7% already below 2030 EU ALV | 92.5% / ~1% / 60.7% | share of stations | PM2.5 reporting stations | Europe | 2024 | Station shares; not population % | EEA | https://www.eea.europa.eu/en/analysis/publications/air-quality-status-report-2026/particulate-matter-pm2.5 | PM2.5 section | — | pass | Exact 2024 station figures re-verified on EEA PM2.5 page |
| C5 | Directive (EU) 2024/2881 strengthens modelling/indicative measurements and requires spatial representativeness information when modelling is used; entered into force 10 Dec 2024; 2030 standards | qualitative | regulatory requirement | Member States | EU | entered into force 10 Dec 2024; 2030 standards | Legal obligation; not a health outcome | EU | https://eur-lex.europa.eu/eli/dir/2024/2881/oj/eng | Art. on modelling / SRA | — | pass | Art. 8(3) + EIF 10 Dec 2024 confirmed on EUR-Lex |
| C6 | Implementing Decision (EU) 2026/1208 (9 Jun 2026) on modelling applications & SRA; applies from 30 Jun 2028; SRA tolerance 15% of central value or Annex I minimum, whichever is greater | 15%; apply 30 Jun 2028 | regulatory method | Member States | EU | Decision 9 Jun 2026 | Methodological rule for SRA — not an exposure reduction | EU | https://eur-lex.europa.eu/eli/dec_impl/2026/1208/oj | Decision text Art. 6/7 | — | pass | Arts. 6–7 tolerance wording + Art. 11 apply 30 Jun 2028 confirmed |
| C7 | Urban monitoring supersites: at least one per 10 million inhabitants | 1 / 10M | facility density | Member States | EU | Directive 2024/2881 | Monitoring infrastructure requirement | EU | EUR-Lex Directive | Art. 10 | — | pass | Art. 10(1) urban-background supersite density confirmed |
| C8 | EEA: background stations represent average exposure of the general population (classification wording) | qualitative | station typology | general population (design intent) | EEA classification | current guidance | Design intent of station type — not proven personal exposure equality | EEA | https://www.eea.europa.eu/en/topics/in-depth/air-pollution/monitoring-station-classifications-and-criteria | classifications | — | pass | Near-verbatim EEA classification text re-checked |
| C9 | FAIRMODE WG4 microscale guidance: high-resolution pedestrian-height maps; SRA/LVEA; CFD generally more consistent for SRA; Gaussian without canyon parameterisation weakest | qualitative technical | modelling guidance | EU FAIRMODE community | EU | guidance v1 (2025/2026 FAIRMODE) | Technical best practice — not health outcome | FAIRMODE/JRC | https://knowledge4policy.ec.europa.eu/sites/default/files/WG4_air_quality_modelling_microscale_guidance_document_v1.pdf | WG4 guidance | chart-exposure-stack (conceptual only) | pass | PDF: CFD more consistent for LVEA/SRA; Gaussian without canyon worst; pedestrian 1.5–3 m |
| C10 | Personalised time-activity adjusted exposure estimates can be substantially lower than residence-based ambient estimates (older adults, London) | qualitative / direction | exposure comparison | older adults | London | JESEE 2025 | Direction of bias in that study — not universal underestimation by monitors | JESEE / Nature | https://www.nature.com/articles/s41370-025-00745-7 | abstract/results | — | pass | Results: “substantially/markedly lower”; draft keeps directional limits |
| C11 | Fixed-station vs personal: association stronger for PM2.5 than for O3 in a student panel | qualitative | method comparison | 37 students, 3 seasons | Guangzhou | npj Clean Air, published 9 Jan 2026 | Small panel; pollutant-specific; not Europe-wide | npj Clean Air | https://www.nature.com/articles/s44407-025-00045-2 | results | — | pass | Published 09 January 2026 (article ID retains 2025 DOI year); stronger PM2.5 vs O3 association; Guangzhou stated in prose |

## Charts planned
1. `chart-stations-eu` — callout ≤20% (C1)
2. `chart-pm25-standards` — columns 5 / 10 / 25 (C3) — labelled as standards, not measurements
3. `chart-exposure-stack` — conceptual package: ambient → SRA → population/personal exposure (C9 framing; **no invented numbers**)

## Do-not-claim
- Fixed monitors systematically underestimate personal exposure everywhere
- FAIRMODE/AAQD alone deliver measurable population-health gains
- Invented hotspot concentration deltas
- Equating EU with WHO European Region


## Evidence-review (2026-10-31)
Independent gate: **Pass** — see `Articles Content/_measuring-air-we-breathe-evidence-review.md`.
All C1–C11 re-verified against primary URLs; charts clean; no blocking issues.
Softened: C2 urban ≥90% not stated (EEA key message verified as >9/10 Europeans only). C6 phrased as 15% or Annex I minimum, whichever is greater. C10/C11 kept directional/small-panel.
Charts: chart-stations-eu (C1), chart-pm25-standards (C3 standards only), chart-exposure-stack (conceptual).

