# Dra. Victória Laufer — portfolio site

The portfolio site of Dra. Victória Laufer, MÉDICA, CRM-SP 240550. One static page that lets a visitor check who she is: her registration, her training, what she does, and how to reach her.

- **Purpose.** Credibility first. Patient acquisition is prepared and switched off.
- **Compliance.** Every published word follows CFM Resolution 2.336/2023. The checklist is [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

---

## 📍 Status

| Field | Now |
| --- | --- |
| In the repository | The **Astro base** (issue 1.1), the **typed content model** (issue 1.2), the **page structure** (issue 1.3), **images, favicon and fonts** (issue 1.4), **accessibility** (issue 1.5: skip link, visible focus, named contact link, reduced motion), **technical SEO** (issue 1.6: description, Open Graph `pt_BR` with the logo as social image, `sitemap.xml`, `robots.txt`) and **automatic checks on pull requests** (issue 1.7: HTML, links and anchors, axe, Lighthouse mobile, 200 KB per image, vetoed terms, no photo in the repository): one page with name, `MÉDICA`, `CRM-SP 240550`, her portrait (AVIF/WebP from the private assets repository) and the Contato section, read from the collections in `src/content/data/`, with anchor navigation, footer and a 404 page. Since issue 2.1 the page wears the confirmed brand: `DESIGN.md` tokens, header with the colour logo, light section grounds, deep green footer with the white logo, social image with the brand field. Since issue 2.2 it follows the "Caminho do jardim" direction: a dotted gold path that waves down the page with each section heading on a stone, the name and identity line in the first fold, the portrait as an arch in a clearing with a sun and a leaf, Contato as rows with drawn icons, and the identity line in the footer. Formação, Atuação and Sobre followed (2.3, 2.4), then the cut-out portrait (2.5). Issue 2.6 reviewed the page against the full CFM resolution, polished it and removed `noindex`: the page has been indexable since the 2.6 merge. Since issue 3.2 it is served at `dravictorialaufer.com.br`, over HTTPS |
| Published at | <https://dravictorialaufer.com.br/> (the github.io address redirects) |
| Next | Maintenance. Phases 0 to 5 are closed; phase 7 closes when 7.1 and 7.2 are verified (7.1: Search Console and Bing, delivered, verified once URL Inspection shows the home page indexed; runbook in [`docs/runbooks/search-console.md`](docs/runbooks/search-console.md); 7.2: the reminders below, verified by their dispatch tests after the merge). Phase 6 (acquisition) is deferred. Since issue 5.2 the home page links the CREMESP public lookup under the identity line and shows its review date. Since issue 5.1 the site has Privacidade and Aviso legal pages, linked in the footer. Since issue 4.1 the page carries a JSON-LD `Person` built from the collections, without `medicalSpecialty` (ADR-0009) |
| Brand | Confirmed in [`DESIGN.md`](DESIGN.md) (issue 0.3); applied to the site in issue 2.1. `make contrast` checks its colour pairs |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · scope in [`ROADMAP.md`](ROADMAP.md) |

---

## ⚙️ Target stack

Generator, hosting, `DEPLOY_TARGET` and the indexing switch are built (issue 1.1), and so are the content model (issue 1.2) and the page structure (issue 1.3); the rest is planned. Rationale in [`DECISIONS.md`](DECISIONS.md); overview in [`docs/architecture/target-site.md`](docs/architecture/target-site.md).

| Layer | Choice |
| --- | --- |
| Generator | Astro, static output, no JavaScript shipped to the browser |
| Styling | Own CSS with tokens in one file. No framework |
| Content | Typed collections. A pending item is hidden and reported by the build |
| Hosting | GitHub Pages, built and deployed by GitHub Actions |
| Domain | `dravictorialaufer.com.br`, set in Pages with enforced HTTPS; the workflow builds for it since issue 3.2 (no `DEPLOY_TARGET`) |
| Indexing | Released by the CFM review (issue 2.6); one constant puts it back under `noindex` |
| Assets | Original photos in a private repository, fetched at build time |
| Quality | Lighthouse mobile ≥ 90, LCP < 2.5 s, valid HTML, WCAG 2.1 AA, images ≤ 200 KB |

---

## ▶️ Run it

```bash
make help
```

| Target | Does |
| --- | --- |
| `make install` | Install dependencies from the lockfile |
| `make dev` | Start the local development server |
| `make build` | Build the static site. Without `DEPLOY_TARGET`: production URLs (`https://dravictorialaufer.com.br/`). With `DEPLOY_TARGET=ghpages`: staging under `/dra-victoria-laufer/` |
| `make preview` | Serve the built site locally |
| `make check` | Type-check the project (`astro check`) |
| `make assets` | Crop the private assets in `.assets/` for the build (`make build` and `make dev` run it first). Without `.assets/`, the page gets a neutral placeholder and no favicon |
| `make requests` | Serve `dist/` and request everything the pages reference (including `srcset` and font URLs in the CSS); fails on a non-200, a third-party request, or a published image above 200 KB. `BASE=/dra-victoria-laufer/` for a staging build |
| `make contrast` | Check the colour pairs in `DESIGN.md` |
| `make lint` | On a built `dist/`: valid HTML (`html-validate`, duplicate ids included); no "Lorem" and no vetoed term (`pediatra`, `especialista em`; `NÃO ESPECIALISTA` excepted) in the published text or file names; no photo or image source file tracked in the repository or added by a commit of the branch; no Markdown table with an empty header row (`scripts/check-markdown-tables.mjs`) |
| `make axe` | axe (WCAG 2.1 A/AA and best practice) on the home, Privacidade, Aviso legal and the 404 page at 360 and 1280 px; fails on any violation or undecided result. `BASE` as for `make requests` |
| `make lighthouse` | Lighthouse CI mobile on the home, Privacidade and Aviso legal, 3 runs each: Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5 s, CLS < 0.1. Reports in `.lighthouseci/`, nothing uploaded. `BASE` as for `make requests` |

- Needs Node.js at the version in [`.nvmrc`](.nvmrc) (Astro 7 requires ≥ 22.23.4) and npm.
- `make axe` and `make lighthouse` need Chrome: `CHROME_PATH`, or `google-chrome` on `PATH`.
- Every pull request runs the build and all the checks above in the `build` job of [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (issue 1.7); any failure fails the job, and on `main` it stops the deploy. Pull requests from forks get no assets secret and are checked on the placeholder.
- A push to `main` builds and deploys through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The repository's Pages source is "GitHub Actions".
- Indexing is set by `indexable` in [`src/config/release.ts`](src/config/release.ts): `true` since issue 2.6, so no build carries `noindex`; `false` puts every build under `noindex`.
- Photos and brand files live in the private repository `dra-victoria-laufer-assets` (ADR-0010), never here. The deploy workflow checks it out into `.assets/` with the read-only deploy key in the `ASSETS_DEPLOY_KEY` secret. Locally, with access to that repository, clone it into `.assets/` and keep it pulled, or point `ASSETS_DIR` at a checkout; without it, the build completes with the neutral placeholder.
- Facts about her live only in [`src/content/data/`](src/content/data/), checked by the schemas in [`src/content.config.ts`](src/content.config.ts). Invalid data stops the build. A missing fact is `pendente: true` with a `motivo`: it stays off the page and `make build` lists it as `[pendente] <collection>/<id>: <motivo>`.

---

## 🔧 Manutenção

The site is in maintenance (issue 7.2). Nothing below merges or deploys by itself: each reminder opens a pull request or an issue, and every change follows [`AGENTS.md`](AGENTS.md) §4. Detail and manual steps: [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md).

| Reminder | Does |
| --- | --- |
| Dependabot ([`.github/dependabot.yml`](.github/dependabot.yml)) | npm weekly (minor and patch in one PR, each major apart); GitHub Actions monthly. No auto-merge: the Reviewer merges after Filipe's OK. Their CI builds on the placeholder (the deploy key is never a Dependabot secret); the `deploy.yml` build on `main` after the merge is checked, and publishes nothing if it fails. An npm patch bump is small; an npm minor or major is small only with the assets step executed in CI and no breaking change in the changelog, so a Dependabot minor or major is large; any GitHub Actions bump is large (`AGENTS.md` §4 item 11) |
| Semiannual review ([`semiannual-review.yml`](.github/workflows/semiannual-review.yml)) | January 1 and July 1: issue "Revisão semestral" with the checklist in [`.github/ISSUE_TEMPLATE/revisao-semestral.md`](.github/ISSUE_TEMPLATE/revisao-semestral.md): content still true, CFM checklist, her re-approval and `medica.revisao`, external links, Search Console and Bing, DNS TXT records. If the previous one is still open, it comments on it instead of opening another |
| Domain renewal ([`domain-renewal.yml`](.github/workflows/domain-renewal.yml)) | Monthly: reads the expiration of `dravictorialaufer.com.br` from the Registro.br RDAP (2028-11-18) and opens a renewal issue with 60 days or fewer left; fails without posting if RDAP fails |

| Runbook | Covers |
| --- | --- |
| [`docs/runbooks/maintenance.md`](docs/runbooks/maintenance.md) | The three reminders, Dependabot settings (Filipe), running the workflows by hand, re-enabling scheduled workflows |
| [`docs/runbooks/search-console.md`](docs/runbooks/search-console.md) | Search Console and Bing, owners, re-verification, the TXT record rules |
| [`docs/architecture/domain-dns.md`](docs/architecture/domain-dns.md) | Domain, DNS records and their checks |

---

## 📄 License

- **Code:** MIT, copyright Filipe Oliveira. See [`LICENSE`](LICENSE).
- **Content and identity:** the texts, the name and the logo of Dra. Victória Laufer in this repository have **all rights reserved** and are not covered by the MIT license.
- **Photos:** kept in a separate private repository and not licensed. The images published on the site are for viewing only.

---

Contributors and agents follow [`AGENTS.md`](AGENTS.md).
