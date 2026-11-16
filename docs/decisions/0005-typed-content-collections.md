# ADR-0005: Typed content collections with a pending field

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-005 |
| Related issues | 1.2, 2.1, 2.2, 2.3 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The legacy site repeats facts in several files and they disagree: two different e-mails, a fixed year. Part of the real content has not arrived (official course names, roles, the text "Sobre", the photo), and nothing may be invented. The site must be buildable and publishable while those items are missing, without ever showing a placeholder.

## Decision

Keep the content in **typed collections** — `medica`, `formacao`, `atuacao`, `contato` — validated by schema. Each item has a **`pendente`** field. A pending item is not rendered; the build lists it in a pending report.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Typed collections with `pendente` (chosen) | Invalid data breaks the build; one source per fact; missing data is hidden and reported | A schema to maintain | — |
| YAML under `_data/` with a CI job counting "TODO" (plan v1) | Simple | Not typed; a "TODO" string can still reach the page | Superseded by the stack change |
| Text written directly in the page templates | Fastest to start | Facts drift apart, as in the legacy site | Rejected |

## Consequences and trade-offs

- The pending report is the measure for release: issue 2.5 requires it empty for identification and training.
- The Art. 13 wording is produced from the data, so a course without its official name cannot be half-published.
- The `captacao.*` flags live in the same model and default to off.

## Evidence / validation

Issue 1.2, 2026-11-16, local builds: the four collections load from YAML with Zod schemas (`src/content.config.ts`). Eight invalid-data cases each stopped `astro build` (missing field, `titulo` other than `MÉDICA`, unknown field, wrong type, invalid e-mail, `pendente` without `motivo`, malformed YAML, missing file). An item set to `pendente` left the page and appeared in the build log as `[pendente] <collection>/<id>: <motivo>`. Details in `docs/status-log.md`.

## Revisit when

Content starts to be edited by someone who cannot work with files in a repository.
