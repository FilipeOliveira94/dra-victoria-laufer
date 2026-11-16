# Status log (archive)

Chronological history of project status updates, newest first. The operational ledger is [`PROJECT_STATUS.md`](../PROJECT_STATUS.md) (current phase only; **rewritable**). Architecture docs and ADRs cite this log, or carry the facts inline, for durable evidence.

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

Not done here: making the `build` job a required status check of `main`. The job fails, but GitHub blocks the merge only under branch protection, a repository setting that is Filipe's decision.

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
