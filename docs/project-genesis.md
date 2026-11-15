# Project genesis

> **Historical document (added 2026-11-15).** This records where the project came from: the planning conversation between Filipe and an AI agent that produced the approved plan v2. It is kept as history and is not a current source of rules: [`AGENTS.md`](../AGENTS.md) is. Current work is in [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) and the issues are in [`ROADMAP.md`](../ROADMAP.md). The planning thread itself is outside this repository; this is a summary of it.

## 1. Starting point

The repository held a Jekyll site for Dra. Victória Laufer: Jekyll 3.10 through the `github-pages` gem, the Minima theme, Bootstrap 5.3 from a CDN, published by GitHub Pages at `https://filipeoliveira94.github.io/dra-victoria-laufer/`. Its text was Lorem ipsum.

Filipe asked for the plan of the site to be reviewed and rewritten, in plan mode (no file changed), after reading the code.

## 2. What the site is for

- The priority is **credibility** and showing her experience, because she is seeing few patients.
- Patient acquisition and scheduling are secondary. The structure should be ready for when she resumes.

## 3. Facts confirmed by Filipe

- The domain will be `victorialaufer.com.br`, still to be bought. There is no CNAME today.
- CRM 240550, São Paulo. She has no RQE.
- Postgraduate courses: three. The planning conversation named two, pediatric intensive care (Hospital Sírio-Libanês) and pediatrics and neonatology (HC FMUSP), registered at the CREMESP; Filipe later confirmed a third, whose area and institution are pending. The official course names are still missing and are not to be invented.
- Advertising follows CFM Resolution 2.336/2023: name, CRM with the state, and the word `MÉDICA` on the main page; each postgraduate course written `MÉDICA com pós-graduação em (área)` followed by `NÃO ESPECIALISTA` in capitals (Art. 13). Nothing may suggest a specialty; she cannot present herself as a pediatrician.

## 4. Requirements given for the plan

- Phases, and inside them issues ready to become GitHub issues: title, objective, scope, out of scope, verifiable acceptance criteria, dependencies, size P/M/G.
- MVP in the first phases: technical base (pt-BR, URLs prepared to switch to the domain with one line, valid HTML, WCAG AA, technical SEO, Lighthouse mobile ≥ 90 and LCP < 2.5 s, images ≤ 200 KB) and credibility content under the CFM rules, with placeholders where real data is missing.
- Later phases: domain and DNS, schema.org with real data, content and E-E-A-T, acquisition that can be switched off, monitoring.
- Open questions and risks listed at the end, including CFM compliance.
- No invented personal data, biographical text, numbers or course names.

## 5. First plan (v1)

The first plan kept Jekyll and corrected it: a config override file for the GitHub Pages path, deploy by Actions with the `github-pages` gem, content in `_data/` YAML, `noindex` until real content, acquisition flags in `_config.yml`, and schema.org starting as `Person`. It confirmed the diagnosis of the legacy site against the code and added findings; the result is the diagnosis table in `PROJECT_STATUS.md`.

## 6. Revised plan (v2)

What changed from v1:

- **New stack:** Astro in place of Jekyll, Minima and Bootstrap.
- **Single page:** the numbered sections "01/02/03", the service cards and the locations section are gone.
- **Experience becomes "Atuação":** roles only, without workplace or period.
- **Brand blocked:** logo, palette and typography wait for Filipe's confirmation. The base uses neutral provisional tokens and the change is confined to one file.
- **Automated quality in the MVP:** validations and Lighthouse CI moved from Phase 7 to Phase 1.

The decisions of v2 are the ADRs indexed in [`DECISIONS.md`](../DECISIONS.md). The phases and issues are in [`ROADMAP.md`](../ROADMAP.md).

### Design brief

- **Who arrives:** parents, colleagues and contracting parties who want to check who she is. Success is leaving with trust in her training and conduct.
- **Mode:** persuade, with the restraint of a reading page. The proof is the registration and the training, not slogans.
- **Sequence:** identification with portrait → Formação → Atuação → Sobre → Contato.
- **First fold:** name, `MÉDICA`, `CRM-SP 240550` and the professional photo, all in real text.
- **Anti-goals:** generic illustration, card grid, full-screen hero with text over the image, testimonials, numbers, promotional language.
- **Open:** the visual world (color, typography, logo).

## 7. Final adjustments

Filipe answered the open questions and the plan changed in three places:

1. **E-mail.** Always `victorialaufersaude@gmail.com`: it is her professional e-mail, already configured, with a provider. (Later on 2026-11-15 Filipe added that it could change if she asks, for example because of spam; that is a future decision.) Issue 3.3 (mailbox on the domain) was removed, with its MX, SPF, DKIM and DMARC records. The DNS holds only the site records.
2. **Photo.** It should not stay in the public repository, if possible. This repository stays public and the originals go to a private assets repository, fetched by the build with a read-only deploy key. Issue 1.4 was rewritten (size M instead of P), and 1.7 and 1.8 gained acceptance items.
3. **Brief.** Confirmed as written. Issue 0.1 (`PRODUCT.md`) is unblocked.

## 8. What stayed open

| Pending | Who | Blocks |
| --- | --- | --- |
| Confirmation of logo, palette and typography | Filipe | 0.3 and 2.4, and therefore the release in 2.5 |
| Official names of the three postgraduate courses and of the degree; area and institution of the third | Dra. Victória | 2.2 |
| List of roles for "Atuação" | Dra. Victória | 2.3 |
| Text "Sobre" and professional photo | Dra. Victória | 2.3 and 1.4 (placeholder until then) |

Issue 0.1 and all of Phase 1 can start with the site in `noindex`.

## 9. How the repository is organized

The structure follows the one Filipe uses in his `open-data-platform` project: `AGENTS.md` as the single source of agent rules, imported by `CLAUDE.md`; `ROADMAP.md` for issues; `PROJECT_STATUS.md` as the current-phase ledger; `DECISIONS.md` indexing ADRs in `docs/decisions/`; `docs/status-log.md` as the archive. Two things differ here, because a merge publishes a site about a physician: work goes through a feature branch and a pull request with PO and Reviewer approval and Filipe's OK, and the CFM checklist in `docs/compliance/cfm.md` is mandatory.
