# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (1.3 verified on local builds, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1, 1.2 and 1.3 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.3** — Structure and layout of the single page. Verified on local builds; PR open, waiting for review and merge.

One column with `<main>`, one `h1`, sections from one list in `src/lib/sections.ts`, anchor navigation without JavaScript, footer with the build year, neutral provisional tokens in `src/styles/tokens.css`, and a 404 page. A section renders only with published content: today the identification and Contato (e-mail). Formação, Atuação, Sobre and the other channels are rendered in 2.1 to 2.3; the skip-navigation link in 1.5.

## Next work

1. **1.3** — review, Filipe's OK and merge; then check the 404 on the published site.
2. **1.4**, **1.5**, **1.6** and **1.7**, in the dependency order in `ROADMAP.md`. **2.1** can start after 1.3.

## Blockers

None. The assets repository holds the `brand/` logos (pushed, per Filipe on 2026-11-16).

Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md).

Nothing blocks Phase 1.

---

## Phase 0 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 0.1 | Record the product context | Verified | [`PRODUCT.md`](PRODUCT.md), approved by Filipe on 2026-11-16 |
| 0.2 | Collect pending inputs | Verified | [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md) |
| 0.3 | Define the visual identity | Verified | [`DESIGN.md`](DESIGN.md), approved by Filipe on 2026-11-16; [ADR-0011](docs/decisions/0011-visual-identity.md); `make contrast` 15/15 |

## Phase 1 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 1.1 | Replace Jekyll with Astro, deployed by Actions | Verified | Local builds, both targets; `make check`, `make requests`, `html-validate`. Published site checked on 2026-11-16 |
| 1.2 | Typed content model | Verified | Local builds; 8 invalid-data cases fail the build; pending item off the page and in the report. `docs/status-log.md` |
| 1.3 | Structure and layout of the single page | Verified | Local builds, both targets; html-validate clean, 0 duplicate ids, no horizontal scroll 320–1600 px, 404 at depth. `docs/status-log.md` |
| 1.4 | Images, favicon and fonts | Not started | — |
| 1.5 | Accessibility, WCAG 2.1 AA | Not started | — |
| 1.6 | Technical SEO | Not started | — |
| 1.7 | Automatic checks on pull requests | Not started | — |
| 1.8 | License | Delivered | [`LICENSE`](LICENSE), README note. Review by Filipe pending |

Acceptance detail: `ROADMAP.md` → Phase 1.

---

## Latest validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.3-page-structure`. WSL2, Node.js v22.23.4, npm 10.9.9, Astro 7.4.12; `astro preview` and the T3 browser for layout and 404. Not deployed |
| Checks | `make build` with and without `DEPLOY_TARGET=ghpages`; `make check`; `npx html-validate@9 dist/index.html dist/404.html`; duplicate-id count; `make requests` on both bases; `scrollWidth` vs `clientWidth` at 320, 360, 768, 1024, 1600 px; anchor click; 404 at `/x` and `/a/b/c/` on both bases; contrast of the provisional pairs; `make contrast`; vetoed-term grep |
| Result | 2 pages, exit 0; `astro check` 0 errors; html-validate no errors; 0 duplicate ids; 3 requests, 0 failing, on both bases; no horizontal scroll at any width; `#contato` targets the section, 0 scripts; 404 returned with the page and a link to the base path at every depth; provisional pairs ≥ 7.55:1; contrast 15/15; no vetoed term. Lighthouse and axe are 1.7 and were not run |

--- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.2-content-model`. WSL2, Node.js v22.23.4, npm 10.9.9, Astro 7.4.12. Not deployed; the published site is still the 1.1 page |
| Checks | `make build` with and without `DEPLOY_TARGET=ghpages`; eight invalid-data builds; one build with the e-mail set to `pendente`; `make requests`; `make check`; `npx html-validate@9 dist/index.html`; vetoed-term grep on `src/` and `dist/`; `make contrast` |
| Result | Every invalid-data build exited 1; the valid build exits 0. With the e-mail pending, the page had no e-mail and the log listed `[pendente] contato/email`. Production `index.html` byte-identical to the 1.1 output. Staging: canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`, `noindex`, 1 request, 0 failing; production 1 request, 0 failing. `astro check` 0 errors; html-validate no errors; no vetoed term; contrast 15/15; `dist/` holds only `index.html`. Lighthouse and axe are 1.7 and were not run |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006: [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-001 | Astro, static, no client JavaScript | 1.1 |
| D-003 | GitHub Pages through Actions | 1.1 |
| D-004 | `DEPLOY_TARGET` | 1.1, 3.2 |
| D-006 | `noindex` until 2.5 | 1.1, 2.5 |
| D-010 | Private assets repository | 1.4 |
| D-011 | Visual identity | 1.4, 2.4 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- The CFM checklist covers only the points passed on by Filipe until the full-text check in 2.5.
