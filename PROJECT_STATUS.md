# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (legacy Jekyll site) |
| Last updated | 2026-11-15 (0.2 verified: every input received) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | In progress (0.2 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.1** — Replace Jekyll with Astro, deployed by Actions. Not started.

The repository holds the legacy Jekyll site plus the project structure. No part of the target site exists yet. The legacy site is live and indexable, with placeholder text and wording that suggests a specialty, so 1.1 comes first: it publishes the new base as `noindex`.

## Next work

1. **0.1** — Record the product context (`PRODUCT.md`). Unblocked: the design brief is confirmed. Acceptance: `ROADMAP.md` → 0.1.
2. **1.1** — Replace Jekyll with Astro, deployed by Actions. No dependency. Acceptance: `ROADMAP.md` → 1.1.
3. **1.2 → 1.3**, then **1.4**, **1.5**, **1.6** and **1.7**, in the dependency order in `ROADMAP.md`.

## Blockers

| Pending | Who | Blocks |
| --- | --- | --- |
| Confirmation of logo, palette and typography | Filipe | 0.3 and 2.4, and therefore the release in 2.5 |

Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md).

Nothing blocks 0.1 or Phase 1.

---

## Phase 0 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 0.1 | Record the product context | Not started | — |
| 0.2 | Collect pending inputs | Verified | [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md) |
| 0.3 | Define the visual identity | Blocked | Waiting for Filipe |

## Phase 1 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 1.1 | Replace Jekyll with Astro, deployed by Actions | Not started | — |
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
| Date | 2026-11-15 |
| Environment | Local checkout, WSL2. GNU Make 4.4.1, Node.js v22.23.4. Bundler is not installed |
| Checks | `make help` and each Astro target (`install`, `dev`, `build`, `preview`, `lint`, `check`, `lighthouse`) with no `package.json` present |
| Result | Each target prints the "not available until issue 1.1" notice and exits 0. No site build was run: the Jekyll build was not executed locally, and no Lighthouse, validator or axe run exists yet |

---

## Legacy site diagnosis

State of the Jekyll site that issue 1.1 replaces. It comes from the diagnosis in the approved plan, which was read against the code. Items marked ✔ were re-checked in the code on 2026-11-15; the others are carried from the plan and were not re-measured.

**Stack:** Jekyll through the `github-pages` gem, Minima theme, Bootstrap 5.3 from a CDN. Published from the `main` branch.

| Area | Finding | Where |
| --- | --- | --- |
| Content | All body text is Lorem ipsum ✔ | `_includes/` |
| CFM | Title "Médica Generalista \| Atendimento Pediátrico" and `<title>` "Atendimento Pediátrico" suggest a specialty ✔ | `_config.yml`, `_includes/head.html` |
| CFM | Service titles "Atendimento Pediátrico", "Puericultura", "Consultas de Emergência" suggest a specialty | `_includes/servicos.html` |
| CFM | The site description is self-promotion ✔ | `_config.yml` |
| Media | Logo `img/logovictoria.png` is referenced and missing (404) ✔; no favicon | `_includes/navbar.html` |
| Media | `img/avatar.svg` is about 3.9 MB ✔ and is used 7 times, including as the LCP image with `loading="lazy"` ✔ | `_includes/` |
| Language | The page language falls back to `en` ✔ | `_layouts/base.html` |
| URLs | `baseurl` is empty while the site lives under `/dra-victoria-laufer/` ✔; `url` points at `dravictorialaufer.com.br`, not the planned domain ✔ | `_config.yml` |
| URLs | `href="/"` on the logo and the footer leaves the site; relative paths break the 404 page in nested URLs | `navbar.html`, `footer.html`, `head.html`, `404.html` |
| Navigation | Menu anchors are swapped; no link to Formação or to `#servicos`; "Conheça Mais" links point at `#` | `_includes/navbar.html`, includes |
| Contrast | White on `#b78bc5` about 2.8:1; in `#formacao`, text about 2.8:1 and the link about 1.8:1 (manual calculation in the plan) | `css/` |
| HTML | Several `h1`, duplicate IDs ✔, `</img>` ✔, an unclosed `div` in the footer; no `<main>`, no skip link; `aria-label` in English; social icons without accessible names | includes |
| CSS | `a:hover` in white disappears on light backgrounds; `padding-top:80` without a unit; native nesting without fallback | `css/` |
| SEO | No meta description, `jekyll-seo-tag`, sitemap, `robots.txt` or schema.org | `_includes/head.html` |
| Performance | Bootstrap Icons (a whole font for 5 icons) and Google Fonts block rendering | `_includes/head.html` |
| Consistency | `_config.yml` has `victorialaufer@gmail.com` and the footer has `victorialaufersaude@gmail.com` ✔; "© 2025" is fixed ✔; WhatsApp only in the footer ✔ | `_config.yml`, `_includes/footer.html` |
| Build | `Gemfile.lock` is git-ignored ✔; `sass-embedded` in the Gemfile is unused; `_posts/template.markdown` is a sample post ✔ | `.gitignore`, `Gemfile`, `_posts/` |
| Deploy | `jekyll-gh-pages.yml` triggers on push to `main` ✔; the plan reports it has no runs, which points to the Pages source being "Deploy from a branch". That setting is in the repository settings and was not checked here | `.github/workflows/` |

### Known side effect of the documentation in this repository

The legacy Jekyll build processes Markdown files at any depth. Until 1.1 removes Jekyll, a push of `main` may publish `ROADMAP.md`, `AGENTS.md`, `DECISIONS.md`, `PROJECT_STATUS.md` and `docs/` as unlinked pages of the site. This was not confirmed with a local build (Bundler is not installed). The repository is public, so nothing private is exposed. Excluding them needs an edit to `_config.yml`, which is legacy site code and was left untouched; the decision is Filipe's.

---

## Decisions (active)

All ten decisions of the plan are `approved` and none is implemented, except the license: [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-001 | Astro, static, no client JavaScript | 1.1 |
| D-003 | GitHub Pages through Actions | 1.1 |
| D-004 | `DEPLOY_TARGET` | 1.1, 3.2 |
| D-006 | `noindex` until 2.5 | 1.1, 2.5 |
| D-010 | Private assets repository | 1.4 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- The live site is indexable with Lorem ipsum and "Atendimento Pediátrico". Mitigation: 1.1 first.
- The brand has no confirmation date. Everything except 0.3 and 2.4 moves in parallel.
- The CFM checklist covers only the points passed on by Filipe until the full-text check in 2.5.
