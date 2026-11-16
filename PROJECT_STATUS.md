# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| | |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (legacy Jekyll site until the 1.1 merge deploys the Astro base) |
| Last updated | 2026-11-16 (1.1 verified: Astro base, PR open) |
| Current phase | Phase 0 — Product and brand, and Phase 1 — New base (MVP), in parallel |
| Phase status | Phase 0 verified (0.1, 0.2 and 0.3); Phase 1 in progress (1.1 verified) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**1.1** — Replace Jekyll with Astro, deployed by Actions. Verified on branch `feat/1.1-astro-base`: local builds checked, marked verified by Filipe on 2026-11-16 before the published-site check, which runs after the merge (acceptance: `ROADMAP.md` → 1.1).

The branch holds an Astro 7.4.12 base with one `noindex` page (name, `MÉDICA`, `CRM-SP 240550`, e-mail). Jekyll and its files are removed. The live site is still the legacy Jekyll site until the merge.

## Next work

1. **1.1 after merge** — Filipe sets the Pages source to "GitHub Actions" before the merge; after it, check the run and the published page (`noindex`, canonical, no 404).
2. **1.2 → 1.3**, then **1.4**, **1.5**, **1.6** and **1.7**, in the dependency order in `ROADMAP.md`.

## Blockers

| Pending | Who | Blocks |
| --- | --- | --- |
| Push of assets commit `c36549d` (`brand/` logos) | Filipe | 1.4 and 2.4 fetching the logos |
| Pages source set to "GitHub Actions" (repository setting) | Filipe | The 1.1 deploy; without it the `deploy` job fails |

Content inputs for Phase 2 are all received: [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md).

Nothing else blocks Phase 1.

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
| 1.1 | Replace Jekyll with Astro, deployed by Actions | Verified | Local builds, both targets; `make check`, `make requests`, `html-validate`. Marked verified by Filipe; published-site check after merge |
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
| Environment | Local build, WSL2. GNU Make 4.4.1, Node.js v22.23.4, npm 10.9.9, Astro 7.4.12. Not a CI run, not the published site |
| Checks | `make build` with and without `DEPLOY_TARGET=ghpages`; `make requests`; `make check`; `npx html-validate@9 dist/index.html`; vetoed-term grep on `src/` and `dist/`; `make contrast` |
| Result | Staging: canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`, `noindex` present, 1 request, 0 failing. Production: canonical `https://dravictorialaufer.com.br/`, `noindex` present. Unknown `DEPLOY_TARGET` stops the build. `astro check` 0 errors; html-validate no errors; no vetoed term; contrast 15/15. Lighthouse and axe are 1.7 and were not run |

---

## Legacy site diagnosis

State of the Jekyll site that issue 1.1 replaces (removed on the 1.1 branch; still live until the merge). It comes from the diagnosis in the approved plan, which was read against the code. Items marked ✔ were re-checked in the code on 2026-11-15; the others are carried from the plan and were not re-measured.

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
| URLs | `baseurl` is empty while the site lives under `/dra-victoria-laufer/` ✔; `url` points at `dravictorialaufer.com.br`, the final domain since 2026-11-16 ✔ | `_config.yml` |
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

All eleven decisions are `approved` and none is implemented, except the license: [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

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

- The live site is indexable with Lorem ipsum and "Atendimento Pediátrico". Mitigation: 1.1 first.
- The CFM checklist covers only the points passed on by Filipe until the full-text check in 2.5.
