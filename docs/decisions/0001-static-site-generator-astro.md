# ADR-0001: Static site generator — Astro

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-001 |
| Related issues | 1.1, 1.2, 1.4 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The site is a single page whose content is a handful of facts: identification, training, roles, contact. The legacy site is Jekyll 3.10 through the `github-pages` gem, with the Minima theme and Bootstrap 5.3 from a CDN. It has a 3.9 MB image, invalid HTML and no validation of its data. The first version of the plan kept Jekyll and fixed it in place; the revised plan replaces the stack.

## Decision

Build the site with **Astro**, with static output and **no JavaScript shipped to the browser**. Navigation is by anchors. Images are optimized at build time and content is validated by schema.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Astro, static, no client JavaScript (chosen) | Optimizes images in the build; validates data by schema; ships plain HTML and CSS | Adds a Node toolchain and a migration | — |
| Keep Jekyll with the `github-pages` gem (plan v1) | No migration; already deployed | No image pipeline and no typed data; classic deploy accepts no validation in the build | Rejected in the revised plan |

## Consequences and trade-offs

- Issue 1.1 removes Jekyll, Minima, Bootstrap, `_posts` and `img/avatar.svg`, and commits the lockfile.
- The repository needs Node.js for local work; `make` wraps the commands.
- Anything interactive would need JavaScript and therefore a new decision.

## Evidence / validation

Issue 1.1, 2026-11-16: Astro 7.4.12 (`package-lock.json` committed) builds one static page with no `<script>`; `astro check` 0 errors. Requires Node.js ≥ 22.23.4 (`.nvmrc`).

## Revisit when

A requirement needs client-side behavior that HTML and CSS cannot provide, or the Astro toolchain becomes a maintenance burden for a one-page site.
