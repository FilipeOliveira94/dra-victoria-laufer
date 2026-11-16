# ADR-0006: noindex until the CFM release

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-006 |
| Related issues | 1.1, 1.6, 2.6 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The live legacy site is indexable and shows Lorem ipsum and wording that suggests a specialty. The new base will be published before the real content and the brand exist. A search engine should not index either state.

## Decision

The site is published with **`noindex` until issue 2.6**. Issue 2.6 removes it only after the CFM checklist is checked against the full resolution, Dra. Victória approves the content in writing, and the pending report is empty for identification and training.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| `noindex` until 2.6 (chosen) | Nothing unapproved is indexed; work can be published and reviewed | The site brings no search traffic until release | — |
| Index from the first deploy | Earlier presence in search | Indexes placeholders and unreviewed medical advertising | Rejected |
| Keep the site unpublished until it is finished | Nothing public | No real staging to review and measure | Rejected |

## Consequences and trade-offs

- Issue 1.1 is the first delivery because it replaces the indexable legacy site with a `noindex` one.
- `noindex` comes from one constant, `indexable = false` in `src/config/release.ts`, rendered by the base layout. It does not depend on `DEPLOY_TARGET`, so a production build is also `noindex` until 2.6 flips the constant.
- A brand that stays unconfirmed delays release, since 2.6 depends on 2.1.
- `noindex` asks engines not to index; it does not hide the page from someone with the URL.

## Evidence / validation

Issue 1.1, local builds on 2026-11-16: both targets emit `<meta name="robots" content="noindex">`. The published staging page carries the same tag after the 1.1 merge (2026-11-16).

## Revisit when

Filipe decides to release with the provisional identity, which would change the dependencies of 2.6.
