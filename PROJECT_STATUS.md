# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://dravictorialaufer.com.br/> (since 3.2; the github.io address redirects) |
| Last updated | 2026-11-19 (5.2 in progress; 5.1 published) |
| Current phase | Phase 5 — Content and E-E-A-T |
| Phase status | 5.1 verified and published; 5.2 in progress. Phases 0 to 4 closed: 0.1 to 0.3, 1.1 to 1.8, 2.1 to 2.6, 3.1, 3.2 and 4.1 verified (3.3 withdrawn). Phase 6 deferred (Filipe, 2026-11-19) |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**5.2** (in progress) — Further evidence, on `feat/5.2-further-evidence`. Scope closed by Filipe with the PO: a link to the CREMESP public physician lookup and a visible review date, both from the `medica` collection (`consultaCrm`, `revisao`). The lookup has no deep link by CRM (its per-physician route takes an encrypted QR token), so the page links the official search page, `https://guiamedico.cremesp.org.br/` (HTTP 200), under the identity line, naming the CRM to search for. "Revisado em 19 de novembro de 2026." closes the home page's `<main>`. Courses, events and publications: none today; recorded as pending in `ROADMAP.md` → 5.2.

5.1 is merged (PR #24) and published: `published` job of [run 44563264047](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44563264047) (merge `269a238`). PR #25 (AGENTS.md dev flow) followed: `published` job of [run 44577290522](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44577290522) (merge `3862822`) published `main` with both changes. Both runs: `build`, `deploy` and `published` success; the live check found 37 requests, 0 failing.

## Next work

1. **5.2** PR review: PO and Reviewer on the same head, then Filipe's OK. Her approval of the new line under the identity line and of the review date.
2. **Phase 7:** 7.2 (maintenance), then 7.1 (Search Console and Bing Webmaster).
3. Phase 6 (acquisition) stays deferred until Filipe reopens it.

## Blockers

None.

---

## Phase 5 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 5.1 | Privacy and legal notice | Verified; published | PR #24 CI [run 44446030982](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44446030982); `published` job of [run 44563264047](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44563264047). Text approved by her. `docs/status-log.md` |
| 5.2 | Further evidence | In progress | Local builds pass every check (below). `docs/status-log.md` |

Acceptance detail: `ROADMAP.md` → Phase 5. Phases 0 to 4: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-19 |
| Environment | Local production builds, branch `feat/5.2-further-evidence`: with the private assets, with `ASSETS_DIR=/nonexistent`, and with `DEPLOY_TARGET=ghpages`. Node.js v22.23.4, chrome-headless-shell 157.0.8103.78 (outside the repository). Not deployed |
| Checks | `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse`; horizontal scroll at 320 to 1600 px; schema rejection of a wrong `consultaCrm` host and of a non-ISO `revisao`; `curl -I -L` of the CREMESP lookup |
| Result | `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content, JSON-LD, photos and tables 0 failing. Requests 133, 0 failing (47 without the assets; 133 on staging). axe 8 runs, 0 violations, 0 incomplete. Lighthouse mobile: Performance 100 and Accessibility 100 on all three pages; LCP 1428–1431 ms home, 901–903 ms legal pages; CLS 0.0047 home, up to 0.0497 legal pages. No overflow. Both bad values stop the build. `https://guiamedico.cremesp.org.br/` HTTP/2 200 |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-19 |
| Environment | Published site, after the 5.1 merge (`269a238`) and the #25 merge (`3862822`): `deploy.yml` runs [44563264047](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44563264047) and [44577290522](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44577290522) |
| Checks | The `published` job of each run; `curl` of the two legal pages |
| Result | All jobs success; `published` 37 requests, 0 failing, in both runs. `https://dravictorialaufer.com.br/privacidade/` and `/aviso-legal/` answer 200 |

---

## Decisions (active)

All eleven decisions are `approved`. Implemented: D-008 (license) and, from 1.1, D-001, D-003, D-004 and D-006 (release of indexing in 2.6; domain in 3.2): [`DECISIONS.md`](DECISIONS.md). The ones that gate the current work:

| ID | Topic | Gates |
| --- | --- | --- |
| D-007 | Public contact channels and the single e-mail; the notice about messages | 5.1 |
| D-005 | Typed collections: the pages' text is content, pending items never rendered; the CREMESP link and the review date are fields of `medica` | 5.1, 5.2 |
| D-001 | No JavaScript shipped, no third party at page load: what the privacy page states | 5.1 |

## Active risks

The full table is in `ROADMAP.md` → Risks. The ones that apply today:

- Public e-mail and WhatsApp attract clinical messages through an informal channel: the notice is 5.1 (ADR-0007).
- CFM: every new text (privacy, legal notice, evidence) runs the checklist in `docs/compliance/cfm.md`; no specialty suggested.
- Courses not registered at the CRM (Art. 13, §1, d) and the Instagram handle with "pediatria": recorded risks in `docs/compliance/cfm.md`.
