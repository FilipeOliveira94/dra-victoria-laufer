# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-18 (4.1 published; Phase 5 opened) |
| Current phase | Phase 5 — Content and E-E-A-T |
| Phase status | 5.1 in progress. Phases 0 to 4 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2 and 4.1 verified (3.3 withdrawn) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**5.1** — Privacy and legal notice: two pages, `/privacidade/` and `/aviso-legal/` (Filipe), linked in the footer. Privacy states what the site collects and how she handles the messages she receives, naming only the third parties actually used; the legal notice says the content does not replace a consultation. No cookie banner: the site sets no cookies. Built on `feat/5.1-privacy-legal-notice`. The text is a draft until Dra. Victória approves it, relayed by Filipe.

The last merge (`60adb20`, 4.1) published cleanly: `published` job of [run 44443969964](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44443969964); the live JSON-LD is identical to the validated block.

## Next work

1. **5.1** Build, checks, PR; her approval of the text before the merge.
2. **5.2** Further evidence: the CREMESP lookup link and a visible review date; courses, events or publications as she provides them, each with a verifiable source.
3. Then Phase 7 (Search Console, maintenance).

## Blockers

None. The 5.1 merge waits on her approval of the text.

---

## Phase 5 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 5.1 | Privacy and legal notice | In progress | `feat/5.1-privacy-legal-notice` |
| 5.2 | Further evidence | Not started | — |

Acceptance detail: `ROADMAP.md` → Phase 5. Phases 0 to 4: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Published site, after the 4.1 merge (`60adb20`): `deploy.yml` [run 44443969964](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44443969964); `curl` of the live page compared with a local production build of `60adb20` with the private assets |
| Checks | The `published` job; the JSON-LD block of the live page |
| Result | All three jobs success. The live JSON-LD block is byte-identical to the block the Schema Markup Validator passed (0 errors, 0 warnings): `Person`, `jobTitle` `Médica`, no `medicalSpecialty` |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Local production build, branch `feat/4.1-json-ld-person`, with the private assets and with `ASSETS_DIR=/nonexistent`. Node.js v22.23.4, chrome-headless-shell 158.0.8127.36 (outside the repository). Not deployed |
| Checks | `make check`, `make contrast`, `make lint` (with the new JSON-LD check), `make requests`, `make axe`, `make lighthouse`; the JSON-LD block in the Schema Markup Validator |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content, JSON-LD, photos and tables 0 failing. Requests 65, 0 failing (19 without the assets). axe 4 runs, 0 violations. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms, CLS 0.0003. Validator: 1 `Person`, 0 errors, 0 warnings |

---

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-007 | Public contact channels and the single e-mail; the notice about messages | 5.1 |
| D-005 | Typed collections: the pages' text is content, pending items never rendered | 5.1, 5.2 |
| D-001 | No JavaScript shipped, no third party at page load: what the privacy page states | 5.1 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Public e-mail and WhatsApp attract clinical messages through an informal channel: the notice is 5.1 (ADR-0007).
- CFM: every new text (privacy, legal notice, evidence) runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
