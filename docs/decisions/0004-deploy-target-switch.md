# ADR-0004: Domain switch with DEPLOY_TARGET

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-004 |
| Related issues | 1.1, 1.6, 3.2 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

Today the site lives under `https://filipeoliveira94.github.io/dra-victoria-laufer/`. It will move to the root of `dravictorialaufer.com.br`, which is not registered yet (changed from `victorialaufer.com.br` by Filipe on 2026-11-16). The legacy configuration has an empty base path; its `url` already names the final domain. The move must not require touching pages, links or metadata.

## Decision

One variable in the workflow, **`DEPLOY_TARGET: ghpages`**, sets the site URL and the base path for staging. A build **without** the variable generates the URLs of the final domain. The switch in issue 3.2 is removing that line.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| One `DEPLOY_TARGET` variable (chosen) | One-line switch; the default build is production; canonical and sitemap follow by themselves | Staging behavior depends on a variable being present | — |
| Jekyll config override file passed with `--config` (plan v1) | Same idea in Jekyll | Tied to Jekyll, which is being removed | Superseded by the stack change |
| Hard-coded URLs changed by hand at the switch | Nothing to build | Error-prone; touches many files | Rejected |

## Consequences and trade-offs

- No page, link or metadata value may hard-code a host or a base path.
- Acceptance of 3.2 is a one-line diff.
- `noindex` is not carried by `DEPLOY_TARGET`. Issue 1.1 defined it as a separate constant, `indexable` in `src/config/release.ts`, so 2.6 and 3.2 can happen in either order ([ADR-0006](0006-noindex-until-release.md)). Plan approved by Filipe on 2026-11-16.

## Evidence / validation

Issue 1.1, local builds on 2026-11-16: without the variable the canonical is `https://dravictorialaufer.com.br/`; with `ghpages` it is `https://filipeoliveira94.github.io/dra-victoria-laufer/`; an unknown value stops the build. Published staging site after the 1.1 merge: canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`, no request outside the base path.

## Revisit when

A third environment appears (for example PR previews), or the order of 2.6 and 3.2 makes one variable insufficient.
