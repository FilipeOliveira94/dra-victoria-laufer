# Target site

Overview of the site the roadmap builds. **Built:** phases 1 to 5 (base, content model, page, brand, credibility content, domain, JSON-LD `Person`, privacy and legal pages, CREMESP lookup and review date) and the maintenance reminders of 7.2. Acquisition (phase 6) is deferred and does not exist. Progress is in [`PROJECT_STATUS.md`](../../PROJECT_STATUS.md). Each section names the issue that builds it and the ADR that explains it. File paths and package versions are chosen in those issues and recorded here when they are verified.

## Purpose

A single page that lets a visitor check who Dra. Victória Laufer is: her registration, her training, what she does, and how to reach her. It persuades through facts, with the restraint of a reading page. It does not sell appointments.

## Page

One page, in `pt-BR`, in this order:

| # | Section | Shows | Issue |
| --- | --- | --- | --- |
| 1 | Identification | Name, `MÉDICA`, `CRM-SP 240550` and the portrait, in real text, within the first fold | 2.2 |
| 2 | Formação | Each postgraduate course in the Art. 13 format, with the institution; the degree | 2.3 |
| 3 | Atuação | Roles performed, with current workplace and start year, under the wording rule in `docs/compliance/cfm.md` → C | 2.4 |
| 4 | Sobre | The text she approved | 2.4 |
| 5 | Contato | `victorialaufersaude@gmail.com`, WhatsApp, Instagram | 2.2 |
| — | Footer | Identification again, the build year, links to privacy and legal notice | 1.3, 2.1, 2.2, 5.1 |

Structure (issue 1.3, built): one `h1`, one `h2` per section, a `<main>`, anchor navigation without JavaScript, a footer with the build year, and a 404 page that works at any URL depth. The skip-navigation link is issue 1.5. Since 5.1, two more pages: `/privacidade/` and `/aviso-legal/`.

- `src/lib/sections.ts` lists the four sections in page order (id and name). The navigation and the section ids come from that list, so an id is never typed twice.
- `src/components/Section.astro` renders `<section id aria-labelledby>` with its `h2`. `index.astro` renders a section, and lists it in the navigation, only when it has published content: an empty section would be a placeholder. Today only Contato (the e-mail) is on the page; Formação, Atuação and Sobre appear with 2.3 and 2.4.
- `src/layouts/Base.astro` holds the head, the navigation and the footer (`© <build year> <name>`). The year is computed at build time.
- `src/pages/[pagina].astro` renders one page per published entry of the `paginas` collection (`src/content/data/paginas.yaml`, issue 5.1): title, review date, sections of paragraphs, cited external links, and the e-mail or identity line taken from their own collections. The footer links and the sitemap come from the same list, so a pending page has no route and no link. Each page carries its own canonical URL.
- `src/pages/404.astro` uses the same layout without navigation or canonical. Its links and CSS are absolute from the base path, so the page renders the same at `/x` and `/a/b/c/`. GitHub Pages serves `404.html` for any missing path.
- CSS: `src/styles/tokens.css` (every value: the `DESIGN.md` palette, type roles, spacing and shape, issue 2.1) and `src/styles/global.css` (layout: one column, measure 40rem, gutter 16 px, 24 px from 600 px). The build inlines it in each page; no extra request.

Not on the page, by design: numbered steps, service cards, a locations section, testimonials, statistics, a full-screen hero with text over the image.

## Stack

| Layer | Choice | ADR |
| --- | --- | --- |
| Generator | Astro, static output, no JavaScript shipped to the browser | [0001](../decisions/0001-static-site-generator-astro.md) |
| Styling | Own CSS; tokens in one file; no framework | [0002](../decisions/0002-own-css-with-tokens.md) |
| Fonts and images | Served from the site; no third-party request | [0002](../decisions/0002-own-css-with-tokens.md), [0010](../decisions/0010-private-assets-repository.md) |
| Hosting | GitHub Pages, built and deployed by GitHub Actions | [0003](../decisions/0003-hosting-github-pages-actions.md) |
| Local commands | `make` targets wrapping the package scripts | [`Makefile`](../../Makefile) |

Issue 2.1 applied the brand confirmed in issue 0.3 ([`DESIGN.md`](../../DESIGN.md)): brand tokens with semantic roles in `tokens.css`; header with the colour horizontal logo and the anchor navigation; a ground fixed per section in `src/lib/sections.ts` (`fundo`: white, `verde-claro` or `lilas-claro`; no bands); footer on `verde-profundo` with the white logo. `scripts/prepare-assets.mjs` writes the two logos with the name recentred on the monogram and composes the social image (logo on white, `verde-marca` field, `ouro` hairline). Without the assets, no logo is rendered.

## Content model

Issue 1.2, [ADR-0005](../decisions/0005-typed-content-collections.md).

Data in `src/content/data/<collection>.yaml`, one entry per key; schemas in `src/content.config.ts`; pages read through `src/lib/content.ts`.

| Collection | Holds | Fields |
| --- | --- | --- |
| `medica` | Name, registration, the word `MÉDICA`, the text "Sobre", where to check the CRM, the page's review date | `nome`; `titulo` (only `MÉDICA`); `crm.uf`, `crm.numero`; `sobre` (list of paragraphs, her text as approved); `consultaCrm` (the CREMESP public lookup, exactly `https://guiamedico.cremesp.org.br/`; issue 5.2); `revisao` (quoted ISO date on which she approved the home page content, shown as "Revisado em …" in a `<time>`; issue 5.2) |
| `formacao` | The degree and the postgraduate courses | `tipo: graduacao` with `curso`, `instituicao`, `ano`; `tipo: pos-graduacao` with `nomeOficial`, `area`, `instituicao`, `emCurso`. Both carry `ordem` |
| `atuacao` | Approved role lines | `grupo` (`local` or `experiencia`), `ordem`, `texto`, optional `desde` (rendered ", desde <ano>") |
| `contato` | E-mail, WhatsApp, Instagram | `tipo` (`email`, `whatsapp` in E.164, `instagram` as an `https://www.instagram.com/` URL), `ordem`, `valor` |

- Every collection has a schema. Invalid data breaks the build.
- An item is either complete or `pendente: true` with a non-empty `motivo`. A complete item has every required field and no unknown one. A pending item may keep partial fields, which are not checked.
- A pending item is not rendered: `published()` in `src/lib/content.ts` drops it. The build log lists it as `[pendente] <collection>/<id>: <motivo>`, with a count per collection. The report is not written to `dist/`.
- The loader (`src/content/loader.ts`) wraps Astro's `file()` and stops the build when the file is missing or unreadable, which `file()` alone only logs.
- Pages and JSON-LD read from the collections. No fact is typed twice.
- Issue 5.2: the home page links the CREMESP lookup under the identity line ("Confira o CRM-SP 240550 na consulta pública de médicos do CREMESP") and ends `<main>` with "Revisado em <date>". The lookup has no deep link by CRM (its per-physician route takes an encrypted QR token), so the link is the official search page and the sentence names the number. Neither field reaches the JSON-LD. Courses, events and publications have no collection yet: she has none, and the model waits for the first item (`ROADMAP.md` → 5.2).
- Flags `captacao.cta` and `captacao.atendimento` in `src/config/captacao.ts` are off. Off means no HTML and no JSON-LD for those blocks (Phase 6).

## Environments

[ADR-0004](../decisions/0004-deploy-target-switch.md), [ADR-0006](../decisions/0006-noindex-until-release.md).

| Setting | Staging (until 3.2) | Production (from 3.2) |
| --- | --- | --- |
| URL | `https://filipeoliveira94.github.io/dra-victoria-laufer/` | `https://dravictorialaufer.com.br/` |
| Base path | `/dra-victoria-laufer` | `/` |
| `DEPLOY_TARGET` | `ghpages` | not set |
| Indexing | Indexable since 2.6 | Indexable since 2.6 (`indexable` in `src/config/release.ts`) |

`astro.config.mjs` maps the variable to `site` and `base`; an unknown value stops the build. Indexing does not depend on it. A build without `DEPLOY_TARGET` produces the production URLs. Canonical, sitemap and Open Graph URLs follow the target by themselves. Issue 3.2 removed the variable from the workflow; the check steps call the scripts with their default base `/`. `DEPLOY_TARGET=ghpages` remains for a local staging build.

## Build and deploy

```text
pull request ──► CI (1.7) ──► Dev's ready signal ──► PO + Reviewer approve the same head
             ──► Filipe's OK ──► Reviewer merges to main
                                                  │
                                                  ▼
private assets repo ──(read-only deploy key)──► fetch ──► build ──► GitHub Pages
```

- Approvals follow [`AGENTS.md`](../../AGENTS.md) §4: a small change needs only the PO's approval. Merge, branch deletion and deploy are the Reviewer's, after Filipe's explicit OK; Filipe may do them himself or order a specific bot to.
- A push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, build for `https://dravictorialaufer.com.br/` (no `DEPLOY_TARGET`, since 3.2), `scripts/check-requests.mjs` (every referenced request must return 200 from the site itself), upload `dist/`, deploy. The built site is not committed to any branch.
- Astro 7.4.12 on Node.js 22.23.4 (`.nvmrc`); `package-lock.json` is committed.
- The workflow fetches `dra-victoria-laufer-assets` before the build. Without the secret, the build uses a neutral placeholder and still completes.
- Maintenance (issue 7.2) sits beside `deploy.yml` and does not change it: `.github/dependabot.yml` (npm weekly, GitHub Actions monthly, no auto-merge) and two scheduled workflows with only `issues: write` (and `contents: read` where the template is checked out), `semiannual-review.yml` and `domain-renewal.yml`, which open issues. Runbook: [`docs/runbooks/maintenance.md`](../runbooks/maintenance.md).
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
- Issue 4.1: JSON-LD `Person` on the home page only, built by `src/lib/person.ts` from the collections: `honorificPrefix` `Dra.` and `name`, `jobTitle: Médica`, the CRM as a `PropertyValue` identifier, `hasCredential` (the degree, and each finished postgraduate course named in the Art. 13 line with `NÃO ESPECIALISTA`), `image` (the portrait, only with the private assets), `url` and the Instagram in `sameAs`. No `medicalSpecialty` ([ADR-0009](../decisions/0009-schema-person.md)); `Physician` only in issue 6.2. A course in progress is left out and enters by itself when `emCurso` turns false. `scripts/check-jsonld.mjs` (in `npm run lint`) enforces the rules on `dist/`.

## What is not part of the site

- Health articles or a blog.
- Online scheduling and forms.
- A mailbox on the domain.
- Analytics that need cookies.
