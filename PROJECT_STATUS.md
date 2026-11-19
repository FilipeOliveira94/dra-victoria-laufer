# Project Status

Operational ledger for the **current phase**. Issue backlog and acceptance text live in [`ROADMAP.md`](ROADMAP.md). Decision index: [`DECISIONS.md`](DECISIONS.md). Chronological archive: [`docs/status-log.md`](docs/status-log.md).

| Project | Current |
| --- | --- |
| Repository | [FilipeOliveira94/dra-victoria-laufer](https://github.com/FilipeOliveira94/dra-victoria-laufer) |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> (indexable since the 2.6 merge; moves to `dravictorialaufer.com.br` in 3.2) |
| Last updated | 2026-11-18 (3.1 verified; 3.2 workflow switched) |
| Current phase | Phase 3 — Domain and DNS |
| Phase status | 3.1 verified; 3.2 in progress; 3.3 withdrawn. Phases 0, 1 and 2 closed: 0.1 to 0.3, 1.1 to 1.8 and 2.1 to 2.6 verified |

**Status values:** not started · in progress · delivered · verified · blocked · withdrawn

**Verified** means acceptance checks were run and the result is recorded in `docs/status-log.md`. Do not treat the planned architecture as built.

**What belongs here:** current objective, current-phase issue progress, blockers, latest validation, next work.

**What does not:** the full issue inventory (use `ROADMAP.md`), full ADR text (use `docs/decisions/`), long history (use `docs/status-log.md`).

---

## Current objective

**3.2** — Switch to the domain. On `feat/3.2-domain-switch`: `DEPLOY_TARGET` removed from the workflow, and the check steps no longer pass the staging base path. The local production build carries `https://dravictorialaufer.com.br/` in the canonical, sitemap, `robots.txt` and Open Graph; every check passes. Left: the PR's CI run, PO and Reviewer review, Filipe's OK and merge; then, right after the deploy, the custom domain and enforced HTTPS in Pages, the redirect checks and the Instagram bio link. Filipe accepted a few minutes of downtime between the deploy and the domain setting.

The last merge (`30120bf`, 3.1) published cleanly: `published` job of [run 44436668017](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436668017), success.

## Next work

1. **3.2** PR and its CI run, review, Filipe's OK and merge. Then: `cname` and `https_enforced` in Pages, rerun of the `published` job on the domain, `curl -I` on the github.io URL, `http://` and `www`; her Instagram bio link (outside the repository). Steps in [`docs/architecture/domain-dns.md`](docs/architecture/domain-dns.md).
2. **Phase 4** JSON-LD `Person` (4.1), which depends on 3.2.

## Blockers

None.

---

## Phase 3 progress

| ID | Title | Status | Evidence |
| --- | --- | --- | --- |
| 3.1 | Register the domain and configure DNS | Verified | Domain `active` in the registry RDAP; verified in GitHub; root and `www` resolve to GitHub Pages; no MX (2026-11-18). PR #21 CI [run 44436305170](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436305170). `docs/status-log.md` |
| 3.2 | Switch to the domain | In progress | Local production build: every check passes. PR CI pending; redirects and certificate after the merge. `docs/status-log.md` |
| 3.3 | E-mail on the domain | Withdrawn | No mailbox on the domain ([ADR-0007](docs/decisions/0007-contact-and-single-email.md)) |

Acceptance detail: `ROADMAP.md` → Phase 3. Phases 0 to 2: `ROADMAP.md` and `docs/status-log.md`.

---

## Latest validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Local build, branch `feat/3.2-domain-switch`: production (no `DEPLOY_TARGET`) with the private assets (`ASSETS_DIR` on `dra-victoria-laufer-assets` at `1f30925`), and production with `ASSETS_DIR=/nonexistent`. WSL2, Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 (outside the repository). Not deployed |
| Checks | The workflow's portrait and favicon grep with the root path; `make check`, `make contrast`, `make lint`, `make requests`, `make axe`, `make lighthouse` with the default base `/`; canonical, `og:url`, `og:image`, `sitemap.xml` and `robots.txt` read from `dist/`; search of `dist/` for `github.io` and `/dra-victoria-laufer/` |
| Result | Canonical and `og:url` `https://dravictorialaufer.com.br/`; sitemap `<loc>` and `robots.txt` `Sitemap:` on the domain; no `github.io` or staging path in `dist/`. Favicon grep passes. `astro check` 0 errors. Contrast 12 pairs, 0 failing. html-validate 0 errors; content, photos and tables 0 failing. Requests 65, 0 failing (19 without the assets). axe 4 runs, 0 violations, 0 incomplete. Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms, CLS 0.0003 |

---

## Previous validation

| Validation | Detail |
| --- | --- |
| Date | 2026-11-18 |
| Environment | Public DNS, from this machine: system resolver (`getent`), the Registro.br RDAP and Google DNS-over-HTTPS (issue 3.1) |
| Checks | Registry status; A, AAAA and `www` records; GitHub verification TXT; MX; HTTP answer at the root |
| Result | Domain `active`, expires 2028-11-18. Root A: the four GitHub Pages IPv4 addresses only. Root AAAA: the four GitHub Pages IPv6 addresses. `www`: CNAME `filipeoliveira94.github.io`. Verification TXT answers. MX: none. `http://` root: GitHub 404, expected until 3.2 |

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
