# Status log (archive)

Chronological history of project status updates, newest first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) (current phase only; **rewritable**). Architecture docs and ADRs cite this log, or carry the facts inline, for durable evidence.

---

### 2026-11-20 — Issue 7.2 built: Dependabot, semiannual review, domain renewal reminder

Built on `chore/7.2-maintenance` (PR #28), ordered by Filipe on 2026-11-20. Large change: new workflows with `issues: write`. `deploy.yml` unchanged; no site text changes.

- **Dependabot** (`.github/dependabot.yml`): npm weekly, minor and patch in one grouped PR (`minor-and-patch`), each major in its own PR; GitHub Actions monthly; commit prefixes `chore(deps)` (`chore(deps-dev)` for dev dependencies) and `ci(deps)`. No auto-merge.
- **Semiannual review** (`.github/workflows/semiannual-review.yml`): cron `0 12 1 1,7 *` and `workflow_dispatch`; opens "Revisão semestral" with the body of `.github/ISSUE_TEMPLATE/revisao-semestral.md` (front matter stripped); nothing posted if an open issue has that exact title.
- **Domain renewal** (`.github/workflows/domain-renewal.yml`): cron `0 12 1 * *` and `workflow_dispatch` with `threshold_days` (default 60, whole numbers only); `curl -f` of `https://rdap.registro.br/domain/dravictorialaufer.com.br` with 3 retries, `expiration` event read with `jq -e`; an HTTP error or a missing date fails the job before any `gh` call. With the threshold met, opens "Renovar o domínio dravictorialaufer.com.br (vence em AAAA-MM-DD)" unless an open issue has that prefix. RDAP read on 2026-11-20: registration 2026-11-18T21:53:01Z, expiration 2028-11-18T21:53:01Z, status `active`.
- **Workflows:** `permissions` only `contents: read` and `issues: write`; the automatic `GITHUB_TOKEN`, no secret; `actions/checkout@v4` (major, as in `deploy.yml`, `persist-credentials: false`) is the only action.
- **Docs:** runbook `docs/runbooks/maintenance.md`, with Filipe's steps in the settings (enable Dependabot security updates; optionally `ASSETS_DEPLOY_KEY` as a Dependabot secret so Dependabot PRs build with the private assets). On 2026-11-20 the API reported Dependabot alerts enabled (`vulnerability-alerts` 204) and security updates disabled (`automated-security-fixes` `enabled: false`); no setting was changed. `AGENTS.md` §4 item 11: patch bumps small; minor or major small only with CI passing and no breaking change in the changelog; Dependabot PRs never auto-merged. `README.md` gains "Manutenção"; `ROADMAP.md`, `PROJECT_STATUS.md`, `docs/architecture/target-site.md` and `domain-dns.md` updated.

Checks on the branch: `make build` (4 pages); `make lint` (html-validate 0 errors; content 43 paths, JSON-LD, photos 0 failing; Markdown tables 0 with an empty header row); `make check` (0 errors); actionlint 1.7.7 with shellcheck 0.11.0: no finding in the new workflows (one existing SC2034 warning in `deploy.yml`, untouched); `check-jsonschema` with the Dependabot and GitHub workflow schemas: valid. CFM checklist not needed: no visible text, metadata, alt text, structured data or URL changes.

Workflow scripts run locally from the YAML, with a stub `gh` that never calls GitHub and jq 1.7.1, against the live RDAP: threshold 60 → 729 days left, no issue step; threshold 9999 → issue step creates the title and body above; an open renewal issue → "already open; nothing posted"; RDAP 404 (unknown domain) → `curl` exit 22, job fails, no `gh` call; RDAP JSON without `expiration` → `jq -e` exit 1; `threshold_days=abc` → error, exit 1. Semiannual: no open issue → issue with the template body; an open "Revisão semestral" → nothing posted.

`gh workflow run domain-renewal.yml --ref chore/7.2-maintenance` → HTTP 404, "workflow domain-renewal.yml not found on the default branch": GitHub dispatches only workflows present on `main`. The dispatch tests (renewal with the default threshold and with `threshold_days=9999`, semiannual review, each test issue closed) run right after the merge and are recorded then.

PR #28 CI [run 44667244795](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44667244795) on `c555a64` passed, with the private-assets step executed (`[assets] portrait-cutout.png`, icons, logos, social): requests 133, 0 failing; axe 8 runs, 0 failing; Lighthouse assertions pass on the three pages.

---

### 2026-11-20 — Issue 7.2 in progress: maintenance; 7.1 published

- **Previous merge published:** 7.1 (PR #27) merged as `b91aaa7` (2026-11-20T03:08:15Z). `deploy.yml` [run 44665644666](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44665644666) on `b91aaa7` succeeded: `build`, `deploy` and `published` (`gh run view`). 7.1 is verified; the home page shown as indexed in URL Inspection is still to be confirmed by Filipe.
- **Correction:** `ROADMAP.md` → 5.2 cited PR #26 CI run 44629224571, which ran on `4d12cbc`, an earlier head. The PR head was `1a4d122`, checked by [run 44646362550](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44646362550) (success); the merge was published by [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821). The 5.2 entry below keeps its original text.
- **7.2:** in progress on `chore/7.2-maintenance`, ordered by Filipe on 2026-11-20.

---

### 2026-11-19 — Issue 7.1 in progress: Search Console and Bing; 5.2 published, phase 5 closed

- **Previous merge published:** 5.2 (PR #26) merged as `58e236d`. `deploy.yml` [run 44662384821](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44662384821) succeeded: `build` (axe 8 runs, 0 failing), `deploy` and `published`. 5.2 is verified and phase 5 is closed. Phase 7 is the active phase; Filipe ordered 7.1 ahead of 7.2.
- **Set up by Filipe outside the repository (2026-11-19):** Google Search Console property of type Domain, `dravictorialaufer.com.br`, in his Google account, with Dra. Victória added as owner; TXT `google-site-verification` record in the Registro.br DNS (name servers `a.sec.dns.br`, `b.sec.dns.br`); sitemap `https://dravictorialaufer.com.br/sitemap.xml` submitted; indexing of the home page requested in URL Inspection; Bing Webmaster Tools imported the property from Search Console.
- **Acceptance, as reported by Filipe from the consoles (2026-11-19):** Search Console property verified, Dra. Victória listed as owner, indexing of the home page requested; Bing Webmaster Tools import succeeded; sitemap status "Success", 3 pages discovered. The first TXT record had been created under the name `google-site-verification` (a subdomain); Filipe recreated it at the root, and a DNS-over-HTTPS query (`dns.google`) returns the `google-site-verification` value at `dravictorialaufer.com.br`.
- **Site:** unchanged. `robots.txt` lists the sitemap, which answers HTTP/2 200 (`curl`). No verification meta tag or file, no script, tag or cookie; the token is not in the repository.
- **Docs:** runbook `docs/runbooks/search-console.md` (setup, owners, re-verification, sitemap resubmission, the two rules on TXT records and the token); `docs/architecture/domain-dns.md` gains the root TXT record and the current name servers. The open questions for Dra. Victória in `ROADMAP.md` are marked answered (0.2).
- **Pending verification after the merge:** home page shown as indexed in URL Inspection.

Checks on the branch: `make build` (4 pages), `make lint` (html-validate 0 errors; content, JSON-LD, photos 0 failing; Markdown tables 29 files, 0 with an empty header row), `make check` (0 errors); `git grep` finds no token. CFM checklist not needed: no visible text, metadata, alt text, structured data or URL changes. PR #27 CI [run 44664706839](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44664706839) on `3557fc3`: `build` passed with the private-assets step executed (`[assets] portrait-cutout.png`, icons, logos, social); axe 8 runs, 0 failing; Lighthouse assertions pass.

---

### 2026-11-19 — Issue 5.2 built: CREMESP lookup and review date; 5.1 published

Built on `feat/5.2-further-evidence`, checked on local production builds (Node.js v22.23.4, chrome-headless-shell 157.0.8103.78 outside the repository). Not deployed. Scope closed by Filipe with the PO; implementation choices made by the Dev within `AGENTS.md`.

- **Previous merges published:** 5.1 (PR #24, merge `269a238`): `deploy.yml` [run 44563264047](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44563264047). PR #25 (`AGENTS.md` dev flow, merge `3862822`): [run 44577290522](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44577290522), which published `main` with both changes. In both, `build`, `deploy` and `published` succeeded; `published` checked `https://dravictorialaufer.com.br/`: 37 requests, 0 failing. `/privacidade/` and `/aviso-legal/` answer 200.
- **Content model:** `medica` gains `consultaCrm`, which must be exactly `https://guiamedico.cremesp.org.br/` (`z.literal`), and `revisao`, a quoted ISO date. Each of these stops the build: another host, a URL with credentials, a port, `https:` without slashes, a `19/11/2026` date, and an unquoted date (YAML reads it as a Date). Both are required, like the other `medica` fields; neither reaches the JSON-LD.
- **CREMESP lookup:** `https://guiamedico.cremesp.org.br/`, the CREMESP "Pesquisa de médicos inscritos", answers HTTP/2 200 (`curl -I -L`, with and without a browser user agent). No deep link by CRM exists: the application's only per-physician route is `medico-info/:qr`, which takes an encrypted QR token (its API decrypts it), not the CRM. The page links the search page and names the number: "Confira o CRM-SP 240550 na consulta pública de médicos do CREMESP." under the identity line in the first fold.
- **Review date:** "Revisado em 19 de novembro de 2026." after the last section of the home page, in `azul-cinza`, from `medica.revisao` through `longDate()`, as on the legal pages. `revisao` is the date Dra. Victória approved the content, not the date of a CFM check. The date is wrapped in `<time datetime>`, on the home page and on the legal pages.
- **Placement:** a first build put both lines in the footer. On short pages at 360 px the CREMESP sentence fell on the footer hill (axe: color-contrast incomplete on the 404 and both legal pages) and the review line touched it on the home; `DESIGN.md` keeps text off the hill. The link moved next to the CRM it verifies, and the date to the end of `<main>`. The path's run-out moved from `.section:last-child` to an explicit `section-last` class, which `index.astro` sets on the last section present. The path still runs out at the end of Contato.
- **Courses, events, publications:** none today. Not modelled: a collection needs an approved heading, a place in the page and in `DESIGN.md`, and CFM wording per type. Recorded as pending in `ROADMAP.md` → 5.2.
- **Docs:** `ROADMAP.md` phase table (phase 5 in progress, phase 6 deferred by Filipe on 2026-11-19, phase 7 next: 7.2 then 7.1); `docs/agent-workflow.md` and `docs/architecture/target-site.md` aligned with the `AGENTS.md` flow (CI read, ready signal, same-head approval, small-change rule, merge by the Reviewer or by Filipe or a bot he names); `DESIGN.md` layout and sections; `README.md`.

Checks, with the assets, without them (`ASSETS_DIR=/nonexistent`) and on staging (`DEPLOY_TARGET=ghpages`): `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, JSON-LD, photos and tables 0 failing; requests 133, 0 failing (47 without the assets; 133 on staging); axe 8 runs, 0 violations, 0 incomplete; Lighthouse mobile: Performance 100 and Accessibility 100 on the three pages, LCP 1428–1431 ms (home) and 901–903 ms (legal pages), CLS 0.0047 (home) and up to 0.0497 (legal pages). No horizontal scroll from 320 to 1600 px in 40 px steps, home and privacy page, measured after the opening motion settles. CFM checklist: pass (A to D; the new sentences name no specialty and make no claim).

PR #26 CI [run 44629224571](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44629224571) on `4d12cbc`, with the private-assets step executed (`[assets] portrait-cutout.png`, logos, icons, social). Attempt 1 failed in axe with a single *incomplete* result: color-contrast on the footer link "Aviso legal" on the 404 page at 360 px, next to the footer hill. This PR does not change the 404 page or the footer; the same check passed on PR #24 and PR #25 and in every local run. Attempt 2, re-run of the failed job, passed: requests 133, 0 failing; content, JSON-LD and photos 0 failing; axe 8 runs, 0 failing; Lighthouse assertions pass on the three pages. The flaky axe result is a recorded risk: the hill sits close to the footer links on a short page at 360 px.

Dra. Victória approved the two new sentences, the CREMESP line and the review date (relayed by Filipe, 2026-11-19). `medica.revisao` stays `2026-11-19`, the date of that approval.

---

### 2026-11-19 — Issue 5.1 verified: privacy and legal notice

Built on `feat/5.1-privacy-legal-notice`, checked on local production builds (Node.js v22.23.4, chrome-headless-shell 158.0.8127.36 outside the repository). Not deployed. Plan approved by Filipe, with two pages.

- **Content:** a `paginas` collection (`src/content/data/paginas.yaml`, schema in `src/content.config.ts`): per page a title, a review date and sections of paragraphs, with optional cited links (https) and flags that add the public e-mail and the identity line from their own collections. The text is a draft from verifiable facts and waits on her approval.
- **Privacy (`/privacidade/`):** no cookies, forms or analytics; fonts and images from the site. Third parties actually used: GitHub Pages as host (access logs with IP, under GitHub's statement), and the contact channels Gmail (Google), WhatsApp and Instagram (Meta), which the site does not receive, store or forward. How she handles messages; LGPD rights through the e-mail.
- **Legal notice (`/aviso-legal/`):** who keeps the site (identity line); the content does not replace a consultation; a message is not a consultation, with 192 (SAMU) for urgencies; Resolution CFM 2.336/2023 and the postgraduate courses not being specialist titles.
- **Site:** `src/pages/[pagina].astro` renders each published entry; `Base.astro` links them in every footer (`nav` "Informações legais") and now gives each page its own canonical and `og:url`; the sitemap lists them. axe and Lighthouse now include both pages.

Checks, with the assets, without them (`ASSETS_DIR=/nonexistent`) and on staging (`DEPLOY_TARGET=ghpages`): `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, JSON-LD, photos and tables 0 failing; requests 133, 0 failing (47 without the assets; 133 on staging, canonical `/dra-victoria-laufer/privacidade/`); axe 8 runs, 0 violations, 0 incomplete; Lighthouse mobile on the three pages: Performance 100, Accessibility 100, LCP 1503 ms (home) and 902 ms (legal pages), CLS 0.0003 (home) and up to 0.0497 (legal pages). No horizontal scroll from 320 to 1600 px. Marking `aviso-legal` pending removed its page, its footer link and its sitemap entry. The four cited external links answer 200 (`curl -L`). CFM checklist: pass (identification in the footer of both pages, no vetoed term, the only e-mail). PR #24 CI [run 44446030982](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44446030982) on `69b610f` passed with the private-assets step executed: requests 133, 0 failing; content and JSON-LD checks 0 failing; axe 8 runs, 0 failing; Lighthouse assertions pass on the three pages. Dra. Victória approved the text (relayed by Filipe, 2026-11-19); PO, Reviewer and Filipe approved the PR. Every acceptance item is met: 5.1 verified.

---

### 2026-11-18 — Issue 4.1 published; Phase 5 opened: content and E-E-A-T

The 4.1 merge (`60adb20`, PR #23) published cleanly: `deploy.yml` [run 44443969964](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44443969964), jobs `build`, `deploy` and `published` all success.

Checked on the published site from this machine on 2026-11-18: the `<script type="application/ld+json">` block of `https://dravictorialaufer.com.br/` is byte-identical to the block of a local production build of `60adb20` with the private assets, the block the Schema Markup Validator passed with 0 errors and 0 warnings. `@type` `Person`, `jobTitle` `Médica`, no `medicalSpecialty`.

Phase 4 is closed (4.1 verified). Phase 5 is the active phase. 5.1 (privacy and legal notice) is in progress on `feat/5.1-privacy-legal-notice`, as two pages linked in the footer (Filipe); its dependency, 2.2, is verified. 5.2 follows.

---

### 2026-11-18 — Issue 4.1 verified: JSON-LD Person

Built on `feat/4.1-json-ld-person`, checked on local production builds with and without the private assets (Node.js v22.23.4, chrome-headless-shell 158.0.8127.36 outside the repository). Not deployed. Plan approved by Filipe.

- **Data:** `src/lib/person.ts` builds a schema.org `Person` from the published collections only: `@id` `https://dravictorialaufer.com.br/#pessoa`, `honorificPrefix` `Dra.` and `name` `Victória Laufer` (split from `nome`, Filipe), `jobTitle` `Médica`, `identifier` a `PropertyValue` `CRM-SP` / `240550`, `hasCredential` with the degree (Medicina, UNIVASF) and the two finished postgraduate courses named `MÉDICA com pós-graduação em (área) — NÃO ESPECIALISTA` with the institution as `recognizedBy`, `image` the 760 w WebP of the portrait the page already serves (no new file; absent without the assets), `url` and the Instagram in `sameAs`. No `medicalSpecialty`, no `Physician`, no rating, no e-mail or telephone (not in ADR-0009).
- **Neonatologia:** in progress, so it is not a credential yet and is left out (Filipe). It enters by itself once `emCurso` is false in `formacao.yaml`; the file, `ROADMAP.md` and ADR-0009 say so.
- **Page:** one `<script type="application/ld+json">` in the home page `<head>`, passed through `Base.astro`; data, not script, so nothing runs in the browser (D-001). `<` is escaped in the JSON. The 404 has none.
- **Check:** `scripts/check-jsonld.mjs`, in `npm run lint` (so in CI): one block on the home page and none elsewhere, valid JSON, `@context` schema.org, `@type` `Person`, `jobTitle` `Médica`, a CRM identifier, `name` and `url`; no `medicalSpecialty`, `aggregateRating`, `review`, `pendente` or `motivo` key and no `Physician`, `MedicalBusiness` or `MedicalOrganization` type at any depth; every string with "pós-graduação em" ends with `NÃO ESPECIALISTA`. Injecting `medicalSpecialty` and `Physician` into `dist/index.html` made it fail with 3 findings.

Checks, on production with the assets and the placeholder build: `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, JSON-LD, photos and tables 0 failing; requests 65, 0 failing (19 without the assets); axe 4 runs, 0 violations, 0 incomplete; Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms, CLS 0.0003. Schema Markup Validator (validator.schema.org, the JSON-LD block of the built page): 1 `Person`, 0 errors, 0 warnings. Without the assets the JSON-LD has no `image` and every check passes. CFM checklist: pass. PR #23 CI [run 44442139697](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44442139697) on `069ded6` passed with the private-assets step executed (cut-out, icons, logos and social image fetched): requests 65, 0 failing; content and JSON-LD checks 0 failing; axe 4 runs, 0 failing; Lighthouse assertions pass. Filipe approved the issue on 2026-11-18. Every acceptance item is met: 4.1 verified.

---

### 2026-11-18 — Issue 3.2 verified; Phase 4 opened: structured data

The 3.2 merge (`25358b1`, PR #22) published cleanly: `deploy.yml` [run 44437975883](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437975883), jobs `build`, `deploy` and `published` all success. The `published` job ran in attempt 2, after the custom domain was set, so it checked the page on the domain.

Checked on the published site from this machine on 2026-11-18:

- **Pages:** `cname` `dravictorialaufer.com.br`; `https_enforced` true; certificate `approved` for `dravictorialaufer.com.br` and `www.dravictorialaufer.com.br`, expiring 2027-02-16.
- **Redirects (`curl -I`):** `https://dravictorialaufer.com.br/` 200; `http://dravictorialaufer.com.br/` 301 to `https://dravictorialaufer.com.br/`; `https://www.dravictorialaufer.com.br/` 301 to the root; `https://filipeoliveira94.github.io/dra-victoria-laufer/` 301 to `http://dravictorialaufer.com.br/`, which then redirects to HTTPS.
- **Live page:** canonical and `og:url` `https://dravictorialaufer.com.br/`; the sitemap `<loc>` and the `robots.txt` `Sitemap:` line on the domain. No JSON-LD on the page yet.

Every acceptance item of 3.2 is met: 3.2 verified. Filipe confirmed the link to the domain in her Instagram bio (outside the repository). Phase 3 is closed (3.1 and 3.2 verified, 3.3 withdrawn). D-003 and D-004 updated in `DECISIONS.md`.

Phase 4 is the active phase. 4.1 (JSON-LD `Person`, ADR-0009) is in progress on `feat/4.1-json-ld-person`; both dependencies, 2.6 and 3.2, are verified.

---

### 2026-11-18 — Issue 3.2 in progress: switch to the domain

3.1 verified: PR #21 CI [run 44436305170](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436305170) passed; the merge (`30120bf`) published cleanly: `deploy.yml` [run 44436668017](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44436668017), jobs `build`, `deploy` and `published` all success.

Built on `feat/3.2-domain-switch`, checked on local production builds with and without the private assets (Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 outside the repository). Not deployed.

- **Workflow:** `DEPLOY_TARGET: ghpages` and its comment removed from the `build` job, so the build targets `https://dravictorialaufer.com.br/` (ADR-0004). The check steps named the staging base path too: the favicon grep now looks for `/_astro/icon`, and `check-requests`, `check-axe` and Lighthouse run with their default base `/`. The acceptance's one-line diff holds for what decides the URLs; Filipe approved the wider workflow diff. The `published` job already checks the URL the deployment reports, so it follows the domain once Pages has it.
- **Order of the switch:** Filipe accepted a few minutes of downtime. Merge first; once the deploy is done, set `cname` and then `https_enforced` in Pages (`docs/architecture/domain-dns.md`). Pages has no custom domain today (`cname: null`).

Checks, on the production build: canonical and `og:url` `https://dravictorialaufer.com.br/`, `og:image` on the domain, sitemap `<loc>` and the `robots.txt` `Sitemap:` line on the domain; no `github.io` or `/dra-victoria-laufer/` anywhere in `dist/`. The workflow's portrait and favicon grep passes. `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, photos and tables 0 failing; requests 65, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms, CLS 0.0003. No content changed: CFM checklist not affected. PR #22 CI [run 44437660306](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44437660306) on `0b018be` passed with the private-assets step executed: favicon grep on `/_astro/icon`, requests 65, 0 failing at base `/`; html, content, photo and table checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Open, after the merge: the certificate, enforced HTTPS, the redirects of the github.io URL, `http://` and `www`, and the Instagram bio link.

---

### 2026-11-18 — Phase 3 opened: domain and DNS

The 2.6 merge (`d404fd7`, PR #20) published cleanly: `deploy.yml` [run 44414546420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44414546420), jobs `build`, `deploy` and `published` all success. The staging page at `/dra-victoria-laufer/` is indexable from that deploy. Phase 2 is closed (2.1 to 2.6 verified).

Phase 3 is the active phase. 3.1 (register `dravictorialaufer.com.br` and configure its DNS) is in progress on `feat/3.1-domain-dns`; 3.2 waits on it; 3.3 stays withdrawn.

- **Registration:** `dravictorialaufer.com.br` registered at Registro.br under her CPF on 2026-11-18, not Filipe's as the roadmap first said (Filipe's decision). Registry RDAP: status `active`, registered 2026-11-18, expires 2028-11-18, name servers `a.auto.dns.br` and `b.auto.dns.br` (Registro.br DNS). The root still resolves to Registro.br's default address (`200.160.2.95`); the GitHub Pages records are not created yet.
- **Scope:** the HTTPS certificate moves from the acceptance of 3.1 to 3.2, because GitHub issues it only once the custom domain is set in Pages (Filipe). The risk "domain under Filipe's CPF" is closed.
- **DNS:** Filipe verified the domain in his GitHub account (TXT `_github-pages-challenge-FilipeOliveira94`) and created the site records in the Registro.br DNS. Checked from this machine with the system resolver and Google DNS-over-HTTPS: the root resolves to the four GitHub Pages IPv4 addresses (`185.199.108–111.153`) and nothing else, the Registro.br default address gone; IPv6 to `2606:50c0:8000–8003::153`; `www` is a CNAME to `filipeoliveira94.github.io`; the TXT record answers; no MX record. `http://dravictorialaufer.com.br` answers GitHub's 404, expected until 3.2 sets the custom domain. `docs/architecture/domain-dns.md` records the zone and the checks. Both acceptance items of 3.1 are met; the PR's CI run is pending. `ROADMAP.md`, `PROJECT_STATUS.md` and `README.md` updated. No change to the site.

---

### 2026-11-18 — Issue 2.6 verified: CFM review and release

Built on `feat/2.6-cfm-release`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 outside the repository). Not deployed. The 2.5 merge (`abc4b5a`, PR #19) published cleanly: `published` job of [run 44404232762](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44404232762), success.

- **Critique:** `/impeccable critique` on the whole page at 360 and 1280 px, design review and detector in separate agents: 17/24 (heuristics 5, 7, 9 and 10 n/a), no P0, one P1. Detector: 0 findings in the source; one advisory on the build (`design-system-radius`, the 4 px corner of `rounded.card`), a false positive. Browser: three labels above headings (kept, `DESIGN.md`) and stragglers at the end of three lines.
- **Polish, as Filipe chose from the findings:** heading column at 1280 px 18rem → 22rem (each `h2` on at most two lines); nav links on a phone a 44 px touch target (`--touch-target`; header 106 → 132 px); header logo 48 px on every width; header and footer logos with strokes thickened by a 3 px disc at source resolution (`logo-horizontal-cor-header.png`, `logo-horizontal-branco-footer.png`, assets `1f30925`; the social image keeps the original; `prepare-assets.mjs` falls back to the originals); degree card and contact rows outlined in `verde-marca`; `text-wrap: pretty` on paragraphs and role lines. Vertical rhythm left as it was (Filipe). `DESIGN.md` records each change.
- **CFM review:** the checklist was checked against the full text of Resolution CFM 2.336/2023 (official PDF) and the Manual de Publicidade Médica of the Codame (2024), binding through Art. 2. No later amending resolution was found. New items in `docs/compliance/cfm.md`: `NÃO ESPECIALISTA` in the same font, size and colour; any other mention of a postgraduate area followed by `NÃO ESPECIALISTA`; degree with institution and year; points from the full text (own image, Art. 11 XII and XIII, Art. 9 XV, own networks under Art. 8 §1). Identification: the Manual asks for one font, size and colour for `MÉDICA` and the CRM; its approved examples set the name larger, so the page keeps the `DESIGN.md` hierarchy (Filipe). "Sobre" gained "(NÃO ESPECIALISTA)" after the postgraduate areas, by Filipe's decision, with a no-break space. Outside the site: her Instagram bio must carry name, `MÉDICA` and CRM (Art. 6).
- **Approval and release:** she approved the full text of the page in writing on 2026-11-18 (through Filipe). Pending report: 0 pending items in every collection. `indexable = true` in `src/config/release.ts`: no build carries `noindex`.
- **Dependabot alert 1:** `picomatch` 4.0.7 (GHSA-fc5q-39xc-vjpf), a build-time dependency of Astro. The advisory was withdrawn on 2026-11-18 and has no patched version; the alert was dismissed as inaccurate with Filipe's OK. No dependency changed.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, photos and tables 0 failing; requests 65, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1429–1505 ms (902–1355 ms without the assets), CLS ≤ 0.0003. No `<meta name="robots">` in `index.html` or `404.html`. No published image above 200 KB. No horizontal scroll at any width from 320 to 1600 px in 40 px steps. CFM checklist: pass. PR #20 CI [run 44413772830](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44413772830) on `8a08d79` passed with the private-assets step executed and the thickened logos fetched (`[assets] logo-cor.png (from brand/logo/logo-horizontal-cor-header.png)`, `logo-branco.png` likewise): requests 65, 0 failing; html, content, photo and table checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Filipe approved the page at 360 and 1280 px on 2026-11-18. Every acceptance item is met: 2.6 verified. The merge releases the staging page for indexing.

---

### 2026-11-18 — Issue 2.5 verified: cut-out portrait on brand graphics

Built on `feat/2.5-cutout-portrait`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 outside the repository). Not deployed. The 2.4 merge (`9a74d62`, PR #18) published cleanly: `published` job of [run 44234478918](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234478918), success.

- **Treatment:** `DESIGN.md` → Portrait treatment; Filipe approved it as a plan and then the built result. Back to front: the clearing, the sun, a 2 px `ouro` ring open at the upper and lower right with a sprig in each opening (stem, berries, outlined leaves, drawn from the monogram's flourishes as inline SVG), a white arch, her photo from the waist up, the leaf. The arch starts at eye height, so her head rises above it; the photo is cut only by the arch's bottom edge. New semantic token `--color-ring` (`ouro`).
- **Cut-out:** background removed once on this machine with `rembg` (model BiRefNet-portrait), outside the repository; the photo was not sent to any service. The transparent file is `photos/portrait-cutout.png` on the original's canvas, in `dra-victoria-laufer-assets` (`8761caa`), pushed after her approval. `scripts/prepare-assets.mjs` crops it (760 × 900 from x 492, y 110). With the cut-out the arch crop is not written, so `dist/` carries no unused copy of the photo; without it the page keeps the 3:4 arch crop, and without the assets the placeholder.
- **Layout:** one 960 × 1000 box holds ring, sprigs, arch and photo, so nothing leaves it and its size is fixed before the image loads. Served as AVIF and WebP with alpha (320, 480, 760 w), largest file 55 KB. The leaf sits lower and smaller with the cut-out, off her hands. After Filipe's review the arch's bottom corners became wide soft curves (a 200 × 170 ellipse in the 760-wide photo), clear of her hands and the phone, in place of the straight cut with `rounded.lg` corners.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, photos and tables 0 failing; requests 65, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1429 ms (902–903 ms without the assets), CLS 0.0002 on every run. A build with the assets but without the cut-out renders the arch crop; axe 0 failing. On production: no horizontal scroll at any width from 320 to 1600 px in 40 px steps; at 360 px the portrait box measures 276 × 287.5 px with images blocked and loaded; alt text `Foto de Dra. Victória Laufer`, unchanged. No text sits in or next to the composition. CFM checklist: pass. She approved the cut-out on 2026-11-18 (through Filipe). PR #19 CI [run 44389698237](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44389698237) on `bbbb669` passed with the private-assets step executed and the cut-out fetched (`[assets] portrait-cutout.png`): requests 65, 0 failing; html, content, photo and table checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Filipe approved the issue on 2026-11-18. Every acceptance item is met: 2.5 verified.

---

### 2026-11-18 — Issue 2.4 verified: Atuação and Sobre

Built on `feat/2.4-atuacao-sobre`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, chrome-headless-shell 157.0.8103.38 outside the repository; the only system sans fallback is DejaVu Sans). Not deployed. The 2.3 merge (`3efdfc3`, PR #17) published cleanly: `published` job of [run 44230389406](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44230389406), success.

- **Atuação:** renders from `atuacao.yaml`, in `ordem`, and appears in the navigation. The four current workplaces, then the group "Experiência" (an `h3` in the small label style) with the two lines that carry a start year, rendered ", desde 2022" in `azul-cinza` on one line. Each line in `body`, marked by a 14 px `verde-marca` leaf, as in the approved mock-up. A group with no published line drops its heading.
- **Sobre:** her two paragraphs from `medica.yaml`, unchanged, in the `section-clareira` field. The first sentence is a span set on its own line in Source Serif 4 600, `verde-profundo`; it stays inside her first paragraph, so the paragraphs are the ones she approved (the mock-up had split it into its own paragraph). The field is now an element, not a pseudo-element, and the section body is a positioned box above it: otherwise axe could not determine the ground behind her text (incomplete, `bgOverlap`).
- **Navigation:** with four links, the phone row wrapped to two lines (62 px) at 320 and 360 px, and at 412 px in the fallback font only: a CLS risk of the kind fixed in 2.3. Below 600 px the links are now set at 0.8125rem with a 16 px gap and never wrap; with a wide fallback font on a narrow screen the row scrolls inside itself.
- **Review by Filipe:** two changes before approval. Section space on wide screens is slightly smaller: the bottom padding from 96 to 80 px, and the clearing keeps its own 40 px outside space instead of inheriting the plain sections' padding (Atuação → Sobre went from 160 to 120 px). The path now runs over the clearing, unbroken, instead of under it; the next section's stretch into its stone is lifted with it. Filipe chose this from screenshots of two options (over the clearing, or beside it with the field starting right of the stone).
- **Tokens:** `--radius-leaf`, `--leaf-marker`, `--sobre-size`, `--sobre-lead-size`, `--sobre-lead-leading`. `DESIGN.md` records the Role list component, the Sobre type sizes and the phone navigation; the Atuação lines move from `title` to `body`, as in the mock-up.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content, photos and tables 0 failing; requests 68, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1428–1503 ms (902–903 ms without the assets), CLS ≤ 0.0002 on every run (after the review changes). On production: no horizontal scroll at any width from 320 to 1600 px in 40 px steps; header 106 px at 320, 360 and 412 px with fonts blocked or loaded; Tab order skip link, Formação, Atuação, Sobre, Contato, e-mail, WhatsApp, Instagram. Three role lines set `pendente` (one workplace, both experience lines) were absent from `dist/`, listed in the build's pending report, and the "Experiência" heading was gone. The page text has no vetoed term and none of "agend", "consulta", "domicil", "referência", "melhor", "ampla experiência", "anos de". The rendered "Sobre" equals the approved text. CFM checklist: pass (see the PR). PR #18 CI [run 44234277781](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234277781) on `9cbc65b` passed with the private-assets step executed. Filipe approved the section and merged it (`9a74d62`); the merge published cleanly: `published` job of [run 44234478918](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44234478918), success. Every acceptance item is met: 2.4 verified.

---

### 2026-11-18 — Issue 2.3 verified: Formação

Built on `feat/2.3-formacao`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless in a scratch directory). Not deployed. The docs merge (`3655ad7`, PR #16) published cleanly: `published` job of [run 44165512281](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44165512281), success.

- **Section:** Formação renders from `formacao.yaml`, in `ordem`, and appears in the navigation. The degree card reads "Medicina" with the institution and year; each postgraduate card reads `MÉDICA com pós-graduação em (área) — NÃO ESPECIALISTA` in `title`, with the institution below. Cards in `rounded.card`, the degree outlined in `verde-claro` on white, the courses filled `verde-claro`; one column, two from 900 px, as in the approved mock-up.
- **Same-Size Rule:** `— NÃO ESPECIALISTA` sits in the course line inside a span that only prevents a line break, so it never splits or drifts away from the course; its computed font, size, weight, colour, transform, opacity and tracking equal the line's.
- **In progress:** Filipe chose the `EM CURSO` marker on the card in place of `(em curso)` in the line. The marker is text read by screen readers, after the institution, so the card does not state a completed course (Art. 11, XVI). `docs/compliance/cfm.md` → B, its changelog, `DESIGN.md`, `PRODUCT.md` and the 0.2 inputs record carry the change. The marker outline is the new semantic token `--color-marker` (`verde-marca`).
- **CLS:** in one Lighthouse run in three the header shrank from 109 to 72 px when Source Sans 3 replaced the fallback font: with two links, the navigation wrapped under the logo in the fallback font and fit beside it in Source Sans (CLS 0.23 on `main`). Below 600 px the links now always take their own row; the header measures 109 px at 360 and 412 px with fonts blocked or loaded.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `astro check` 0 errors; contrast 12 pairs, 0 failing; html-validate 0 errors; content and photos 0 failing; requests 68, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1504–1582 ms (902–903 ms without the assets), CLS ≤ 0.0003 on every run. On production: no horizontal scroll at any width from 320 to 1600 px in 40 px steps; 1 column at 899 px, 2 at 900 px; Tab order skip link, Formação, Contato, e-mail, WhatsApp, Instagram, with the 2 px focus ring; the accessibility tree reads each course line, `— NÃO ESPECIALISTA`, the institution and `EM CURSO`. A course added with `pendente: true` was absent from `dist/` and listed in the build's pending report; a course without `nomeOficial` and without `pendente` broke the build. No vetoed term in `dist/`. PR #17 CI [run 44229777093](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44229777093) on `40c9e29` passed with the private-assets step executed: requests 68, 0 failing; html, content, photo and table checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Filipe approved the section on 2026-11-18. Every acceptance item is met: 2.3 verified.

---

### 2026-11-17 — Docs: every Markdown table names its columns

The 2.2 merge (`04ebf57`, PR #15) published cleanly: `published` job of [run 44161929920](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161929920), success.

35 key and value tables in the docs had an empty header row (`| | |`), which GFM renders as a blank row on top. The pattern came from the planning docs of another project, which this repository's were modelled on, and was then repeated by copying. Each table now has a header drawn from its context: `Issue 2.2 | Detail` on every issue in `ROADMAP.md`, `Project | Current`, `Validation | Detail`, `Decision log | Reference`, `ADRs | Location`, `Checklist | Scope`, `Ledger | Date`. `scripts/check-markdown-tables.mjs` fails on an empty header row in any tracked Markdown file, outside fenced code; `npm run lint` runs it, and so does CI. AGENTS.md §9 states the rule. No change to the site.

---

### 2026-11-17 — Issue 2.2 verified: portrait CLS fixed, the path as a wave through the stones

#14 was merged while its CI [run 44156463768](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44156463768) on `3e5a178` was failing: Lighthouse mobile CLS 0.197 against a maximum of 0.1. The deploy of the merge (`a39f022`) passed, `published` job of [run 44156637063](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44156637063) included, so the live page carries the defect only when the portrait loads late.

- **Cause:** the portrait's `<picture>` was a flex item without a width, so the portrait took its size from whichever image had loaded. At 412 px it measured 223 × 298 px before load and 240 × 320 px after, and Contato moved down 23 px. The box in the scene now has a definite width; with images blocked and loaded, it measures the same at 320, 412 and 1280 px.
- **Path (Filipe's condition for approving 2.2):** the stones interrupt the dotted path and the sections follow the stone's horizontal position. The path is a gentle wave, 12 px each side of its line. Its right crests are the stones, and its left crests sit 64 px (`--trail-lead`) above each section. It is drawn crest to crest in inline SVG stretched down only, so the pieces join without a kink and the dots stay round. The dots stop 10 px short of each stone, on every side. Each section's content moves right with the stone's 12 px shift. An earlier version alternated the stones' side and joined the pieces on the line itself; Filipe found the line crooked, and the crest-to-crest wave replaced it. The stone is now an element instead of a pseudo-element: with the wider ring, axe could not read the ground behind the label. `DESIGN.md` is updated. Filipe validated the result on screenshots at 360 and 1280 px.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `astro check` 0 errors; html-validate 0 errors; content and photos 0 failing; requests 68, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404; Lighthouse mobile Performance 100, Accessibility 100, LCP 1504–1581 ms, CLS ≤ 0.0002. On production: no horizontal scroll at any width from 320 to 1600 px in 40 px steps; at 360 × 640 px the identity line ends at 286 px; the footer repeats `MÉDICA · CRM-SP 240550`; `victorialaufersaude@gmail.com` is the only e-mail address in `dist/`. PR #15 CI [run 44161566315](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/44161566315) on `6952116` passed with the private-assets step executed: requests 68, 0 failing; html, content and photo checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Every acceptance item is met: 2.2 verified.

---

### 2026-11-17 — Issue 2.2: identification and contact, in the "Caminho do jardim" direction

Built on `feat/2.2-identification-contact`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless in a scratch directory). Not deployed. The 2.1 merge (`c5ec2d7`) published cleanly: `published` job of [run 43982853827](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43982853827), 41 requests, 0 failing, on the live page.

A first build followed the 2.1 rules. Filipe found it correct but without personality, released the restrictive rules (flat, square, `ouro` only as a hairline, no icons) and asked for a direction with the Impeccable flow: Persuade mode; to avoid a generic clinic look, a cold or corporate tone, an overloaded page. Of two profiles with three variants each (A: abstract garden shapes, no lilac; B: geometric and institutional), he chose **A1, "Caminho do jardim"**, from full-page mock-ups at 390 and 1280 px. He approved movement, the descriptive section titles (approved by her), lilac off the page but kept in the brand, and a wider 2.2 scope that carries the frame for 2.3 and 2.4 (2026-11-17).

- **Frame:** page column up to 70 rem; a dotted `ouro` path down the left edge of `<main>` (one SVG tile as a CSS mask, an empty `aria-hidden` element); every section heading on a gold stone, with the section's navigation name as a small label above a descriptive `h2` (`src/lib/sections.ts`: "Graduação e pós-graduações", "Onde trabalho", "Sobre mim" without a label, "Canais de contato"); two columns from 900 px; "Sobre" as a rounded `verde-claro` clearing (`section-clareira`). Formação, Atuação and Sobre are still not rendered: their content comes with 2.3 and 2.4.
- **Identification block:** name as the only `h1` in `display`, `verde-profundo`, on three lines; the `ouro` hairline above the identity line `MÉDICA · CRM-SP 240550` (`label`); the portrait as a 3:4 arch with a white edge in an organic `verde-claro` clearing, with an `amarelo-marca` sun and a `verde-marca` leaf. The crop in `scripts/prepare-assets.mjs` moved from 4:5 (880 × 1100) to 3:4 head and shoulders (570 × 760); served widths 320, 480 and 570.
- **Contato:** every published channel as a rounded row: a drawn icon on a `verde-claro` disc (CSS mask, no request), the channel as a small label (`dt`), the address as the link (`dd`). E-mail `mailto:`; WhatsApp `https://wa.me/5512987097380` shown as `+55 12 98709-7380` (Filipe's format), no pre-filled message; Instagram `@pediatria.dravictoria`. On a narrow phone the address breaks only at a `<wbr>` (before the domain, after the dot in the handle). `channelLink` and `identityLine` in `src/lib/content.ts` derive link and text from the content model.
- **Footer:** the name in the serif face and the identity line in `amarelo-marca` (5.86:1), above `© year`; a lighter hill shape in a corner, away from the text.
- **Motion:** on load the clearing opens, the sun rises and the leaf settles; the stones set as each heading scrolls into view (scroll-driven where supported). Transform only, text and portrait never move; off under `prefers-reduced-motion`.
- **DESIGN.md:** merged with the new direction (north star, colour roles, lilac off the page, type sizes, layout, shapes, garden shapes, motion, contact, sections, footer, do's and don'ts). The pairs table keeps its 12 pairs; ADR-0011 amended; D-011 updated; `PRODUCT.md` notes the course cards.

Checks, on production, `DEPLOY_TARGET=ghpages` and the placeholder build: `make contrast` 12 pairs, 0 failing; html-validate 0 errors; content and photos 0 failing; requests 68, 0 failing (19 without the assets); axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404 (the path and the hill are empty elements, not pseudo-elements, so axe can read the grounds); Lighthouse mobile Performance 100, Accessibility 100, LCP 1503–1583 ms (902–903 ms without the assets), CLS ≤ 0.0002; `astro check` 0 errors. On production: no horizontal scroll at 320, 360, 768, 1280 and 1600 px; at 360 × 780 px the name and the identity line end at 231 and 286 px, in the first fold; Tab order skip link, Contato, e-mail, WhatsApp, Instagram, with the 2 px focus ring visible; `victorialaufersaude@gmail.com` is the only e-mail address in `dist/`.

---

### 2026-11-16 — Issue 2.1: confirmed visual identity applied

Built on `feat/2.1-visual-identity` through the Impeccable flow: the world is pinned by `DESIGN.md` and the brief, so no concept round; code-led; direction contract in `.impeccable/surfaces/src-pages-index-astro.md` (`seed: none (pinned)`). Checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless in a scratch directory). Not deployed. PR CI [run 43981619307](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43981619307) on `4c87890` passed with the private-assets step executed: the build generated the portrait, icons, both logos and the social image; 71 requests, 0 failing; html, content and photo checks pass; axe 4 runs, 0 failing; Lighthouse assertions pass. Filipe reviewed the 360 and 1280 px screenshots and approved them as the base: good, not yet excellent. The design is raised by 2.2 to 2.5, and 2.6 now opens with an `/impeccable critique` and `polish` pass on the whole page, the 2.1 frame included (his decision). Every acceptance item is met: 2.1 verified. D-011 implemented.

- **Tokens:** `src/styles/tokens.css` holds the 11 brand colours under their `DESIGN.md` names and the semantic roles the stylesheets use (text `azul-tinta`, muted `azul-cinza`, headings and links `verde-profundo`, hover `azul-noite`, focus `verde-profundo` and `branco` on the footer, selection `amarelo-marca`), the five type roles, `rounded`, spacing and layout. No provisional token is left.
- **Type:** `h1` in `display`, `h2` in `headline` (`verde-profundo`), body 17 px; `.title` and `.label` classes for 2.2 to 2.4.
- **Frame:** header with the colour horizontal logo (40 px, 48 px from 600 px; `alt=""`, the name is the `h1`) and the navigation in `label`; footer on `verde-profundo` with the white logo (44 px). Without the assets, no logo.
- **Grounds:** Filipe chose light grounds only, no bands. Each section names its ground in `src/lib/sections.ts` (`fundo`): Formação and Contato `verde-claro`, Atuação white, Sobre `lilas-claro` with the 4px `lilas` rule. Fixed per section, so a missing section never shifts the others.
- **Logos and social image:** `scripts/prepare-assets.mjs` moves the logo's written name down about 50 px, so it shares the monogram's vertical centre (Filipe's request), and trims the canvas; colours and shapes untouched. The social image is the colour logo on white with a 96 px `verde-marca` field and a 4 px `ouro` hairline along the bottom, no text (Filipe's choice).
- **DESIGN.md:** merged with the build at Filipe's choice: bands removed (frontmatter, characteristics, colour roles, pairs table, sections), The One Band Rule replaced by The Light-Grounds Rule, the social image and the recentred name recorded. The pairs table went from 15 to 12; D-011 and ADR-0011 updated. `.impeccable/design.json` updated to match.

Checks, each on the production, staging and placeholder builds unless noted: `make contrast` 12 pairs, 0 failing; html-validate 0 errors; content and photos 0 failing; requests 71, 0 failing (19 without the assets), largest image 80 KB; axe 0 violations, 0 incomplete at 360 and 1280 px on the home and a 404 at depth; Lighthouse mobile with the assets Performance 100, Accessibility 100, LCP 1428–1431 ms, CLS ≤ 0.0002, and every assertion passing on the placeholder build; no horizontal scroll at 320, 360, 1280 and 1600 px (production); `make check` 0 errors. The `<img>` fallback of each logo is sized (210 and 190 px), so no full-size PNG is served. Impeccable detector on the changed files: no finding. Impeccable finish review (a fresh general-purpose agent running the skill's reviewer instructions, since the dedicated reviewer agent is not installed): `fix` with three items (text selection invisible on `verde-claro`, `DESIGN.md` out of step, the contract's pin quote incomplete), all fixed; verdict pass `ship`. Its out-of-scope notes for 2.2 (identity line style, name on three lines at 1280 px, `ouro` hairline, portrait frame, footer identity line, contact channels) carry to 2.2.

Review captures live in `.impeccable/review/`, now ignored by git: they show the portrait.

---

### 2026-11-16 — Phase 2 reordered and renumbered

Decided by Filipe. Section issues were defined by their data and left the whole look to the brand issue at the end, so no section would be finished before it. The brand now comes first and each section issue delivers its part complete: content, place on the page and in the navigation, `DESIGN.md` look and layout, access, CFM checklist, checks (`ROADMAP.md` → Phase 2, "A complete section"). IDs follow the order of work:

| New | Was | Issue |
| --- | --- | --- |
| 2.1 | 2.4 | Apply the confirmed visual identity |
| 2.2 | 2.1 | Identification and contact |
| 2.3 | 2.2 | Training ("Formação") |
| 2.4 | 2.3 | Roles ("Atuação") and "Sobre" |
| 2.5 | 2.6 | Cut-out portrait on brand graphics |
| 2.6 | 2.5 | CFM review and release |

References were updated in the current documents, ADRs and code comments. Entries in this log and in the `ROADMAP.md` changelog written before this one keep the old numbers. The branch `feat/2.1-identification-contact` became `feat/2.1-visual-identity`.

---

### 2026-11-16 — Issue 1.8: license verified

Filipe reviewed `LICENSE` and approved the wording and the rights holders: MIT for the code, copyright Filipe Oliveira; all rights reserved for the texts, name, logo and photos, copyright Victória Laufer. The code copyright year was corrected from 2025 to 2026, the year the project started. The README note on the private photos repository is unchanged. Both notices are present with the correct holders, which meets the acceptance. Phase 1 is closed.

---

### 2026-11-16 — Phase 2 active

Phases 0 and 1 are closed: 0.1 to 0.3 and 1.1 to 1.7 verified, 1.8 delivered with Filipe's review of the wording pending. Phase 2 is the active phase in `PROJECT_STATUS.md` and `ROADMAP.md`; 2.1 (identification and contact) is in progress on `feat/2.1-identification-contact`.

The 1.7 merge (`dc075fc`) published cleanly: `published` job of [run 43937667606](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43937667606), 23 requests, 0 failing, on the live page.

---

### 2026-11-16 — Issue 1.7: automatic checks on pull requests

Built on `feat/1.7-pr-checks`, checked on local builds of both targets, with and without the private assets (Node.js v22.23.4, Chrome for Testing 157.0.8103.78 headless in a scratch directory, not a project dependency), and on the PR's CI [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420) on `84c74e4`. Not deployed.

- **Where:** new steps in the `build` job of `deploy.yml`, after the build. They run on every pull request and on every push to `main`, so a failing check stops the deploy. Each step runs even when an earlier one failed, so one run lists every broken rule. The checkout now takes the full history (`fetch-depth: 0`) for the photo check.
- **HTML:** `html-validate` 11.21.1 (recommended preset, which includes `no-dup-id`) on every page in `dist/`, in `make lint`. Offline: no request to the W3C service.
- **Links and anchors:** `scripts/check-requests.mjs` now also fails when a link to `#id` (same page or another page of the site) has no element with that id. The rest is unchanged: every referenced resource returns 200, no third-party request, no image above 200 KB.
- **Content:** `scripts/check-content.mjs`, in `make lint`, searches every file name in `dist/` and the text of every HTML, XML, TXT, JSON, SVG, CSS and JS file for `lorem`, `pediatra` and `especialista em`. Case, accents, HTML entities and line breaks are ignored; `NÃO ESPECIALISTA` is removed first, the only exception.
- **Photos:** `scripts/check-no-photos.mjs`, in `make lint`, fails if a raster image or image source file (JPEG, PNG, WebP, AVIF, GIF, HEIC, TIFF, RAW, PSD…) is tracked, or was added by any commit between `origin/main` and `HEAD`, so a portrait added and removed in the same PR also fails. No image is tracked today, so there is no allow list.
- **axe:** `scripts/check-axe.mjs` (puppeteer-core 25.17.0, axe-core 4.14.1) on the home and a 404 at depth, at 360 and 1280 px, WCAG 2.0/2.1 A and AA plus best practice; fails on any violation and on any incomplete result. `make axe`.
- **Lighthouse:** `@lhci/cli` 0.16.1, `lighthouserc.cjs`, mobile, 3 runs on the home, median: Performance ≥ 0.9, Accessibility ≥ 0.95, LCP ≤ 2500 ms, CLS ≤ 0.1. Reports go to `.lighthouseci/` and to a run artifact; nothing is uploaded to a third party. `make lighthouse`. The SEO category is not asserted: it fails by design while `noindex` stays (ADR-0006).
- **Server:** the static server of `check-requests.mjs` moved to `scripts/lib/serve-dist.mjs`, shared by the three checks; a missing path now answers 404 with `dist/404.html`, as GitHub Pages does.
- **Forks:** a PR from a fork gets no `ASSETS_DEPLOY_KEY`; every check, Lighthouse included, runs on the placeholder build.

The 1.6 merge (`71171f2`) published cleanly: `published` job of [run 43930780015](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930780015), 23 requests, 0 failing, on the live page.

Checks, each rule broken on purpose on a copy of the staging build, then restored:

| Rule broken | Check | Result |
| --- | --- | --- |
| `Pedi&aacute;tra` in the page | content | Fails, "pediatra" |
| `Especialista&nbsp;EM pediatria` | content | Fails, "especialista em" |
| `Lorem ipsum` in a `<meta>` | content | Fails |
| File `pediatra-sp.txt` in `dist/` | content | Fails on the file name |
| "MÉDICA com pós-graduação em Pediatria Clínica NÃO ESPECIALISTA em …; Pediátrica" | content | Passes (exception and the course names) |
| Second `id="conteudo"` | html-validate | Fails, `no-dup-id` |
| Link to `#nao-existe` | requests | Fails, missing anchor |
| Link to `/dra-victoria-laufer/sumiu/` | requests | Fails, 404 |
| 250 KB PNG in `dist/` | requests | Fails, above 200 KB |
| `<img>` without `alt` | axe; html-validate | Fail, `image-alt` at 360 and 1280 px; `wcag/h37` |
| 4 MB image above `<main>` | Lighthouse | Fails: Performance 0.58, LCP 6604 ms, CLS 0.42 |
| `retrato.JPG` committed | photos | Fails: tracked and added in the commit |
| The same file removed in a later commit | photos | Fails: added in the earlier commit |
| Base ref missing | photos | Fails, says the commits were not checked |

On the clean builds:

| Build | lint | requests | axe | Lighthouse mobile (median of 3) |
| --- | --- | --- | --- | --- |
| Production, with the assets | 0 errors; 27 paths, 0 failing; 0 photos | 35, 0 failing | 4 runs, 0 violations, 0 incomplete | Performance 100, Accessibility 100, LCP 1204 ms, CLS 0 |
| Staging, with the assets | Same | 35, 0 failing | Same | Performance 100, Accessibility 100, LCP 1204 ms, CLS 0 |
| Staging, `ASSETS_DIR=/nonexistent` | 0 errors; 12 paths, 0 failing; 0 photos | 19, 0 failing | Same | Performance 100, Accessibility 100, LCP 752 ms, CLS 0 |
| PR CI, [run 43936782420](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43936782420), staging with the assets (private-assets step executed) | 0 errors; 27 paths, 0 failing; 0 photos | 35, 0 failing | 4 runs, 0 violations, 0 incomplete | Performance 100, Accessibility 100, LCP 1205 ms, CLS 0 |

`make check`: 0 errors. `npm audit`: 0 vulnerabilities.

Branch protection on `main`, set at Filipe's request: `build` is a required status check, so a PR whose checks fail cannot be merged. Not strict (the branch need not be up to date with `main`); administrators are not enforced, so a direct documentation commit on `main` authorized by Filipe (AGENTS.md §13) still goes through; no force push, no deletion. The PR showed `build` as required and passing ([run 43937233222](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43937233222)).

---

### 2026-11-16 — Issue 1.6: technical SEO

Built on `feat/1.6-technical-seo`, checked on local builds with and without the private assets (Astro 7.4.12, sharp 0.35.5, Node.js v22.23.4) and on the PR's CI [run 43930485802](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930485802) on `0da9aef`. Not deployed.

- **Description:** `<meta name="description">` and `og:description` read "Dra. Victória Laufer, MÉDICA, CRM-SP 240550.", composed in `Base.astro` from the identification entry (name, `titulo`, `crmLabel`). Filipe chose identification only: the "Sobre" text names postgraduate courses without `NÃO ESPECIALISTA`, so it is not cut into a summary.
- **Open Graph:** `og:locale` `pt_BR`, `og:type` `website`, `og:site_name` (her name), `og:title` (the page `<title>`), `og:description`; `og:url` only where the canonical exists, so not on the 404.
- **Social image:** `scripts/prepare-assets.mjs` writes `social.png`, 1200 × 630, `brand/logo/logo-horizontal-cor.png` scaled to 900 px wide and centred on white (DESIGN.md → Logo). Scaled, never recoloured; 2.4 owns the final composition. Astro fingerprints it; `og:image` is absolute with type, width, height and alt "Logotipo de Dra. Victória Laufer". Without the assets the tag is not rendered.
- **Sitemap and robots:** `src/pages/sitemap.xml.ts` lists the home; `src/pages/robots.txt.ts` allows crawling and names the sitemap. No `Disallow`: a robot must fetch the page to read its `noindex` (ADR-0006). Under the GitHub Pages project path the robots file is not at the host root and is ignored there; the `noindex` still applies. No new dependency (`@astrojs/sitemap` not needed for one page).

The 1.5 merge (`63da065`) published cleanly: `published` job of [run 43928471220](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928471220), 23 requests, 0 failing, on the live page.

Checks:

| Check | Result |
| --- | --- |
| `make build`, production | canonical, `og:url`, sitemap `<loc>`: `https://dravictorialaufer.com.br/`; `og:image` `https://dravictorialaufer.com.br/_astro/social.*.png`; robots `Sitemap: https://dravictorialaufer.com.br/sitemap.xml` |
| `DEPLOY_TARGET=ghpages` build | The same five URLs under `https://filipeoliveira94.github.io/dra-victoria-laufer/`; the fingerprinted image exists at that path in `dist/` |
| `<head>`, home and 404 | Description, `og:locale` `pt_BR`, title, site name, image tags on both; canonical and `og:url` on the home only; `noindex` on both |
| Social image | 1200 × 630, 60.7 KB; viewed: logo on white, no tagline, no other text |
| `ASSETS_DIR=/nonexistent` build | Passes; no `og:image`; description present; 19 requests, 0 failing |
| `make requests`, both bases | 35 requests, 0 failing; every image in `dist/` under 200 KB |
| `npx html-validate@9`, duplicate ids | No errors; none |
| `make check` | 0 errors |
| Vetoed terms and "Lorem" in `dist/` (HTML, sitemap, robots) | None |
| PR CI, `deploy.yml` build job, [run 43930485802](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43930485802) | Passed; private assets fetched, `portrait.jpg`, icons and `social.png` generated, 35 requests, 0 failing on `/dra-victoria-laufer/`; deploy and published skipped (PR) |

Not run: Lighthouse SEO. Its "page is blocked from indexing" audit fails by design while `noindex` stays (until 2.5).

---

### 2026-11-16 — Issue 1.5: accessibility, WCAG 2.1 AA

Built on `feat/1.5-accessibility`, checked on local builds with the private assets (Astro 7.4.12, Node.js v22.23.4) and on the PR's CI [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810) on `f19ba4d`. Not deployed.

- **Skip link:** "Ir para o conteúdo", the first element of `<body>` in `Base.astro`, so on the home and on the 404. Off screen until focused. It targets `<main id="conteudo" tabindex="-1">` on both pages; `main` shows no ring when it takes focus.
- **Focus:** `:focus-visible` draws a 2px solid outline, 2px offset, `rounded.sm` (DESIGN.md → Links). New tokens `--color-focus` (provisional `--color-text`, 16.48:1 on white, 14.72:1 on `ground-alt`) and `--color-focus-inverse` for the footer (13.58:1); 2.4 swaps them for `verde-profundo` and `branco`. A mouse click shows no ring.
- **Contact names:** the e-mail link text stays the address, with the channel as `title` (DESIGN.md). A `title` is not a reliable accessible name, so a visually hidden "E-mail: " starts the link text; the name is "E-mail: victorialaufersaude@gmail.com". The channel names live in `channelLabel` (`src/lib/content.ts`), ready for WhatsApp and Instagram in 2.1.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, every animation and transition is cut to 0.01 ms and scrolling is `auto`. The page has no motion today; the rule covers what 2.4 adds.
- **Tools:** axe-core 4.14.1 and Lighthouse 12.8.2, run on Chrome for Testing 157.0.8103.78 headless through puppeteer-core, all installed in a scratch directory outside the repository. No project dependency added; 1.7 automates them.

The 1.4 merge (`869bbe3`) published cleanly: `published` job of [run 43909335126](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43909335126), 23 requests, 0 failing, on the live page.

Checks:

| Check | Result |
| --- | --- |
| axe, WCAG 2.0/2.1 A + AA + best practice, 360 and 1280 px | 0 violations, 0 incomplete: home (34 passes) and 404 at depth (21), both bases |
| Keyboard, Tab to the end | Home: skip link → "Contato" → "E-mail: victorialaufersaude@gmail.com". 404: skip link → "Ir para a página inicial". Every stop with the 2px ring and inside the viewport |
| Skip link, Tab + Enter | Focus on `#conteudo`; the next Tab lands on the first link in `<main>` |
| `prefers-reduced-motion: reduce` emulated | Query matches; transition and animation 0 s; scroll `auto` |
| Lighthouse 12.8.2, mobile, home | Accessibility 100, Performance 100, Best Practices 100; LCP 1.2 s, CLS 0 (production base). Staging base: Accessibility 100, Performance 100 |
| Lighthouse, 404 page | Accessibility 100, measured at `/404.html`: Lighthouse refuses a 404 status |
| `make build` both targets, `make check` | Exit 0; 0 errors |
| `npx html-validate@9`, duplicate ids | No errors; none |
| `make requests`, both bases | 35 requests, 0 failing |
| `make contrast` | 15/15 |
| Horizontal scroll, 320–1600 px, skip link focused | None |
| Vetoed terms in `src/` and `dist/` | None |
| PR CI, `deploy.yml` build job, [run 43928172810](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43928172810) | Passed; private assets fetched (key present), portrait and favicon in the build, 35 requests, 0 failing on `/dra-victoria-laufer/`; deploy and published skipped (PR) |

Not exercised: the inverse focus ring on the footer, which has no link yet.

---

### 2026-11-16 — Issue 2.6 added: cut-out portrait on brand graphics

Filipe asked for a clean cut-out of her portrait in the identification block, set on graphics generated from the brand (not photos), and made it a condition for publication. `ROADMAP.md` gains issue 2.6 in Phase 2, after 1.4 and 2.4; 2.5, which removes `noindex`, now depends on it. Its scope includes amending `DESIGN.md`, whose current text keeps the portrait in a plain frame and avoids decoration. Documentation only; no code changed.

---

### 2026-11-16 — Issue 1.4: images, favicon and fonts

Built on `feat/1.4-images-favicon-fonts`, checked on local builds (Astro 7.4.12, sharp 0.35.5, Node.js v22.23.4). Not deployed.

- **Deploy key:** an ed25519 key registered on `dra-victoria-laufer-assets` as read-only (GitHub reports `read_only=true`); it cloned the repository and a push with it was refused. Its private half is the repository secret `ASSETS_DEPLOY_KEY` of this repository; no copy was kept on disk.
- **Workflow:** `deploy.yml` checks the assets out into `.assets/` with that key (`persist-credentials: false`) only when the secret exists; a fork skips the step.
- **Crops** (`scripts/prepare-assets.mjs`, run before `build` and `dev`; output in the ignored `src/assets/generated/`): the 2000 × 1333 landscape photo left her face about 40 px tall on a 360 px phone, beside a sofa and a laptop. It is cropped to 880 × 1100 (4:5) on her, head room kept, laptop out of frame. The monogram filled about 60% of its canvas, so it is cropped to the ring before scaling to 32 px; a white-ground copy feeds the 180 px apple-touch icon. Cropped only, never recoloured.
- **Portrait:** `<Picture>` with AVIF and WebP at 320, 480, 640 and 880 w, JPEG fallback, `width`/`height`, `fetchpriority="high"`, `loading="eager"`, alt `Foto de <nome>` from the content model. After the identity line on a phone; beside the name from 768 px. Without the assets: a neutral 4:5 box with `aria-hidden`, no text.
- **Fonts:** Source Serif 4 600 and Source Sans 3 400/600, Latin and Latin Extended WOFF2 from Fontsource 5.3.1, unmodified, in `src/assets/fonts/` with `OFL.txt`; `font-display: swap`, `unicode-range`, preload of the `h1` face. The tokens name them; sizes stay provisional until 2.4.
- **Checker:** `scripts/check-requests.mjs` now follows `srcset` and the `url()` in loaded CSS, and fails on any published image above 200 KB.
- `sharp` became an exact devDependency (it was already installed through Astro); the script imports it directly.

Checks:

| Check | Result |
| --- | --- |
| Build with the assets, production and `ghpages` | Exit 0; 12 portrait files, 2 icons, 6 fonts |
| Build with `ASSETS_DIR=/nonexistent` | Exit 0; placeholder box, `<link rel="icon" href="data:,">`, 0 image files |
| `make requests`, both bases, with the assets | 35 requests, 0 failing, 0 third party |
| `make requests` without the assets | 19 requests, 0 failing |
| 200 KB gate, 253 KB probe copied into `dist/` | Flagged, exit 1 |
| Largest published image | 78.9 KB (JPEG 880 w); largest AVIF 25.3 KB |
| CLS / LCP, T3 browser, 360 px, local server | 0.00014; LCP element the portrait, AVIF 640 w |
| Horizontal scroll at 320, 768, 1600 px | None (`scrollWidth` = `clientWidth`) |
| `npx html-validate@9`, `make check`, `make contrast` | No errors; 0 errors; 15/15 |
| Image files in `git log --all` | None |
| Vetoed terms in `src/` and `dist/` | None |

CI on the PR, [run 43908574612](https://github.com/FilipeOliveira94/dra-victoria-laufer/actions/runs/43908574612) (`f191c3e`): "Fetch private assets" executed and succeeded; `[assets] portrait.jpg` and `icon.png, icon-touch.png`; portrait and favicon found in `dist/index.html`; `base /dra-victoria-laufer/: 35 requests, 0 failing`; built site uploaded as `site-pr-9`. Deploy and `published` skipped, as on every PR.

Process change in the same PR, so an issue no longer needs a second PR for the published-site check: `deploy.yml` runs its build job on pull requests (deploy only from `main`, Pages permissions only on the deploy job); a `published` job runs `check-requests.mjs` in its new remote mode against the live page after each deploy, with retries for the CDN; `AGENTS.md` §4, §12, §13 and `docs/agent-workflow.md` record that an issue is verified in its own PR and that the next PR cites the `published` run. The remote mode was run against the current published page: 1 request, 0 failing.

Not run: Lighthouse and axe (1.7).

---

### 2026-11-16 — Issue 1.3: structure and layout of the single page

Built on `feat/1.3-page-structure`, checked on local builds (Astro 7.4.12, Node.js v22.23.4). Not deployed.

- `src/styles/tokens.css`: neutral provisional tokens for colour, type (system faces) and space; `src/styles/global.css`: one column, measure 40rem, gutter 16 px and 24 px from 600 px, alternating section grounds, dark footer. The build inlines the CSS; the page still makes one request.
- `src/lib/sections.ts` (one list of the four sections) feeds the anchor navigation and the ids; `src/components/Section.astro` renders each section with `aria-labelledby` and its `h2`.
- A section renders only with published content. Today: identification (`h1` and `MÉDICA · CRM-SP 240550`) and Contato with the e-mail. Formação, Atuação and Sobre come with 2.2 and 2.3.
- Footer: `© <build year> <name>`. 404 page (`src/pages/404.astro`) with links from the base path, no navigation, no canonical.
- The skip-navigation link stays in 1.5, as `ROADMAP.md` scopes it; `docs/architecture/target-site.md` had listed it under 1.3 and now says 1.5.

Checks:

| Check | Result |
| --- | --- |
| Builds | `make build` with and without `DEPLOY_TARGET=ghpages`: 2 pages (`index.html`, `404.html`), exit 0. `make check`: 0 errors |
| HTML | `npx html-validate@9 dist/index.html dist/404.html`: no errors, both targets. Duplicate `id` count: 0 on both pages |
| Requests | `make requests`: 3 requests, 0 failing, production and staging (page, 404 page, home link) |
| Horizontal scroll | T3 browser, staging build under `astro preview`: `scrollWidth` = `clientWidth` at 320, 360, 768, 1024 and 1600 px; at 320 px no element extends past the viewport. At 1600 px the column is 688 px wide, centred |
| Navigation | Click on "Contato": hash `#contato`, `:target` is the section; 0 `<script>` elements |
| 404 | `astro preview`, production: `/x` and `/a/b/c/d.html` return 404 with the page and a link to `/`. Staging: `/dra-victoria-laufer/x` and `/dra-victoria-laufer/a/b/c/` return 404 with a link to `/dra-victoria-laufer/`. In the browser at `/dra-victoria-laufer/a/b/c/nao-existe` (320 px) the CSS applies, no horizontal scroll |
| Contrast | Provisional pairs computed with the WCAG formula: 16.48, 8.45, 14.72, 7.55 and 13.58 (all ≥ 4.5). `make contrast` 15/15 (brand pairs) |
| Content | Vetoed-term and "Lorem"/"TODO" grep on `src/` and `dist/`: empty |

Not run: Lighthouse and axe (issue 1.7). The production 404 on GitHub Pages is checked after the merge, on the published site.

### 2026-11-16 — Issue 1.2: typed content model

Built on `feat/1.2-content-model`, checked on local builds (Astro 7.4.12, Node.js v22.23.4). Not deployed.

- `src/content.config.ts` defines `medica`, `formacao`, `atuacao` and `contato` with Zod schemas. Each item is either complete (every required field, no unknown one) or `pendente: true` with a `motivo`.
- `src/content/loader.ts` wraps Astro's `file()`: it stops the build when the data file is missing or unreadable, and it prints the pending report as `[pendente] <collection>/<id>: <motivo>` with a count per collection. `file()` alone only logs those errors and keeps the data cached from the last build.
- `src/lib/content.ts` (`published()`) is the only reader and drops pending items. `src/config/captacao.ts` holds `cta` and `atendimento`, both `false`.
- Data in `src/content/data/*.yaml`: name, CRM, the degree, the three postgraduate courses (Neonatologia `emCurso: true`), the six approved "Atuação" lines, "Sobre", the e-mail, WhatsApp `+5512987097380` and Instagram `https://www.instagram.com/pediatria.dravictoria` (both from Filipe, 2026-11-16).
- Workplace names checked on the web. The Unimed line now reads "Complexo Hospitalar Unimed Guarulhos", the name on Unimed's own site (Filipe's decision); the other three are unchanged. Recorded in `docs/inputs/0.2-pending-inputs.md` → 3.
- `index.astro` reads the name, `MÉDICA`, the CRM and the e-mail from the collections; the production `index.html` is byte-identical to the 1.1 output.

Checks:

| Check | Result |
| --- | --- |
| Invalid data | Each case exited 1: required field removed (`crm`); `titulo` other than `MÉDICA`; unknown field (`instituição`); `ano` as text; e-mail without a domain; `pendente: true` with an empty `motivo`; malformed YAML; data file removed |
| Pending item | E-mail set to `pendente`: build exit 0, no e-mail in `dist/index.html`, `[pendente] contato/email` in the log. Restored: no pending item |
| Both targets | `make requests` 1 request, 0 failing, on production and staging; staging canonical and `noindex` as in 1.1 |
| Other | `astro check` 0 errors; `html-validate@9` no errors; vetoed-term grep on `src/` and `dist/` empty; `make contrast` 15/15 |

### 2026-11-16 — Issue 1.1: published-site check

After the 1.1 merge (`d9bddfd`), with the Pages source set to "GitHub Actions" by Filipe, `deploy.yml` published the Astro base. Checked with curl on <https://filipeoliveira94.github.io/dra-victoria-laufer/>:

- 200, the Astro page: `lang="pt-BR"`, `<meta name="robots" content="noindex">`, canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/`.
- The only references are the canonical, the inline icon `data:,` and a `mailto:` link, so the page makes no request besides itself and none can 404.
- `/dra-victoria-laufer` without the slash → 301 to `/dra-victoria-laufer/`.
- Legacy files gone: `img/avatar.svg` and `ROADMAP` → 404.

This meets the last acceptance item of 1.1 ("a push to `main` publishes at `/dra-victoria-laufer/` with no 404 request"). The page was not opened in a browser. The legacy-site risk in `ROADMAP.md` is closed, and D-001, D-003, D-004 and D-006 now have an Implemented value. The legacy-site diagnosis moved from `PROJECT_STATUS.md` to this log, below.

<details>
<summary>Legacy site diagnosis (archived from PROJECT_STATUS.md)</summary>

State of the Jekyll site before issue 1.1 replaced it. It comes from the diagnosis in the approved plan, which was read against the code. Items marked ✔ were re-checked in the code on 2026-11-15; the others are carried from the plan and were not re-measured.

**Stack:** Jekyll through the `github-pages` gem, Minima theme, Bootstrap 5.3 from a CDN. Published from the `main` branch.

| Area | Finding | Where |
| --- | --- | --- |
| Content | All body text is Lorem ipsum ✔ | `_includes/` |
| CFM | Title "Médica Generalista \| Atendimento Pediátrico" and `<title>` "Atendimento Pediátrico" suggest a specialty ✔ | `_config.yml`, `_includes/head.html` |
| CFM | Service titles "Atendimento Pediátrico", "Puericultura", "Consultas de Emergência" suggest a specialty | `_includes/servicos.html` |
| CFM | The site description is self-promotion ✔ | `_config.yml` |
| Media | Logo `img/logovictoria.png` is referenced and missing (404) ✔; no favicon | `_includes/navbar.html` |
| Media | `img/avatar.svg` is about 3.9 MB ✔ and is used 7 times, including as the LCP image with `loading="lazy"` ✔ | `_includes/` |
| Language | The page language falls back to `en` ✔ | `_layouts/base.html` |
| URLs | `baseurl` is empty while the site lives under `/dra-victoria-laufer/` ✔; `url` points at `dravictorialaufer.com.br`, the final domain since 2026-11-16 ✔ | `_config.yml` |
| URLs | `href="/"` on the logo and the footer leaves the site; relative paths break the 404 page in nested URLs | `navbar.html`, `footer.html`, `head.html`, `404.html` |
| Navigation | Menu anchors are swapped; no link to Formação or to `#servicos`; "Conheça Mais" links point at `#` | `_includes/navbar.html`, includes |
| Contrast | White on `#b78bc5` about 2.8:1; in `#formacao`, text about 2.8:1 and the link about 1.8:1 (manual calculation in the plan) | `css/` |
| HTML | Several `h1`, duplicate IDs ✔, `</img>` ✔, an unclosed `div` in the footer; no `<main>`, no skip link; `aria-label` in English; social icons without accessible names | includes |
| CSS | `a:hover` in white disappears on light backgrounds; `padding-top:80` without a unit; native nesting without fallback | `css/` |
| SEO | No meta description, `jekyll-seo-tag`, sitemap, `robots.txt` or schema.org | `_includes/head.html` |
| Performance | Bootstrap Icons (a whole font for 5 icons) and Google Fonts block rendering | `_includes/head.html` |
| Consistency | `_config.yml` has `victorialaufer@gmail.com` and the footer has `victorialaufersaude@gmail.com` ✔; "© 2025" is fixed ✔; WhatsApp only in the footer ✔ | `_config.yml`, `_includes/footer.html` |
| Build | `Gemfile.lock` is git-ignored ✔; `sass-embedded` in the Gemfile is unused; `_posts/template.markdown` is a sample post ✔ | `.gitignore`, `Gemfile`, `_posts/` |
| Deploy | `jekyll-gh-pages.yml` triggers on push to `main` ✔; the plan reports it has no runs, which points to the Pages source being "Deploy from a branch". That setting is in the repository settings and was not checked here | `.github/workflows/` |

#### Known side effect of the documentation in this repository

The legacy Jekyll build processes Markdown files at any depth. Until 1.1 removes Jekyll, a push of `main` may publish `ROADMAP.md`, `AGENTS.md`, `DECISIONS.md`, `PROJECT_STATUS.md` and `docs/` as unlinked pages of the site. This was not confirmed with a local build (Bundler is not installed). The repository is public, so nothing private is exposed. Excluding them needs an edit to `_config.yml`, which is legacy site code and was left untouched; the decision is Filipe's.

</details>

---

### 2026-11-16 — Issue 1.1: Astro base verified

The Jekyll site is replaced by an Astro 7.4.12 project (`package.json`, `package-lock.json`, `astro.config.mjs`, `src/`). Removed: `Gemfile`, `_config.yml`, `_includes/`, `_layouts/`, `_posts/`, `css/`, `img/` (including `avatar.svg`), `index.html`, `404.html`, `jekyll-gh-pages.yml` and the Jekyll lines of `.gitignore`. Bootstrap and Minima went with the includes and the Gemfile.

- One page, `lang="pt-BR"`, with the facts Filipe approved for it: "Dra. Victória Laufer", `MÉDICA · CRM-SP 240550`, the e-mail. No CSS, no script.
- `DEPLOY_TARGET` (ADR-0004) sets `site` and `base` in `astro.config.mjs`; unset is production, `ghpages` is staging, any other value stops the build.
- `noindex` comes from `indexable = false` in `src/config/release.ts`, independent of the host (ADR-0006, defined here as ADR-0004 asked; approved by Filipe).
- `<link rel="canonical">` is emitted so the build shows its URLs; issue 1.6 completes the metadata. `<link rel="icon" href="data:,">` stops the browser's automatic `/favicon.ico` request, which would 404 at the root of `github.io`; 1.4 adds the real favicon.
- `.github/workflows/deploy.yml` builds with `DEPLOY_TARGET: ghpages`, runs `scripts/check-requests.mjs`, uploads `dist/` and deploys. `.nvmrc` pins Node.js 22.23.4, the minimum Astro 7 accepts.
- `make` targets call the npm scripts directly; `make requests` is new; `lint` and `lighthouse` print a notice until 1.7.

Checks (local build, WSL2, Node.js 22.23.4; not CI, not the published site): `make build` without the variable gives canonical `https://dravictorialaufer.com.br/` and `noindex`; with `DEPLOY_TARGET=ghpages`, canonical `https://filipeoliveira94.github.io/dra-victoria-laufer/` and `noindex`; `DEPLOY_TARGET=foo` fails with the error message. `make requests BASE=/dra-victoria-laufer/`: 1 request, 0 failing; the script fails on a test page with a missing stylesheet (404) and a CDN script (third party). `make check` (`astro check`): 0 errors. `npx html-validate@9 dist/index.html`: no errors. Grep for `lorem`, `pediatra`, `especialista em` in `src/` and `dist/`: no match. `make contrast`: 15/15.

The published-site acceptance is in the entry above.

---

### 2026-11-16 — Issue 0.3: visual identity verified

[`DESIGN.md`](../DESIGN.md) records the brand Filipe confirmed from Dra. Victória's logo and palette, through the Impeccable new-surface flow. The direction roll was skipped under the flow's pinned-direction exception: the client fixed the palette ("Manter paleta no verde, lilás/roxo, azul, amarelo, mas podemos mudar as fontes das letras para fontes mais sóbrias") and the logo, and the brief in `ROADMAP.md` fixes the page sequence and first fold. `.impeccable/design.json` carries the sidecar (colour ramps, nine component snippets, narrative). ADR-0011 and D-011 record the decision.

Decisions by Filipe: Source Serif 4 with Source Sans 3 (option A of three); green, yellow and white lead, her original theme, over the first blue-on-cream proposal; lilac `#B78BC5` (sampled from the image she sent, the same value as the legacy site) as a secondary colour. To keep her green and yellow without failing contrast, they are used as grounds only and text uses her blue or `#135A55`, her green darkened. Fifteen text pairs are allowed; any other pair is not.

Logo: her files carry a tagline that does not follow the Art. 13 format, and the only variant without it drops the accent from "Victória". At Filipe's request the tagline was removed from the horizontal (colour, white, black) and vertical (white, black) logos by deleting the connected components of the artwork below the name. Each file lost 94 components and no kept component crosses the cut; the horizontal colour and vertical black results were inspected. Rewriting the tagline in the Art. 13 format was not done: the original font is not available and the condensed course names are not the official ones. The derived logos, her three monogram files and every original are in `dra-victoria-laufer-assets` under `brand/`, metadata stripped. Only PNG sources exist.

Other files: `scripts/check-contrast.mjs` and `make contrast`; `AGENTS.md` §6, `PRODUCT.md`, `README.md` and `docs/architecture/target-site.md` now point to `DESIGN.md` instead of saying the brand is undecided. 2.4 is no longer blocked by the brand.

Checks: `make contrast` passes 15 of 15 pairs (lowest 4.70:1); a copy with `verde-marca` text on `branco` fails at 2.44:1. `grep -niE` for `pediatra`, `especialista em`, `neonatologista`, `intensivista`, `área de atuação`, `lorem` on the new and changed files: no match. No site build exists, so no rendered check applies. Filipe approved `DESIGN.md` on 2026-11-16, which meets the acceptance with the contrast check; D-011 is `approved`.

---

### 2026-11-16 — Issue 0.1: product context recorded

[`PRODUCT.md`](../PRODUCT.md) records the product context through the Impeccable init flow (schema 1): platform `web`; the decided stack; users (parents, colleagues, contracting parties checking who she is); purpose (credibility first, acquisition behind flags); positioning (checkable facts in the CFM form); operating context; what the page shows and its hard limits; brand commitments limited to name, registration, voice and the absence of a confirmed brand; the evidence received in 0.2 and what must not be fabricated; five product principles; the accessibility standard. Rules are linked to `cfm.md`, the 0.2 ledger and the ADRs, not copied.

Filipe decided that the brief's page sequence and mode are surface strategy: they stay in `ROADMAP.md` → Design brief, linked from `PRODUCT.md`. The anti-goals and the first-fold identification (a CFM requirement) are in `PRODUCT.md`. No `.impeccable/` config and no live mode were set up: the Jekyll site is replaced in 1.1 and the scope is the product record only.

Checks: `grep -niE` for `pediatra`, `especialista em`, `neonatologista`, `intensivista`, `área de atuação`, `lorem` and `todo` on `PRODUCT.md`: no match. Every fact was compared with `cfm.md` and the 0.2 ledger. No site build applies. Filipe approved the file on 2026-11-16, which meets the acceptance.

In the same review Filipe changed the final domain from `victorialaufer.com.br` to `dravictorialaufer.com.br`. Updated: `PRODUCT.md`, `ROADMAP.md` (Phase 3), `README.md`, `DECISIONS.md`, ADR-0003, ADR-0004, `docs/architecture/target-site.md`, and the legacy diagnosis in `PROJECT_STATUS.md` (the legacy `_config.yml` `url` already names it). `docs/project-genesis.md` keeps the original with a dated note. Legacy site code was not changed.

---

### 2026-11-15 — Issue 0.2: pending inputs collected

Every content input that only Dra. Victória can provide was received through Filipe and recorded in [`docs/inputs/0.2-pending-inputs.md`](inputs/0.2-pending-inputs.md): the degree (Medicina, UNIVASF, 2021); the official names and institutions of the three postgraduate courses; the roles for "Atuação" with current workplaces and start years (2022; intensive care since 2024), approved; the text "Sobre", drafted at Filipe's request and approved; the main portrait with its right of use (bought from the photographer).

The portrait is stored as `photos/portrait-main.jpg` in the private repository `dra-victoria-laufer-assets`, created by Filipe. The JPEG (2000 × 1333) had no EXIF, XMP or IPTC segment; it went through a metadata strip that kept only JFIF, the ICC profile and the image data. The assets commit was made locally; Filipe pushes it. Hospital photos are not used or stored: they show patients or staff.

Decisions by Filipe, recorded with their source in `docs/compliance/cfm.md`:

- "Atuação" names current workplaces and a start year. A wording rule for roles and experience was added, from the text of Resolution CFM 2.336/2023 (Art. 4, 7, 11, 13): function and setting, never a specialty title or a treatment claim. `neonatologista`, `intensivista` and `área de atuação` joined the vetoed terms. The "numbers" anti-goal now means statistics.
- None of the courses is registered at the CREMESP, which has frozen registration; the planning record of two registered courses was wrong. Filipe decided to show them in the Art. 13 format with `NÃO ESPECIALISTA`, without consulting the CREMESP, and to remove `noindex` in 2.5 regardless of the registration. Art. 13, §1, d reads "devidamente cadastrado no CRM"; the divergence is recorded as a risk. Neonatologia is in progress and is shown as "(em curso)".

Checks: the resolution text was read from the CREMERJ copy (PDF text extracted locally); the HCX FMUSP course page confirmed "Especialização em Pediatria Clínica"; the Faculdade Sírio-Libanês page renders by JavaScript and was not read, so that name comes from Filipe. The ledger has no vetoed term (`grep` for `pediatra`, `especialista em`, `Lorem`: no match). No site build exists yet, so no rendered check applies.

---

### 2026-11-15 — Project structure and planning documents

The repository gains its project structure, following the organization of Filipe's `open-data-platform` project and the approved plan v2 with its final adjustments. Added: `AGENTS.md` (agent rules, roles, pull-request workflow, CFM checklist as a mandatory gate, quality thresholds) with `CLAUDE.md` importing it; `ROADMAP.md` (Phases 0 to 7, every issue with objective, scope, out of scope, acceptance, dependencies and size); `PROJECT_STATUS.md`; `DECISIONS.md` with ADR-0001 to ADR-0010 under `docs/decisions/`; `docs/agent-workflow.md`; `docs/architecture/target-site.md`; `docs/compliance/cfm.md`; `docs/project-genesis.md`; a `Makefile`; and a `README.md`. `LICENSE` now restricts MIT to the code and reserves all rights over the texts, name, logo and photos of Dra. Victória Laufer, which delivers issue 1.8 pending Filipe's review of the wording. `.gitignore` gains the Node and Astro entries and keeps the Jekyll ones.

The legacy Jekyll site was not changed: no file under `_includes/`, `_layouts/`, `_posts/`, `css/` or `img/`, nor `_config.yml`, `Gemfile`, `index.html`, `404.html` or the workflow. No part of the target site exists; all ten decisions are `approved` and only D-008 has an implementation.

The commit was made directly on `main` with Filipe's explicit authorization, as a documentation bootstrap. It was not pushed. From the next issue on, work goes through a feature branch and a pull request (`AGENTS.md` §4 and §13).

Checks: `make help` lists the targets; `make install`, `dev`, `build`, `preview`, `lint`, `check` and `lighthouse` each print the "not available yet" notice and exit 0, since there is no `package.json`. GNU Make 4.4.1, Node.js v22.23.4. No site build was run: Bundler is not installed on this machine, so the Jekyll build was not executed, and whether the legacy build publishes the new Markdown files as pages was not confirmed (`PROJECT_STATUS.md` → Known side effect). Diagnosis items marked ✔ in `PROJECT_STATUS.md` were re-read in the code; contrast ratios and the workflow's run history are carried from the plan.

Corrections from Filipe, folded into the same commit before any push: she has three postgraduate courses, not two, and the area and institution of the third are pending in 0.2; the e-mail `victorialaufersaude@gmail.com` is the only one on the site but may change later if she asks, for example because of spam, which is a future decision (ADR-0007).

One point for issue 1.1 came out of writing ADR-0004: `DEPLOY_TARGET` sets `noindex` for staging, while issue 2.5 removes `noindex` before issue 3.2 removes the variable. Issue 1.1 has to define how the flag is released separately from the URL.
