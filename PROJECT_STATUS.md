# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (1.5 verified on local builds and PR CI, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1 to 1.5 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.5** — Accessibility, WCAG 2.1 AA. Verified on local builds, both targets, and on the PR's CI [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810), which fetched the private assets; PR open.

Every page starts with a skip link to `<main id="conteudo">`. Keyboard focus shows a 2px ring with 2px offset (`--color-focus`, inverse on the footer); 2.4 swaps the colour for `verde-profundo`. The contact link is read as "E-mail: " plus the address, with the channel as `title` (DESIGN.md). A `prefers-reduced-motion` rule removes any animation, transition or smooth scroll later issues add. The 1.4 merge published cleanly: `published` job of [run 43909335126](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43909335126), 0 failing requests.

## Next work

1. **1.5** — review, Filipe's OK and merge. The `published` job of that deploy is cited in the next PR.
2. **1.6** and **1.7**. **2.1** can start.
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
| 1.4 | Images, favicon and fonts | Verified | Local builds, both targets, with and without the assets; CLS 0.0001; largest image 78.9 KB; PR CI [run 43908574612](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43908574612). `docs/status-log.md` |
| 1.5 | Accessibility, WCAG 2.1 AA | Verified | Local builds, both targets: axe 0 violations, Lighthouse mobile Accessibility 100 (home and 404), keyboard walk complete, skip link to `<main>`; PR CI [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810). `docs/status-log.md` |
| 1.6 | Technical SEO | Not started | — |
| 1.7 | Automatic checks on pull requests | Not started | — |
| 1.8 | License | Delivered | [`LICENSE`](LICENSE), README note. Review by Filipe pending |

Acceptance detail: `ROADMAP.md` → Phase 1.

---

## Latest validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.5-accessibility`, with the private assets. WSL2, Node.js v22.23.4, Astro 7.4.12; `astro preview` on both bases; Chrome for Testing 157.0.8103.78 headless (scratchpad only, not a project dependency) driven by puppeteer-core, axe-core 4.14.1, Lighthouse 12.8.2. CI: [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810) on `f19ba4d` (`pull_request`). Not deployed |
| Checks | axe (WCAG 2.0/2.1 A and AA plus best practice) at 360 and 1280 px on the home and on a 404 at depth, both bases; Tab walk to the end of each page; skip link with Tab + Enter; `prefers-reduced-motion: reduce` emulated; Lighthouse mobile on the home (both bases) and on `404.html`; `make build` both targets; `make check`; `npx html-validate@9`; duplicate ids; `make requests` both bases; `make contrast`; `scrollWidth` vs `clientWidth` at 320–1600 px; vetoed-term grep |
| Result | axe 0 violations, 0 incomplete on every page and width. Tab order: skip link, "Contato", "E-mail: victorialaufersaude@gmail.com"; on the 404: skip link, "Ir para a página inicial"; each with a 2px solid ring, 2px offset. Skip link moves focus to `#conteudo`; the next Tab lands on the first link in `<main>`. Reduced motion: transition and animation 0 s, scroll `auto`. Lighthouse mobile: Accessibility 100, Performance 100, LCP 1.2 s, CLS 0, on both bases; 404 Accessibility 100. html-validate no errors; 0 duplicate ids; `astro check` 0 errors; 35 requests, 0 failing, both bases; contrast 15/15; no horizontal scroll; no vetoed term. CI: assets fetched, portrait and favicon in the build, 35 requests, 0 failing. The footer focus ring was not exercised: the footer has no link yet |

---

## Previous validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.4-images-favicon-fonts`. WSL2, Node.js v22.23.4, Astro 7.4.12, sharp 0.35.5; `.assets/` cloned with the new deploy key; T3 browser at 320, 360, 768, 1280 and 1600 px. CI: [run 43908574612](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43908574612) on `f191c3e` (`pull_request`). Not deployed |
| Checks | `make build` with the assets (both targets) and with `ASSETS_DIR=/nonexistent`; `make requests` on both bases; the 200 KB gate with a 253 KB probe; `npx html-validate@9`; `make check`; `make contrast`; layout shift and LCP via `PerformanceObserver`; `scrollWidth` vs `clientWidth`; image-file scan of `git log --all`; vetoed-term grep |
| Result | With the assets: 35 requests, 0 failing on both bases; largest published image 78.9 KB (JPEG fallback, 880 w); CLS 0.00014; LCP element the portrait (AVIF 640 w at 360 px); no horizontal scroll at any width. Without the assets: placeholder box, `data:,` icon, 0 images, 19 requests, 0 failing. Probe flagged at 253 KB. html-validate no errors; `astro check` 0 errors; contrast 15/15; no image file in the history; no vetoed term. CI: assets fetched, portrait and favicon in the build, 35 requests, 0 failing; built site uploaded as `site-pr-9`. Lighthouse and axe are 1.7 and were not run |

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
