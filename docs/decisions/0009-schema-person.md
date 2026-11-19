# ADR-0009: Structured data — Person without medicalSpecialty

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-009 |
| Related issues | 4.1, 6.2 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

Structured data is read by search engines and can state things the page never says in words. Dra. Victória has no RQE and may not be presented as a specialist. A specialty declared in JSON-LD would be the same infraction as one written on the page. She is also not advertising a place of care now.

## Decision

Publish schema.org **`Person`**, with `jobTitle: Médica`, the CRM as identifier, training, image, URL and Instagram in `sameAs`. **No `medicalSpecialty`.** `Physician` is used only when acquisition is switched on (issue 6.2).

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| `Person` without `medicalSpecialty` (chosen) | States only what is true and allowed | Less detail for search engines | — |
| `Physician` from the start | Richer medical markup | It is a local-business type; implies a place of care that the site does not advertise | Deferred to 6.2, behind a flag |
| `medicalSpecialty` filled with the postgraduate areas | More keywords | Presents her as a specialist | Rejected: CFM |
| No structured data | Nothing to get wrong | Loses a clear identity signal | Rejected |

## Consequences and trade-offs

- JSON-LD is built from the typed collections, so no pending field reaches it.
- The CFM checklist covers JSON-LD like any other text.
- 4.1 waits for the release (2.6) and the final domain (3.2), so the data and the URL are real.

## Evidence / validation

Issue 4.1 (2026-11-18), local builds: `src/lib/person.ts` builds the `Person` from the published collections; `scripts/check-jsonld.mjs` enforces one block on the home page, `@type` `Person`, `jobTitle` `Médica`, the CRM identifier, no `medicalSpecialty`, `Physician`, rating or pending marker, and `NÃO ESPECIALISTA` after every postgraduate course. Schema Markup Validator (validator.schema.org): 1 `Person`, 0 errors, 0 warnings. Implementation choices by Filipe: `honorificPrefix` `Dra.` separate from `name`; the finished postgraduate courses as credentials named in the Art. 13 line; the course in progress (Neonatologia) left out until she finishes it. Record: `docs/status-log.md`.

## Revisit when

She obtains an RQE, or acquisition is switched on.
