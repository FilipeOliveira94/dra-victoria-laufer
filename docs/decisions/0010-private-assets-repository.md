# ADR-0010: Original photos in a private assets repository

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-010 |
| Related issues | 1.4, 1.7, 1.8 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The site needs her professional photo. Filipe asked that the photo not stay in the public repository, if possible. A file committed to a public repository remains in its history even after it is deleted.

## Decision

Keep this repository public. Store the **original photos and the brand source files in a private repository, `dra-victoria-laufer-assets`**. The Actions build fetches it with a **read-only deploy key** held as a secret, optimizes the images and publishes only the final versions. Without the secret (local build, fork), the build completes with a neutral placeholder.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Private assets repository fetched at build time (chosen) | Originals and their history are private; this repository stays public and free | A second repository, a deploy key and a workflow step | — |
| Commit the photo to this repository | Simplest build | The original and every version stay public in the history | Rejected |
| Make this repository private | One repository | GitHub Pages on a private repository needs a paid plan | Rejected |

## Consequences and trade-offs

- The optimized portrait is still public on the site, as any page image is. What stops being public is the original and its version history.
- The Actions deploy does not write the built site to a branch, so the portrait does not enter this repository's history ([ADR-0003](0003-hosting-github-pages-actions.md)).
- Issue 1.7 fails a PR that adds a portrait image file here.
- PRs from forks do not receive the secret; Lighthouse CI runs with the real photo only on PRs from this repository.

## Evidence / validation

Issue 1.4, local builds (2026-11-16): an ed25519 deploy key, registered read-only on `dra-victoria-laufer-assets` only, cloned the repository and was refused a push; its private half is the `ASSETS_DEPLOY_KEY` repository secret and no copy was kept on disk. `deploy.yml` checks the assets out into `.assets/` only when the secret exists. A build without `.assets/` completes with the placeholder; `git log --all` holds no image file. The workflow step runs for the first time on the deploy after the 1.4 merge; until that run is checked, this decision is not marked Implemented.

## Revisit when

The deploy key cannot be kept read-only and scoped to that repository, or the repository's visibility changes.
