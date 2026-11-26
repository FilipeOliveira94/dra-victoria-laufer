# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-25 (7.1 verified) |
| Current phase | Phase 7 — Monitoring; maintenance once 7.2 is verified |
| Phase status | 7.1 verified (home page indexed, 2026-11-25); 7.2 merged (PR #28, `e93068b`), verified by its `workflow_dispatch` tests. Phases 0 to 5 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2, 4.1, 5.1 and 5.2 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**7.2** — Maintenance, merged as `e93068b` (PR #28), ordered by Filipe on 2026-11-20: Dependabot (`.github/dependabot.yml`), the semiannual review issue (`semiannual-review.yml`) and the domain renewal reminder (`domain-renewal.yml`). `deploy.yml` does not change. Runbook: [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md). Once 7.2 is verified, phase 7 closes and the project is in maintenance: the site changes only through those reminders, a Dependabot PR, or an issue Filipe orders.

7.1 is `verified`: merged (PR #27, `b91aaa7`) and published by `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666); the Search Console property is verified and, on 2026-11-25, Filipe confirmed the home page indexed in URL Inspection.

## Next work

1. **7.2** PR #28 merged as `e93068b`; its `deploy.yml` [run 44671283048](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44671283048) succeeded (recorded in `docs/status-log.md`).
2. **7.2 after the merge:** dispatch `domain-renewal.yml` (default threshold: no issue; `threshold_days=9999`: issue, then closed) and `semiannual-review.yml` (issue, then closed); confirm Dependabot's first run; record the runs.
3. **Filipe, in the settings:** enable Dependabot security updates; never add `ASSETS_DEPLOY_KEY` to the Dependabot secrets ([runbook](docs/runbooks/maintenance.md)).
4. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 7 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 7.1 | Search Console and Bing Webmaster | Verified (home page indexed, 2026-11-25) | `docs/runbooks/search-console.md`; `docs/status-log.md` |
| 7.2 | Maintenance | In progress: merged (PR #28, `e93068b`); dispatch tests pending | `docs/runbooks/maintenance.md`; `docs/status-log.md` |

Acceptance detail: `ROADMAP.md` → Phase 7. Phases 0 to 5: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-25 |
| Environment | Published site and Google Search Console (read by Filipe) |
| Checks | URL Inspection of the home page (Filipe); DNS-over-HTTPS TXT query; HTTP status, `robots` meta and `robots.txt` of the live page |
| Result | Home page indexed; verification record present; page 200 and indexable. 7.1 verified (`docs/status-log.md`) |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-20 |
| Environment | Branch `chore/7.2-maintenance`: local build, local runs of the workflow scripts with a stub `gh`, and PR #28 CI [run 44667244795](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44667244795) on `c555a64` |
| Checks | `make build`, `make lint`, `make check`; actionlint 1.7.7 with shellcheck 0.11.0; `check-jsonschema` (Dependabot and workflow schemas); the PR's CI |
| Result | Every check passed; detail in `docs/status-log.md` (7.2 entry) |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-003 | Hosting on GitHub Pages at `dravictorialaufer.com.br`, built and deployed by `deploy.yml`; the domain is registered at Registro.br | 7.2 (the maintenance workflows sit beside `deploy.yml` and do not change it) |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Public e-mail and WhatsApp attract clinical messages through an informal channel: the notice is 5.1 (ADR-0007).
- Scheduled workflows are disabled by GitHub after 60 days without repository activity: re-enable them (`docs/runbooks/maintenance.md`).
- Dependabot PRs build on the placeholder by decision (`AGENTS.md` §12 exception; the deploy key stays away from updated dependencies): the evidence with the real assets is the `deploy.yml` build on `main` after the merge, which publishes nothing if it fails; a failure is reverted or fixed in its own PR.
- Deleting a TXT record in Registro.br drops the Search Console and Bing verification: rule in `docs/runbooks/search-console.md`.
- CFM: every new text runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
