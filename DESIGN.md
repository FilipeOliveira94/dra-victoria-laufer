---
name: Dra. Victória Laufer
description: Single static page that proves who she is — registration, training and roles — in her own brand colours, read on a phone.
colors:
  branco: "#FFFFFF"
  azul-tinta: "#274360"
  azul-noite: "#1C3048"
  azul-cinza: "#4A6178"
  verde-marca: "#3EB7AE"
  verde-profundo: "#135A55"
  verde-claro: "#E6F5F3"
  amarelo-marca: "#FFD87D"
  ouro: "#A47B1C"
  lilas: "#B78BC5"
  lilas-claro: "#F3EDF6"
typography:
  display:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 1.9rem + 3.6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "0em"
  title:
    fontFamily: "'Source Sans 3', 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0em"
  body:
    fontFamily: "'Source Sans 3', 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "'Source Sans 3', 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0"
  sm: "2px"
  md: "6px"
  lg: "14px"
  card: "22px 22px 22px 4px"
  pill: "2rem"
  clearing: "40px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
components:
  section-default:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.azul-tinta}"
    typography: "{typography.body}"
  section-clareira:
    backgroundColor: "{colors.verde-claro}"
    textColor: "{colors.azul-tinta}"
    typography: "{typography.body}"
    rounded: "{rounded.clearing}"
  footer:
    backgroundColor: "{colors.verde-profundo}"
    textColor: "{colors.branco}"
    typography: "{typography.body}"
  link:
    textColor: "{colors.verde-profundo}"
  link-hover:
    textColor: "{colors.azul-noite}"
  identity-line:
    textColor: "{colors.azul-tinta}"
    typography: "{typography.label}"
---

# Design System: Dra. Victória Laufer

Issue 0.3. The brand was confirmed by Filipe on 2026-11-16 from Dra. Victória's own logo and palette. This file records it **before any page is built**: issue 1.1 creates the Astro base, 1.3 the layout with provisional tokens, and 2.1 replaced those tokens with the ones below (`src/styles/tokens.css`). The 2.1 build was merged back into this file: no bands, the social image composition, the recentred logo name.

**Issue 2.2 changed the direction (Filipe, 2026-11-17).** The 2.1 page read as correct but without personality. Filipe released the restrictive rules (flat, square, ouro only as a hairline, no icons), and the Impeccable direction flow (Persuade mode; to avoid: a generic clinic look, cold or corporate, overloaded) produced two profiles of three variants each. He chose **A1, "Caminho do jardim"**: she loves nature, and the garden becomes part of her brand without losing credibility. Lilac leaves the page and stays in the brand. The rules below are that direction; where they differ from the 0.3 text, 2.2 wins.

How it was made: the Impeccable new-surface flow, with the direction roll skipped because the brand was pinned whole by the client — her palette ("Manter paleta no verde, lilás/roxo, azul, amarelo, mas podemos mudar as fontes das letras para fontes mais sóbrias"), her logo, and the page sequence and first fold in [`ROADMAP.md`](ROADMAP.md) → Design brief. Typography (option A of three) and the use of green, yellow and white as the leading colours were chosen by Filipe. Product truth lives in [`PRODUCT.md`](PRODUCT.md); the wording rules in [`docs/compliance/cfm.md`](docs/compliance/cfm.md) bind every visible string, including text inside images.

## Overview

**Creative North Star: "Caminho do jardim" — a garden path through her credentials.**

A visitor arrives with a question — is she registered, where did she train, where does she work — and the page answers it like a well-set document: name, `MÉDICA`, `CRM-SP 240550`, then the evidence in order. A dotted gold path winds down the page and sets each section heading on a stone, so the reader walks the evidence in order. Her portrait stands in a verde-claro clearing with a small sun and a leaf. The text stays sober; the shapes carry the warmth: the turquoise of her monogram, the yellow and gold of its leaves, the deep blue of her signature.

The scene: parents on a phone, often between shifts at a maternity ward or at home in daylight; colleagues and hiring services on a laptop at work. Light theme only; white is the ground.

**Key Characteristics:**

- White ground; `verde-claro` clearings (behind the portrait, around "Sobre", inside course cards) and a deep green footer; brand colours are never text on white. No bands.
- Organic shapes from the garden: the path, stones, clearings, a sun, leaves. They are ornament, never text, never a stand-in for content.
- Serif headings, humanist sans for reading — sober, legible in Portuguese, self-hosted.
- The logo is ornament and signature; identity is always real text.
- Still no shadows, no gradients outside the logo artwork, no illustration of people, animals or toys.

## Colors

Full palette, four roles: green leads, yellow supports, blue carries the text, lilac is a quiet secondary. The two brand colours that fail contrast as text on white (`verde-marca` 2.44:1, `ouro` 3.87:1) are used only as surfaces or ornament; text that needs to be green uses `verde-profundo`, the same hue darkened.

### Primary

- **Verde da marca** (`verde-marca`): the monogram's turquoise. Ornament: the leaf in the first fold, the leaf markers of Atuação, the "EM CURSO" outline, the field along the bottom of the social image. Not a section ground on the page. Text on it would be `azul-noite`, never white.
- **Verde profundo** (`verde-profundo`): the same hue at text strength. Section headings, links, focus ring, footer ground.
- **Verde claro** (`verde-claro`): the clearing — behind the portrait, around "Sobre", inside course cards, the contact rows' outline and icon discs.

### Secondary

- **Amarelo da marca** (`amarelo-marca`): the logo's light gold. The sun in the first fold, the text-selection highlight with `azul-tinta` text, and the identity line on the `verde-profundo` footer. Never a text colour on white.
- **Ouro** (`ouro`): the gold of the circle. The garden path, its stones, and the hairline above the identity line.

### Tertiary

- **Lilás** (`lilas`) and **Lilás claro** (`lilas-claro`): her favourite colour. Kept in the brand palette, **not used on the page** since issue 2.2 (Filipe, 2026-11-17). Their pairs stay in the table for brand pieces outside the page.

### Neutral

- **Branco** (`branco`): the page ground.
- **Azul tinta** (`azul-tinta`): the signature blue of the logo. All body text and the identity line.
- **Azul noite** (`azul-noite`): text on `verde-marca`; link hover.
- **Azul cinza** (`azul-cinza`): secondary text (start years, institutions) on light grounds only.

### Approved text pairs

Every text and background combination the site may use. Any pair not in this table is not allowed for text. The ratios are WCAG 2.1 relative-luminance contrast, checked by `node scripts/check-contrast.mjs`, which reads the colour values from this file's frontmatter and fails below 4.5:1.

<!-- contrast-pairs:start -->
| Text | Background | Ratio | Use |
| --- | --- | --- | --- |
| azul-tinta | branco | 10.20 | Body text, identity line |
| verde-profundo | branco | 8.01 | Headings, links |
| azul-noite | branco | 13.41 | Link hover |
| azul-cinza | branco | 6.42 | Secondary text |
| azul-tinta | verde-claro | 9.10 | Body text in clearings and course cards |
| verde-profundo | verde-claro | 7.14 | Headings, course lines and links in clearings |
| azul-cinza | verde-claro | 5.72 | Secondary text in clearings and course cards |
| azul-tinta | amarelo-marca | 7.47 | Selected text |
| azul-tinta | lilas-claro | 8.87 | Text on lilac (brand pieces, not the page) |
| verde-profundo | lilas-claro | 6.96 | Headings and links on lilac (brand pieces, not the page) |
| branco | verde-profundo | 8.01 | Footer text and links |
| amarelo-marca | verde-profundo | 5.86 | Footer identity line |
<!-- contrast-pairs:end -->

The footer hill is `verde-marca` mixed 16% into `verde-profundo` (`color-mix`, about `#1A6963`). It is a shape, not a ground for text: on a phone it sits in the corner away from the text, and from 900 px it moves behind the logo. If text ever falls on it, `branco` measures about 6.5:1 and `amarelo-marca` about 4.7:1.

### Named Rules

**The Fields-Not-Ink Rule.** `verde-marca`, `amarelo-marca`, `ouro`, `lilas` and `lilas-claro` are grounds or ornament. None of them is ever a text colour on white.

**The Light-Grounds Rule.** Sections sit on `branco`; clearings and cards on `verde-claro`; the only dark field is the footer. No `verde-marca` or `amarelo-marca` band on the page (Filipe, 2026-11-16, issue 2.1).

## Typography

**Display and headings:** Source Serif 4, weight 600. **Body and labels:** Source Sans 3, weights 400 and 600. Both are SIL Open Font License 1.1, served from the site as WOFF2 (Latin and Latin Extended subsets; issue 1.4), with `font-display: swap` and the system fallbacks in the tokens.

The logo's own faces (a commercial script and Lucida Sans Unicode) stay inside the logo artwork. Lucida Sans Unicode is a Microsoft system font that cannot be served from the site; Source Sans 3 is the humanist sans closest to it, which keeps continuity with the logo.

### Hierarchy

- **Display** (`display`): her name, once, in the first fold, in `verde-profundo`, at most 9 characters a line so it sets on three lines. The only `h1`.
- **Headline** (`headline`): section headings in `verde-profundo`, descriptive and approved by her (Filipe, 2026-11-17): "Graduação e pós-graduações", "Onde trabalho", "Sobre mim", "Canais de contato".
- **Section label** (`label` at 0.8125rem, `azul-cinza`): the section's navigation name above its heading — Formação, Atuação, Contato — so the anchor and the heading read as one. "Sobre mim" has none: it already names the section.
- **Title** (`title`): a course name, a workplace.
- **Body** (`body`): everything else; 17 px base for long reading on phones; measure 60–70 characters.
- **Label** (`label`): the identity line `MÉDICA · CRM-SP 240550`, in capitals with open tracking, in `azul-tinta`; the contact channel names, small, in `azul-cinza`.

### Named Rules

**The Same-Size Rule.** `NÃO ESPECIALISTA` is set in the same token, size, weight and colour as the course line it follows (CFM Art. 13). It is never a label, a badge, smaller type or a lighter colour.

**The Real-Text Rule.** Name, `MÉDICA` and `CRM-SP 240550` are always live text in the first fold at 360 px. No logo, image or SVG stands in for them.

## Layout

Reading order fixed by the brief: identification with portrait → Formação → Atuação → Sobre → Contato. Page column up to 70 rem; side gutter 16 px at 320–599 px, 24 px from 600 px. Reading text keeps a 40 rem measure. Sections separate by space (`xl`–`3xl`), more above a heading than below it. No horizontal scroll from 320 to 1600 px.

The path runs at `--trail-x` from the column's edge (30 px, 40 px from 900 px); section content starts at `--trail-indent` (60 px, 104 px from 900 px), plus the stone's shift. From 900 px each section is two columns: label and heading on the left (up to 18 rem), content on the right. "Sobre" is one column inside its clearing.

First fold on a phone: logo (horizontal, small) → name (`display`) → hairline and identity line (`label`) → the scene (clearing, sun, portrait, leaf), indented to the path. The name block is white, so the path starts below it. From 900 px: name and identity line on the left, the scene on the right; the portrait never sits behind the text and text never sits on the photo.

## Elevation & Depth

Flat. No shadows, no blur. Depth comes from overlap: the sun behind the portrait, the portrait's white edge over the clearing, the leaf over both. A 2 px `ouro` hairline sits above the identity line.

## Shapes

Rounded and organic, never sharp-cornered boxes:

- **Portrait:** a 3:4 arch — the top a true semicircle, the bottom corners `rounded.lg` — with an 8 px white edge.
- **Course card** (2.3): `rounded.card`, three round corners and one nearly square, like a leaf. The degree has a `verde-claro` outline on white; each postgraduate course a `verde-claro` fill. The course line reads `MÉDICA com pós-graduação em (área) — NÃO ESPECIALISTA` in `title`, `verde-profundo`; "— NÃO ESPECIALISTA" never breaks across lines. The institution follows in `azul-cinza`. A course in progress ends with the "EM CURSO" marker: `label` at 0.8125rem, `verde-profundo` text in a `rounded.pill` `verde-marca` outline, real text read by screen readers. Two columns from 900 px.
- **Contact row:** `rounded.pill`, a `verde-claro` 2 px outline.
- **Clearing** ("Sobre"): `rounded.clearing`. The first-fold clearing is a free organic SVG shape.
- `rounded.sm` for the focus ring.

### Garden shapes

All decorative, `aria-hidden`, drawn in CSS or inline SVG from the tokens; no stock or generic illustration, no request.

- **Path:** a dotted `ouro` line, 3.5 px round dots every 12 px, down the left edge of the page at `--trail-x`. It is a gentle wave, 12 px each side of that line: its right crests are the stones and its left crests sit 64 px (`--trail-lead`) above each section. It is drawn in stretches from crest to crest, where the line runs straight down, so they join without a kink: one full wave through the first fold, then two half-waves per section, into its stone and out of it. The stones interrupt it: the dots run up to each stone and stop short of it.
- **Stone:** a 22 px `ouro` disc on the path, centred on the first line of each section heading. It sits at the wave's right crest, 12 px (`--stone-shift`) right of the path's line. The section's label, heading and content move with the stone. A 10 px ring of the ground around it is the gap the dots leave, the same on every side.
- **Clearing:** `verde-claro`, organic outline behind the portrait; a rounded field around "Sobre".
- **Sun:** an `amarelo-marca` disc, top right of the portrait, partly behind it.
- **Leaf:** `verde-marca` with a white vein, at the portrait's lower left; small leaf shapes (`rounded.card` turned) mark the Atuação list (2.4).
- **Hill:** a lighter disc in a corner of the footer.

### Motion

One moment as the page opens: the clearing opens, the sun rises and the leaf settles (about 1–1.4 s, exponential ease-out). As each heading scrolls into view its stone sets (scroll-driven, where the browser supports it). Transform only, from shapes already visible: text and the portrait never move or fade. Nothing moves under `prefers-reduced-motion: reduce`. CSS only, no script.

## Components

### Links

`verde-profundo`, underlined (offset 0.15em, thickness 1px); hover `azul-noite` with a 2px underline. Focus: 2px `verde-profundo` outline with 2px offset, `rounded.sm`; on the footer the outline is `branco`.

### Contact

Each channel is a row in a `rounded.pill` outline: a drawn icon on a `verde-claro` disc (one stroke set, 2 px, in `verde-profundo`, as a CSS mask: no text, no request), the channel name as a small label, the address as an underlined text link. Not buttons, not an invitation to schedule. Rows stack on a phone and sit side by side from 900 px. On a narrow phone an address breaks only before the e-mail domain or after a dot in the handle.

### Navigation

Anchor links to the four sections, in `label` style, no JavaScript. Current section is not tracked (no script). Underline on hover and focus.

### Sections

Fixed per section, so a missing section never shifts the others: Formação, Atuação and Contato on white (`section-default`), with label, heading and stone; "Sobre" in `section-clareira`, a rounded `verde-claro` field that covers the path, its stone inside on the path's line, and the first sentence of her text in the serif face (2.4). No bands (The Light-Grounds Rule).

### Footer

`verde-profundo` ground with the hill, `branco` text, `logo-horizontal-branco`, the name in the serif face and the identity line in `amarelo-marca` (`MÉDICA · CRM-SP 240550`), and the build year. From 900 px: logo, identity and year in one row.

### Logo

Files live in the private repository `dra-victoria-laufer-assets` (ADR-0010) and are optimised for the site in issue 1.4:

| Use | File | Notes |
| --- | --- | --- |
| Header, on white | `brand/logo/logo-horizontal-cor.png` | Small; decorative next to the real-text name, so `alt=""` |
| Footer, on `verde-profundo` | `brand/logo/logo-horizontal-branco.png` | `alt=""` for the same reason |
| Favicon, app icon | `brand/symbol/simbolo-cor.png` | The monogram; dark fallback `simbolo-preto.png` |
| Social image (Open Graph) | `brand/logo/logo-horizontal-cor.png` | 1200 × 630: the logo centred on white, a `verde-marca` field along the bottom with a 4px `ouro` hairline above it (Filipe, 2026-11-16). No text in the image; any text added later passes the CFM checklist |
| Never on the site | everything in `brand/source/` | Their tagline does not follow the Art. 13 format and one variant drops the accent from "Victória" |

The horizontal and vertical logos in `brand/logo/` were derived from her originals by removing the professional tagline, nothing else; the monogram and the name are untouched. Only PNG exists (no vector source). The logo is never recoloured, stretched, outlined or placed on `verde-marca` or `amarelo-marca`, where its own turquoise and gold disappear.

On the site, the horizontal logos have the written name moved down so it shares the monogram's vertical centre; in the originals it sits about 50 px higher (Filipe, 2026-11-16). The build does this from the originals (`scripts/prepare-assets.mjs`): moved and trimmed only, never recoloured, stretched or redrawn. Sizes: 40 px high in the header on a phone, 48 px from 600 px, 44 px in the footer.

## Do's and Don'ts

### Do:

- **Do** use green, yellow and white as the leading colours, with green and yellow as fields and shapes and white as the ground.
- **Do** keep every garden shape decorative: hidden from assistive technology, never carrying text or meaning.
- **Do** take every text colour from the approved pairs table, and run `node scripts/check-contrast.mjs` when a colour changes.
- **Do** keep name, `MÉDICA` and `CRM-SP 240550` as live text in the first fold and in the footer.
- **Do** set `NÃO ESPECIALISTA` exactly like the course line around it.
- **Do** serve both fonts and every logo from the site itself.

### Don't:

- **Don't** set text in `verde-marca`, `amarelo-marca`, `ouro` or `lilas`, or white text on `verde-marca` (2.44:1).
- **Don't** publish any file from `brand/source/`, or write a professional tagline into the logo.
- **Don't** use shadows, gradients, same-size icon-card grids, or a full-screen hero with text over the photo (anti-goals in `PRODUCT.md`). Cards exist only as the course cards above; icons only in the contact rows.
- **Don't** use lilac on the page, or children's motifs (animals, toys, cartoon figures): the garden is the brand's only figurative layer.
- **Don't** use the commercial script face or Lucida Sans Unicode as web fonts.
- **Don't** add a dark theme without a new decision; the palette was checked on light grounds only.
