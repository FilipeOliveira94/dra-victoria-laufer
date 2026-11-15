# ADR-0008: License — MIT for the code only

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-008 |
| Related issues | 1.8 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The repository is public and carried a plain MIT license. Read literally, that licensed everything in it, including the name, the texts and the image of a physician. A public repository should not license her identity.

## Decision

**MIT applies to the source code only.** The texts, the name and the logo of Dra. Victória Laufer in this repository have **all rights reserved**. The photos are kept in a private repository and are not licensed.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| MIT for code, all rights reserved for content (chosen) | The code stays reusable; her content and identity are protected | The license file is no longer the unmodified MIT text | — |
| Plain MIT for everything (legacy) | Standard file | Licenses her texts, name and image | Rejected |
| Make the repository private | Hides everything | GitHub Pages on a private repository needs a paid plan; only worth it to hide the code too | Rejected |

## Consequences and trade-offs

- `LICENSE` starts with a scope notice and names both rights holders.
- Automatic license detection may not classify the file as MIT.
- The README repeats the notice and records where the photos live.

## Evidence / validation

`LICENSE` and the README note were added on 2026-11-15 ([`docs/status-log.md`](../status-log.md)). Issue 1.8 is delivered; Filipe's review of the wording is pending.

## Revisit when

Content by a third party enters the repository, or the repository's visibility changes.
