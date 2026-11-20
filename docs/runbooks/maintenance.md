# Maintenance

How the site is kept up to date and compliant once it is published. Issue 7.2. Search Console and Bing: [`search-console.md`](search-console.md). DNS: [`docs/architecture/domain-dns.md`](../architecture/domain-dns.md).

Three automatic reminders. None of them changes the site, merges a pull request or deploys: each opens a pull request or an issue for a person to act on.

| Reminder | Where | When | Opens |
| --- | --- | --- | --- |
| Dependency updates | [`.github/dependabot.yml`](../../.github/dependabot.yml) | npm weekly; GitHub Actions monthly | Pull requests |
| Semiannual review | [`.github/workflows/semiannual-review.yml`](../../.github/workflows/semiannual-review.yml), checklist in [`.github/ISSUE_TEMPLATE/revisao-semestral.md`](../../.github/ISSUE_TEMPLATE/revisao-semestral.md) | January 1 and July 1, 12:00 UTC | Issue "Revisão semestral" |
| Domain renewal | [`.github/workflows/domain-renewal.yml`](../../.github/workflows/domain-renewal.yml) | 1st of each month, 12:00 UTC | Issue "Renovar o domínio dravictorialaufer.com.br (vence em AAAA-MM-DD)" with 60 days or fewer left |

The two workflows have only `issues: write`, plus `contents: read` in the semiannual review for the checkout of the template (`actions/checkout` pinned by commit SHA, v4.4.0), use the automatic `GITHUB_TOKEN` and no secret, and post nothing when an issue with the same title (semiannual review) or the same title prefix (renewal) is already open. `deploy.yml` is not involved.

## Dependabot

- **npm**, weekly: every minor and patch bump of the week goes into one grouped pull request (`minor-and-patch`); each major bump gets its own pull request.
- **GitHub Actions**, monthly: one pull request per action.
- **No auto-merge.** Each Dependabot pull request follows the normal flow ([`AGENTS.md`](../../AGENTS.md) §4): its CI run (`deploy.yml`, `build` job) must pass, and the Reviewer merges after Filipe's OK. A merge deploys the site, so read the `published` job of its run.
- **Classification** ([`AGENTS.md`](../../AGENTS.md) §4 item 11; extension authorized by Filipe on 2026-11-20):
  - An npm **patch** bump is a small change (PO approval is enough).
  - An npm **minor or major** bump is small only if the PR's CI passed with the private-assets step executed **and** the changelog of each updated package shows no breaking change; otherwise it is large (PO and Reviewer on the same head). The Dev records which changelogs were read.
  - A bump that changes a file in `.github/workflows/` (every GitHub Actions bump) is **always large**: the PR's CI does not exercise `deploy` or `published`.
  - Dependabot PRs build on the placeholder (§12 exception), so a Dependabot npm minor or major bump never meets the assets condition and is large. The grouped `minor-and-patch` PR is large whenever it holds a minor bump.
- **Never add `ASSETS_DEPLOY_KEY` to the Dependabot secrets** (Filipe, 2026-11-20). A workflow run triggered by Dependabot reads Dependabot secrets, not Actions secrets, so the PR's CI skips the private-assets step and builds on the neutral placeholder. That is the accepted exception in [`AGENTS.md`](../../AGENTS.md) §12: code from updated dependencies runs in that build, and it must not run with the deploy key to the private assets.
- **After each Dependabot merge, read the `deploy.yml` run on `main`.** Its `build` job is the first one with the real assets, and the evidence for the bump. `deploy` needs `build`, so a failing build publishes nothing and the live site stays as it was. If it fails, revert the merge or fix it, in its own PR.

### Alerts and security updates (Filipe, in the repository settings)

`dependabot.yml` turns on version updates only. Alerts and security updates are repository settings, changed only by Filipe:

1. GitHub → the repository → **Settings** → **Code security** (or **Security & analysis**).
2. **Dependabot alerts**: Enable. On 2026-11-20 the API reported alerts as already enabled.
3. **Dependabot security updates**: Enable. On 2026-11-20 the API reported them as disabled.
4. Leave any auto-merge rule off. A security update is a pull request like any other and follows the same flow, including the read of the `main` build after the merge.
5. Do not add any secret under **Secrets and variables** → **Dependabot**; in particular never `ASSETS_DEPLOY_KEY` (see above).

Read-only check of both settings: `gh api repos/FilipeOliveira94/dra-victoria-laufer/vulnerability-alerts -i` (204 means enabled) and `gh api repos/FilipeOliveira94/dra-victoria-laufer/automated-security-fixes`.

## Semiannual review

Every January 1 and July 1 the workflow opens the issue "Revisão semestral" with the checklist from the template:

1. The content is still true: name, CRM, training, roles (workplaces and years), contacts and "Sobre" in `src/content/data/`.
2. The CFM checklist ([`docs/compliance/cfm.md`](../compliance/cfm.md)) is re-run on the published page.
3. Dra. Victória re-approves the content (through Filipe). If she approves, `medica.revisao` in `src/content/data/medica.yaml` becomes the date of that approval, in its own pull request. If she does not, nothing changes until the correction is approved.
4. Every external link answers 200, the CREMESP lookup (`https://guiamedico.cremesp.org.br/`) included.
5. Search Console and Bing Webmaster show no errors ([`search-console.md`](search-console.md)).
6. The domain's TXT records are in place: `google-site-verification` at the root and `_github-pages-challenge-FilipeOliveira94` ([`domain-dns.md`](../architecture/domain-dns.md)).

If the previous "Revisão semestral" is still open when the next run comes (or on a manual run), no new issue is opened: the run leaves one comment on the open issue, such as "Revisão de julho/2027 não aberta: esta ainda está pendente.", and a person finishes that review first.

Close the issue when every item is checked. Each correction found is a pull request of its own. The same template is available under **New issue** for a review out of schedule.

## Domain renewal

`dravictorialaufer.com.br` is registered at Registro.br under Dra. Victória's CPF. Per the Registro.br RDAP (read on 2026-11-20), it expires on **2028-11-18T21:53:01Z**.

Two layers remind of the renewal: Registro.br's own expiration e-mail to the domain holder (Dra. Victória, as registrant), and this workflow, which does not depend on that mailbox.

On the 1st of each month the workflow reads `https://rdap.registro.br/domain/dravictorialaufer.com.br`, takes the `expiration` event and counts the days left. With 60 days or fewer (the default threshold), it opens the renewal issue with the date and a short checklist: renew at Registro.br, confirm the new date in RDAP, record it here in a pull request. If RDAP does not answer, or answers without an expiration date, or a manual run's `threshold_days` is not a whole number without leading zeros (`^(0|[1-9][0-9]*)$`: `007`, an empty value and `abc` are rejected), the job fails (red in Actions, and GitHub e-mails the failure) and nothing is posted.

After renewing, update the date above.

## Running a workflow by hand

Both workflows have `workflow_dispatch`:

```bash
gh workflow run semiannual-review.yml
gh workflow run domain-renewal.yml                      # threshold 60 days
gh workflow run domain-renewal.yml -f threshold_days=9999   # opens the issue now (test)
gh run list --workflow domain-renewal.yml --limit 1
```

Close any issue opened only as a test.

## Scheduled workflows on a quiet repository

GitHub disables scheduled workflows in a public repository after 60 days without repository activity, and e-mails the owner. If that happens, re-enable them in **Actions** → the workflow → **Enable workflow**, or with `gh workflow enable semiannual-review.yml` and `gh workflow enable domain-renewal.yml`. `gh workflow list` shows their state.
