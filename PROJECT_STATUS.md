# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-20 (7.2 in progress; 7.1 merged and published) |
| Current phase | Phase 7 — Monitoring |
| Phase status | 7.1 verified (home page indexing in URL Inspection still to be confirmed); 7.2 in progress. Phases 0 to 5 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2, 4.1, 5.1 and 5.2 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**7.2** (in progress) — Maintenance, on `chore/7.2-maintenance`, ordered by Filipe on 2026-11-20: Dependabot, a semiannual review issue and a domain renewal reminder, as scheduled GitHub Actions workflows. `deploy.yml` does not change.

7.1 is merged (PR #27, `b91aaa7`) and published: `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666), `build`, `deploy` and `published` success. The Search Console property is verified; the home page shown as indexed in URL Inspection is still to be confirmed by Filipe.

## Next work

1. **7.2** PR: PO and Reviewer approval on the same head (large change: workflows with `issues: write`), then Filipe's OK.
2. **7.1**: Filipe confirms the home page as indexed in URL Inspection.
3. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 7 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 7.1 | Search Console and Bing Webmaster | Verified (home page indexing to be confirmed) | `docs/runbooks/search-console.md`; `docs/status-log.md` |
| 7.2 | Maintenance | In progress | Branch `chore/7.2-maintenance` |

Acceptance detail: `ROADMAP.md` → Phase 7. Phases 0 to 5: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-20 |
| Environment | Published site, after the 7.1 merge (`b91aaa7`): `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666) |
| Checks | Jobs of the run (`gh run view`) |
| Result | `build`, `deploy` and `published` success |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-19 |
| Environment | Published site, after the 5.2 merge (`58e236d`): `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821); public DNS; Search Console and Bing (Filipe) |
| Checks | Jobs of the run; `curl` of `robots.txt` and `sitemap.xml`; DNS-over-HTTPS query of the root TXT record |
| Result | `build`, `deploy` and `published` success. Sitemap answers 200; `google-site-verification` TXT at the root. Search Console verified, Bing imported, sitemap "Success" with 3 pages (Filipe) |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-003 | Hosting on GitHub Pages at `dravictorialaufer.com.br`, built and deployed by `deploy.yml`; the domain is registered at Registro.br | 7.2 (the maintenance workflows sit beside `deploy.yml` and do not change it) |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Public e-mail and WhatsApp attract clinical messages through an informal channel: the notice is 5.1 (ADR-0007).
- Deleting a TXT record in Registro.br drops the Search Console and Bing verification: rule in `docs/runbooks/search-console.md`.
- CFM: every new text runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
