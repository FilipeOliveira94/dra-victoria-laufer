# Status log (archive)

Chronological history of project status updates, newest first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) (current phase only; **rewritable**). Architecture docs and ADRs cite this log, or carry the facts inline, for durable evidence.

---

### 2026-11-16 — Issue 1.2: typed content model

Built on `feat/1.2-content-model`, checked on local builds (Astro 7.4.12, Node.js v22.23.4). Not deployed.

- `src/content.config.ts` defines `medica`, `formacao`, `atuacao` and `contato` with Zod schemas. Each item is either complete (every required field, no unknown one) or `pendente: true` with a `motivo`.
- `src/content/loader.ts` wraps Astro's `file()`: it stops the build when the data file is missing or unreadable, and it prints the pending report as `[pendente] <collection>/<id>: <motivo>` with a count per collection. `file()` alone only logs those errors and keeps the data cached from the last build.
- `src/lib/content.ts` (`published()`) is the only reader and drops pending items. `src/config/captacao.ts` holds `cta` and `atendimento`, both `false`.
- Data in `src/content/data/*.yaml`: name, CRM, the degree, the three postgraduate courses (Neonatologia `emCurso: true`), the six approved "Atuação" lines, "Sobre", the e-mail, WhatsApp `+5512987097380` and Instagram `https://www.instagram.com/pediatria.dravictoria` (both from Filipe, 2026-11-16).
- Workplace names checked on the web. The Unimed line now reads "Complexo Hospitalar Unimed Guarulhos", the name on Unimed's own site (Filipe's decision); the other three are unchanged. Recorded in `docs/inputs/0.2-pending-inputs.md` → 3.
- `index.astro` reads the name, `MÉDICA`, the CRM and the e-mail from the collections; the production `index.html` is byte-identical to the 1.1 output.

Checks:

| Check | Result |
| --- | --- |
| Invalid data | Each case exited 1: required field removed (`crm`); `titulo` other than `MÉDICA`; unknown field (`instituição`); `ano` as text; e-mail without a domain; `pendente: true` with an empty `motivo`; malformed YAML; data file removed |
| Pending item | E-mail set to `pendente`: build exit 0, no e-mail in `dist/index.html`, `[pendente] contato/email` in the log. Restored: no pending item |
| Both targets | `make requests` 1 request, 0 failing, on production and staging; staging canonical and `noindex` as in 1.1 |
| Other | `astro check` 0 errors; `html-validate@9` no errors; vetoed-term grep on `src/` and `dist/` empty; `make contrast` 15/15 |

### 2026-11-16 — Issue 1.1: published-site check

After the 1.1 merge (`d9bddfd`), with the Pages source set to "GitHub Actions" by Filipe, `deploy.yml` published the Astro base. Checked with curl on <https://filipeoliveira94.github.io/dra-victoria-laufer/>:

- 200, the Astro page: `lang="pt-BR"`, `<meta name="robots" content="noindex">`, canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`.
- The only references are the canonical, the inline icon `data:,` and a `mailto:` link, so the page makes no request besides itself and none can 404.
- `/dra-victoria-laufer` without the slash → 301 to `/dra-victoria-laufer/`.
- Legacy files gone: `img/avatar.svg` and `ROADMAP` → 404.

This meets the last acceptance item of 1.1 ("a push to `main` publishes at `/dra-victoria-laufer/` with no 404 request"). The page was not opened in a browser. The legacy-site risk in `ROADMAP.md` is closed, and D-001, D-003, D-004 and D-006 now have an Implemented value. The legacy-site diagnosis moved from `PROJECT_STATUS.md` to this log, below.

<details>
<summary>Legacy site diagnosis (archived from PROJECT_STATUS.md)</summary>

State of the Jekyll site before issue 1.1 replaced it. It comes from the diagnosis in the approved plan, which was read against the code. Items marked ✔ were re-checked in the code on 2026-11-15; the others are carried from the plan and were not re-measured.

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

#### Known side effect of the documentation in this repository

The legacy Jekyll build processes Markdown files at any depth. Until 1.1 removes Jekyll, a push of `main` may publish `ROADMAP.md`, `AGENTS.md`, `DECISIONS.md`, `PROJECT_STATUS.md` and `docs/` as unlinked pages of the site. This was not confirmed with a local build (Bundler is not installed). The repository is public, so nothing private is exposed. Excluding them needs an edit to `_config.yml`, which is legacy site code and was left untouched; the decision is Filipe's.

</details>

---

### 2026-11-16 — Issue 1.1: Astro base verified

The Jekyll site is replaced by an Astro 7.4.12 project (`package.json`, `package-lock.json`, `astro.config.mjs`, `src/`). Removed: `Gemfile`, `_config.yml`, `_includes/`, `_layouts/`, `_posts/`, `css/`, `img/` (including `avatar.svg`), `index.html`, `404.html`, `jekyll-gh-pages.yml` and the Jekyll lines of `.gitignore`. Bootstrap and Minima went with the includes and the Gemfile.

- One page, `lang="pt-BR"`, with the facts Filipe approved for it: "Dra. Victória Laufer", `MÉDICA · CRM-SP 240550`, the e-mail. No CSS, no script.
- `DEPLOY_TARGET` (ADR-0004) sets `site` and `base` in `astro.config.mjs`; unset is production, `ghpages` is staging, any other value stops the build.
- `noindex` comes from `indexable = false` in `src/config/release.ts`, independent of the host (ADR-0006, defined here as ADR-0004 asked; approved by Filipe).
- `<link rel="canonical">` is emitted so the build shows its URLs; issue 1.6 completes the metadata. `<link rel="icon" href="data:,">` stops the browser's automatic `/favicon.ico` request, which would 404 at the root of `github.io`; 1.4 adds the real favicon.
- `.github/workflows/deploy.yml` builds with `DEPLOY_TARGET: ghpages`, runs `scripts/check-requests.mjs`, uploads `dist/` and deploys. `.nvmrc` pins Node.js 22.23.4, the minimum Astro 7 accepts.
- `make` targets call the npm scripts directly; `make requests` is new; `lint` and `lighthouse` print a notice until 1.7.

Checks (local build, WSL2, Node.js 22.23.4; not CI, not the published site): `make build` without the variable gives canonical `https://dravictorialaufer.com.br/` and `noindex`; with `DEPLOY_TARGET=ghpages`, canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/` and `noindex`; `DEPLOY_TARGET=foo` fails with the error message. `make requests BASE=/dra-victoria-laufer/`: 1 request, 0 failing; the script fails on a test page with a missing stylesheet (404) and a CDN script (third party). `make check` (`astro check`): 0 errors. `npx html-validate@9 dist/index.html`: no errors. Grep for `lorem`, `pediatra`, `especialista em` in `src/` and `dist/`: no match. `make contrast`: 15/15.

The published-site acceptance is in the entry above.

---

### 2026-11-16 — Issue 0.3: visual identity verified

[`DESIGN.md`](../DESIGN.md) records the brand Filipe confirmed from Dra. Victória's logo and palette, through the Impeccable new-surface flow. The direction roll was skipped under the flow's pinned-direction exception: the client fixed the palette ("Manter paleta no verde, lilás/roxo, azul, amarelo, mas podemos mudar as fontes das letras para fontes mais sóbrias") and the logo, and the brief in `ROADMAP.md` fixes the page sequence and first fold. `.impeccable/design.json` carries the sidecar (colour ramps, nine component snippets, narrative). ADR-0011 and D-011 record the decision.

Decisions by Filipe: Source Serif 4 with Source Sans 3 (option A of three); green, yellow and white lead, her original theme, over the first blue-on-cream proposal; lilac `#B78BC5` (sampled from the image she sent, the same value as the legacy site) as a secondary colour. To keep her green and yellow without failing contrast, they are used as grounds only and text uses her blue or `#135A55`, her green darkened. Fifteen text pairs are allowed; any other pair is not.

Logo: her files carry a tagline that does not follow the Art. 13 format, and the only variant without it drops the accent from "Victória". At Filipe's request the tagline was removed from the horizontal (colour, white, black) and vertical (white, black) logos by deleting the connected components of the artwork below the name. Each file lost 94 components and no kept component crosses the cut; the horizontal colour and vertical black results were inspected. Rewriting the tagline in the Art. 13 format was not done: the original font is not available and the condensed course names are not the official ones. The derived logos, her three monogram files and every original are in `dra-victoria-laufer-assets` under `brand/`, metadata stripped. Only PNG sources exist.

Other files: `scripts/check-contrast.mjs` and `make contrast`; `AGENTS.md` §6, `PRODUCT.md`, `README.md` and `docs/architecture/target-site.md` now point to `DESIGN.md` instead of saying the brand is undecided. 2.4 is no longer blocked by the brand.

Checks: `make contrast` passes 15 of 15 pairs (lowest 4.70:1); a copy with `verde-marca` text on `branco` fails at 2.44:1. `grep -niE` for `pediatra`, `especialista em`, `neonatologista`, `intensivista`, `área de atuação`, `lorem` on the new and changed files: no match. No site build exists, so no rendered check applies. Filipe approved `DESIGN.md` on 2026-11-16, which meets the acceptance with the contrast check; D-011 is `approved`.

---

### 2026-11-16 — Issue 0.1: product context recorded

[`PRODUCT.md`](../PRODUCT.md) records the product context through the Impeccable init flow (schema 1): platform `web`; the decided stack; users (parents, colleagues, contracting parties checking who she is); purpose (credibility first, acquisition behind flags); positioning (checkable facts in the CFM form); operating context; what the page shows and its hard limits; brand commitments limited to name, registration, voice and the absence of a confirmed brand; the evidence received in 0.2 and what must not be fabricated; five product principles; the accessibility standard. Rules are linked to `cfm.md`, the 0.2 ledger and the ADRs, not copied.

Filipe decided that the brief's page sequence and mode are surface strategy: they stay in `ROADMAP.md` → Design brief, linked from `PRODUCT.md`. The anti-goals and the first-fold identification (a CFM requirement) are in `PRODUCT.md`. No `.impeccable/` config and no live mode were set up: the Jekyll site is replaced in 1.1 and the scope is the product record only.

Checks: `grep -niE` for `pediatra`, `especialista em`, `neonatologista`, `intensivista`, `área de atuação`, `lorem` and `todo` on `PRODUCT.md`: no match. Every fact was compared with `cfm.md` and the 0.2 ledger. No site build applies. Filipe approved the file on 2026-11-16, which meets the acceptance.

In the same review Filipe changed the final domain from `victorialaufer.com.br` to `dravictorialaufer.com.br`. Updated: `PRODUCT.md`, `ROADMAP.md` (Phase 3), `README.md`, `DECISIONS.md`, ADR-0003, ADR-0004, `docs/architecture/target-site.md`, and the legacy diagnosis in `PROJECT_STATUS.md` (the legacy `_config.yml` `url` already names it). `docs/project-genesis.md` keeps the original with a dated note. Legacy site code was not changed.

---

### 2026-11-15 — Issue 0.2: pending inputs collected

Every content input that only Dra. Victória can provide was received through Filipe and recorded in [`docs/inputs/0.2-pending-inputs.md`](inputs/0.2-pending-inputs.md): the degree (Medicina, UNIVASF, 2021); the official names and institutions of the three postgraduate courses; the roles for "Atuação" with current workplaces and start years (2022; intensive care since 2024), approved; the text "Sobre", drafted at Filipe's request and approved; the main portrait with its right of use (bought from the photographer).

The portrait is stored as `photos/portrait-main.jpg` in the private repository `dra-victoria-laufer-assets`, created by Filipe. The JPEG (2000 × 1333) had no EXIF, XMP or IPTC segment; it went through a metadata strip that kept only JFIF, the ICC profile and the image data. The assets commit was made locally; Filipe pushes it. Hospital photos are not used or stored: they show patients or staff.

Decisions by Filipe, recorded with their source in `docs/compliance/cfm.md`:

- "Atuação" names current workplaces and a start year. A wording rule for roles and experience was added, from the text of Resolution CFM 2.336/2023 (Art. 4, 7, 11, 13): function and setting, never a specialty title or a treatment claim. `neonatologista`, `intensivista` and `área de atuação` joined the vetoed terms. The "numbers" anti-goal now means statistics.
- None of the courses is registered at the CREMESP, which has frozen registration; the planning record of two registered courses was wrong. Filipe decided to show them in the Art. 13 format with `NÃO ESPECIALISTA`, without consulting the CREMESP, and to remove `noindex` in 2.5 regardless of the registration. Art. 13, §1, d reads "devidamente cadastrado no CRM"; the divergence is recorded as a risk. Neonatologia is in progress and is shown as "(em curso)".

Checks: the resolution text was read from the CREMERJ copy (PDF text extracted locally); the HCX FMUSP course page confirmed "Especialização em Pediatria Clínica"; the Faculdade Sírio-Libanês page renders by JavaScript and was not read, so that name comes from Filipe. The ledger has no vetoed term (`grep` for `pediatra`, `especialista em`, `Lorem`: no match). No site build exists yet, so no rendered check applies.

---

### 2026-11-15 — Project structure and planning documents

The repository gains its project structure, following the organization of Filipe's `open-data-platform` project and the approved plan v2 with its final adjustments. Added: `AGENTS.md` (agent rules, roles, pull-request workflow, CFM checklist as a mandatory gate, quality thresholds) with `CLAUDE.md` importing it; `ROADMAP.md` (Phases 0 to 7, every issue with objective, scope, out of scope, acceptance, dependencies and size); `PROJECT_STATUS.md`; `DECISIONS.md` with ADR-0001 to ADR-0010 under `docs/decisions/`; `docs/agent-workflow.md`; `docs/architecture/target-site.md`; `docs/compliance/cfm.md`; `docs/project-genesis.md`; a `Makefile`; and a `README.md`. `LICENSE` now restricts MIT to the code and reserves all rights over the texts, name, logo and photos of Dra. Victória Laufer, which delivers issue 1.8 pending Filipe's review of the wording. `.gitignore` gains the Node and Astro entries and keeps the Jekyll ones.

The legacy Jekyll site was not changed: no file under `_includes/`, `_layouts/`, `_posts/`, `css/` or `img/`, nor `_config.yml`, `Gemfile`, `index.html`, `404.html` or the workflow. No part of the target site exists; all ten decisions are `approved` and only D-008 has an implementation.

The commit was made directly on `main` with Filipe's explicit authorization, as a documentation bootstrap. It was not pushed. From the next issue on, work goes through a feature branch and a pull request (`AGENTS.md` §4 and §13).

Checks: `make help` lists the targets; `make install`, `dev`, `build`, `preview`, `lint`, `check` and `lighthouse` each print the "not available yet" notice and exit 0, since there is no `package.json`. GNU Make 4.4.1, Node.js v22.23.4. No site build was run: Bundler is not installed on this machine, so the Jekyll build was not executed, and whether the legacy build publishes the new Markdown files as pages was not confirmed (`PROJECT_STATUS.md` → Known side effect). Diagnosis items marked ✔ in `PROJECT_STATUS.md` were re-read in the code; contrast ratios and the workflow's run history are carried from the plan.

Corrections from Filipe, folded into the same commit before any push: she has three postgraduate courses, not two, and the area and institution of the third are pending in 0.2; the e-mail `victorialaufersaude@gmail.com` is the only one on the site but may change later if she asks, for example because of spam, which is a future decision (ADR-0007).

One point for issue 1.1 came out of writing ADR-0004: `DEPLOY_TARGET` sets `noindex` for staging, while issue 2.5 removes `noindex` before issue 3.2 removes the variable. Issue 1.1 has to define how the flag is released separately from the URL.
