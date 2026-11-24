# Changelog

## 2.1.0 (Nov 24, 2026): editorial refinement

A design and presentation pass. No features, sources or calculations were added or changed.

- The Executive Overview is now **The Case Study**: an editorial page with an opening statement, a research-status note, a capability-to-value SVG framework, and three sections (The problem, The evidence, My approach) replacing the seven-question list.
- The author is introduced at the top and in an "About the author" section.
- The **Value Navigator** sits next to the case study at the top of the navigation and is featured on the case study page.
- The workspace groups start collapsed; only the group holding the current section is open.
- "Reset all data" moved into a **Settings** menu as "Delete saved data", still behind a confirmation dialog.
- Higher contrast for secondary text, sentence-case labels instead of monospace capitals, IBM Plex Serif for headings, more whitespace and plainer section titles.
- Removed repeated section labels above page titles.
- Regression test extended to 56 checks (navigation and settings).

## 2.0.0 (Nov 24, 2026): case study upgrade

The app was rebuilt from a single-file demo into an evidence-labeled case study on the Enterprise AI Infrastructure Adoption Gap.

### Research
- Replaced the demonstration content audit (example.com data) with a real audit of 19 public NVIDIA pages, each with verbatim excerpts, observations, opportunities and scores on a seven-dimension anchored rubric. Scores are marked pending the author's validation. Three unreadable pages are listed as excluded.
- Added a market evidence register across nine adoption-gap dimensions, with sample, limitation and interpretation for every item.
- Expanded the source library to 48 sources, each with publisher, date, type, method and verification status, plus CSV export.
- Added six evidence statuses and five content-type labels used throughout the app.

### New sections
- Strategic Recommendations: executive summary, interactive causal problem tree (2 of 9 links evidence-supported, the rest hypotheses), eight findings, seven opportunities, editable Impact vs Effort matrix, 90-day roadmap and KPI framework.
- Messaging Framework: eight audiences and a feature-to-benefit matrix.
- Asset Library: six independent concept documents with copy, Markdown download and print.
- Messaging Experiment Lab: study protocol, power calculator, CSV import with row validation, and Welch t-tests with Holm correction, confidence intervals and Cohen's d. No results are simulated.
- About the Project.

### Upgraded sections
- Executive Overview: research question, seven questions answered, research journey, and buttons to the solution and the findings.
- Content Audit: dashboard with six filters and search, dynamic findings, seven charts, heatmap, coverage matrix, sortable and editable records, CSV import and export.
- Competitive Intelligence: expandable rows with sources, a reading note and analyst notes.
- Messaging Studio: workspace layout with a claim-check panel.
- AI Workflow: eight labeled steps, a case study drafted with AI and labeled as such, a claim verification table with editable human corrections, and an AI activity log.

### Design
- New design system: dark neutral palette, NVIDIA green used only for primary actions and key data, IBM Plex Sans and Mono, flat surfaces, no glow or gradients.
- Navigation in four collapsible groups, with a mobile drawer.
- Tooltips, empty, loading and error states, print layouts and keyboard support.
- Removed em dashes and promotional wording from app copy. Verbatim NVIDIA quotes are unchanged.

### Technical
- Split into `index.html`, `assets/css/app.css` and seven scripts. Chart.js is vendored locally.
- Saved data from version 1 is cleared once on first load (schema 2).
- Added `tests/regression.js` (49 checks) and `tests/export-deliverables.js`.
- Exported deliverables to `docs/deliverables/` and refreshed screenshots.

## 1.0.0 (Nov 24, 2026)
- First public version: overview, market intelligence, infrastructure explorer, value navigator, TCO and ROI simulator, competitive intelligence, messaging studio, demonstration content audit, AI workflow and methodology.
