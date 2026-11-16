# Status log (archive)

Chronological history of project status updates, newest first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) (current phase only; **rewritable**). Architecture docs and ADRs cite this log, or carry the facts inline, for durable evidence.

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
