# Product

<!-- impeccable:product-schema 1 -->

Product record for the portfolio site of Dra. Victória Laufer (issue 0.1). It holds who the site serves, what it is for and what it must never do. Rules live in their own files and are linked here, not copied: CFM checklist in [`docs/compliance/cfm.md`](docs/compliance/cfm.md), content facts in [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md), architecture in [`DECISIONS.md`](DECISIONS.md). Visual identity is out of scope here; it lives in [`DESIGN.md`](DESIGN.md) (issue 0.3).

## Platform

web

## Stack

Decided before this record: Astro with static output, no JavaScript shipped to the browser, own CSS from one tokens file, hosted on GitHub Pages and deployed by Actions (D-001 to D-004). The repository still holds the legacy Jekyll site until issue 1.1.

## Users

People who already have her name and want to check who she is, before trusting her with a child or with a professional relationship:

- **Parents** of newborns and children she cares for in maternity and intensive care units.
- **Colleagues** in medicine.
- **Contracting parties**: hospitals and services that hire or schedule physicians.

They arrive with a question ("is she registered, where did she train, where does she work?") and leave with an answer they can verify. The page is in Brazilian Portuguese (`lang="pt-BR"`).

## Product Purpose

A single static page whose job is **credibility**. Success is a visitor leaving with trust in her registration, training and conduct.

- Priority today: credibility and demonstrated experience. She is seeing few patients.
- Patient acquisition and scheduling are secondary. The structure exists and stays switched off behind `captacao.*` flags (D-007).

## Positioning

The proof is checkable fact, not claims: her CRM registration, her degree, her postgraduate courses with their institutions, and the units where she works now, each stated plainly and in the form the CFM requires. A page that relied on slogans, adjectives or testimonials could not copy this without breaking the rules it follows.

## Operating Context

- Medical advertising in Brazil follows **CFM Resolution 2.336/2023**. Every published word, title, meta tag, `alt` text, JSON-LD field, file name and URL passes the checklist in [`docs/compliance/cfm.md`](docs/compliance/cfm.md), and a pull request that fails one item is not merged.
- Dra. Victória owns the content. Her texts, photo and approvals arrive through Filipe, who owns scope, brand and every merge ([`AGENTS.md`](AGENTS.md) §3).
- A push to `main` publishes the site. The site stays `noindex` until the release in issue 2.6 (D-006).
- The site moves from `filipeoliveira94.github.io/dra-victoria-laufer/` to `dravictorialaufer.com.br` by one variable, `DEPLOY_TARGET` (D-004).

## Capabilities and Constraints

**What the page shows:**

- Identification: her name, the word `MÉDICA` and `CRM-SP 240550`, as real text, in the first fold at 360 px and again in the footer. This is a CFM requirement, not a layout preference.
- Formação: the degree, and each postgraduate course in the Art. 13 format followed by `NÃO ESPECIALISTA`, at the same size and contrast as the text around it.
- Atuação: her function, the unit and the current workplace, with a start year ("desde 2022"). Never an invitation to a consultation.
- Sobre: her own text, published without a change of meaning.
- Contato: `victorialaufersaude@gmail.com` (the only e-mail), WhatsApp and Instagram, as contact, not as an invitation to schedule.

**Hard limits:**

- She has no RQE. Nothing presents her as a specialist or names a specialty as her title. Sentences about what she does follow the wording rule in `cfm.md` → C: function and setting, never a title or a treatment claim.
- Structured data is schema.org `Person` with `jobTitle: Médica`, without `medicalSpecialty` (D-009).
- Data is typed in one place and only rendered by the page. An item marked `pendente` never renders; the build reports it (D-005).
- No request to a third-party host at page load, no cookies, no analytics that need them. The site does not collect, store or forward patient messages.
- Acquisition features switched off produce no HTML and no JSON-LD.

**Terminology:** "Formação", "Atuação", "Sobre" and "Contato" are the section names. The registration is always written `CRM-SP 240550`.

**Open:**

- The e-mail may change later if she asks (D-007); a future decision.
- The courses are shown while CREMESP registration is frozen, by Filipe's decision; recorded risk in `cfm.md` → B.

## Brand Commitments

- Her name, registration and the word `MÉDICA` are the identity, always as real text. Her logo, palette (green, yellow and white leading; lilac in the brand, off the page) and the site typography were confirmed in issue 0.3 and are recorded in [`DESIGN.md`](DESIGN.md).
- Voice: plain, factual, restrained. First person only in her own text ("Sobre"). No superlatives, no "referência em", no promotional language (Art. 11, XVI).
- Workplaces are named in text, never with their logos.

## Evidence on Hand

Received and recorded in [`docs/inputs/0.2-pending-inputs.md`](docs/inputs/0.2-pending-inputs.md):

- Registration: CRM 240550, São Paulo. No RQE.
- Degree: Medicina, Universidade Federal do Vale do São Francisco (UNIVASF), 2021.
- Three postgraduate courses with official names and institutions (HCX Fmusp; Faculdade Sírio-Libanês). Neonatologia is in progress and its card carries the "EM CURSO" marker. None is registered at the CREMESP.
- Four current workplaces in Guarulhos and Jacareí, with start years 2022 and 2024, in approved lines.
- The approved text "Sobre".
- One professional portrait with right of use, stored in the private repository `dra-victoria-laufer-assets`, never in this one (D-010). A build without the deploy key uses a neutral placeholder.

Absent, and never to be fabricated: testimonials, ratings, patient counts or any statistic, case photos, hospital photos (they show patients or staff), previous workplaces, Lattes, LinkedIn, Doctoralia. The UNIVASF Enamed score is unchecked and stays off the site.

## Product Principles

1. **Credibility over acquisition.** Every choice first serves a visitor checking who she is. Acquisition waits behind flags.
2. **Facts that can be checked.** Registration, training and workplaces, stated in the form the CFM requires. No adjective does the work of a fact.
3. **When in doubt, do not publish.** A missing or uncertain fact is `pendente` and stays off the page; an open compliance point goes to Filipe.
4. **One source per fact.** Each fact lives in one typed collection and the page renders it.
5. **Her words are hers.** "Sobre" and any approved line are published without a change of meaning.

Anti-goals from the confirmed design brief: generic illustration, card grid (the course cards of the "Caminho do jardim" direction are the one approved exception, `DESIGN.md` → Shapes), full-screen hero with text over the image, testimonials, statistics, promotional language. The page sequence and mode of the brief are surface strategy and live in [`ROADMAP.md`](ROADMAP.md) → Design brief.

## Accessibility & Inclusion

WCAG 2.1 AA: axe with no violations, full keyboard navigation, contrast ≥ 4.5:1 for every text and background pair, Lighthouse mobile Accessibility ≥ 95. Visitors include parents reading on a phone, so the layout works from 320 px with no horizontal scroll. Thresholds: [`AGENTS.md`](AGENTS.md) §9.
