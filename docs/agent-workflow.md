# Agent workflow prompts

Four prompts drive one issue: plan, implement, open the PR, review. They are tool-neutral; the rules live in [`AGENTS.md`](../AGENTS.md). Replace the placeholders, run the plan prompt first, and approve the plan before any file changes.

```text
plan → approval → feature branch → implement → checks + CFM checklist → PR
     → PR CI read → Dev signals ready → PO + Reviewer approve the same head
       (small change: PO only) → Filipe's OK → Reviewer merges
```

The rules behind each arrow are in [`AGENTS.md`](../AGENTS.md) §4 and §13.

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
- Commit with Conventional Commits. Push only this feature branch. Never push main. Never force-push a branch someone else is reviewing. Filipe's order to implement already authorizes the commit, the push of this branch, the PR and reading its CI.
- Open one PR for this issue. The description lists: issue ID, each acceptance criterion and how it was verified, check results with values, the CI run of the PR, the CFM checklist result, and the change classification (small or large, AGENTS.md §4 item 11).
- If the previous merge's `published` job has not been recorded yet, cite its run in this PR's `docs/status-log.md` entry. Never open a PR just for that.
- Read the PR's CI run. When it passes, tell the PO and the Reviewer the PR is ready, with its head SHA.

Do not merge. Return the PR link, its head SHA, the CI result and the completion report.
```

## 4. Review (PO and Reviewer, separately)

```text
Follow AGENTS.md.

Review PR <link> at head <SHA> for issue <ISSUE-ID> as <PO | Reviewer>, after the Dev's ready signal. Do not change the branch.

PO: compare the PR with the issue in ROADMAP.md: objective, scope, out of scope and each acceptance criterion. Run the CFM checklist yourself against the built page, including metadata, alt text and structured data.

Reviewer: review the diff for correctness, focus and maintainability. Confirm the checks in AGENTS.md §9 from the CI run or by running them. Confirm no secret, portrait or brand source file was added.

Return approve or request changes, with each finding tied to a file and line or to an acceptance criterion.
```

PO and Reviewer approve the same PR head; any objection blocks. Each fix (new commits, CI read again, new ready signal) is a round; after two rounds of disagreement, Filipe decides. A small change (AGENTS.md §4 item 11) needs only the PO's approval, and the Reviewer merges it without reviewing. Merge, branch deletion and deploy are the Reviewer's, only after the required approvals and Filipe's explicit OK; Filipe may do them himself or order a specific bot to.

---

## Fallback to another tool

Paste the same prompts into the other tool. Point it at `AGENTS.md`; do not keep that tool's own rule files in the repository, so the rules have one source. The git policy is in AGENTS.md §13, so the other tool gets it too.
