# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (indexable since the 2.6 merge; moves to `dravictorialaufer.com.br` in 3.2) |
| Last updated | 2026-11-18 (3.1 DNS configured) |
| Current phase | Phase 3 — Domain and DNS |
| Phase status | 3.1 in progress; 3.2 not started; 3.3 withdrawn. Phases 0, 1 and 2 closed: 0.1 to 0.3, 1.1 to 1.8 and 2.1 to 2.6 verified |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**3.1** — Point `dravictorialaufer.com.br` at GitHub Pages. Done outside the repository on 2026-11-18: domain registered at Registro.br under her CPF (expires 2028-11-18), verified in Filipe's GitHub account, A, AAAA and `www` CNAME records created; root and `www` resolve to GitHub Pages. Setup and checks: [`docs/architecture/domain-dns.md`](docs/architecture/domain-dns.md). Left: the PR's CI run, then Filipe's OK. The HTTPS certificate moved to 3.2.

The last merge (`d404fd7`, 2.6) published cleanly: `published` job of [run 44414546420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44414546420), success. The staging page is indexable from that deploy.

## Next work

1. **3.1** PR, its CI run, PO and Reviewer review, Filipe's OK and merge.
2. **3.2** Switch to the domain: remove `DEPLOY_TARGET` from the workflow, set the custom domain and enforced HTTPS in Pages (certificate issued), update the Instagram bio link. Depends on 3.1.
3. **Phase 4** JSON-LD `Person` (4.1), which depends on 3.2.

## Blockers

None.

---

## Phase 3 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 3.1 | Register the domain and configure DNS | In progress | Domain `active` in the registry RDAP; verified in GitHub; root and `www` resolve to GitHub Pages; no MX (2026-11-18). PR CI pending. `docs/status-log.md` |
| 3.2 | Switch to the domain | Not started | — |
| 3.3 | E-mail on the domain | Withdrawn | No mailbox on the domain ([ADR-0007](docs/decisions/0007-contact-and-single-email.md)) |

Acceptance detail: `ROADMAP.md` → Phase 3. Phases 0 to 2: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Public DNS, from this machine: system resolver (`getent`), the Registro.br RDAP and Google DNS-over-HTTPS |
| Checks | Registry status; A, AAAA and `www` records; GitHub verification TXT; MX; HTTP answer at the root |
| Result | Domain `active`, expires 2028-11-18, name servers `a.auto.dns.br` and `b.auto.dns.br`. Root A: the four GitHub Pages IPv4 addresses only (the Registro.br default `200.160.2.95` is gone). Root AAAA: the four GitHub Pages IPv6 addresses. `www`: CNAME `filipeoliveira94.github.io`. TXT `_github-pages-challenge-FilipeOliveira94`: 1 answer. MX: none. `http://` root: GitHub 404, expected until 3.2 |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Published site, after the 2.6 merge (`d404fd7`): `deploy.yml` [run 44414546420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44414546420), jobs `build`, `deploy` and `published` |
| Checks | The `published` job's check of the live page |
| Result | Success on all three jobs |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-003 | GitHub Pages through Actions; root domain by A records in the Registro.br DNS | 3.1, 3.2 |
| D-004 | `DEPLOY_TARGET`: removing it targets `dravictorialaufer.com.br` | 3.2 |
| D-007 | Single e-mail, no mailbox on the domain | 3.1 (no MX, SPF, DKIM or DMARC record) |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
