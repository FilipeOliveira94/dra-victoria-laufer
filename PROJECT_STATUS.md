# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (Astro base from 1.1, `noindex`) |
| Last updated | 2026-11-16 (1.1 verified: Astro base, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.2** — Typed content model. Not started.

1.1 is verified: the published site is the Astro 7.4.12 base, one `noindex` page with name, `MÉDICA`, `CRM-SP 240550` and the e-mail, deployed by `deploy.yml`. The legacy Jekyll site is gone; its diagnosis is archived in [`docs/status-log.md`](docs/status-log.md).

## Next work

1. **1.2** — Typed content model. Depends on 1.1 (verified). Acceptance: `ROADMAP.md` → 1.2.
2. **1.3**, then **1.4**, **1.5**, **1.6** and **1.7**, in the dependency order in `ROADMAP.md`.

## Blockers

| Pending | Who | Blocks |
| --- | --- | --- |
| Push of assets commit `c36549d` (`brand/` logos) | Filipe | 1.4 and 2.4 fetching the logos |

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
| 1.2 | Typed content model | Not started | — |
| 1.3 | Structure and layout of the single page | Not started | — |
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
| Environment | Published site, <https://filipeoliveira94.github.io/dra-victoria-laufer/>, after the 1.1 merge (`d9bddfd`), fetched with curl. The local-build row below is from the same day |
| Published | 200; `lang="pt-BR"`, `noindex`, canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`, icon `data:,`, no other `href`/`src` to request. `/dra-victoria-laufer` → 301 to the trailing slash. Legacy `img/avatar.svg` and `ROADMAP` → 404. Not opened in a browser |
| Local build | WSL2, GNU Make 4.4.1, Node.js v22.23.4, npm 10.9.9, Astro 7.4.12 |
| Checks | `make build` with and without `DEPLOY_TARGET=ghpages`; `make requests`; `make check`; `npx html-validate@9 dist/index.html`; vetoed-term grep on `src/` and `dist/`; `make contrast` |
| Result | Staging: canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`, `noindex` present, 1 request, 0 failing. Production: canonical `https://dravictorialaufer.com.br/`, `noindex` present. Unknown `DEPLOY_TARGET` stops the build. `astro check` 0 errors; html-validate no errors; no vetoed term; contrast 15/15. Lighthouse and axe are 1.7 and were not run |

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
