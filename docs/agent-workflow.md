# Agent workflow prompts

Four prompts drive one issue: plan, implement, open the PR, review. They are tool-neutral; the rules live in [`AGENTS.md`](../AGENTS.md). Replace the placeholders, run the plan prompt first, and approve the plan before any file changes.

```text
plan → approval → feature branch → implement → checks + CFM checklist → PR
     → PO approval + Reviewer approval → Filipe's OK → Reviewer merges
```

---

## 1. Plan (Dev, no file edits)

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

Keep the scope limited to this issue. Do not implement future phases or silently change architecture. Wait for my approval before editing.
```

## 2. Implement (Dev, after the plan is approved)

```text
Follow AGENTS.md.

Implement only the plan we just agreed on, on the feature branch <type>/<ISSUE-ID>-<slug> created from an up-to-date main.
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
- Commit with Conventional Commits. Push only this feature branch. Never push main.
- Open one PR for this issue. The description lists: issue ID, each acceptance criterion and how it was verified, check results with values, and the CFM checklist result.

Do not merge. Return the PR link and the completion report.
```

## 4. Review (PO and Reviewer, separately)

```text
Follow AGENTS.md.

Review PR <link> for issue <ISSUE-ID> as <PO | Reviewer>. Do not change the branch.

PO: compare the PR with the issue in ROADMAP.md: objective, scope, out of scope and each acceptance criterion. Run the CFM checklist yourself against the built page, including metadata, alt text and structured data.

Reviewer: review the diff for correctness, focus and maintainability. Confirm the checks in AGENTS.md §9 from the CI run or by running them. Confirm no secret, portrait or brand source file was added.

Return approve or request changes, with each finding tied to a file and line or to an acceptance criterion.
```

The Reviewer merges only when the PO has approved, the Reviewer has approved, and Filipe has given the OK in the PR.

---

## Fallback to another tool

Paste the same prompts into the other tool. Point it at `AGENTS.md`; do not keep that tool's own rule files in the repository, so the rules have one source. The git policy is in AGENTS.md §13, so the other tool gets it too.
