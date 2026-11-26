# Roadmap

Issue-level plan for the portfolio site of Dra. Victória Laufer. This file is the source of truth for **scope, dependencies, issue status and acceptance criteria**. `PROJECT_STATUS.md` is the **current-phase** operational ledger. Longer history lives in `docs/status-log.md`. The plan comes from the approved plan v2, summarized in [`docs/project-genesis.md`](docs/project-genesis.md).

| Roadmap | Current |
| --- | --- |
| Last updated | 2026-11-25 (7.1 verified) |
| MVP | Phases 1 and 2 |
| Related | [`PROJECT_STATUS.md`](PROJECT_STATUS.md), [`DECISIONS.md`](DECISIONS.md), [`AGENTS.md`](AGENTS.md), [`docs/compliance/cfm.md`](docs/compliance/cfm.md) |

**Status values:** `not started` · `in progress` · `delivered` · `verified` · `blocked` · `withdrawn`

- Mark an issue **delivered** only when the change is merged into `main`.
- Mark an issue **verified** only when its acceptance checks have been run and the result is recorded in `docs/status-log.md`; `PROJECT_STATUS.md` summarizes it.
- Each issue is one feature branch and one pull request, opened by the Dev (Claude in T3 Code), reviewed and merged by Filipe ([`AGENTS.md`](AGENTS.md) §3 and §4).
- Do not start an issue until its dependencies are satisfied. A dependency on a person (content, brand) is a blocker, not something to fill in.
- Issue IDs are stable. A removed issue keeps its ID and is marked `withdrawn`.

**Size:** P (small) · M (medium) · G (large).

---

## Phase overview

| Phase | Scope | Depends on | Status |
| --- | --- | --- | --- |
| 0 | Product and brand: product context, pending inputs, visual identity | — | Verified (0.1, 0.2 and 0.3) |
| 1 | New base (MVP): Astro, typed content, layout, media, accessibility, SEO, PR checks, license | — | Verified (1.1 to 1.8) |
| 2 | Credibility content under the CFM rules (MVP): brand, identification and contact, training, roles, cut-out portrait, release. The finished page; ends with the initial release | Phase 1; inputs from 0.2; brand from 0.3 | Verified (2.1 to 2.6); closed with the 2.6 merge |
| 3 | Domain and DNS: `dravictorialaufer.com.br` | 1.1 | Verified (3.1 and 3.2; 3.3 withdrawn); closed with the 3.2 published-site check |
| 4 | Structured data: JSON-LD `Person` | 2.6 and 3.2 | Verified (4.1); closes with the 4.1 merge |
| 5 | Content and E-E-A-T: privacy, legal notice, further evidence | 2.2, 2.6 | Verified (5.1 and 5.2); closed with the 5.2 merge |
| 6 | Acquisition, off by default: invitation to schedule, care modality | 2.6, 4.1 | Deferred (Filipe, 2026-11-19); 6.1 and 6.2 unchanged. As planned, acquisition goes live only when she resumes seeing patients (Phase 6 goal) |
| 7 | Monitoring: Search Console, maintenance | 1.1, 2.6, 3.2 | 7.1 verified (home page indexed, 2026-11-25); 7.2 merged, verified by its `workflow_dispatch` tests. Closes when 7.2 is verified |

Phases 0 to 5 are closed. Phase 7 closes when 7.2 (dispatch tests after the merge of PR #28) is verified; 7.1 is verified: from then on the project is in maintenance, run by the reminders in [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md). Phase 5 closed with the 5.2 merge (PR #26). Phase 6 is deferred by Filipe's decision (2026-11-19); its issues keep their scope and acceptance. Phase 4 closed with the 4.1 merge: the JSON-LD `Person` is on the live page. Blockers are listed in [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

### Design brief (confirmed by Filipe)

- **Who arrives:** parents, colleagues and contracting parties who want to check who she is. Success is leaving with trust in her training and conduct.
- **Mode:** persuade, with the restraint of a reading page. The proof is the registration and the training, not slogans.
- **Sequence:** identification with portrait → Formação → Atuação → Sobre → Contato.
- **First fold:** name, `MÉDICA`, `CRM-SP 240550` and the professional photo, all in real text.
- **Anti-goals:** generic illustration, card grid, full-screen hero with text over the image, testimonials, statistics, promotional language.
- **Open:** the visual world (color, typography, logo), until Filipe confirms it.

---

## Phase 0 — Product and brand

**Goal:** Fix what the site is for and collect what only people can provide.

### 0.1 Record the product context

| Issue 0.1 | Detail |
| --- | --- |
| Status | `verified` |
| Size | P |
| Depends on | — |

- **Objective:** fix the audience, the goal and the limits of the site before design.
- **Scope:** `PRODUCT.md` through `/impeccable init`, with the answers already given, the confirmed design brief and the CFM rules.
- **Out of scope:** visual decisions.
- **Acceptance:** the file is in the repository and approved by Filipe.

### 0.2 Collect pending inputs

| Issue 0.2 | Detail |
| --- | --- |
| Status | `verified` |
| Size | P |
| Depends on | — |

- **Objective:** unblock the content of Phase 2.
- **Scope:** official names of the three postgraduate courses (area and institution of the third included) and of the degree; list of roles performed; the text "Sobre" written by her; professional photo with authorization of use.
- **Out of scope:** previous workplaces, Lattes, LinkedIn, Doctoralia. (Current workplaces and start year added to scope by Filipe on 2026-11-15.)
- **Acceptance:** each item is attached to the issue or marked pending with an agreed date.

### 0.3 Define the visual identity

| Issue 0.3 | Detail |
| --- | --- |
| Status | `verified` |
| Size | M |
| Depends on | Filipe's confirmation; 0.1 |

- **Objective:** replace the provisional tokens with the confirmed brand.
- **Scope:** logo, palette and typography confirmed; `DESIGN.md` generated by the Impeccable new-surface flow.
- **Out of scope:** creating the brand from scratch without confirmation.
- **Acceptance:** `DESIGN.md` approved; every color pair with contrast ≥ 4.5:1.

---

## Phase 1 — New base (MVP)

**Goal:** A valid, accessible, fast static base with automated checks, published as `noindex` staging.

**Out of scope:** final content and final visual identity (Phase 2).

### 1.1 Replace Jekyll with Astro, deployed by Actions

| Issue 1.1 | Detail |
| --- | --- |
| Status | `verified` (local builds and the published site checked on 2026-11-16) |
| Size | M |
| Depends on | — |
| ADRs | [0001](docs/decisions/0001-static-site-generator-astro.md), [0003](docs/decisions/0003-hosting-github-pages-actions.md), [0004](docs/decisions/0004-deploy-target-switch.md), [0006](docs/decisions/0006-noindex-until-release.md) |

- **Objective:** a modern static base and a reproducible build.
- **Scope:** Astro project with `lang="pt-BR"`; build and deploy workflow; `DEPLOY_TARGET`; Pages source set to "GitHub Actions"; remove Jekyll, Minima, Bootstrap, `_posts` and `img/avatar.svg`; commit the lockfile; wire the `make` targets to the real scripts.
- **Out of scope:** final content and visual.
- **Acceptance:** a push to `main` publishes at `/dra-victoria-laufer/` with no 404 request; a build without the variable generates URLs of the final domain; the staging build carries `noindex`.

### 1.2 Typed content model

| Issue 1.2 | Detail |
| --- | --- |
| Status | `verified` (local builds, 2026-11-16) |
| Size | P |
| Depends on | 1.1 |
| ADRs | [0005](docs/decisions/0005-typed-content-collections.md), [0007](docs/decisions/0007-contact-and-single-email.md) |

- **Objective:** a single source for name, CRM, training, roles and contacts.
- **Scope:** collections with schema (`medica`, `formacao`, `atuacao`, `contato`); the `pendente` field; pending report in the build; `captacao.*` flags switched off.
- **Out of scope:** filling in data that has not arrived.
- **Acceptance:** invalid data breaks the build; a pending item does not appear on the page and does appear in the report.

### 1.3 Structure and layout of the single page

| Issue 1.3 | Detail |
| --- | --- |
| Status | `verified` |
| Size | M |
| Depends on | 1.2 |
| ADRs | [0002](docs/decisions/0002-own-css-with-tokens.md) |

- **Objective:** a semantic page that follows the brief.
- **Scope:** one `h1`, sections with `h2`, `<main>`, anchor navigation without JavaScript, footer with the build year, provisional tokens, 404 page.
- **Out of scope:** final identity (2.1).
- **Acceptance:** HTML validator with no errors; no duplicate ID; layout with no horizontal scroll from 320 px to 1600 px; the 404 works at any URL depth.

### 1.4 Images, favicon and fonts

| Issue 1.4 | Detail |
| --- | --- |
| Status | `verified` (local builds and the PR's CI run, assets fetched) |
| Size | M |
| Depends on | 1.1 and 1.3; photo from 0.2 (neutral placeholder until then) |
| ADRs | [0010](docs/decisions/0010-private-assets-repository.md) |

- **Objective:** light media, fast LCP, and originals outside the public repository.
- **Scope:** private repository `dra-victoria-laufer-assets` with photos and brand source files; read-only deploy key as a secret; workflow step that fetches the assets before the build; portrait in AVIF and WebP with `srcset` and declared dimensions; main image with high priority; neutral placeholder when the secret does not exist (local build or fork); favicon; fonts hosted locally.
- **Out of scope:** final logo (0.3).
- **Acceptance:** no photo file in the history of this repository; a build without the secret completes with the placeholder; no published image above 200 KB; no request to a third party; CLS < 0.1.

### 1.5 Accessibility, WCAG 2.1 AA

| Issue 1.5 | Detail |
| --- | --- |
| Status | `verified` (local builds, both targets, and the PR's CI run, assets fetched) |
| Size | P |
| Depends on | 1.3 |

- **Objective:** keyboard, screen reader and contrast in conformance.
- **Scope:** skip-navigation link, visible focus, accessible names on the contact links, `prefers-reduced-motion`.
- **Out of scope:** manual audit with users.
- **Acceptance:** axe with no violations; Lighthouse Accessibility ≥ 95; complete keyboard navigation.

### 1.6 Technical SEO

| Issue 1.6 | Detail |
| --- | --- |
| Status | `verified` (local builds, both targets, and the PR's CI run, assets fetched) |
| Size | P |
| Depends on | 1.1 |

- **Objective:** correct metadata and controlled indexing.
- **Scope:** title, description, canonical, Open Graph with `pt_BR`, social image, sitemap, `robots.txt`.
- **Out of scope:** JSON-LD (4.1); Search Console (7.1).
- **Acceptance:** metadata present and free of specialty terms; the canonical changes by itself between staging and production.

### 1.7 Automatic checks on pull requests

| Issue 1.7 | Detail |
| --- | --- |
| Status | `verified` (local builds, both targets, with and without the assets, and the PR's CI run, assets fetched) |
| Size | M |
| Depends on | 1.3 |

- **Objective:** prevent regressions in quality and in compliance.
- **Scope:** HTML and link validation; axe; Lighthouse CI mobile (Performance ≥ 90, LCP < 2.5 s); 200 KB limit per image; search for "Lorem" and for vetoed terms (`pediatra`, `especialista em`). Lighthouse CI runs with the real photo only on PRs from this repository; PRs from forks do not receive the secret and use the placeholder.
- **Out of scope:** visual tests.
- **Acceptance:** a PR that breaks any rule fails; `NÃO ESPECIALISTA` is the only accepted exception; a PR fails if a portrait image file is added to this repository.

### 1.8 License

| Issue 1.8 | Detail |
| --- | --- |
| Status | `verified` (wording reviewed and approved by Filipe, 2026-11-16) |
| Size | P |
| Depends on | — |
| ADRs | [0008](docs/decisions/0008-license-code-only.md) |

- **Objective:** protect her content in a public repository.
- **Scope:** `LICENSE` with MIT restricted to the code; notice of all rights reserved for texts, name and logo in this repository; the README records that the photos live in a private repository and are not licensed.
- **Out of scope:** making the repository private.
- **Acceptance:** both notices present, with the correct rights holders.

---

## Phase 2 — Credibility content under the CFM rules (MVP)

**Goal:** The finished page, approved by her, released for indexing. Phase 2 is the last phase before the initial release: when 2.6 closes, the page is complete and indexable at the staging address (the domain comes in Phase 3).

**Order:** the brand first (2.1), because every section is built in it. Then one issue per part of the page, in page order (2.2 to 2.4), each delivering its part complete. Then the cut-out portrait (2.5) and the release (2.6).

**A complete section.** An issue that owns a section, or a block of the page, delivers it finished, not only its data:

- **Content:** every fact from the content collections, in its final wording; nothing pending is visible.
- **On the page:** rendered in the brief's order, with its `h2` and its entry in the anchor navigation (the identification block has the `h1` and no entry).
- **Look:** the `DESIGN.md` components, type roles, ground and spacing for that section, on the brand tokens from 2.1. No provisional style is left in it.
- **Layout:** no horizontal scroll from 320 to 1600 px; screenshots at 360 and 1280 px in the PR for Filipe's review.
- **Access:** accessible names, full keyboard path, focus visible.
- **Compliance:** the parts of the CFM checklist that apply to it, reported in the PR.
- **Checks:** `make lint`, `make requests`, `make axe` and `make lighthouse` on local builds, and the PR's CI run, with the private assets.

### 2.1 Apply the confirmed visual identity

| Issue 2.1 | Detail |
| --- | --- |
| Status | `verified` (local builds and the PR's CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307), assets fetched; screenshots approved by Filipe as the base, 2026-11-16) | Size | M |
| Depends on | 0.3 |

- **Objective:** the brand under the whole page, before any section is finished on it.
- **Scope:** the tokens of `DESIGN.md` (palette, type scale, spacing, shape) in place of the provisional ones; typography roles; the page frame: header with the small horizontal logo and the anchor navigation, links and focus, section grounds (`section-default`, `section-alt`, `section-sobre`), footer on `verde-profundo` with `logo-horizontal-branco`; favicon and social image composed per `DESIGN.md`.
- **Out of scope:** the content and inner layout of each section (2.2 to 2.4); the cut-out portrait (2.5).
- **Acceptance:** no provisional token left; every text pair in the approved table (`make contrast`); 1.5 and 1.7 still pass; screenshots at 360 and 1280 px reviewed by Filipe.

### 2.2 Identification and contact

| Issue 2.2 | Detail |
| --- | --- |
| Status | `verified` (local builds and the CI [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315) of PR #15, assets fetched; screenshots approved by Filipe, 2026-11-17) | Size | M |
| Depends on | 2.1 |

- **Objective:** meet the identification required by CFM Resolution 2.336/2023, with the first fold and the Contato section finished, in the "Caminho do jardim" direction (Filipe, 2026-11-17).
- **Scope:** the page frame of the direction (`DESIGN.md`): the garden path, section label, descriptive heading and stone, page column, motion; the identification block: name (`display`, the only `h1`), `ouro` hairline and identity line `MÉDICA · CRM-SP 240550` (`label`), the portrait from 1.4 as a 3:4 arch in its clearing with the sun and the leaf, beside the name on wide screens; the identity line again in the footer; the Contato section complete, with `victorialaufersaude@gmail.com`, WhatsApp and Instagram as rounded rows with a drawn icon, the channel as a label and the address as link text. That e-mail is the only one on the site. Changing it later is a separate decision ([ADR-0007](docs/decisions/0007-contact-and-single-email.md)). The Instagram handle stays as it is (Filipe's decision, recorded as a risk in `docs/compliance/cfm.md`).
- **Out of scope:** invitation to schedule or a pre-filled message (6.1); RQE (she has none); the cut-out portrait (2.5).
- **Acceptance:** the three elements as text in the first fold at 360 px width, and in the footer; a single e-mail on the site; the identification block and Contato meet "a complete section".

### 2.3 Training ("Formação")

| Issue 2.3 | Detail |
| --- | --- |
| Status | `verified` |
| Size | P |
| Depends on | 2.2; 0.2 |

- **Objective:** the Formação section finished, with the postgraduate courses in the Art. 13 format.
- **Scope:** the section on the page and in the navigation; each course as `MÉDICA com pós-graduação em (official name)` followed by `NÃO ESPECIALISTA` in capitals, with the institution; the degree; its `DESIGN.md` look (course cards in `rounded.card`, two columns from 900 px, "EM CURSO" marker, course line in `title`, the Same-Size Rule).
- **Out of scope:** inventing a course name, year or workload.
- **Acceptance:** `NÃO ESPECIALISTA` with the same size and contrast as the neighboring text; an item without its official name stays pending and off the page; the section meets "a complete section".

### 2.4 Roles ("Atuação") and "Sobre"

| Issue 2.4 | Detail |
| --- | --- |
| Status | `verified` |
| Size | P |
| Depends on | 2.3; 0.2 |

- **Objective:** the Atuação and Sobre sections finished, demonstrating experience without advertising care.
- **Scope:** both sections on the page and in the navigation; list of roles performed, with the current workplace and a start year, under the wording rule in `docs/compliance/cfm.md` → C, with the leaf markers and the "Experiência" group of `DESIGN.md`; the text "Sobre" approved by her, in the `section-clareira` clearing, its first sentence in the serif face.
- **Out of scope:** statistics, testimonials, mention of home care, previous workplaces, hospital logos.
- **Acceptance:** every role follows the wording rule; none suggests a specialty or invites a consultation; the text "Sobre" is published without a change of meaning; both sections meet "a complete section".

### 2.5 Cut-out portrait on brand graphics

| Issue 2.5 | Detail |
| --- | --- |
| Status | `verified` |
| Size | M |
| Depends on | 1.4; 2.1 |
| Required before | 2.6: Filipe made it a condition for publication (2026-11-16), so indexing waits for it |

- **Objective:** a clean cut-out of her portrait for the identification block, set on graphics generated from the brand.
- **Scope:** amend `DESIGN.md` with the portrait treatment (which brand graphics sit behind her: palette fields from 0.3 and shapes drawn from the monogram's botanical flourishes; where it appears; what is never done), approved by Filipe; background removal of `photos/portrait-main.jpg`, done once outside the site, with the transparent file stored in `dra-victoria-laufer-assets` only; the cut-out approved by her; the graphics generated as SVG or CSS from the brand, no stock or generic illustration; the composition built and served under the 1.4 rules. The composition sits in the clearing, sun and leaf built in 2.2 (`DESIGN.md` → Garden shapes); the 3:4 arch crop stays as the fallback and the placeholder still applies without the assets.
- **Out of scope:** photos behind her (consultório, hospital or any other); text over the photo (anti-goal); retouching her appearance.
- **Acceptance:** the `DESIGN.md` amendment and her approval of the cut-out recorded in the issue; no photo or cut-out file in the history of this repository; no published image above 200 KB; CLS < 0.1; LCP < 2.5 s; any text near the composition ≥ 4.5:1; the CFM checklist passes, alt text included.

### 2.6 CFM review and release

| Issue 2.6 | Detail |
| --- | --- |
| Status | `verified` (local builds and the CI [run 44413772830](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44413772830) of PR #20, assets fetched; her written approval and Filipe's review of the page, 2026-11-18) |
| Size | P |
| Depends on | 2.1 to 2.5 |
| ADRs | [0006](docs/decisions/0006-noindex-until-release.md) |

- **Objective:** approve the content and open indexing.
- **Scope:** a design pass on the whole finished page before release: `/impeccable critique` at 360 and 1280 px, then `/impeccable polish` on its findings (frame from 2.1 included: header logo legibility, header with few links, vertical rhythm), within `DESIGN.md`; checklist checked against the full text of the resolution; her written approval; critical pending items at zero; removal of `noindex`.
- **Out of scope:** formal legal opinion.
- **Acceptance:** the critique and the polish recorded, with Filipe's approval of the result; checklist and approval recorded in the issue; pending report empty for identification and training; the whole page reviewed by Filipe at 360 and 1280 px.

---

## Phase 3 — Domain and DNS

**Goal:** The site served at `dravictorialaufer.com.br`.

### 3.1 Register the domain and configure DNS

| Issue 3.1 | Detail |
| --- | --- |
| Status | `verified` (DNS checked 2026-11-18; CI [run 44436305170](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436305170) of PR #21) |
| Size | P |
| Depends on | — |

- **Objective:** `dravictorialaufer.com.br` pointing at GitHub Pages.
- **Scope:** registration at Registro.br under her CPF (done 2026-11-18; Filipe changed it from his CPF); A and AAAA records for the root domain and a CNAME for `www` in the Registro.br DNS; domain verified in the GitHub account. The DNS holds only the site records.
- **Out of scope:** e-mail on the domain (none; see 3.3); the HTTPS certificate, which GitHub issues only once the custom domain is set in Pages (moved to 3.2 by Filipe, 2026-11-18).
- **Acceptance:** root and `www` resolve to GitHub Pages; domain verified in the GitHub account.

### 3.2 Switch to the domain

| Issue 3.2 | Detail |
| --- | --- |
| Status | `verified` (PR #22 CI [run 44437660306](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437660306); domain, certificate and redirects checked on the published site 2026-11-18) |
| Size | P |
| Depends on | 3.1 and 1.1 |
| ADRs | [0004](docs/decisions/0004-deploy-target-switch.md) |

- **Objective:** the site served at the root of the final domain.
- **Scope:** remove `DEPLOY_TARGET` from the workflow; custom domain and enforced HTTPS in Pages; link in the Instagram bio.
- **Out of scope:** content changes.
- **Acceptance:** one-line diff in the site (the workflow's check steps also drop the staging base path, a wider workflow diff approved by Filipe on 2026-11-18); HTTPS certificate issued (moved from 3.1); the old github.io URL, `http://` and `www` redirect; canonical and sitemap use the new domain.

### 3.3 E-mail on the domain

| Issue 3.3 | Detail |
| --- | --- |
| Status | `withdrawn` |

Removed in the final adjustments of the plan. There is no mailbox on the domain and no MX, SPF, DKIM or DMARC record. The site uses `victorialaufersaude@gmail.com` ([ADR-0007](docs/decisions/0007-contact-and-single-email.md)).

---

## Phase 4 — Structured data

**Goal:** An identity readable by search engines on the final domain, stating only what the page states.

### 4.1 JSON-LD Person

| Issue 4.1 | Detail |
| --- | --- |
| Status | `verified` (local builds; PR #23 CI [run 44442139697](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44442139697)) |
| Size | P |
| Depends on | 2.6 and 3.2 |
| ADRs | [0009](docs/decisions/0009-schema-person.md) |

- **Objective:** an identity readable by search engines, with real data only.
- **Scope:** name (`honorificPrefix` `Dra.` separate, Filipe), `jobTitle: Médica`, CRM as identifier, training, image, URL and Instagram in `sameAs`. Training: the degree and the finished postgraduate courses, each named in the Art. 13 line with `NÃO ESPECIALISTA` (Filipe, 2026-11-18).
- **Out of scope:** `medicalSpecialty`, ratings, `Physician`. The course in progress (Neonatologia): it enters the JSON-LD once she finishes it and `emCurso` is set to false in `formacao.yaml` (Filipe, 2026-11-18).
- **Acceptance:** schema validator with no errors; no pending field in the JSON.

---

## Phase 5 — Content and E-E-A-T

### 5.1 Privacy and legal notice

| Issue 5.1 | Detail |
| --- | --- |
| Status | `verified` (local builds; PR #24 CI [run 44446030982](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44446030982); text approved by her) |
| Size | P |
| Depends on | 2.2 |

- **Objective:** transparency and LGPD.
- **Scope:** privacy page describing what the site collects and how she handles the messages she receives; notice that the content does not replace a consultation.
- **Out of scope:** cookie banner, unnecessary without cookies.
- **Acceptance:** pages linked in the footer; the text reflects the third parties actually used.

### 5.2 Further evidence

| Issue 5.2 | Detail |
| --- | --- |
| Status | `verified` (PR #26 CI [run 44646362550](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44646362550) on the PR head `1a4d122`; her approval of the two sentences; merged as `58e236d` and published by `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821)) |
| Size | M |
| Depends on | 2.6 |

- **Objective:** deepen credibility as she provides material.
- **Scope:** courses, events or publications; link to the CREMESP public physician lookup; visible review date.
- **Out of scope:** health articles.
- **Acceptance:** each item with a verifiable source; external links answer 200.
- **Delivered in this issue (Filipe and PO, 2026-11-19):** the CREMESP lookup link and the review date, both from `medica` in the content model. The lookup has no deep link by CRM, so the link is the official search page, `https://guiamedico.cremesp.org.br/`.
- **Pending:** courses, events and publications. She has none today, and a collection for them is not cheap without its first item: it needs a section heading she approves, a place in the page sequence and in `DESIGN.md`, and CFM wording per item type. The model is built when the first item arrives, rendering nothing while empty.

---

## Phase 6 — Acquisition (off by default)

**Goal:** Be able to switch patient acquisition on without rework, when she resumes seeing patients.

### 6.1 Invitation to schedule by WhatsApp

| Issue 6.1 | Detail |
| --- | --- |
| Status | `not started` |
| Size | P |
| Depends on | 2.6 |

- **Objective:** switch acquisition on without rework.
- **Scope:** call-to-action block in the first fold and at the end of the page, with a pre-filled message; flag `captacao.cta`.
- **Out of scope:** online scheduling, forms.
- **Acceptance:** with the flag off the block is not in the HTML; with it on, 1.7 still passes.

### 6.2 Care modality

| Issue 6.2 | Detail |
| --- | --- |
| Status | `not started` |
| Size | M |
| Depends on | 6.1 and 4.1 |

- **Objective:** say how she sees patients when she resumes.
- **Scope:** section "Atendimento" with modality (home care, private) and region; JSON-LD `Physician` with area served; flag `captacao.atendimento`.
- **Out of scope:** addresses and prices while there are none.
- **Acceptance:** with the flag off there is no section and no JSON-LD; the text is approved by her and by the CFM checklist.

---

## Phase 7 — Monitoring

### 7.1 Search Console and Bing Webmaster

| Issue 7.1 | Detail |
| --- | --- |
| Status | `verified` (PR #27 merged as `b91aaa7`, published by `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666); home page indexed in URL Inspection, confirmed by Filipe on 2026-11-25) |
| Size | P |
| Depends on | 3.2 and 2.6 |

- **Objective:** follow indexing.
- **Scope:** verification by DNS; sitemap submission.
- **Out of scope:** analytics with cookies.
- **Acceptance:** property verified; home page indexed.
- **Done outside the repository (Filipe, 2026-11-19):** Search Console Domain property with DNS verification, Dra. Victória added as owner, sitemap submitted, indexing of the home page requested, Bing Webmaster Tools imported from Search Console. No change to the site: `robots.txt` already lists the sitemap. Runbook: [`docs/runbooks/search-console.md`](docs/runbooks/search-console.md).
- **Verified (2026-11-25):** Filipe confirmed from Search Console that URL Inspection shows the home page indexed. Same day: the `google-site-verification` TXT record answers at the root of the domain, the home page returns HTTP 200 with no `robots` meta tag, and `robots.txt` allows all and lists the sitemap.

### 7.2 Maintenance

| Issue 7.2 | Detail |
| --- | --- |
| Status | `in progress`: built and checked on PR #28 (branch `chore/7.2-maintenance`); `verified` once the `workflow_dispatch` tests run right after the merge are recorded |
| Size | P |
| Depends on | 1.1 |

- **Objective:** keep the site up to date and compliant.
- **Scope:** Dependabot; half-yearly review of the content and of the CFM checklist; domain renewal reminder.
- **Out of scope:** paid uptime monitor.
- **Acceptance:** Dependabot active; recurring issue created.
- **Built (ordered by Filipe on 2026-11-20):** `.github/dependabot.yml` (npm weekly with minor and patch in one grouped PR and each major apart; GitHub Actions monthly; no auto-merge); `semiannual-review.yml` (January 1 and July 1, issue "Revisão semestral" from `.github/ISSUE_TEMPLATE/revisao-semestral.md`; a comment on the previous one instead, if it is still open); `domain-renewal.yml` (monthly, Registro.br RDAP, renewal issue with 60 days or fewer left, fails without posting when RDAP fails). Both workflows: `workflow_dispatch`, no duplicate of an open issue, only `issues: write` (plus `contents: read` for the template checkout, `actions/checkout` pinned by SHA), no secret. Rule for dependency bumps in `AGENTS.md` §4 item 11. Runbook: [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md).
- **After the merge:** GitHub dispatches only workflows present on the default branch, so the tests run on `main`: `domain-renewal.yml` with the default threshold (no issue) and with `threshold_days=9999` (issue opened, then closed); `semiannual-review.yml` (issue opened, then closed); Dependabot's first run in **Insights → Dependency graph → Dependabot**. Filipe enables Dependabot security updates in the repository settings (runbook).

---

## Open questions

**For Dra. Victória**

1. ~~What are the official names of the three postgraduate courses and of the degree, as registered at the CREMESP? For the third course, which area and institution?~~ Answered in 0.2 (2026-11-15); published in 2.3.
2. ~~Which roles go into "Atuação"?~~ Answered in 0.2 (2026-11-15); published in 2.4.
3. ~~When do the text "Sobre" and the professional photo arrive?~~ Received in 0.2 (2026-11-15); published in 2.4 (text) and 2.5 (cut-out portrait).

**For Filipe**

1. ~~When does the confirmation of logo, palette and typography come?~~ Answered 2026-11-16: confirmed and recorded in `DESIGN.md` (0.3).

Answered during planning: the e-mail is `victorialaufersaude@gmail.com` (it may change later if she asks, for example because of spam; that is a future decision); the photo stays out of the public repository; the design brief is correct.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| CFM: suggesting a specialty in text, alt, metadata or schema | Ethical infraction | Vetoed terms in CI (1.7); checklist in 2.6 and 6.2 |
| CFM: Art. 13 with a wrong course name or a barely visible notice | Ethical infraction | Publish only with the official name; acceptance of 2.3 |
| "Atuação" read as advertising of care | Goes against her guidance and the CFM | Acceptance of 2.4; modality only in 6.2 |
| The reading of the resolution is limited to the points Filipe passed on | Incomplete checklist | Closed 2026-11-18: checked against the full text and the Manual da Codame in 2.6; in doubt, consult the CREMESP |
| Domain with her name registered under Filipe's CPF | His name appears in WHOIS; she depends on him to keep the domain | Closed 2026-11-18: the domain was registered under her CPF |
| Brand unconfirmed for a long time | MVP ready but not released | Closed 2026-11-16: brand confirmed in 0.3 |
| Content inputs arrive late | Empty sections | Pending items stay hidden; identification and contact already carry the page |
| Public e-mail and WhatsApp | Spam and clinical messages through an informal channel | Notice in 5.1 |
| Current site indexable with Lorem ipsum and "Atendimento Pediátrico" | Credibility and CFM exposure today | Closed 2026-11-16: the 1.1 deploy replaced it with a `noindex` page |

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-15 | Roadmap created from the approved plan v2 with its final adjustments (single e-mail, 3.3 withdrawn, private assets repository in 1.4, extra acceptance in 1.7 and 1.8). 1.8 delivered with the project-structure commit |
| 2026-11-15 | 0.2 verified: every content input received (`docs/inputs/0.2-pending-inputs.md`). Filipe added current workplaces and a start year to "Atuação" (scope of 0.2 and 2.3), narrowed the "numbers" anti-goal to statistics, and decided to show the postgraduate courses although the CREMESP registration is frozen |
| 2026-11-16 | 0.1 verified: `PRODUCT.md` approved by Filipe, written through the Impeccable init flow from the confirmed brief, the 0.2 inputs and the CFM checklist. The brief's page sequence and mode stay here, linked from `PRODUCT.md` (Filipe's decision) |
| 2026-11-16 | 0.3 verified: brand confirmed by Filipe and recorded in `DESIGN.md`, approved by Filipe; every text pair ≥ 4.5:1 (`make contrast`). D-011 approved; 2.4 no longer blocked by the brand |
| 2026-11-16 | Domain changed by Filipe from `victorialaufer.com.br` to `dravictorialaufer.com.br` (Phase 3, ADR-0003, ADR-0004) |
| 2026-11-16 | 1.1 verified: Astro 7.4.12 base, `deploy.yml` workflow, `DEPLOY_TARGET`, `noindex` from `src/config/release.ts`; Jekyll removed. Local builds checked; marked verified by Filipe before the published-site check, which runs after the merge |
| 2026-11-16 | 1.1 published-site check: the `deploy.yml` deploy serves the Astro page at `/dra-victoria-laufer/` with `noindex`, the staging canonical and no request besides the page; the legacy files return 404 |
| 2026-11-16 | 1.2 verified on local builds: typed collections, pending report, `captacao.*` off. WhatsApp and Instagram received from Filipe |
| 2026-11-16 | 2.6 added at Filipe's request: cut-out portrait on brand graphics generated from the brand. A condition for publication, so 2.5 now depends on it |
| 2026-11-16 | 1.4 built: read-only deploy key and `ASSETS_DEPLOY_KEY` secret; `deploy.yml` fetches the private assets; portrait cropped 4:5 and served as AVIF/WebP with `srcset`; favicon from the monogram; Source Serif 4 and Source Sans 3 served from the site. Verified on local builds with and without the assets and on the PR's CI [run 43908574612](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43908574612), private-assets step executed. `deploy.yml` now also runs on pull requests and checks the published page after each deploy |
| 2026-11-16 | 1.3 verified on local builds: one-column page with `<main>`, one `h1`, sections from one list (rendered only with published content), anchor navigation without JavaScript, footer with the build year, neutral provisional tokens in `src/styles/tokens.css`, 404 page. html-validate clean, no duplicate ID, no horizontal scroll from 320 to 1600 px, 404 checked at depth on both targets |
| 2026-11-16 | 1.5 built: skip link to `<main id="conteudo">` on every page, `:focus-visible` ring (2px, 2px offset, `rounded.sm`; inverse on the footer) from new focus tokens, contact link named "E-mail: " followed by the address with the channel as `title`, global `prefers-reduced-motion` rule. Verified on local builds, both targets: axe 4.14.1 0 violations, Lighthouse 12.8.2 mobile Accessibility 100, keyboard walk complete. PR CI [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810) passed, private-assets step executed |
| 2026-11-16 | 1.6 built: meta description and Open Graph (`pt_BR`) from the identification only (name, `MÉDICA`, CRM); `og:url` equal to the canonical; 1200 × 630 social image, the colour horizontal logo on white, generated from the private assets; `sitemap.xml` and `robots.txt` as Astro endpoints, no new dependency. Canonical, `og:url`, `og:image`, sitemap and robots follow `DEPLOY_TARGET`, checked on local builds of both targets. PR CI [run 43930485802](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930485802) passed, private-assets step executed, `social.png` generated |
| 2026-11-16 | 1.7 built: the `build` job of `deploy.yml` runs, on every PR and before every deploy, html-validate, the request and anchor check with the 200 KB limit, the vetoed-term and "Lorem" search on `dist/` (`NÃO ESPECIALISTA` excepted), a photo check on the tree and on every commit of the branch, axe at 360 and 1280 px, and Lighthouse CI mobile (Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5 s, CLS < 0.1). Each rule broken on purpose fails its check. PR CI [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420) passed, private-assets step executed |
| 2026-11-16 | Phase 2 is the active phase: Phases 0 and 1 closed (0.1 to 0.3 and 1.1 to 1.7 verified; 1.8 delivered, then verified the same day). 2.1 in progress on `feat/2.1-identification-contact`. The 1.7 merge published cleanly (`published` job of [run 43937667606](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43937667606)) |
| 2026-11-16 | 1.8 verified: Filipe reviewed the `LICENSE` wording and the rights holders; the code copyright year corrected from 2025 to 2026. Phase 1 closed |
| 2026-11-16 | Phase 2 reordered and renumbered by Filipe, so IDs follow the order of work: 2.1 visual identity (was 2.4), 2.2 identification and contact (was 2.1), 2.3 Formação (was 2.2), 2.4 Atuação and Sobre (was 2.3), 2.5 cut-out portrait (was 2.6), 2.6 CFM review and release (was 2.5). Earlier changelog and status-log entries keep the old numbers. Phase 2 now defines "a complete section": each section issue delivers its part finished (content, page, look, layout, access, compliance, checks), on the brand from 2.1 |
| 2026-11-16 | 2.1 built: `DESIGN.md` tokens with semantic roles in `tokens.css`; type roles; header with the colour horizontal logo and the anchor navigation; links, focus and selection from the palette; a ground fixed per section (light grounds only, no bands, Filipe's choice); footer on `verde-profundo` with the white logo; social image with a `verde-marca` field and an `ouro` hairline. The logo's written name is recentred on the monogram at build time (Filipe's request). `DESIGN.md` merged with these decisions (bands removed, 12 text pairs). Local builds, both targets, with and without the assets: every check passes; Impeccable detector clean; finish review `ship` |
| 2026-11-16 | 2.1 PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307) on `4c87890` passed, private-assets step executed (portrait, icons, both logos and the social image generated): 71 requests, 0 failing; axe 4 runs, 0 failing; Lighthouse assertions pass. Verified once Filipe approves the screenshots |
| 2026-11-16 | 2.1 verified: Filipe approved the screenshots as the base ("bom mas não excelente"); the design is raised in 2.2 to 2.5, and 2.6 gains a critique and polish pass on the whole page before release (Filipe's decision) |
| 2026-11-17 | 2.2 built in the "Caminho do jardim" direction chosen by Filipe (variant A1): garden path and stones, descriptive section headings, portrait arch in a clearing with sun and leaf, Contato rows with drawn icons, footer with the identity line in `amarelo-marca`, motion; lilac off the page. Scope widened to the frame and size P → M (Filipe). `DESIGN.md`, ADR-0011 updated. Local builds of both targets, with and without the assets: every check passes |
| 2026-11-17 | 2.2 verified. #14 had been merged while its CI [run 44156463768](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44156463768) was failing (Lighthouse CLS 0.197, from the portrait box resizing on load); PR #15 fixes the portrait box and, at Filipe's request, draws the path as a smooth wave whose right crests are the stones, with each section shifted with its stone. Local builds of both targets and the PR's CI [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315) pass |
| 2026-11-17 | 2.3 delivered: Formação as leaf-shaped course cards, each postgraduate course in the Art. 13 line with `— NÃO ESPECIALISTA` in the same `title` run, the institution below, and the `EM CURSO` marker as text on Neonatologia instead of `(em curso)` in the line (Filipe). Two columns from 900 px. On phones the header links always take their own row, which removes a CLS of 0.23 from the font swap. Local builds of both targets, with and without the assets: every check passes |
| 2026-11-18 | 2.3 verified: PR #17 CI [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093) passed with the private assets; Filipe approved the section |
| 2026-11-18 | 2.4 delivered: Atuação as the approved role lines with leaf markers, current workplaces then the "Experiência" group with start years; "Sobre" in the clearing, her two paragraphs as approved, the first sentence in the serif face. With four header links the phone nav row is set at 0.8125rem and never wraps, so its height does not depend on the font. After Filipe's review: slightly less section space on wide screens, and the path runs over the "Sobre" clearing instead of under it. Local builds of both targets, with and without the assets: every check passes |
| 2026-11-18 | 2.4 verified: PR #18 CI [run 44234277781](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234277781) passed with the private assets; Filipe approved the section; the merge published cleanly ([run 44234478918](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234478918)) |
| 2026-11-18 | 2.5 built: `DESIGN.md` → Portrait treatment (white arch in the clearing, her head above it, a gold ring and two sprigs drawn from the monogram, the leaf lower and smaller); background removed locally, the cut-out kept in the assets checkout only; the arch crop stays as the fallback. Local builds of both targets, with and without the assets: every check passes. Awaiting her approval of the cut-out |
| 2026-11-18 | 2.5 delivered: the arch's bottom corners softened after Filipe's review; she approved the cut-out, now in `dra-victoria-laufer-assets` (`8761caa`) |
| 2026-11-18 | 2.5 verified: PR #19 CI [run 44389698237](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44389698237) passed with the private assets and the cut-out; Filipe approved the issue |
| 2026-11-18 | 2.6 built: critique (17/24, no P0) and polish on Filipe's choices; checklist checked against the full text of Resolution 2.336/2023 and the Manual da Codame; "(NÃO ESPECIALISTA)" added in "Sobre"; her written approval of the full page text; pending report empty; `noindex` removed. `docs/status-log.md` |
| 2026-11-18 | 2.6 verified: PR #20 CI [run 44413772830](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44413772830) passed with the private assets and the thickened logos; Filipe approved the page. `docs/status-log.md` |
| 2026-11-18 | Phase 2 closed: the 2.6 merge (`d404fd7`) published cleanly (`published` job of [run 44414546420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44414546420)); the staging page is indexable. Phase 3 is the active phase; 3.1 in progress on `feat/3.1-domain-dns` |
| 2026-11-18 | 3.1: `dravictorialaufer.com.br` registered at Registro.br under her CPF (not Filipe's, as first planned), expiring 2028-11-18. The HTTPS certificate moves from the acceptance of 3.1 to 3.2 (Filipe). The WHOIS risk is closed |
| 2026-11-18 | 3.1: domain verified in Filipe's GitHub account; A, AAAA and `www` CNAME records in the Registro.br DNS resolve to GitHub Pages; no MX. Setup and checks in `docs/architecture/domain-dns.md` |
| 2026-11-18 | 3.1 verified: PR #21 CI [run 44436305170](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436305170) passed; the merge (`30120bf`) published cleanly (`published` job of [run 44436668017](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436668017)) |
| 2026-11-18 | 3.2 in progress: `DEPLOY_TARGET` removed from the workflow, and the check steps no longer pass the staging base path; the acceptance's one-line diff widened accordingly (Filipe). Local production build: canonical, sitemap, `robots.txt` and Open Graph on `https://dravictorialaufer.com.br/`; every check passes. PR #22 CI [run 44437660306](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437660306) passed. `docs/status-log.md` |
| 2026-11-18 | 3.2 verified: the merge (`25358b1`) published cleanly (`published` job of [run 44437975883](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437975883), attempt 2, on the domain); custom domain and enforced HTTPS set in Pages, certificate approved; github.io, `http://` and `www` redirect to `https://dravictorialaufer.com.br/`; live canonical, `og:url`, sitemap and `robots.txt` on the domain. Phase 3 closed. Phase 4 is the active phase; 4.1 in progress on `feat/4.1-json-ld-person` |
| 2026-11-18 | 4.1 built: JSON-LD `Person` on the home page from the collections (`src/lib/person.ts`), the degree and the two finished postgraduate courses as credentials in the Art. 13 line, Neonatologia left out until finished; `scripts/check-jsonld.mjs` added to `npm run lint`. Schema Markup Validator 0 errors, 0 warnings. Local builds, with and without the assets: every check passes |
| 2026-11-18 | 4.1 verified: PR #23 CI [run 44442139697](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44442139697) passed with the private assets; JSON-LD check 0 failing. Filipe approved the issue |
| 2026-11-18 | 4.1 published: the merge (`60adb20`) published cleanly (`published` job of [run 44443969964](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44443969964)); the live JSON-LD block is identical to the one checked in the Schema Markup Validator. Phase 4 closed. Phase 5 is the active phase; 5.1 in progress on `feat/5.1-privacy-legal-notice` (two pages, Filipe) |
| 2026-11-18 | 5.1 built: `/privacidade/` and `/aviso-legal/` from a new `paginas` collection, linked in every footer and listed in the sitemap; each page has its own canonical. Privacy names GitHub Pages (hosting) and Gmail, WhatsApp and Instagram (contact channels), the only third parties; no cookies, forms or analytics. The legal notice says the content does not replace a consultation. axe and Lighthouse now cover both pages. Local builds: every check passes. The text waits on her approval |
| 2026-11-18 | 5.1: PR #24 CI [run 44446030982](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44446030982) passed with the private assets; axe and Lighthouse on the three pages. Waiting on her approval of the text |
| 2026-11-19 | 5.1 verified: Dra. Victória approved the text (relayed by Filipe); PO, Reviewer and Filipe approved PR #24 |
| 2026-11-19 | Phase 5: 5.1 merged (PR #24) and published. 5.2 in progress: CREMESP lookup link and review date; courses, events and publications recorded as pending. Phase 6 deferred by Filipe; after 5.2 comes phase 7 (7.2, then 7.1) |
| 2026-11-19 | 5.2 verified and published: PR #26 merged as `58e236d`; `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821) succeeded (`build` with axe 8 runs, 0 failing; `deploy`; `published`). Phase 5 closed. Phase 7 is the active phase; 7.1 ordered by Filipe ahead of 7.2. Open questions for Dra. Victória marked answered (0.2) |
| 2026-11-19 | 7.1 in progress on `docs/7.1-search-console`: Search Console and Bing set up by Filipe outside the repository; runbook `docs/runbooks/search-console.md`. Home page indexing pending verification after the merge |
| 2026-11-20 | 7.1 delivered: PR #27 merged as `b91aaa7`; `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666) succeeded (`build`, `deploy`, `published`). Verified when URL Inspection shows the home page indexed. 5.2 status now cites the PR head run 44646362550 and the deploy run 44662384821 instead of run 44629224571 (an earlier head). 7.2 in progress on `chore/7.2-maintenance` |
| 2026-11-20 | 7.2 built on PR #28: Dependabot, semiannual review and domain renewal workflows, maintenance runbook, dependency-bump rule in `AGENTS.md`. PR #28 CI [run 44667244795](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44667244795) on `c555a64` passed with the private assets. The `workflow_dispatch` tests run right after the merge (GitHub returns 404 for a workflow not on the default branch). Phase 7 closes when 7.1 and 7.2 are verified |
| 2026-11-20 | Docs aligned with Filipe's simplified development flow (in force since 2026-11-20): Claude in T3 Code is the Dev and opens the PR; Filipe reviews, merges and deletes the branch; PO de Projetos and Reviewer de Projetos act only when he asks, and never merge. No double approval (`AGENTS.md` §3, §4, §13) |
| 2026-11-25 | 7.1 verified: Filipe confirmed the home page indexed in URL Inspection. Phase 7 now waits only on 7.2 |
