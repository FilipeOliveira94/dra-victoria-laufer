# Agent workflow prompts

Four prompts drive one issue: plan, implement, open the PR, review. The Dev is Claude in T3 Code (AGENTS.md §3); the prompts are tool-neutral and the rules live in [`AGENTS.md`](../AGENTS.md). Replace the placeholders and run the plan prompt first. A small task goes from plan to PR without stopping; a large task, or one in doubt, waits for Filipe's approval of the plan before any file changes (AGENTS.md §4 item 4).

```text
Filipe picks the issue → plan → approval (large only) → feature branch → implement
     → checks + CFM checklist → PR with summary → PR CI read
     → Filipe reviews (harder merge: he asks Claude for a review)
     → Filipe merges and deletes the branch
```

The rules behind each arrow are in [`AGENTS.md`](../AGENTS.md) §4 and §13.

---

## 1. Plan (Dev, no file edits until the mode allows)

```text
Follow AGENTS.md.

I want to work on issue: <ISSUE-ID> — <title>.

First inspect the relevant code, documentation, roadmap, acceptance criteria and current project status. Do not edit files, create a branch or commit yet.

Return:
1. Current state and relevant files.
2. Dependencies and prerequisites, and whether any is blocked.
3. A small, ordered implementation plan.
4. Acceptance criteria and how each will be verified.
5. Risks, assumptions and anything that touches the CFM checklist (docs/compliance/cfm.md).
6. Exact commands to run.
7. Expected files to create or modify.
8. Which items of the AGENTS.md §12 "Issue Close Checklist" this issue will touch.
9. The classification, small or large (AGENTS.md §4 items 4 and 11), and whether planning changed it.

Keep the scope limited to this issue. Do not implement future phases or silently change architecture. Small: go on to implement. Large: stop and wait for my approval before editing.
```

## 2. Implement (Dev; a large task only after the plan is approved)

```text
Follow AGENTS.md.

Implement only the plan above (for a large task, the approved plan with any adjustments), on the feature branch <type>/<ISSUE-ID>-<slug> created from an up-to-date main.
- Keep the diff focused. Explain any necessary deviation before making it.
- Do not invent personal data, biographical text, course names, palette or logo. Missing data stays pendente.
- Do not add a portrait or a brand source file to this repository.
- Do not add dependencies or services outside the approved plan.
- Run the checks in AGENTS.md §9 and report the actual values.
- Run the CFM checklist and report each item.
- Update documentation and PROJECT_STATUS.md only for work that has actually been verified.

At the end, report changed files, checks run, results, acceptance criteria met and not met, limitations, and the next recommended issue.
```

## 3. Open the PR (Dev)

```text
Follow AGENTS.md.

Review the current diff against the agreed plan and acceptance criteria. Do not add features.
- Check for unrelated changes, secrets, generated files, portrait or brand source files, and undocumented behavior.
- Apply the AGENTS.md §12 "Issue Close Checklist".
- Commit with Conventional Commits. Push only this feature branch. Never push main. Never force-push a branch someone else is reviewing. Filipe's order to implement already authorizes the commit, the push of this branch, the PR and reading its CI.
- Open one PR for this issue. The description lists: issue ID, each acceptance criterion and how it was verified, check results with values, the CI run of the PR, the CFM checklist result, and the change classification (small or large, AGENTS.md §4 item 11).
- If the previous merge's `published` job has not been recorded yet, cite its run in this PR's `docs/status-log.md` entry. Never open a PR just for that.
- Read the PR's CI run. When it passes, report to Filipe that the PR is ready, with its head SHA.

Do not merge. Return the PR link, its head SHA, the CI result and the completion report.
```

## 4. Review (Claude, only when Filipe asks)

```text
Follow AGENTS.md.

Review PR <link> at head <SHA> for issue <ISSUE-ID>. Do not change the branch, merge or delete it.

- Compare the PR with the issue in ROADMAP.md: objective, scope, out of scope and each acceptance criterion.
- Run the CFM checklist against the built page, including metadata, alt text and structured data.
- Review the diff for correctness, focus and maintainability. Confirm the checks in AGENTS.md §9 from the CI run or by running them. Confirm no secret, portrait or brand source file was added.

Return approve or request changes, with each finding tied to a file and line or to an acceptance criterion.
```

Filipe opens the review thread in T3 Code and reads the verdict. Fixes go as new commits on the same branch, with the CI read again. Filipe decides, merges and deletes the branch; no agent merges.

---

## Fallback to another tool

The fallback Dev is Grok 4.7 through the Cursor provider in T3 Code, only when the Claude Pro limit runs out. Paste the same prompts into it. Point it at `AGENTS.md`; do not keep that tool's own rule files in the repository, so the rules have one source. The git policy is in AGENTS.md §13, so the other tool gets it too.
