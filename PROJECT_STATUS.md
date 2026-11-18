# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-18 (2.3 verified, PR #17 awaiting merge) |
| Current phase | Phase 2 — Credibility content under the CFM rules (MVP), the last phase before the initial release |
| Phase status | Phase 2 in progress (2.1 to 2.3 verified). Phases 0 and 1 closed: 0.1 to 0.3 and 1.1 to 1.8 verified |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**2.3** — Formação: the course cards in the Art. 13 format, on the 2.2 frame. Delivered in PR #17; its CI [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093) passed with the private assets. Filipe approved it on 2026-11-18: verified.

The last merge (`3655ad7`, docs table headers) published cleanly: `published` job of [run 44165512281](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44165512281), success.

## Next work

1. **2.3** PR #17: merge by the Reviewer; read the `published` job of its run.
2. **2.4** Atuação (leaf markers) and Sobre (clearing), each a complete section on the 2.2 frame. With four header links, check that the phone nav row does not change height between the fallback font and Source Sans 3 (the cause of the CLS fixed in 2.3).
3. **2.5** cut-out portrait on brand graphics: Filipe made it a condition for publication.
4. **2.6** design critique and polish on the whole page, CFM review and release (removal of `noindex`).

## Blockers

None. Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md). The brand is confirmed in [`DESIGN.md`](DESIGN.md) (0.3).

---

## Phase 2 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 2.1 | Apply the confirmed visual identity | Verified | PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307); local builds, both targets, with and without the assets: every check passes; screenshots approved by Filipe as the base. `docs/status-log.md` |
| 2.2 | Identification and contact | Verified | PR #15 CI [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315); local builds, both targets, with and without the assets: every check passes; screenshots approved by Filipe. `docs/status-log.md` |
| 2.3 | Training ("Formação") | Verified | Local builds, both targets, with and without the assets: every check passes; approved by Filipe. PR #17 CI [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093). `docs/status-log.md` |
| 2.4 | Roles ("Atuação") and "Sobre" | Not started | — |
| 2.5 | Cut-out portrait on brand graphics | Not started | — |
| 2.6 | CFM review and release | Not started | Depends on 2.1 to 2.5 |

Acceptance detail: `ROADMAP.md` → Phase 2. Phases 0 and 1: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-17 |
| Environment | Local build, branch `feat/2.3-formacao`: production and `DEPLOY_TARGET=ghpages` with the private assets, `DEPLOY_TARGET=ghpages` with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless (scratchpad only). Not deployed. CI: [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093) on `40c9e29` (`pull_request`), assets fetched |
| Checks | `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; computed style of the course line against `NÃO ESPECIALISTA`; a course marked `pendente`, and one without `nomeOficial`; header and `main` geometry at 360 and 412 px with fonts or images blocked; columns at 899 and 900 px; scroll width every 40 px from 320 to 1600 px; keyboard path; accessibility tree of the section; screenshots at 360 and 1280 px |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content and photos 0 failing. Requests: 68, 0 failing (19 without the assets). axe 0 violations, 0 incomplete on 4 runs per build. Lighthouse mobile Performance 100, Accessibility 100, LCP 1504–1582 ms (902–903 ms on the placeholder), CLS ≤ 0.0003. `NÃO ESPECIALISTA` identical to the line (Source Sans 3, 18 px, 600, `verde-profundo` on `verde-claro`, 7.14:1), on one line. The pending course is absent from `dist/` and listed in the build report; a course without `nomeOficial` breaks the build. Header 109 px at 360 and 412 px with or without the fonts. 1 column at 899 px, 2 at 900 px. No horizontal scroll at 320–1600 px. Tab: skip link, Formação, Contato, e-mail, WhatsApp, Instagram; focus ring 2 px. `EM CURSO` read after `HCX Fmusp` |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-17 |
| Environment | Local build, branch `feat/2.2-identification-contact` at `6952116`: production and `DEPLOY_TARGET=ghpages` with the private assets, staging with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless (scratchpad only). CI: [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315) on `6952116` (`pull_request`), assets fetched. Not deployed |
| Checks | `make check`, `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; portrait box with images blocked and loaded at 320, 412 and 1280 px; scroll width every 40 px from 320 to 1600 px; screenshots at 360 and 1280 px |
| Result | `astro check` 0 errors. html-validate 0 errors; content 0 failing; photos 0 failing. Requests: 68, 0 failing (19 without the assets). axe 0 violations, 0 incomplete on 4 runs per build. Lighthouse mobile Performance 100, Accessibility 100, LCP 1504–1581 ms, CLS ≤ 0.0002. Portrait box identical before and after load. No horizontal scroll at 320–1600 px |

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
