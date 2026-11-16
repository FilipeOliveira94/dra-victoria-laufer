# Architecture Decision Log

Short index of the architecture choices for the portfolio site of Dra. Victória Laufer. **Rationale, alternatives, consequences and evidence live in ADRs** under [`docs/decisions/`](docs/decisions/).

| | |
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
| D-001 | Site generator | Astro, static output, no JavaScript shipped to the browser | — (built in 1.1, verified after its deploy) | `approved` | [ADR-0001](docs/decisions/0001-static-site-generator-astro.md) |
| D-002 | CSS | Own CSS with tokens in one file; no framework | — | `approved` | [ADR-0002](docs/decisions/0002-own-css-with-tokens.md) |
| D-003 | Hosting and deploy | GitHub Pages, built and deployed by GitHub Actions | — (`deploy.yml` built in 1.1, verified after its deploy) | `approved` | [ADR-0003](docs/decisions/0003-hosting-github-pages-actions.md) |
| D-004 | Domain switch | One workflow variable, `DEPLOY_TARGET: ghpages`, sets `site` and `base`; removing it targets `dravictorialaufer.com.br`. `noindex` is separate (D-006) | — (built in 1.1, verified after its deploy) | `approved` | [ADR-0004](docs/decisions/0004-deploy-target-switch.md) |
| D-005 | Content data | Typed collections (`medica`, `formacao`, `atuacao`, `contato`) with a `pendente` field | — | `approved` | [ADR-0005](docs/decisions/0005-typed-content-collections.md) |
| D-006 | Indexing | `noindex` until issue 2.5, from one constant (`indexable` in `src/config/release.ts`) independent of the host | — (built in 1.1, verified after its deploy) | `approved` | [ADR-0006](docs/decisions/0006-noindex-until-release.md) |
| D-007 | Contact and e-mail | `victorialaufersaude@gmail.com` as the only e-mail, open to a later change if she asks; WhatsApp and Instagram public as contact; invitation to schedule behind `captacao.*` flags | — | `approved` | [ADR-0007](docs/decisions/0007-contact-and-single-email.md) |
| D-008 | License | MIT for the code only; texts, photos, name and logo with all rights reserved | `LICENSE` and README note (1.8, delivered 2026-11-15) | `approved` | [ADR-0008](docs/decisions/0008-license-code-only.md) |
| D-009 | Structured data | schema.org `Person` without `medicalSpecialty`; `Physician` only with acquisition switched on | — | `approved` | [ADR-0009](docs/decisions/0009-schema-person.md) |
| D-010 | Assets | Original photos and brand source files in the private repository `dra-victoria-laufer-assets`; the build fetches them with a read-only deploy key | — | `approved` | [ADR-0010](docs/decisions/0010-private-assets-repository.md) |
| D-011 | Visual identity | Her palette with green, yellow and white leading and lilac as secondary; text only in the 15 approved pairs (≥ 4.5:1); Source Serif 4 and Source Sans 3, self-hosted; logo without the tagline. Normative detail in `DESIGN.md` | — (tokens applied in 2.4) | `approved` | [ADR-0011](docs/decisions/0011-visual-identity.md) |

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
| 2026-11-16 | D-011 approved: visual identity (issue 0.3), with Filipe's approval of `DESIGN.md` |
| 2026-11-16 | D-004 and D-006: issue 1.1 defines `noindex` as a constant separate from `DEPLOY_TARGET`, as ADR-0004 left to it; plan approved by Filipe |
| 2026-11-16 | D-003 and D-004: final domain changed to `dravictorialaufer.com.br` by Filipe |
| 2026-11-15 | Initial decision log: D-001 to D-010 recorded from the approved plan v2 and its final adjustments. D-008 implemented by the `LICENSE` in the same commit |
