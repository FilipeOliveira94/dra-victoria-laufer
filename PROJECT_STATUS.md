# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-18 (2.4 verified; 2.5 delivered, PR open) |
| Current phase | Phase 2 — Credibility content under the CFM rules (MVP), the last phase before the initial release |
| Phase status | Phase 2 in progress (2.1 to 2.4 verified, 2.5 delivered). Phases 0 and 1 closed: 0.1 to 0.3 and 1.1 to 1.8 verified |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**2.5** — cut-out portrait on brand graphics, on `feat/2.5-cutout-portrait`. `DESIGN.md` → Portrait treatment written and built; local builds pass every check. Filipe approved the result; she approved the cut-out, now in the assets repository. Awaiting the PR's CI run.

The last merge (`9a74d62`, 2.4) published cleanly: `published` job of [run 44234478918](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234478918), success.

## Next work

1. **2.5** PR: CI run with the cut-out, PO and Reviewer approval, Filipe's OK; then the merge and the `published` job of its run.
2. **2.6** design critique and polish on the whole page, CFM review and release (removal of `noindex`).

## Blockers

None. Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md). The brand is confirmed in [`DESIGN.md`](DESIGN.md) (0.3).

---

## Phase 2 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 2.1 | Apply the confirmed visual identity | Verified | PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307); local builds, both targets, with and without the assets: every check passes; screenshots approved by Filipe as the base. `docs/status-log.md` |
| 2.2 | Identification and contact | Verified | PR #15 CI [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315); local builds, both targets, with and without the assets: every check passes; screenshots approved by Filipe. `docs/status-log.md` |
| 2.3 | Training ("Formação") | Verified | Local builds, both targets, with and without the assets: every check passes; approved by Filipe. PR #17 CI [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093). `docs/status-log.md` |
| 2.4 | Roles ("Atuação") and "Sobre" | Verified | Local builds, both targets, with and without the assets: every check passes; approved by Filipe. PR #18 CI [run 44234277781](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234277781). `docs/status-log.md` |
| 2.5 | Cut-out portrait on brand graphics | Delivered | Local builds, both targets, with and without the assets: every check passes; cut-out approved by her. `docs/status-log.md` |
| 2.6 | CFM review and release | Not started | Depends on 2.1 to 2.5 |

Acceptance detail: `ROADMAP.md` → Phase 2. Phases 0 and 1: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Local build, branch `feat/2.5-cutout-portrait`: production and `DEPLOY_TARGET=ghpages` with the private assets and the cut-out, `DEPLOY_TARGET=ghpages` with `ASSETS_DIR=/nonexistent`, and production with the assets but no cut-out. WSL2, Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 (outside the repository). Not deployed. CI: pending |
| Checks | `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; fallback build without the cut-out; portrait box with images blocked and loaded; scroll width every 40 px from 320 to 1600 px; screenshots at 320, 360, 900, 1280 and 1600 px |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content and photos 0 failing. Requests: 65, 0 failing (19 without the assets). axe 0 violations, 0 incomplete on 4 runs per build, the fallback build included. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1429 ms (902–903 ms on the placeholder), CLS 0.0002. Largest portrait file 55 KB. Portrait box 276 × 287.5 px at 360 px, images blocked or loaded. No horizontal scroll at 320–1600 px. The fallback renders the 3:4 arch crop |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Local build, branch `feat/2.4-atuacao-sobre`: production and `DEPLOY_TARGET=ghpages` with the private assets, `DEPLOY_TARGET=ghpages` with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 (outside the repository; the only system sans fallback is DejaVu Sans). Not deployed. CI: pending |
| Checks | `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; three role lines marked `pendente`; vetoed and promotional terms in the page text; "Sobre" text against the approved text; header and nav geometry at 320, 360 and 412 px with fonts blocked or loaded; scroll width every 40 px from 320 to 1600 px; keyboard path; screenshots at 360 and 1280 px |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content and photos 0 failing. Requests: 68, 0 failing (19 without the assets). axe 0 violations, 0 incomplete on 4 runs per build. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms (902–903 ms on the placeholder), CLS ≤ 0.0002. Pending lines absent from `dist/` and listed in the build report; an empty group drops its "Experiência" heading. No vetoed term, no "agend", "consulta", "domicil", "referência", "melhor". "Sobre" identical to the approved text, in its two paragraphs. Header 106 px at 320, 360 and 412 px with or without the fonts; nav one row. No horizontal scroll at 320–1600 px. Tab: skip link, Formação, Atuação, Sobre, Contato, e-mail, WhatsApp, Instagram |

---

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006: [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-001 | Astro, static, no client JavaScript | 1.1 |
| D-003 | GitHub Pages through Actions | 1.1 |
| D-004 | `DEPLOY_TARGET` | 1.1, 3.2 |
| D-006 | `noindex` until 2.6 | 1.1, 2.6 |
| D-010 | Private assets repository | 1.4 |
| D-011 | Visual identity | 1.4, 2.1 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- The CFM checklist covers only the points passed on by Filipe until the full-text check in 2.6.
