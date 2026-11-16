# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (1.4 checked on local builds, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1, 1.2 and 1.3 verified; 1.4 checked locally) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.4** — Images, favicon and fonts. Checked on local builds; PR open. The CI step that fetches the private assets runs only on `main`, so it is checked on the first deploy after the merge.

The portrait comes from `dra-victoria-laufer-assets` through a read-only deploy key (`ASSETS_DEPLOY_KEY`), cropped 4:5 by `scripts/prepare-assets.mjs` and served as AVIF and WebP with `srcset`, declared dimensions and high priority. Without the assets, a neutral 4:5 box replaces it and the favicon stays empty. The favicon comes from the monogram, cropped to its ring. Source Serif 4 and Source Sans 3 are served from the site as WOFF2.

## Next work

1. **1.4** — review, Filipe's OK and merge; then check the deploy run (asset fetch step executed) and the published page.
2. **1.5**, **1.6** and **1.7**, in the dependency order in `ROADMAP.md`. **2.1** can start.
3. **2.6** (new): cut-out portrait on brand graphics, after 2.4. Filipe made it a condition for publication, so **2.5** (removal of `noindex`) waits for it.

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
| 1.4 | Images, favicon and fonts | In progress | Local builds, both targets, with and without the assets; CLS 0.0001; largest image 78.9 KB; CI fetch pending. `docs/status-log.md` |
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
| Environment | Local build, branch `feat/1.4-images-favicon-fonts`. WSL2, Node.js v22.23.4, Astro 7.4.12, sharp 0.35.5; `.assets/` cloned with the new deploy key; T3 browser at 320, 360, 768, 1280 and 1600 px. Not deployed |
| Checks | `make build` with the assets (both targets) and with `ASSETS_DIR=/nonexistent`; `make requests` on both bases; the 200 KB gate with a 253 KB probe; `npx html-validate@9`; `make check`; `make contrast`; layout shift and LCP via `PerformanceObserver`; `scrollWidth` vs `clientWidth`; image-file scan of `git log --all`; vetoed-term grep |
| Result | With the assets: 35 requests, 0 failing on both bases; largest published image 78.9 KB (JPEG fallback, 880 w); CLS 0.00014; LCP element the portrait (AVIF 640 w at 360 px); no horizontal scroll at any width. Without the assets: placeholder box, `data:,` icon, 0 images, 19 requests, 0 failing. Probe flagged at 253 KB. html-validate no errors; `astro check` 0 errors; contrast 15/15; no image file in the history; no vetoed term. Lighthouse and axe are 1.7 and were not run |

---

## Previous validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.3-page-structure`. WSL2, Node.js v22.23.4, npm 10.9.9, Astro 7.4.12; `astro preview` and the T3 browser for layout and 404. Not deployed |
| Checks | `make build` with and without `DEPLOY_TARGET=ghpages`; `make check`; `npx html-validate@9 dist/index.html dist/404.html`; duplicate-id count; `make requests` on both bases; `scrollWidth` vs `clientWidth` at 320, 360, 768, 1024, 1600 px; anchor click; 404 at `/x` and `/a/b/c/` on both bases; contrast of the provisional pairs; `make contrast`; vetoed-term grep |
| Result | 2 pages, exit 0; `astro check` 0 errors; html-validate no errors; 0 duplicate ids; 3 requests, 0 failing, on both bases; no horizontal scroll at any width; `#contato` targets the section, 0 scripts; 404 returned with the page and a link to the base path at every depth; provisional pairs ≥ 7.55:1; contrast 15/15; no vetoed term. Lighthouse and axe are 1.7 and were not run |

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
