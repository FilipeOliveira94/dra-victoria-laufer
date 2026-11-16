# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (2.1 verified, PR open) |
| Current phase | Phase 2 — Credibility content under the CFM rules (MVP), the last phase before the initial release |
| Phase status | Phase 2 in progress (2.1 verified). Phases 0 and 1 closed: 0.1 to 0.3 and 1.1 to 1.8 verified |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**2.1** — Apply the confirmed visual identity: the `DESIGN.md` tokens, typography and page frame (header with logo and navigation, section grounds, footer), favicon and social image, under the whole page before any section is finished on it. Branch `feat/2.1-visual-identity`.

Phase 2 was reordered and renumbered on 2026-11-16 (Filipe): the brand comes first, then one issue per part of the page, each delivering it as "a complete section" (`ROADMAP.md` → Phase 2), then the cut-out portrait and the release.

The 1.7 merge (`dc075fc`) published cleanly: `published` job of [run 43937667606](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43937667606), 23 requests, 0 failing. `build` is a required status check of `main`.

## Next work

1. **2.1** — [PR #13](https://github.com/FilipeOliveira94/dra-victoria-laufer/pull/13): PO and Reviewer approval, Filipe's OK and merge.
2. **2.2** identification and contact, **2.3** Formação, **2.4** Atuação and Sobre, in that order, each a complete section.
3. **2.5** cut-out portrait on brand graphics: Filipe made it a condition for publication.
4. **2.6** design critique and polish on the whole page, CFM review and release (removal of `noindex`).

## Blockers

None. Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md). The brand is confirmed in [`DESIGN.md`](DESIGN.md) (0.3).

---

## Phase 2 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 2.1 | Apply the confirmed visual identity | Verified | PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307); local builds, both targets, with and without the assets: every check passes; screenshots approved by Filipe as the base. `docs/status-log.md` |
| 2.2 | Identification and contact | Not started | — |
| 2.3 | Training ("Formação") | Not started | — |
| 2.4 | Roles ("Atuação") and "Sobre" | Not started | — |
| 2.5 | Cut-out portrait on brand graphics | Not started | — |
| 2.6 | CFM review and release | Not started | Depends on 2.1 to 2.5 |

Acceptance detail: `ROADMAP.md` → Phase 2. Phases 0 and 1: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/2.1-visual-identity`: production and `DEPLOY_TARGET=ghpages` with the private assets, staging with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless (scratchpad only). CI: [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307) on `4c87890` (`pull_request`), assets fetched. Not deployed |
| Checks | `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; `make check`; scroll width at 320, 360, 1280 and 1600 px; screenshots at 360 and 1280 px; `impeccable detect`; Impeccable finish review |
| Result | Contrast 12 pairs, 0 failing. html-validate 0 errors; content 0 failing; photos 0 failing. Requests: 71, 0 failing (19 without the assets); largest image 80 KB (portrait). axe 0 violations, 0 incomplete on 4 runs per build. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1431 ms, CLS ≤ 0.0002. No horizontal scroll at 320–1600 px. Detector: no finding. Finish review: `fix` (selection invisible on `verde-claro`, DESIGN.md out of step, contract quote), all three fixed, verdict pass `ship`. `astro check` 0 errors |

---

## Previous validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.7-pr-checks`, production and `DEPLOY_TARGET=ghpages` with the private assets, staging with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless (scratchpad only). CI: [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420) on `84c74e4` (`pull_request`). Not deployed |
| Checks | `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; the same checks on a copy of the staging build with one rule broken at a time; `check-no-photos.mjs` on a throwaway branch with a committed and then removed `retrato.JPG`; `make check`; `npm audit` |
| Result | Clean builds: html-validate 0 errors; content 0 failing; photos 0 failing; 35 requests, 0 failing (19 without the assets); axe 0 violations, 0 incomplete on 4 runs; Lighthouse mobile Performance 100, Accessibility 100, LCP 1204 ms (752 ms on the placeholder), CLS 0. Every broken rule failed its check (14 cases, `docs/status-log.md`). `astro check` 0 errors; 0 vulnerabilities. CI: every check step passed, assets fetched; Lighthouse Performance 100, Accessibility 100, LCP 1205 ms, CLS 0 |

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
