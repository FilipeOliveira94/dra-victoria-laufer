# ADR-0002: Own CSS with tokens

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-002 |
| Related issues | 1.3, 0.3, 2.4 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The legacy site loads Bootstrap 5.3, Bootstrap Icons and Google Fonts from third parties for one page. The brand (logo, palette, typography) is not confirmed, so the base has to be built before the final look exists and the later change must be cheap.

## Decision

Write the site's **own CSS**, with every color, type and spacing value defined as a **token in one file**. No CSS framework. Until issue 0.3 the tokens are neutral and provisional; issue 2.4 replaces them.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Own CSS with tokens (chosen) | Small; the brand change is confined to one file; no third-party request | Layout and components are written by hand | — |
| Keep Bootstrap | Familiar; ready components | Weighs more than the site uses; blocks rendering; ties the look to a framework | Rejected |

## Consequences and trade-offs

- The provisional tokens are not a brand. Nobody chooses a palette or a typeface before Filipe confirms them.
- Acceptance of 2.4 is "no provisional token left".
- Every color pair must reach a contrast of at least 4.5:1, checked again when the tokens change.

## Evidence / validation

None yet.

## Revisit when

The site grows beyond a few pages and hand-written CSS starts to cost more than a framework would.
