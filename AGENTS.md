# Dra. Victória Laufer Portfolio Site — Agent Instructions

## 1. Project Goal

Build and maintain the portfolio site of Dra. Victória Laufer: a single static page whose job is credibility. A visitor (parents, colleagues, contracting parties) should leave trusting her registration, training and conduct.

- Priority today: credibility and demonstrated experience. She is seeing few patients.
- Patient acquisition and scheduling are secondary. The structure is prepared and stays switched off behind flags.
- Every published word follows CFM Resolution 2.336/2023. The checklist is [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

The target stack and its rationale are in [`DECISIONS.md`](DECISIONS.md). The repository still holds the legacy Jekyll site until issue 1.1.

## 2. Working Language

- Use English for code, identifiers, comments, commit messages and technical documentation.
- Site content is Brazilian Portuguese (`lang="pt-BR"`). Mandatory CFM strings are written exactly as the checklist gives them.
- Communicate with the user in Brazilian Portuguese.
- Explain decisions and trade-offs clearly.

## 3. Roles

| Role | Who | Does |
| --- | --- | --- |
| Owner | Filipe | Final say on scope, architecture, brand and every merge. Relays content and approvals from Dra. Victória |
| PO | Agent | Checks an issue against its roadmap scope, acceptance criteria and the CFM checklist. Approves or rejects the PR on those grounds |
| Dev | Agent | Implements one issue on its own feature branch and opens the PR |
| Reviewer | Agent | Reviews the diff and the check results. Merges, and only after Filipe's OK |

Dra. Victória is the content owner. Her texts, photo and written approvals arrive through Filipe.

## 4. Mandatory Workflow

One issue, one feature branch, one pull request.

1. Inspect the existing code and the current project documentation.
2. Read `PROJECT_STATUS.md`, the issue in `ROADMAP.md`, and the relevant ADRs.
3. Identify dependencies, assumptions, risks and acceptance criteria. A blocked dependency stops the issue; say so and do not work around it.
4. For non-trivial work, propose a short plan and wait for approval before editing files.
5. Create the feature branch from an up-to-date `main` (§13).
6. Implement the smallest coherent increment that satisfies the issue.
7. Run the checks in §9 and the CFM checklist in §8. Fix regressions caused by the change.
8. Update documentation and `PROJECT_STATUS.md` (current-phase ledger only; older narrative goes to `docs/status-log.md`).
9. Push the feature branch and open the PR. The PR description lists the issue ID, the acceptance criteria with how each was verified, the check results, and the CFM checklist result.
10. PO and Reviewer each review the PR. Both approvals are required.
11. Filipe gives the OK. Only then does the Reviewer merge.

Do not mark an issue complete unless its acceptance criteria have been verified.

Do not silently change architecture, dependencies or acceptance criteria.

Record what was implemented and what the checks showed. Do not record pauses, retries, or other recovery steps that do not change how to operate the result.

An entry point that belongs to the issue and was not run is not verified. Name it and say why before treating the issue as done.

`PROJECT_STATUS.md` tracks the **current phase** (progress, blockers, latest validation, next work). Issue inventory lives in `ROADMAP.md`; ADRs in `DECISIONS.md` and `docs/decisions/`; chronological archive in `docs/status-log.md`. Do **not** treat `PROJECT_STATUS.md` as durable evidence storage: architecture docs, ADRs and the status log carry the verified facts.

## 5. Architecture Principles

- Static output. No JavaScript is shipped to the browser.
- Own CSS. Colors, type and spacing come from one tokens file. No CSS framework.
- No request to a third party at page load: fonts and images are served from the site.
- One source for each fact. Name, CRM, training, roles and contacts live in typed content collections; pages only render them.
- An item marked `pendente` is never rendered. The build reports it. The page never shows "TODO" or placeholder text.
- Staging and production differ by one variable, `DEPLOY_TARGET`. Nothing else encodes the host or base path.
- Acquisition features (`captacao.*`) are off by default. Switched off, they produce no HTML and no JSON-LD.
- Prefer the simplest solution. Do not introduce a dependency or a service without explaining its purpose and cost.

## 6. Content Rules

- Do not invent personal data, biographical text, course names, dates, numbers, workplaces or testimonials. Missing data is `pendente`.
- Do not create or guess the logo, palette or typography. They are blocked on Filipe's confirmation (issue 0.3). Until then the site uses neutral provisional tokens.
- The only e-mail on the site is `victorialaufersaude@gmail.com`.
- WhatsApp and Instagram are shown as contact. An invitation to schedule is acquisition and stays behind a flag.
- The text "Sobre" is hers. Publish it without editing its meaning.
- "Atuação" lists roles only: no workplace, no period, no invitation to a consultation.

## 7. Assets and Privacy

- Original photos and brand source files live in the private repository `dra-victoria-laufer-assets`. Never add a portrait or a brand source file to this repository, on any branch.
- The build fetches the assets with a read-only deploy key held as a secret. Without the secret (local build, fork), the build completes with a neutral placeholder.
- Never commit secrets, keys or tokens. Do not print them in logs.
- The site sets no cookies and runs no analytics that need them.
- Messages she receives from patients are sensitive data. The site does not collect, store or forward them.

## 8. CFM Compliance (mandatory checklist)

Every PR that touches content, metadata, alt text, structured data, file names or URLs runs the full checklist in [`docs/compliance/cfm.md`](docs/compliance/cfm.md) and reports the result in the PR. A PR that fails one item is not merged. The rules in short:

- The main page shows her name, `CRM-SP 240550` and the word `MÉDICA`, as text.
- She has no RQE. Nothing may present her as a specialist or as a pediatrician.
- Each postgraduate course is written `MÉDICA com pós-graduação em (área)` followed by `NÃO ESPECIALISTA` in capitals (Art. 13), at the same size and contrast as the text around it.
- Vetoed terms (`pediatra`, `especialista em`) do not appear anywhere. `NÃO ESPECIALISTA` is the only accepted exception.
- Structured data is `Person`, without `medicalSpecialty`.

When in doubt, do not publish. Ask Filipe; the open point may need the CREMESP.

## 9. Quality Criteria and Verification

| Criterion | Threshold |
| --- | --- |
| Lighthouse mobile, Performance | ≥ 90 |
| Lighthouse mobile, Accessibility | ≥ 95 |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| HTML | W3C validator with no errors; no duplicate IDs |
| Accessibility | WCAG 2.1 AA; axe with no violations; full keyboard navigation |
| Contrast | ≥ 4.5:1 for every text and background pair |
| Images | No published image above 200 KB |
| Layout | No horizontal scroll from 320 px to 1600 px |
| Third parties | No request to a third-party host |
| Content | No "Lorem"; no vetoed term |

- Run the narrowest relevant check first, then the full set before opening the PR.
- Do not claim a check passed if it was not executed.
- Distinguish a local build, a CI run, and the published site. Say which one a result comes from.
- If a tool or service is unavailable, report the limitation. Do not invent a result, a score or a metric.
- Until issue 1.1 lands, the `make` targets for Astro print a notice and do nothing. Until issue 1.7 lands, the checks are run by hand.

## 10. Scope Control

- Work on one issue at a time. Do not implement a later phase in the same change.
- Do not touch brand, content or structure outside the issue's scope.
- Prefer a documented blocker over a speculative implementation.
- Avoid duplicate tools for the same responsibility.

## 11. Completion Report

At the end of every task, report:

- Objective and implementation summary.
- Files created or modified.
- Commands executed.
- Checks passed and failed, with the values measured.
- CFM checklist result.
- Acceptance criteria satisfied and remaining.
- Known limitations and risks.
- Suggested next issue.

Filipe makes the final decisions and approves significant changes.

## 12. Issue Close Checklist

Before asking for the merge, check each item and update only what the verified evidence supports:

- `ROADMAP.md`: the issue status, a Changelog line, and Last updated.
- `PROJECT_STATUS.md`: the phase table, Blockers, Next work, and Last updated.
- `docs/status-log.md`: a new entry.
- An ADR or `DECISIONS.md` row gets an Implemented value only with evidence from a verified issue.
- `docs/compliance/cfm.md` changes only when a rule changes, with the source of the change.
- `README.md` changes when how to run the site or the current state changes.

Prompts for planning, implementing and closing an issue are in [`docs/agent-workflow.md`](docs/agent-workflow.md).

## 13. Git

- Branch per issue, from `main`: `<type>/<issue-id>-<short-slug>`, for example `feat/1.1-astro-base`.
- Use Conventional Commits.
- The Dev pushes only its own feature branch. Never push `main`. Never force-push a branch someone else is reviewing.
- Open one PR per issue. Do not merge your own PR.
- Merge is done by the Reviewer, after PO and Reviewer approval and Filipe's OK.
- A push to `main` publishes the site. Treat every merge as a deploy.
- Documentation-only bootstrap commits made directly on `main` need Filipe's explicit authorization and a status-log entry.

AGENTS.md is the single source; CLAUDE.md imports it.
