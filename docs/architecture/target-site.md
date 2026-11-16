# Target site

Overview of the site the roadmap builds. **Built so far:** the Astro base, the deploy workflow, `DEPLOY_TARGET` and `noindex` (issue 1.1). The rest does not exist yet; progress is in [`PROJECT_STATUS.md`](../../PROJECT_STATUS.md). Each section names the issue that builds it and the ADR that explains it. File paths and package versions are chosen in those issues and recorded here when they are verified.

## Purpose

A single page that lets a visitor check who Dra. Victória Laufer is: her registration, her training, what she does, and how to reach her. It persuades through facts, with the restraint of a reading page. It does not sell appointments.

## Page

One page, in `pt-BR`, in this order:

| # | Section | Shows | Issue |
| --- | --- | --- | --- |
| 1 | Identification | Name, `MÉDICA`, `CRM-SP 240550` and the portrait, in real text, within the first fold | 2.1 |
| 2 | Formação | Each postgraduate course in the Art. 13 format, with the institution; the degree | 2.2 |
| 3 | Atuação | Roles performed, with current workplace and start year, under the wording rule in `docs/compliance/cfm.md` → C | 2.3 |
| 4 | Sobre | The text she approved | 2.3 |
| 5 | Contato | `victorialaufersaude@gmail.com`, WhatsApp, Instagram | 2.1 |
| — | Footer | Identification again, the build year, links to privacy and legal notice | 1.3, 5.1 |

Structure (issue 1.3): one `h1`, one `h2` per section, a `<main>`, a skip-navigation link, anchor navigation without JavaScript, and a 404 page that works at any URL depth. Later pages: privacy and legal notice (5.1).

Not on the page, by design: numbered steps, service cards, a locations section, testimonials, statistics, a full-screen hero with text over the image.

## Stack

| Layer | Choice | ADR |
| --- | --- | --- |
| Generator | Astro, static output, no JavaScript shipped to the browser | [0001](../decisions/0001-static-site-generator-astro.md) |
| Styling | Own CSS; tokens in one file; no framework | [0002](../decisions/0002-own-css-with-tokens.md) |
| Fonts and images | Served from the site; no third-party request | [0002](../decisions/0002-own-css-with-tokens.md), [0010](../decisions/0010-private-assets-repository.md) |
| Hosting | GitHub Pages, built and deployed by GitHub Actions | [0003](../decisions/0003-hosting-github-pages-actions.md) |
| Local commands | `make` targets wrapping the package scripts | [`Makefile`](../../Makefile) |

The tokens are neutral and provisional until issue 2.4 applies the brand confirmed in issue 0.3: palette, typography and logo usage in [`DESIGN.md`](../../DESIGN.md).

## Content model

Issue 1.2, [ADR-0005](../decisions/0005-typed-content-collections.md).

Data in `src/content/data/<collection>.yaml`, one entry per key; schemas in `src/content.config.ts`; pages read through `src/lib/content.ts`.

| Collection | Holds | Fields |
| --- | --- | --- |
| `medica` | Name, registration, the word `MÉDICA`, the text "Sobre" | `nome`; `titulo` (only `MÉDICA`); `crm.uf`, `crm.numero`; `sobre` (list of paragraphs, her text as approved) |
| `formacao` | The degree and the postgraduate courses | `tipo: graduacao` with `curso`, `instituicao`, `ano`; `tipo: pos-graduacao` with `nomeOficial`, `area`, `instituicao`, `emCurso`. Both carry `ordem` |
| `atuacao` | Approved role lines | `grupo` (`local` or `experiencia`), `ordem`, `texto`, optional `desde` (rendered ", desde <ano>") |
| `contato` | E-mail, WhatsApp, Instagram | `tipo` (`email`, `whatsapp` in E.164, `instagram` as an `https://www.instagram.com/` URL), `ordem`, `valor` |

- Every collection has a schema. Invalid data breaks the build.
- An item is either complete or `pendente: true` with a non-empty `motivo`. A complete item has every required field and no unknown one. A pending item may keep partial fields, which are not checked.
- A pending item is not rendered: `published()` in `src/lib/content.ts` drops it. The build log lists it as `[pendente] <collection>/<id>: <motivo>`, with a count per collection. The report is not written to `dist/`.
- The loader (`src/content/loader.ts`) wraps Astro's `file()` and stops the build when the file is missing or unreadable, which `file()` alone only logs.
- Pages and JSON-LD read from the collections. No fact is typed twice.
- Flags `captacao.cta` and `captacao.atendimento` in `src/config/captacao.ts` are off. Off means no HTML and no JSON-LD for those blocks (Phase 6).

## Environments

[ADR-0004](../decisions/0004-deploy-target-switch.md), [ADR-0006](../decisions/0006-noindex-until-release.md).

| | Staging (now) | Production (after 3.2) |
| --- | --- | --- |
| URL | `https://filipeoliveira94.github.io/dra-victoria-laufer/` | `https://dravictorialaufer.com.br/` |
| Base path | `/dra-victoria-laufer` | `/` |
| `DEPLOY_TARGET` | `ghpages` | not set |
| Indexing | `noindex` | `noindex` until 2.5 sets `indexable` in `src/config/release.ts` |

`astro.config.mjs` maps the variable to `site` and `base`; an unknown value stops the build. `noindex` does not depend on it. A build without `DEPLOY_TARGET` produces the production URLs. Canonical, sitemap and Open Graph URLs follow the target by themselves. The domain switch is a one-line diff in the workflow.

## Build and deploy

```text
pull request ──► checks (1.7) ──► PO + Reviewer approval ──► Filipe's OK ──► merge to main
                                                                                  │
private assets repo ──(read-only deploy key)──► fetch ──► build ──► GitHub Pages ◄┘
```

- A push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, build with `DEPLOY_TARGET: ghpages`, `scripts/check-requests.mjs` (every referenced request must return 200 from the site itself), upload `dist/`, deploy. The built site is not committed to any branch.
- Astro 7.4.12 on Node.js 22.23.4 (`.nvmrc`); `package-lock.json` is committed.
- The workflow fetches `dra-victoria-laufer-assets` before the build. Without the secret, the build uses a neutral placeholder and still completes.
- The portrait is published as AVIF and WebP with `srcset` and declared dimensions, and the main image has high priority (issue 1.4).

## Assets and privacy

[ADR-0010](../decisions/0010-private-assets-repository.md), [ADR-0008](../decisions/0008-license-code-only.md).

- Original photos and brand source files are in the private repository only. No portrait file enters this repository's history.
- The optimized portrait is public on the site, like any page image.
- The site sets no cookies and loads nothing from third parties.

## Quality gates

Issue 1.7 runs these on every pull request. Thresholds are in [`AGENTS.md`](../../AGENTS.md) §9.

| Gate | Tool or rule |
| --- | --- |
| Valid HTML, working links | HTML and link validation |
| Accessibility | axe; Lighthouse Accessibility ≥ 95; WCAG 2.1 AA |
| Performance | Lighthouse CI mobile: Performance ≥ 90, LCP < 2.5 s, CLS < 0.1 |
| Media weight | No image above 200 KB |
| Compliance | No "Lorem"; no vetoed term (`pediatra`, `especialista em`), with `NÃO ESPECIALISTA` as the only exception |
| Privacy | No portrait image file added to this repository |

Compliance beyond what a script can check is the manual checklist in [`docs/compliance/cfm.md`](../compliance/cfm.md).

## SEO and structured data

- Issue 1.6: title, description, canonical, Open Graph with `pt_BR`, social image, sitemap, `robots.txt`. No specialty term in any of them.
- Issue 4.1: JSON-LD `Person` with `jobTitle: Médica` and the CRM as identifier, without `medicalSpecialty` ([ADR-0009](../decisions/0009-schema-person.md)). `Physician` only in issue 6.2.

## What is not part of the site

- Health articles or a blog.
- Online scheduling and forms.
- A mailbox on the domain.
- Analytics that need cookies.
