# Status log (archive)

Chronological history of project status updates, newest first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) (current phase only; **rewritable**). Architecture docs and ADRs cite this log, or carry the facts inline, for durable evidence.

---

### 2026-11-15 — Project structure and planning documents

The repository gains its project structure, following the organization of Filipe's `open-data-platform` project and the approved plan v2 with its final adjustments. Added: `AGENTS.md` (agent rules, roles, pull-request workflow, CFM checklist as a mandatory gate, quality thresholds) with `CLAUDE.md` importing it; `ROADMAP.md` (Phases 0 to 7, every issue with objective, scope, out of scope, acceptance, dependencies and size); `PROJECT_STATUS.md`; `DECISIONS.md` with ADR-0001 to ADR-0010 under `docs/decisions/`; `docs/agent-workflow.md`; `docs/architecture/target-site.md`; `docs/compliance/cfm.md`; `docs/project-genesis.md`; a `Makefile`; and a `README.md`. `LICENSE` now restricts MIT to the code and reserves all rights over the texts, name, logo and photos of Dra. Victória Laufer, which delivers issue 1.8 pending Filipe's review of the wording. `.gitignore` gains the Node and Astro entries and keeps the Jekyll ones.

The legacy Jekyll site was not changed: no file under `_includes/`, `_layouts/`, `_posts/`, `css/` or `img/`, nor `_config.yml`, `Gemfile`, `index.html`, `404.html` or the workflow. No part of the target site exists; all ten decisions are `approved` and only D-008 has an implementation.

The commit was made directly on `main` with Filipe's explicit authorization, as a documentation bootstrap. It was not pushed. From the next issue on, work goes through a feature branch and a pull request (`AGENTS.md` §4 and §13).

Checks: `make help` lists the targets; `make install`, `dev`, `build`, `preview`, `lint`, `check` and `lighthouse` each print the "not available yet" notice and exit 0, since there is no `package.json`. GNU Make 4.4.1, Node.js v22.23.4. No site build was run: Bundler is not installed on this machine, so the Jekyll build was not executed, and whether the legacy build publishes the new Markdown files as pages was not confirmed (`PROJECT_STATUS.md` → Known side effect). Diagnosis items marked ✔ in `PROJECT_STATUS.md` were re-read in the code; contrast ratios and the workflow's run history are carried from the plan.

Corrections from Filipe, folded into the same commit before any push: she has three postgraduate courses, not two, and the area and institution of the third are pending in 0.2; the e-mail `victorialaufersaude@gmail.com` is the only one on the site but may change later if she asks, for example because of spam, which is a future decision (ADR-0007).

One point for issue 1.1 came out of writing ADR-0004: `DEPLOY_TARGET` sets `noindex` for staging, while issue 2.5 removes `noindex` before issue 3.2 removes the variable. Issue 1.1 has to define how the flag is released separately from the URL.
