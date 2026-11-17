# ADR-0011: Visual identity

| Field | Value |
| --- | --- |
| Status | approved |
| Date opened | 2026-11-16 |
| Date decided | 2026-11-16 |
| Owner | Filipe (brand owner), with Dra. Victória |
| Index ID | D-011 |
| Related issues | 0.3, 1.4, 2.1, 2.2 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The site had no confirmed brand, so Phase 1 runs on neutral provisional tokens (ADR-0002). Dra. Victória already has a logo and a palette (`#A47B1C`, `#FFD87D`, `#274360`, `#3EB7AE`) with a commercial script face and Lucida Sans Unicode. She asked to keep the colours (green, lilac/purple, blue, yellow) and to use more sober fonts. Filipe asked that green, yellow and white lead.

Three constraints shape the choice:

- Contrast: every text pair must reach 4.5:1 (`AGENTS.md` §9). As text on white, her green reaches 2.44:1 and her gold 3.87:1.
- Third parties: fonts are served from the site (ADR-0002). Lucida Sans Unicode cannot be served; the script face is commercial.
- CFM: the delivered logo files carry a professional tagline that does not follow the Art. 13 format, and the only variant without it spells the name without the accent.

## Decision

The brand is recorded in [`DESIGN.md`](../../DESIGN.md), which is normative for tokens, pairs and logo usage:

- **Palette:** her four colours kept as they are, plus derived tones of the same hues. Green (`#3EB7AE`) and yellow (`#FFD87D`) are fields, never text; text uses her blue (`#274360`) and a deep green of her hue (`#135A55`). Lilac (`#B78BC5`, from her legacy site) is a quiet secondary. Only the pairs in the DESIGN.md table may carry text; all are ≥ 4.5:1. Issue 2.1 removed the bands at Filipe's request (2026-11-16), which took the table from 15 pairs to 12; `amarelo-marca` now carries the text selection.
- **Typography:** Source Serif 4 for headings, Source Sans 3 for text (option A of three shown to Filipe), both SIL OFL 1.1, self-hosted.
- **Logo:** horizontal and vertical versions derived from her PNG originals by removing the tagline only, so the name reads "Victória"; the monogram ("Símbolo") for the favicon. All files in the private repository `dra-victoria-laufer-assets` under `brand/` (ADR-0010). The original files are kept there for reference and never published.

### Amendment, 2026-11-17 (issue 2.2): "Caminho do jardim"

Filipe found the 2.1 page correct but without personality and released the rules that kept it flat: square corners, `ouro` only as a hairline, no icons, no shapes. With the Impeccable direction flow (Persuade mode; to avoid a generic clinic look, a cold or corporate tone, an overloaded page) he compared two profiles: A, abstract garden shapes without lilac; B, geometric and institutional, with lilac turned purple and yellow turned gold. He chose A1, "Caminho do jardim", from full-page mock-ups: she loves nature, and the garden becomes part of her brand without losing credibility.

- A dotted `ouro` path winds down the page; each section heading sits on a stone. The portrait is a 3:4 arch in a `verde-claro` clearing with an `amarelo-marca` sun and a `verde-marca` leaf. Rounded course cards, contact rows with drawn icons, a footer hill. Motion on load and on scroll, CSS only, off under reduced motion.
- Lilac leaves the page and stays in the brand palette; its pairs stay in the table for brand pieces.
- Descriptive section headings, approved by her, with the navigation name as a small label (none on "Sobre mim").
- Unchanged: the palette values, the text pairs (still 12, all ≥ 4.5:1), the fonts, the logo rules, the Real-Text and Same-Size rules, no shadows, no gradients outside the logo, no children's motifs.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Use the brand colours as text, as in the logo | Most literal | Green 2.44:1 and gold 3.87:1 on white | Fails the contrast threshold |
| Blue-led palette with cream ground (first proposal) | Highest contrast with little effort | Moves away from her green, yellow and white | Filipe chose to keep her original theme |
| Keep the logo's fonts | Continuity | Lucida Sans Unicode cannot be served; script face is commercial and not sober | Fails ADR-0002 and her request |
| Newsreader + Public Sans; Atkinson Hyperlegible Next | Sober, OFL | — | Filipe chose option A |
| Profile B (geometric, institutional: green band, gold rule, purple accents), 2026-11-17 | Highest formality | Less of her; reads as an institution | Filipe chose A1, which keeps credibility with her own character |
| Rewrite the tagline in the logo in the Art. 13 format | Keeps the full lock-up | Original font unavailable; condensed course names are not the official ones | The page states each course in real text, which the CFM checklist requires anyway |

## Consequences and trade-offs

- Issue 2.1 replaces the provisional tokens with the DESIGN.md tokens; issue 1.4 serves the two fonts as WOFF2 and optimises the logos and the favicon from `brand/`.
- `node scripts/check-contrast.mjs` (`make contrast`) checks the pairs table against the colour values; issue 1.7 can run it on pull requests.
- The brand exists only as PNG. Logos are raster at every size until a vector source exists.
- Light theme only; a dark theme needs a new decision.

## Evidence / validation

- `make contrast` on 2026-11-16: 15 pairs, 0 failing (lowest 4.70:1, `azul-cinza` on `amarelo-marca`). A copy of DESIGN.md with `verde-marca` on `branco` added fails with 2.44:1, so the check fails when it should.
- Logo edit: connected components of the artwork below the name were removed; 94 components in each of the five files, and no kept component crosses the cut line. The horizontal colour and vertical black results were inspected visually. Assets commit `c36549d` in `dra-victoria-laufer-assets`.
- Status log entry: [`docs/status-log.md`](../status-log.md) → 2026-11-16, issue 0.3.
- Issue 2.2, 2026-11-17: the "Caminho do jardim" direction built on local builds; `make contrast` 12 pairs, 0 failing; axe 0 violations, 0 incomplete; Lighthouse mobile 100/100. PR CI pending.
- Issue 2.1, 2026-11-16: the tokens, type roles, header and footer logos, section grounds and social image applied; `make contrast` 12 pairs, 0 failing; axe and Lighthouse pass on local builds and the PR's CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307).

## Revisit when

- She provides vector sources of the logo.
- The CREMESP registration of a course changes how training may be stated.
- A dark theme or a printed piece is requested.

## Notes

The palette sheet and every delivered logo file are stored in `brand/source/` of the assets repository.
