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
| D-001 | Site generator | Astro, static output, no JavaScript shipped to the browser | — (legacy Jekyll until 1.1) | `approved` | [ADR-0001](docs/decisions/0001-static-site-generator-astro.md) |
| D-002 | CSS | Own CSS with tokens in one file; no framework | — | `approved` | [ADR-0002](docs/decisions/0002-own-css-with-tokens.md) |
| D-003 | Hosting and deploy | GitHub Pages, built and deployed by GitHub Actions | — (legacy deploy from the `main` branch) | `approved` | [ADR-0003](docs/decisions/0003-hosting-github-pages-actions.md) |
| D-004 | Domain switch | One workflow variable, `DEPLOY_TARGET: ghpages`, sets `site`, `base` and `noindex`; removing it targets `dravictorialaufer.com.br` | — | `approved` | [ADR-0004](docs/decisions/0004-deploy-target-switch.md) |
| D-005 | Content data | Typed collections (`medica`, `formacao`, `atuacao`, `contato`) with a `pendente` field | — | `approved` | [ADR-0005](docs/decisions/0005-typed-content-collections.md) |
| D-006 | Indexing | `noindex` until issue 2.5 | — | `approved` | [ADR-0006](docs/decisions/0006-noindex-until-release.md) |
| D-007 | Contact and e-mail | `victorialaufersaude@gmail.com` as the only e-mail, open to a later change if she asks; WhatsApp and Instagram public as contact; invitation to schedule behind `captacao.*` flags | — | `approved` | [ADR-0007](docs/decisions/0007-contact-and-single-email.md) |
| D-008 | License | MIT for the code only; texts, photos, name and logo with all rights reserved | `LICENSE` and README note (1.8, delivered 2026-11-15) | `approved` | [ADR-0008](docs/decisions/0008-license-code-only.md) |
| D-009 | Structured data | schema.org `Person` without `medicalSpecialty`; `Physician` only with acquisition switched on | — | `approved` | [ADR-0009](docs/decisions/0009-schema-person.md) |
| D-010 | Assets | Original photos and brand source files in the private repository `dra-victoria-laufer-assets`; the build fetches them with a read-only deploy key | — | `approved` | [ADR-0010](docs/decisions/0010-private-assets-repository.md) |

`—` means not yet implemented or not yet verified in the repository.

**Not decided:** logo, palette and typography. They wait for Filipe's confirmation (issue 0.3) and get an ADR or `DESIGN.md` then.

## Recording a new decision

1. Copy [`docs/decisions/_template.md`](docs/decisions/_template.md) to `docs/decisions/NNNN-short-slug.md`.
2. Fill context, decision, alternatives, consequences, evidence, revisit triggers.
3. Add one row to the index above.
4. In `PROJECT_STATUS.md` → **Decisions (active)**, list only decisions that gate the current work. Do not copy this full index.
5. When the choice is built and verified, set **Implemented** to the concrete result (not a copy of Decision until evidence exists).

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-16 | D-003 and D-004: final domain changed to `dravictorialaufer.com.br` by Filipe |
| 2026-11-15 | Initial decision log: D-001 to D-010 recorded from the approved plan v2 and its final adjustments. D-008 implemented by the `LICENSE` in the same commit |
