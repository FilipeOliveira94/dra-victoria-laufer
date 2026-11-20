# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-20 (7.2 on PR #28; phase 7 closes with its merge) |
| Current phase | Phase 7 — Monitoring; maintenance after the 7.2 merge |
| Phase status | 7.1 verified (home page indexing in URL Inspection still to be confirmed); 7.2 built on PR #28, verified by the `workflow_dispatch` tests right after the merge. Phases 0 to 5 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2, 4.1, 5.1 and 5.2 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**7.2** — Maintenance, PR #28 on `chore/7.2-maintenance`, ordered by Filipe on 2026-11-20: Dependabot (`.github/dependabot.yml`), the semiannual review issue (`semiannual-review.yml`) and the domain renewal reminder (`domain-renewal.yml`). `deploy.yml` does not change. Runbook: [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md). With its merge phase 7 closes and the project is in maintenance: the site changes only through those reminders, a Dependabot PR, or an issue Filipe orders.

7.1 is merged (PR #27, `b91aaa7`) and published: `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666), `build`, `deploy` and `published` success. The Search Console property is verified; the home page shown as indexed in URL Inspection is still to be confirmed by Filipe.

## Next work

1. **7.2** PR #28: PO and Reviewer approval on the same head (large change: workflows with `issues: write`), then Filipe's OK and the merge.
2. **7.2 after the merge:** dispatch `domain-renewal.yml` (default threshold: no issue; `threshold_days=9999`: issue, then closed) and `semiannual-review.yml` (issue, then closed); confirm Dependabot's first run; record the runs.
3. **Filipe, in the settings:** enable Dependabot security updates; optionally add `ASSETS_DEPLOY_KEY` as a Dependabot secret ([runbook](docs/runbooks/maintenance.md)).
4. **7.1**: Filipe confirms the home page as indexed in URL Inspection.
5. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 7 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 7.1 | Search Console and Bing Webmaster | Verified (home page indexing to be confirmed) | `docs/runbooks/search-console.md`; `docs/status-log.md` |
| 7.2 | Maintenance | In progress: built on PR #28; dispatch tests after the merge | `docs/runbooks/maintenance.md`; `docs/status-log.md` |

Acceptance detail: `ROADMAP.md` → Phase 7. Phases 0 to 5: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-20 |
| Environment | Branch `chore/7.2-maintenance`: local build, local runs of the workflow scripts with a stub `gh`, and PR #28 CI [run 44667244795](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44667244795) on `c555a64` |
| Checks | `make build`, `make lint`, `make check`; actionlint 1.7.7 with shellcheck 0.11.0; `check-jsonschema` (Dependabot and workflow schemas); the PR's CI |
| Result | Every check passed; detail in `docs/status-log.md` (7.2 entry) |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-20 |
| Environment | Published site, after the 7.1 merge (`b91aaa7`): `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666) |
| Checks | Jobs of the run (`gh run view`) |
| Result | `build`, `deploy` and `published` success |

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
- Dependabot PRs build on the placeholder unless `ASSETS_DEPLOY_KEY` is also a Dependabot secret: check the private-assets step before merging.
- Deleting a TXT record in Registro.br drops the Search Console and Bing verification: rule in `docs/runbooks/search-console.md`.
- CFM: every new text runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
