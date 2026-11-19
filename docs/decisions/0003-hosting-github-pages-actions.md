# ADR-0003: Hosting — GitHub Pages through Actions

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-003 |
| Related issues | 1.1, 3.1, 3.2 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The legacy site is published by GitHub Pages from the `main` branch. That classic deploy runs Jekyll only, with no room for a build variable or for checks. The final domain, `dravictorialaufer.com.br` (changed from `victorialaufer.com.br` by Filipe on 2026-11-16), will be registered at Registro.br and must work at the root.

## Decision

Host on **GitHub Pages**, with the site **built and deployed by a GitHub Actions workflow**. The Pages source is set to "GitHub Actions" in issue 1.1.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| GitHub Pages through Actions (chosen) | Accepts a root domain with A records in the Registro.br DNS; runs any build and checks; does not write the built site to a branch | The workflow has to be maintained | — |
| GitHub Pages, classic deploy from a branch | Nothing to set up | Jekyll only; no build variable; no validation in the build | Rejected |
| Cloudflare Pages | Capable static host | Would require moving the DNS away from Registro.br | Rejected |

## Consequences and trade-offs

- A push to `main` publishes the site, so every merge is a deploy.
- The built site is never committed. The optimized portrait therefore stays out of this repository's history ([ADR-0010](0010-private-assets-repository.md)).
- The existing `jekyll-gh-pages.yml` workflow is replaced in 1.1.

## Evidence / validation

Issue 1.1 replaces `jekyll-gh-pages.yml` with `.github/workflows/deploy.yml` (build with `DEPLOY_TARGET: ghpages`, request check, upload `dist/`, deploy). Filipe set the Pages source to "GitHub Actions". After the 1.1 merge (`d9bddfd`, 2026-11-16) the site at `/dra-victoria-laufer/` is the Astro build and the legacy files return 404.

Issue 3.1 (2026-11-18): `dravictorialaufer.com.br` registered at Registro.br and kept on the Registro.br DNS; the root's A and AAAA records and the `www` CNAME point at GitHub Pages, and the domain is verified in the GitHub account. Zone and checks: [`docs/architecture/domain-dns.md`](../architecture/domain-dns.md).

## Revisit when

GitHub Pages stops meeting a requirement (redirects, headers, private repository on the current plan).
