# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-18 (4.1 built on local builds) |
| Current phase | Phase 4 — Structured data |
| Phase status | 4.1 in progress. Phases 0 to 3 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1 and 3.2 verified (3.3 withdrawn) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**4.1** — JSON-LD `Person` on the page ([ADR-0009](docs/decisions/0009-schema-person.md)): name, `jobTitle: Médica`, the CRM as identifier, training, image, URL and Instagram in `sameAs`, built from the typed collections so no pending field reaches it. No `medicalSpecialty`, no `Physician`, no rating. Built on `feat/4.1-json-ld-person` (`src/lib/person.ts`, `scripts/check-jsonld.mjs`): the degree and the two finished postgraduate courses in the Art. 13 line; Neonatologia enters once finished (Filipe). Local builds: every check passes; Schema Markup Validator 0 errors, 0 warnings. Left: the PR and its CI run, PO and Reviewer review, Filipe's OK and merge.

The last merge (`25358b1`, 3.2) published cleanly: `published` job of [run 44437975883](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437975883), success, on the domain.

## Next work

1. **4.1** PR and its CI run; review; Filipe's OK and merge. After the merge, the `published` run and the validator on the live page.
2. Then Phase 5 (privacy and legal notice, further evidence) or Phase 7 (Search Console, maintenance), both unblocked; Filipe chooses.

## Blockers

None.

---

## Phase 4 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 4.1 | JSON-LD `Person` | In progress | Local builds: every check passes, JSON-LD check 0 failing, Schema Markup Validator 0 errors. PR CI pending. `docs/status-log.md` |

Acceptance detail: `ROADMAP.md` → Phase 4. Phases 0 to 3: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Local production build, branch `feat/4.1-json-ld-person`, with the private assets and with `ASSETS_DIR=/nonexistent`. Node.js v22.23.4, chrome-headless-shell 158.0.8127.36 (outside the repository). Not deployed |
| Checks | `make check`, `make contrast`, `make lint` (with the new JSON-LD check), `make requests`, `make axe`, `make lighthouse`; the JSON-LD block in the Schema Markup Validator |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content, JSON-LD, photos and tables 0 failing. Requests 65, 0 failing (19 without the assets). axe 4 runs, 0 violations. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms, CLS 0.0003. Validator: 1 `Person`, 0 errors, 0 warnings |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Published site, after the 3.2 merge (`25358b1`): `deploy.yml` [run 44437975883](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437975883) (attempt 2), the Pages API and `curl` (issue 3.2) |
| Checks | The `published` job; Pages domain, HTTPS and certificate; redirects; canonical, sitemap and `robots.txt` of the live page |
| Result | All three jobs success. Certificate approved, HTTPS enforced; `http://`, `www` and github.io redirect to `https://dravictorialaufer.com.br/`; canonical, sitemap and `robots.txt` on the domain |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-009 | schema.org `Person` without `medicalSpecialty`; `Physician` only with acquisition on | 4.1 |
| D-005 | Typed collections; pending items never reach the JSON-LD | 4.1 |
| D-001 | No JavaScript shipped: the JSON-LD block is data, not script | 4.1 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- CFM: a specialty suggested in structured data (a postgraduate area without `NÃO ESPECIALISTA`, `medicalSpecialty`, `Physician`). Checklist in `docs/compliance/cfm.md`.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
