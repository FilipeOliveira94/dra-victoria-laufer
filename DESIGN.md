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
    fontSize: "clamp(2.25rem, 1.6rem + 3vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Source Serif 4', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.625rem, 1.4rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
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
  section-alt:
    backgroundColor: "{colors.verde-claro}"
    textColor: "{colors.azul-tinta}"
    typography: "{typography.body}"
  band-verde:
    backgroundColor: "{colors.verde-marca}"
    textColor: "{colors.azul-noite}"
    typography: "{typography.body}"
  band-amarelo:
    backgroundColor: "{colors.amarelo-marca}"
    textColor: "{colors.azul-tinta}"
    typography: "{typography.body}"
  section-sobre:
    backgroundColor: "{colors.lilas-claro}"
    textColor: "{colors.azul-tinta}"
    typography: "{typography.body}"
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

Issue 0.3. The brand was confirmed by Filipe on 2026-11-16 from Dra. Victória's own logo and palette. This file records it **before any page is built**: issue 1.1 creates the Astro base, 1.3 the layout with provisional tokens, and 2.4 replaces those tokens with the ones below. After 2.4, run `/impeccable document` in scan mode to refresh this file from the built page.

How it was made: the Impeccable new-surface flow, with the direction roll skipped because the brand was pinned whole by the client — her palette ("Manter paleta no verde, lilás/roxo, azul, amarelo, mas podemos mudar as fontes das letras para fontes mais sóbrias"), her logo, and the page sequence and first fold in [`ROADMAP.md`](ROADMAP.md) → Design brief. Typography (option A of three) and the use of green, yellow and white as the leading colours were chosen by Filipe. Product truth lives in [`PRODUCT.md`](PRODUCT.md); the wording rules in [`docs/compliance/cfm.md`](docs/compliance/cfm.md) bind every visible string, including text inside images.

## Overview

**Creative North Star: "The registration card, in her colours."**

A visitor arrives with a question — is she registered, where did she train, where does she work — and the page answers it like a well-set document: name, `MÉDICA`, `CRM-SP 240550`, then the evidence in order. Her brand supplies the warmth: the turquoise of her monogram, the yellow and gold of its leaves, the deep blue of her signature. The type supplies the sobriety she asked for.

The scene: parents on a phone, often between shifts at a maternity ward or at home in daylight; colleagues and hiring services on a laptop at work. Light theme only; white is the ground.

**Key Characteristics:**

- White ground, brand colours as whole fields (sections and bands), never as text on white.
- Serif headings, humanist sans for reading — sober, legible in Portuguese, self-hosted.
- The logo is ornament and signature; identity is always real text.
- Restraint: no cards, no icons for decoration, no shadows, no gradients except inside the logo artwork itself.

## Colors

Full palette, four roles: green leads, yellow supports, blue carries the text, lilac is a quiet secondary. The two brand colours that fail contrast as text on white (`verde-marca` 2.44:1, `ouro` 3.87:1) are used only as surfaces or ornament; text that needs to be green uses `verde-profundo`, the same hue darkened.

### Primary

- **Verde da marca** (`verde-marca`): the monogram's turquoise. Section bands and large ornament. Text on it is `azul-noite`, never white.
- **Verde profundo** (`verde-profundo`): the same hue at text strength. Section headings, links, focus ring, footer ground.
- **Verde claro** (`verde-claro`): an alternate section ground that keeps the green present at reading scale.

### Secondary

- **Amarelo da marca** (`amarelo-marca`): the logo's light gold. One highlight band or field, with `azul-tinta` text. Never a text colour.
- **Ouro** (`ouro`): the gold of the circle. Hairlines and dividers only, 1–2 px.

### Tertiary

- **Lilás** (`lilas`): her favourite colour, kept secondary by her request. A rule or marker beside the "Sobre" section; never text, never a focus or state indicator (2.80:1 on white).
- **Lilás claro** (`lilas-claro`): the "Sobre" section ground, so her own words sit in her colour.

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
| azul-tinta | verde-claro | 9.10 | Body text in alternate sections |
| verde-profundo | verde-claro | 7.14 | Headings and links in alternate sections |
| azul-cinza | verde-claro | 5.72 | Secondary text in alternate sections |
| azul-noite | verde-marca | 5.49 | Text and headings on the green band |
| azul-tinta | amarelo-marca | 7.47 | Text on the yellow band |
| verde-profundo | amarelo-marca | 5.86 | Headings and links on the yellow band |
| azul-cinza | amarelo-marca | 4.70 | Secondary text on the yellow band |
| azul-tinta | lilas-claro | 8.87 | Text in "Sobre" |
| verde-profundo | lilas-claro | 6.96 | Headings and links in "Sobre" |
| branco | verde-profundo | 8.01 | Footer text and links |
| amarelo-marca | verde-profundo | 5.86 | Footer accent text |
<!-- contrast-pairs:end -->

### Named Rules

**The Fields-Not-Ink Rule.** `verde-marca`, `amarelo-marca`, `ouro`, `lilas` and `lilas-claro` are grounds or ornament. None of them is ever a text colour on white.

**The One Band Rule.** At most one `band-verde` and one `band-amarelo` on the page. A band marks a moment; repeated, it becomes decoration.

## Typography

**Display and headings:** Source Serif 4, weight 600. **Body and labels:** Source Sans 3, weights 400 and 600. Both are SIL Open Font License 1.1, served from the site as WOFF2 (Latin and Latin Extended subsets; issue 1.4), with `font-display: swap` and the system fallbacks in the tokens.

The logo's own faces (a commercial script and Lucida Sans Unicode) stay inside the logo artwork. Lucida Sans Unicode is a Microsoft system font that cannot be served from the site; Source Sans 3 is the humanist sans closest to it, which keeps continuity with the logo.

### Hierarchy

- **Display** (`display`): her name, once, in the first fold. The only `h1`.
- **Headline** (`headline`): section headings — Formação, Atuação, Sobre, Contato — in `verde-profundo`.
- **Title** (`title`): a course name, a workplace, a contact channel.
- **Body** (`body`): everything else; 17 px base for long reading on phones; measure 60–70 characters.
- **Label** (`label`): the identity line `MÉDICA · CRM-SP 240550`, in capitals with open tracking, in `azul-tinta`.

### Named Rules

**The Same-Size Rule.** `NÃO ESPECIALISTA` is set in the same token, size, weight and colour as the course line it follows (CFM Art. 13). It is never a label, a badge, smaller type or a lighter colour.

**The Real-Text Rule.** Name, `MÉDICA` and `CRM-SP 240550` are always live text in the first fold at 360 px. No logo, image or SVG stands in for them.

## Layout

One column, reading order fixed by the brief: identification with portrait → Formação → Atuação → Sobre → Contato. Content measure about 40 rem; side gutter 16 px at 320–599 px, 24 px from 600 px, centred column from 1024 px. Sections separate by ground colour and `2xl`–`3xl` vertical space, more space above a heading than below it. No horizontal scroll from 320 to 1600 px.

First fold on a phone: logo (horizontal, small) → name (`display`) → identity line (`label`) → portrait. On wide screens the portrait sits beside the name, never behind it.

## Elevation & Depth

Flat. No shadows, no blur, no layered cards. Depth comes from the ground colours and the `ouro` hairline under the identification block.

## Shapes

Square by default (`rounded.none`). `rounded.sm` for the focus ring; `rounded.md` only for the portrait frame. The circle belongs to the monogram and is not repeated as a UI shape.

## Components

### Links

`verde-profundo`, underlined (offset 0.15em, thickness 1px); hover `azul-noite` with a 2px underline. Focus: 2px `verde-profundo` outline with 2px offset, `rounded.sm`; on the footer the outline is `branco`. Contact links (e-mail, WhatsApp, Instagram) are text links with the channel as `title` and the address as the link text — not buttons, not an invitation to schedule.

### Navigation

Anchor links to the four sections, in `label` style, no JavaScript. Current section is not tracked (no script). Underline on hover and focus.

### Sections

`section-default` (white) and `section-alt` (`verde-claro`) alternate. "Sobre" uses `section-sobre` with a 4px `lilas` rule at its left edge. The page may use one `band-verde` and one `band-amarelo` (The One Band Rule).

### Footer

`verde-profundo` ground, `branco` text, `logo-horizontal-branco`, the identity line again (name, `MÉDICA`, `CRM-SP 240550`) and the build year.

### Logo

Files live in the private repository `dra-victoria-laufer-assets` (ADR-0010) and are optimised for the site in issue 1.4:

| Use | File | Notes |
| --- | --- | --- |
| Header, on white | `brand/logo/logo-horizontal-cor.png` | Small; decorative next to the real-text name, so `alt=""` |
| Footer, on `verde-profundo` | `brand/logo/logo-horizontal-branco.png` | `alt=""` for the same reason |
| Favicon, app icon | `brand/symbol/simbolo-cor.png` | The monogram; dark fallback `simbolo-preto.png` |
| Social image (Open Graph) | `brand/logo/logo-horizontal-cor.png` on white | Composed in 2.4; any text in it passes the CFM checklist |
| Never on the site | everything in `brand/source/` | Their tagline does not follow the Art. 13 format and one variant drops the accent from "Victória" |

The horizontal and vertical logos in `brand/logo/` were derived from her originals by removing the professional tagline, nothing else; the monogram and the name are untouched. Only PNG exists (no vector source). The logo is never recoloured, stretched, outlined or placed on `verde-marca` or `amarelo-marca`, where its own turquoise and gold disappear.

## Do's and Don'ts

### Do:

- **Do** use green, yellow and white as the leading colours, with green and yellow as fields and white as the ground.
- **Do** take every text colour from the approved pairs table, and run `node scripts/check-contrast.mjs` when a colour changes.
- **Do** keep name, `MÉDICA` and `CRM-SP 240550` as live text in the first fold and in the footer.
- **Do** set `NÃO ESPECIALISTA` exactly like the course line around it.
- **Do** serve both fonts and every logo from the site itself.

### Don't:

- **Don't** set text in `verde-marca`, `amarelo-marca`, `ouro` or `lilas`, or white text on `verde-marca` (2.44:1).
- **Don't** publish any file from `brand/source/`, or write a professional tagline into the logo.
- **Don't** use cards, icon tiles, shadows, gradients, or a full-screen hero with text over the photo (anti-goals in `PRODUCT.md`).
- **Don't** use the commercial script face or Lucida Sans Unicode as web fonts.
- **Don't** add a dark theme without a new decision; the palette was checked on light grounds only.
