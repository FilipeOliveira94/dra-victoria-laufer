# Dra. Victória Laufer Portfolio Site — Agent Instructions

## 1. Project Goal

Build and maintain the portfolio site of Dra. Victória Laufer: a single static page whose job is credibility. A visitor (parents, colleagues, contracting parties) should leave trusting her registration, training and conduct.

- Priority today: credibility and demonstrated experience. She is seeing few patients.
- Patient acquisition and scheduling are secondary. The structure is prepared and stays switched off behind flags.
- Every published word follows CFM Resolution 2.336/2023. The checklist is [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

The target stack and its rationale are in [`DECISIONS.md`](DECISIONS.md). Issue 1.1 replaced the legacy Jekyll site with the Astro base.

## 2. Working Language

- Use English for code, identifiers, comments, commit messages and technical documentation.
- Site content is Brazilian Portuguese (`lang="pt-BR"`). Mandatory CFM strings are written exactly as the checklist gives them.
- Reply to Filipe in English; he may write in Portuguese.
- Explain decisions and trade-offs clearly.

## 3. Roles

Development flow in force since 2026-11-24.

| Role | Who | Does |
| --- | --- | --- |
| Owner | Filipe | Picks the issue, approves plans, reviews the PR, merges it and deletes the branch. Final say on scope, architecture and brand. Relays content and approvals from Dra. Victória |
| Dev | Claude in T3 Code (Claude Opus 5.5) | Per issue: plan, then implement on a new branch from an up-to-date `main`, run the checks, commit, push the branch and open the PR with a summary. Never merges |

There are no PO or Reviewer bots and no review subagents in this project (see "Agent workflow" below). No agent merges, deletes a branch or pushes `main`.

### Agent workflow

Language, size and risk, and model policy: `~/.agents/claude/workflow.md` (repo `FilipeOliveira94/agent-config`).

- **Profile:** solo. Claude Opus 5.5 plans and implements; no reviewer subagents.
- **Language:** English for everything; site content in pt-BR (§2).
- **High risk here:** a new published section or claim about her registration, training or care, and structured data (CFM checklist, §8); deploy and the `published` job; the private assets and their deploy key; switching an acquisition flag on. A plain text edit that passes the CFM checklist can be Low (item 11).
- **Model exceptions:** none

Dra. Victória is the content owner. Her texts, photo and written approvals arrive through Filipe.

## 4. Mandatory Workflow

One issue, one feature branch, one pull request.

1. Inspect the existing code and the current project documentation.
2. Read `PROJECT_STATUS.md`, the issue in `ROADMAP.md`, and the relevant ADRs.
3. Identify dependencies, assumptions, risks and acceptance criteria. A blocked dependency stops the issue; say so and do not work around it.
4. Check the issue's Size and Risk (the expected half of the roadmap's Risk and Size rows, or rate it in the plan; scale and rules in `~/.agents/claude/workflow.md`; item 11 for dependency bumps) and follow what it decides. While planning, the Dev may raise a rating and says why; it never lowers one without Filipe.
   - S + Low: plan and implement straight through to the PR.
   - Anything else: present the plan in the thread and stop. Do not edit code until Filipe approves the plan in the same thread, sometimes with adjustments that the Dev applies.
   - High risk or L size: the thread runs at Opus high effort, set when it starts; the Dev never switches its model or effort by itself; a switch happens only when Filipe decides it. A High-risk plan names the CFM items or the deploy path at stake; an L plan says whether to split the issue.
5. Create the feature branch from an up-to-date `main` (§13).
6. Implement the smallest coherent increment that satisfies the issue.
7. Run the checks in §9 and the CFM checklist in §8. Fix regressions caused by the change.
8. Update documentation and `PROJECT_STATUS.md` (current-phase ledger only; older narrative goes to `docs/status-log.md`).
9. Push the feature branch and open the PR. The PR description lists the issue ID, the acceptance criteria with how each was verified, the check results, and the CFM checklist result. The PR's CI run (`deploy.yml`, build job) runs the same build as a deploy, private assets included (Dependabot PRs excepted, §12); it must pass, and its run is cited as evidence.
10. Once the CI is read, report the PR link, its head SHA, the CI result and the summary to Filipe. Filipe reviews the PR. For a harder merge he may ask Claude for a review in a T3 Code thread (`docs/agent-workflow.md` §4). Requested changes go as new commits on the same branch, with the CI read again.
11. The Dev states the Size and Risk (item 4) again on delivery, so Filipe knows how much review it needs; anything above S + Low is the kind he may ask Claude to review. A change to content, metadata or alt text always runs the CFM checklist (§8); a plain text edit can be S + Low (Filipe, 2026-11-19), while a new section, a new claim or structured data is High. Dependency bumps, Dependabot's included (extension authorized by Filipe on 2026-11-20): an npm patch bump is S + Low; an npm minor or major bump is S + Low only if the PR's CI passed with the private-assets step executed and the changelog of each updated package shows no breaking change, otherwise S + Med; a bump that changes a file in `.github/workflows/` (GitHub Actions bumps) is S + High, because the PR's CI does not exercise `deploy` or `published`. Dependabot PRs build on the placeholder (§12 exception), so a Dependabot npm minor or major bump never meets the assets condition and is S + Med. Dependabot pull requests are never auto-merged ([`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md)).
12. Filipe merges and deletes the branch. The Dev never merges.

Do not mark an issue complete unless its acceptance criteria have been verified.

Do not silently change architecture, dependencies or acceptance criteria.

Record what was implemented and what the checks showed. Do not record pauses, retries, or other recovery steps that do not change how to operate the result.

An entry point that belongs to the issue and was not run is not verified. Name it and say why before treating the issue as done.

An issue is verified in its own PR: local checks plus the PR's CI run. Do not open a pull request only to record the published-site check. After each merge, the `published` job of `deploy.yml` checks the live page; its run is the evidence. The next PR cites that run in `docs/status-log.md`. A failing `published` job is a defect: fix it in its own PR.

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
- The logo, palette and typography are the ones in [`DESIGN.md`](DESIGN.md), confirmed by Filipe in issue 0.3. Do not add a colour, a typeface or a logo variant outside it; a change is Filipe's decision. Issue 2.1 applied them: every value is a token in `src/styles/tokens.css`.
- The only e-mail on the site is `victorialaufersaude@gmail.com`.
- WhatsApp and Instagram are shown as contact. An invitation to schedule is acquisition and stays behind a flag.
- The text "Sobre" is hers. Publish it without editing its meaning.
- "Atuação" lists roles with the current workplace and a start year ("desde 2022"), never an invitation to a consultation. Every sentence about what she does follows the wording rule in [`docs/compliance/cfm.md`](docs/compliance/cfm.md) → C: function and setting, never a specialty title or a treatment claim.

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
| Docs | Every Markdown table has a header row that names its columns; never an empty `\| \| \|` header |

- Run the narrowest relevant check first, then the full set before opening the PR.
- Do not claim a check passed if it was not executed.
- Distinguish a local build, a CI run, and the published site. Say which one a result comes from.
- If a tool or service is unavailable, report the limitation. Do not invent a result, a score or a metric.
- Until issue 1.7 lands, `make lint` and `make lighthouse` print a notice and the checks are run by hand.

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
- `docs/status-log.md`: a new entry, with the PR's CI run and, if not yet recorded, the `published` run of the previous merge.
- The PR's CI run passed, with the private-assets step executed (not skipped).
  - **Exception, Dependabot pull requests** (Filipe, 2026-11-20): their CI builds on the neutral placeholder, because `ASSETS_DEPLOY_KEY` is never added to the Dependabot secrets: code from updated dependencies must not run with the deploy key. The evidence with the real assets is the `build` job of `deploy.yml` on `main` after the merge; `deploy` needs `build`, so a failing build publishes nothing. If that build fails, revert or fix in its own PR ([`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md)).
- An ADR or `DECISIONS.md` row gets an Implemented value only with evidence from a verified issue.
- `docs/compliance/cfm.md` changes only when a rule changes, with the source of the change.
- `README.md` changes when how to run the site or the current state changes.

Prompts for planning, implementing and closing an issue are in [`docs/agent-workflow.md`](docs/agent-workflow.md).

## 13. Git

- Branch per issue, from `main`: `<type>/<issue-id>-<short-slug>`, for example `feat/1.1-astro-base`.
- Use Conventional Commits.
- Filipe's order to implement authorizes the Dev to commit, push its own feature branch, open the PR and read the CI. Never push `main`. Never force-push a branch someone else is reviewing.
- Open one PR per issue. Never merge it.
- Merge, branch deletion and deploy are Filipe's. No agent or bot merges, deletes a branch or pushes `main`.
- A push to `main` publishes the site. Treat every merge as a deploy, and read the `published` job of its run.
- Documentation-only bootstrap commits made directly on `main` need Filipe's explicit authorization and a status-log entry.

AGENTS.md is the single source; CLAUDE.md imports it.
