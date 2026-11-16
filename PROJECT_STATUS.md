# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (1.7 verified on local builds and PR CI, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1 to 1.7 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.7** — Automatic checks on pull requests. Verified on local builds of both targets, with and without the assets, and on the PR's CI [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420), which fetched the private assets; PR open.

The `build` job of `deploy.yml` now runs, after the build, on every PR and before every deploy: html-validate; requests, anchors and the 200 KB limit; "Lorem" and vetoed terms in `dist/` (`NÃO ESPECIALISTA` excepted); no photo tracked or added by a commit of the branch; axe at 360 and 1280 px; Lighthouse CI mobile (Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5 s, CLS < 0.1). Each rule was broken on purpose and its check failed. The 1.6 merge published cleanly: `published` job of [run 43930780015](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930780015), 23 requests, 0 failing.

## Next work

1. **1.7** — review, Filipe's OK and merge. Filipe decides whether `build` becomes a required status check of `main` (branch protection); without it a failing PR is marked failed but can still be merged.
2. **2.1**.
3. **2.6**: cut-out portrait on brand graphics, after 2.4. Filipe made it a condition for publication, so **2.5** (removal of `noindex`) waits for it.

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
| 1.6 | Technical SEO | Verified | PR CI [run 43930485802](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930485802). Local builds, both targets: description and Open Graph from the identification, canonical/`og:url`/`og:image`/sitemap/robots follow `DEPLOY_TARGET`; social image 60.7 KB; html-validate clean; 35 requests, 0 failing. `docs/status-log.md` |
| 1.7 | Automatic checks on pull requests | Verified | PR CI [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420). Local builds, both targets, with and without the assets: every check passes; each rule broken on purpose fails its check. `docs/status-log.md` |
| 1.8 | License | Delivered | [`LICENSE`](LICENSE), README note. Review by Filipe pending |

Acceptance detail: `ROADMAP.md` → Phase 1.

---

## Latest validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.7-pr-checks`, production and `DEPLOY_TARGET=ghpages` with the private assets, staging with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless (scratchpad only). CI: [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420) on `84c74e4` (`pull_request`). Not deployed |
| Checks | `make lint`, `make requests`, `make axe`, `make lighthouse` on each build; the same checks on a copy of the staging build with one rule broken at a time; `check-no-photos.mjs` on a throwaway branch with a committed and then removed `retrato.JPG`; `make check`; `npm audit` |
| Result | Clean builds: html-validate 0 errors; content 0 failing; photos 0 failing; 35 requests, 0 failing (19 without the assets); axe 0 violations, 0 incomplete on 4 runs; Lighthouse mobile Performance 100, Accessibility 100, LCP 1204 ms (752 ms on the placeholder), CLS 0. Every broken rule failed its check (14 cases, `docs/status-log.md`). `astro check` 0 errors; 0 vulnerabilities. CI: every check step passed, assets fetched; Lighthouse Performance 100, Accessibility 100, LCP 1205 ms, CLS 0 |

---

## Previous validation

| | |
| --- | --- |
| Date | 2026-11-16 |
| Environment | Local build, branch `feat/1.6-technical-seo`, with the private assets and with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, Astro 7.4.12, sharp 0.35.5. CI: [run 43930485802](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930485802) on `0da9aef` (`pull_request`). Not deployed |
| Checks | `make build` (production) and `DEPLOY_TARGET=ghpages`; `<head>` of `index.html` and `404.html`; `dist/sitemap.xml` and `dist/robots.txt`; social image viewed; `make requests` both bases and without the assets; `npx html-validate@9`; `make check`; duplicate ids; vetoed-term and "Lorem" grep on `dist/` |
| Result | Production: canonical, `og:url` and sitemap `https://dravictorialaufer.com.br/`, `og:image` on the same host, robots `Sitemap: https://dravictorialaufer.com.br/sitemap.xml`. Staging: the same four under `https://filipeoliveira94.github.io/dra-victoria-laufer/`. Description and `og:description` "Dra. Victória Laufer, MÉDICA, CRM-SP 240550."; `og:locale` `pt_BR`; 404 without canonical and `og:url`; `noindex` on both pages. Social image 1200 × 630, 60.7 KB, logo only. Without the assets: no `og:image`, build passes, 19 requests, 0 failing. With them: 35 requests, 0 failing, both bases. html-validate no errors; `astro check` 0 errors; 0 duplicate ids; no vetoed term. CI: assets fetched, `social.png` generated, 35 requests, 0 failing |

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
