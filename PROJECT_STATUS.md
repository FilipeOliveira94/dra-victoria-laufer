# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-25 (7.2 verified; phase 7 closed) |
| Current phase | Maintenance (phase 7 closed on 2026-11-25) |
| Phase status | Phase 7 closed: 7.1 and 7.2 verified on 2026-11-25. Phases 0 to 5 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2, 4.1, 5.1 and 5.2 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

Maintenance. Phase 7 closed on 2026-11-25 with 7.1 (Search Console and Bing, home page indexed) and 7.2 (Dependabot, semiannual review, domain renewal reminder) verified. From now on the site changes only through the reminders in [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md), a Dependabot PR, or an issue Filipe orders.

## Next work

1. **Filipe, in the settings:** enable Dependabot security updates (the API still reports them disabled on 2026-11-25); never add `ASSETS_DEPLOY_KEY` to the Dependabot secrets ([runbook](docs/runbooks/maintenance.md)).
2. **Open Dependabot PRs #29 to #34:** five GitHub Actions majors and TypeScript 6 → 7 (npm major), all large under `AGENTS.md` §4 item 11. Each is an issue Filipe orders; none is auto-merged.
3. **Reminders:** the first semiannual review opens on 2027-01-01; the renewal reminder runs monthly (domain expires 2028-11-18).
4. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 7 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 7.1 | Search Console and Bing Webmaster | Verified (home page indexed, 2026-11-25) | `docs/runbooks/search-console.md`; `docs/status-log.md` |
| 7.2 | Maintenance | Verified (dispatch tests on `main`, 2026-11-25) | `docs/runbooks/maintenance.md`; `docs/status-log.md` |

Acceptance detail: `ROADMAP.md` → Phase 7. Phases 0 to 5: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-25 |
| Environment | GitHub Actions on `main` (`workflow_dispatch`) and the repository's Dependabot runs |
| Checks | `domain-renewal.yml` with threshold 60 and 9999 and again with the issue open; `semiannual-review.yml` twice; Dependabot PR list |
| Result | Every run succeeded with the expected outcome; issues #39 and #40 opened, deduplicated and closed; Dependabot PRs #29 to #34. 7.2 verified (`docs/status-log.md`) |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-25 |
| Environment | Published site and Google Search Console (read by Filipe) |
| Checks | URL Inspection of the home page (Filipe); DNS-over-HTTPS TXT query; HTTP status, `robots` meta and `robots.txt` of the live page |
| Result | Home page indexed; verification record present; page 200 and indexable. 7.1 verified (`docs/status-log.md`) |

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
