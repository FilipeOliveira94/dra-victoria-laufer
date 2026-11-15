# Dra. Victória Laufer — portfolio site

The portfolio site of Dra. Victória Laufer, MÉDICA, CRM-SP 240550. One static page that lets a visitor check who she is: her registration, her training, what she does, and how to reach her.

- **Purpose.** Credibility first. Patient acquisition is prepared and switched off.
- **Compliance.** Every published word follows CFM Resolution 2.336/2023. The checklist is [`docs/compliance/cfm.md`](docs/compliance/cfm.md).

---

## 📍 Status

| Field | Now |
| --- | --- |
| In the repository | The **legacy Jekyll site** (placeholder text) and the project structure. The target site does not exist yet |
| Published at | <https://filipeoliveira94.github.io/dra-victoria-laufer/> |
| Next | Issue 1.1 replaces Jekyll with Astro and publishes as `noindex` |
| Blocked | Logo, palette and typography wait for confirmation. Official course names, roles, the text "Sobre" and the photo wait for Dra. Victória |
| Ledger | [`PROJECT_STATUS.md`](PROJECT_STATUS.md) · scope in [`ROADMAP.md`](ROADMAP.md) |

---

## ⚙️ Target stack

Planned, not built. Rationale in [`DECISIONS.md`](DECISIONS.md); overview in [`docs/architecture/target-site.md`](docs/architecture/target-site.md).

| Layer | Choice |
| --- | --- |
| Generator | Astro, static output, no JavaScript shipped to the browser |
| Styling | Own CSS with tokens in one file. No framework |
| Content | Typed collections. A pending item is hidden and reported by the build |
| Hosting | GitHub Pages, built and deployed by GitHub Actions |
| Domain | `victorialaufer.com.br`, switched on by removing `DEPLOY_TARGET` from the workflow |
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
| `make build` | Build the static site |
| `make preview` | Serve the built site locally |
| `make lint` | Lint the source |
| `make check` | Type-check and validate the content collections |
| `make lighthouse` | Run Lighthouse CI (mobile) |

- Until issue 1.1 creates the Astro project, each of these prints a notice and does nothing. They do not fail.
- After 1.1 they need Node.js with npm.

<details>
<summary>Run the legacy Jekyll site</summary>

The current site is Jekyll through the `github-pages` gem. It needs Ruby and Bundler, and has no `make` target because issue 1.1 removes it.

```bash
bundle install
bundle exec jekyll serve
```

- These commands were not run when this README was written: Bundler was not installed on the machine.
- `Gemfile.lock` is git-ignored in the legacy setup, so gem versions are not pinned.

</details>

---

## 📄 License

- **Code:** MIT, copyright Filipe Oliveira. See [`LICENSE`](LICENSE).
- **Content and identity:** the texts, the name and the logo of Dra. Victória Laufer in this repository have **all rights reserved** and are not covered by the MIT license.
- **Photos:** kept in a separate private repository and not licensed. The images published on the site are for viewing only.

---

Contributors and agents follow [`AGENTS.md`](AGENTS.md).
