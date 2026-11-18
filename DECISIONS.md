# Architecture Decision Log

Short index of the architecture choices for the portfolio site of Dra. Victória Laufer. **Rationale, alternatives, consequences and evidence live in ADRs** under [`docs/decisions/`](docs/decisions/).

| Decision log | Reference |
| --- | --- |
| Owns | Decision index and status |
| Detail | [`docs/decisions/`](docs/decisions/) (one ADR per decision) |
| Related | `PROJECT_STATUS.md`, `ROADMAP.md`, `docs/project-genesis.md`, `AGENTS.md` |

**How to use:** skim the table for direction and implementation status; open the ADR for *why*. **Decision** is the planned choice; **Implemented** is what is verified in the repository (update it when evidence is recorded in the ADR and in `docs/status-log.md`).

## Lifecycle

| State | Meaning |
| --- | --- |
| `proposed` | Preferred for planning; not binding until approved |
| `approved` | Accepted by Filipe |
| `superseded` | Replaced by a later ADR |
| `rejected` | Declined; kept for auditability |

**Rules:** Filipe approves decisions; an agent proposes. When the status or the implementation changes, update this index and the ADR together. A decision that touches what the site says about her also goes through [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

## Index

| ID | Topic | Decision | Implemented | State | ADR |
| --- | --- | --- | --- | --- | --- |
| D-001 | Site generator | Astro, static output, no JavaScript shipped to the browser | Astro 7.4.12, static, no `<script>` in the output (1.1, verified 2026-11-16) | `approved` | [ADR-0001](docs/decisions/0001-static-site-generator-astro.md) |
| D-002 | CSS | Own CSS with tokens in one file; no framework | `src/styles/tokens.css` (brand tokens since 2.1) and `global.css`, inlined by the build; no framework (1.3, verified 2026-11-16, local builds) | `approved` | [ADR-0002](docs/decisions/0002-own-css-with-tokens.md) |
| D-003 | Hosting and deploy | GitHub Pages, built and deployed by GitHub Actions | `deploy.yml` deploys to Pages, source "GitHub Actions" (1.1, verified 2026-11-16) | `approved` | [ADR-0003](docs/decisions/0003-hosting-github-pages-actions.md) |
| D-004 | Domain switch | One workflow variable, `DEPLOY_TARGET: ghpages`, sets `site` and `base`; removing it targets `dravictorialaufer.com.br`. `noindex` is separate (D-006) | `astro.config.mjs`; staging and production canonicals checked (1.1, verified 2026-11-16) | `approved` | [ADR-0004](docs/decisions/0004-deploy-target-switch.md) |
| D-005 | Content data | Typed collections (`medica`, `formacao`, `atuacao`, `contato`) with a `pendente` field | `src/content.config.ts`, data in `src/content/data/`; invalid data and pending report checked (1.2, verified 2026-11-16, local builds) | `approved` | [ADR-0005](docs/decisions/0005-typed-content-collections.md) |
| D-006 | Indexing | `noindex` until issue 2.6, from one constant (`indexable` in `src/config/release.ts`) independent of the host | `noindex` on the published staging page (1.1, verified 2026-11-16); released with `indexable = true` (2.6, verified 2026-11-18, local builds and PR #20 CI [run 44413772830](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44413772830)) | `approved` | [ADR-0006](docs/decisions/0006-noindex-until-release.md) |
| D-007 | Contact and e-mail | `victorialaufersaude@gmail.com` as the only e-mail, open to a later change if she asks; WhatsApp and Instagram public as contact; invitation to schedule behind `captacao.*` flags | — | `approved` | [ADR-0007](docs/decisions/0007-contact-and-single-email.md) |
| D-008 | License | MIT for the code only; texts, photos, name and logo with all rights reserved | `LICENSE` and README note (1.8, delivered 2026-11-15) | `approved` | [ADR-0008](docs/decisions/0008-license-code-only.md) |
| D-009 | Structured data | schema.org `Person` without `medicalSpecialty`; `Physician` only with acquisition switched on | — | `approved` | [ADR-0009](docs/decisions/0009-schema-person.md) |
| D-010 | Assets | Original photos and brand source files in the private repository `dra-victoria-laufer-assets`; the build fetches them with a read-only deploy key | `deploy.yml` fetches them with `ASSETS_DEPLOY_KEY` (read-only, one repository); placeholder without it (1.4, verified 2026-11-16, local builds and PR CI) | `approved` | [ADR-0010](docs/decisions/0010-private-assets-repository.md) |
| D-011 | Visual identity | Her palette with green, yellow and white leading; lilac kept in the brand, off the page since 2.2; the "Caminho do jardim" direction (garden path, clearings, rounded shapes; 2.2, Filipe 2026-11-17); text only in the approved pairs of DESIGN.md (≥ 4.5:1; 12 since 2.1 removed the bands); Source Serif 4 and Source Sans 3, self-hosted; logo without the tagline. Normative detail in `DESIGN.md` | `DESIGN.md` tokens in `src/styles/tokens.css`, header and footer logos, section grounds, social image (2.1, verified 2026-11-16, local builds and PR CI) | `approved` | [ADR-0011](docs/decisions/0011-visual-identity.md) |

`—` means not yet implemented or not yet verified in the repository.

Logo, palette and typography are recorded in [`DESIGN.md`](DESIGN.md) and ADR-0011 (issue 0.3).

## Recording a new decision

1. Copy [`docs/decisions/_template.md`](docs/decisions/_template.md) to `docs/decisions/NNNN-short-slug.md`.
2. Fill context, decision, alternatives, consequences, evidence, revisit triggers.
3. Add one row to the index above.
4. In `PROJECT_STATUS.md` → **Decisions (active)**, list only decisions that gate the current work. Do not copy this full index.
5. When the choice is built and verified, set **Implemented** to the concrete result (not a copy of Decision until evidence exists).

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-18 | D-006: indexing released by issue 2.6 after the CFM review and her written approval; local builds and PR #20 CI [run 44413772830](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44413772830) |
| 2026-11-16 | D-002 implemented by issue 1.3, local builds |
| 2026-11-16 | D-011 approved: visual identity (issue 0.3), with Filipe's approval of `DESIGN.md` |
| 2026-11-16 | D-011 implemented by issue 2.1, local builds and PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307) |
| 2026-11-16 | D-001, D-003, D-004 and D-006 implemented by issue 1.1, checked on the published site |
| 2026-11-16 | D-004 and D-006: issue 1.1 defines `noindex` as a constant separate from `DEPLOY_TARGET`, as ADR-0004 left to it; plan approved by Filipe |
| 2026-11-16 | D-003 and D-004: final domain changed to `dravictorialaufer.com.br` by Filipe |
| 2026-11-15 | Initial decision log: D-001 to D-010 recorded from the approved plan v2 and its final adjustments. D-008 implemented by the `LICENSE` in the same commit |
