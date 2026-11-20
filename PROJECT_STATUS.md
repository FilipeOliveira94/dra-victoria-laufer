# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-19 (7.1 in progress; 5.2 published, phase 5 closed) |
| Current phase | Phase 7 — Monitoring |
| Phase status | 7.1 in progress; 7.2 not started. Phases 0 to 5 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2, 4.1, 5.1 and 5.2 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**7.1** (in progress) — Search Console and Bing Webmaster, on `docs/7.1-search-console`, ordered by Filipe on 2026-11-19. Set up by Filipe outside the repository: Google Search Console Domain property verified by a TXT record in the Registro.br DNS, Dra. Victória added as owner, sitemap submitted, indexing of the home page requested, Bing imported from Search Console. No change to the site. Runbook: [`docs/runbooks/search-console.md`](docs/runbooks/search-console.md).

5.2 is merged (PR #26, `58e236d`) and published: `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821), `build` (axe 8 runs, 0 failing), `deploy` and `published` success. Phase 5 is closed.

## Next work

1. **7.1** PR: PO approval (small change), then Filipe's OK. After the merge: home page shown as indexed in URL Inspection.
2. **7.2** (maintenance).
3. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 7 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 7.1 | Search Console and Bing Webmaster | In progress | `docs/runbooks/search-console.md`; `docs/status-log.md` |
| 7.2 | Maintenance | Not started | — |

Acceptance detail: `ROADMAP.md` → Phase 7. Phases 0 to 5: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-19 |
| Environment | Published site, after the 5.2 merge (`58e236d`): `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821); public DNS; Search Console and Bing (Filipe) |
| Checks | Jobs of the run; `curl` of `robots.txt` and `sitemap.xml`; DNS-over-HTTPS query of the name servers and of the root TXT record |
| Result | `build`, `deploy` and `published` success; axe 8 runs, 0 failing. `robots.txt` lists `https://dravictorialaufer.com.br/sitemap.xml`, which answers HTTP/2 200. Name servers `a.sec.dns.br`, `b.sec.dns.br`; `google-site-verification` TXT answers at the root. Search Console verified, Bing imported, sitemap "Success" with 3 pages (Filipe, from the consoles) |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-19 |
| Environment | Local production builds, branch `feat/5.2-further-evidence`, and PR #26 CI [run 44629224571](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44629224571) |
| Checks | `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse`; the PR's CI |
| Result | Every check passed; detail in `docs/status-log.md` (5.2 entry) |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-001 | No JavaScript shipped, no third party at page load: no verification tag, script or cookie on the site; verification by DNS only | 7.1 |
| D-003 | Hosting on GitHub Pages at `dravictorialaufer.com.br`; the DNS zone at Registro.br holds the verification records | 7.1 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Public e-mail and WhatsApp attract clinical messages through an informal channel: the notice is 5.1 (ADR-0007).
- Deleting a TXT record in Registro.br drops the Search Console and Bing verification: rule in `docs/runbooks/search-console.md`.
- CFM: every new text runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
