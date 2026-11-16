# Dra. Victória Laufer — portfolio site

The portfolio site of Dra. Victória Laufer, MÉDICA, CRM-SP 240550. One static page that lets a visitor check who she is: her registration, her training, what she does, and how to reach her.

- **Purpose.** Credibility first. Patient acquisition is prepared and switched off.
- **Compliance.** Every published word follows CFM Resolution 2.336/2023. The checklist is [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

---

## 📍 Status

| Field | Now |
| --- | --- |
| In the repository | The **Astro base** (issue 1.1), the **typed content model** (issue 1.2) and the **page structure** (issue 1.3): one `noindex` page with name, `MÉDICA`, `CRM-SP 240550` and the Contato section, read from the collections in `src/content/data/`, with anchor navigation, footer and a 404 page. Neutral provisional styling; the brand comes in 2.4 |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> |
| Next | Issue 1.4, images, favicon and fonts |
| Brand | Confirmed in [`DESIGN.md`](DESIGN.md) (issue 0.3); applied to the site in issue 2.4. `make contrast` checks its colour pairs |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · scope in [`ROADMAP.md`](ROADMAP.md) |

---

## ⚙️ Target stack

Generator, hosting, `DEPLOY_TARGET` and `noindex` are built (issue 1.1), and so are the content model (issue 1.2) and the page structure (issue 1.3); the rest is planned. Rationale in [`DECISIONS.md`](DECISIONS.md); overview in [`docs/architecture/target-site.md`](docs/architecture/target-site.md).

| Layer | Choice |
| --- | --- |
| Generator | Astro, static output, no JavaScript shipped to the browser |
| Styling | Own CSS with tokens in one file. No framework |
| Content | Typed collections. A pending item is hidden and reported by the build |
| Hosting | GitHub Pages, built and deployed by GitHub Actions |
| Domain | `dravictorialaufer.com.br`, switched on by removing `DEPLOY_TARGET` from the workflow |
| Indexing | `noindex` until the CFM review releases the site (issue 2.5) |
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
| `make requests` | Serve `dist/` and request everything the pages reference; fails on a non-200 or a third-party request. `BASE=/dra-victoria-laufer/` for a staging build |
| `make contrast` | Check the colour pairs in `DESIGN.md` |
| `make lint`, `make lighthouse` | Print a notice until issue 1.7 adds the tools |

- Needs Node.js at the version in [`.nvmrc`](.nvmrc) (Astro 7 requires ≥ 22.23.4) and npm.
- A push to `main` builds and deploys through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The repository's Pages source is "GitHub Actions".
- Every build carries `noindex` until issue 2.5 sets `indexable` in [`src/config/release.ts`](src/config/release.ts).
- Facts about her live only in [`src/content/data/`](src/content/data/), checked by the schemas in [`src/content.config.ts`](src/content.config.ts). Invalid data stops the build. A missing fact is `pendente: true` with a `motivo`: it stays off the page and `make build` lists it as `[pendente] <collection>/<id>: <motivo>`.

---

## 📄 License

- **Code:** MIT, copyright Filipe Oliveira. See [`LICENSE`](LICENSE).
- **Content and identity:** the texts, the name and the logo of Dra. Victória Laufer in this repository have **all rights reserved** and are not covered by the MIT license.
- **Photos:** kept in a separate private repository and not licensed. The images published on the site are for viewing only.

---

Contributors and agents follow [`AGENTS.md`](AGENTS.md).
