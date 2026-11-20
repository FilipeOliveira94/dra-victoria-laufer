# CFM compliance checklist

Checklist for medical advertising on this site under **CFM Resolution 2.336/2023**. It is mandatory for every pull request that touches content, metadata, alt text, structured data, file names or URLs ([`AGENTS.md`](../../AGENTS.md) §8).

| Checklist | Scope |
| --- | --- |
| Applies to | Every published page, its `<head>`, its JSON-LD, the social image, file names and URLs |
| Run by | Dev before the PR; Filipe during review (or Claude, when he asks the Reviewer de Projetos); again in issues 2.6 and 6.2 |
| Automated part | Vetoed terms and "Lorem" in everything the build publishes, file names included: `make lint` (`scripts/check-content.mjs`), run on every pull request since issue 1.7. The other items are checked by hand |
| Final review | Issue 2.6, against the full text of the resolution, with her written approval |

## Limits of this checklist

- Checked against the full text of Resolution CFM 2.336/2023 (DOU 13/09/2023, in force since March 2024; [official PDF](https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf)) and the Manual de Publicidade Médica of the Codame (CFM, 2024), which Art. 2 makes binding, in issue 2.6 (2026-11-18). The Manual was read in the copy published by the CREMERO ([PDF](https://cremero.org.br/wp-content/uploads/2024/07/CODAME___MANUAL_2024.pdf)). No later resolution amending 2.336/2023 was found.
- It is not legal advice. In case of doubt, do not publish and consult the CREMESP.
- A rule here changes only with its source recorded in the changelog below.

## Confirmed facts

| Fact | Value |
| --- | --- |
| Registration | CRM 240550, São Paulo. Written on the site as `CRM-SP 240550` |
| RQE | None. She is not a registered specialist |
| Postgraduate courses | Three: Especialização em Pediatria Clínica (HCX Fmusp); Especialização em Anestesia e Terapia Intensiva Pediátrica (Faculdade Sírio-Libanês); Especialização em Neonatologia (HCX Fmusp). **None is registered at the CREMESP** (registration frozen by the CREMESP); Neonatologia is in progress (Filipe, 2026-11-15). Shown by Filipe's decision, registered or not; `noindex` is removed in 2.6 regardless of the registration ([`docs/inputs/0.2-pending-inputs.md`](../inputs/0.2-pending-inputs.md)) |
| Degree | Medicina, Universidade Federal do Vale do São Francisco (UNIVASF), 2021 |
| Official course names | As above, received from Filipe on 2026-11-15 |

## A. Identification

- [ ] The main page shows her name, `CRM-SP 240550` and the word `MÉDICA`.
- [ ] The three appear as real text (not inside an image) in the first fold at 360 px width.
- [ ] The same identification appears in the footer.
- [ ] No RQE number is shown or implied.
- [ ] `MÉDICA` and `CRM-SP 240550` are one run of text in one font, size and colour (Manual da Codame, CFM 2024, chapter 1: "Não pode haver diferença entre fonte, tamanho e cor"). The name may differ: the Manual's own examples set the name larger than the `MÉDICA`/CRM line (business card, 1.1, p. 62; the approved Twitter profile, 6.4, p. 74). The page keeps the `DESIGN.md` hierarchy, the name in `display` and the identity line in `label` (Filipe, 2026-11-18, issue 2.6).

## B. Postgraduate courses (Art. 13)

- [ ] Each course is written `MÉDICA com pós-graduação em (área)`, with the official course name and the institution (the Manual requires area and institution).
- [ ] Each is followed by `NÃO ESPECIALISTA`, in capitals.
- [ ] `NÃO ESPECIALISTA` has the same font, size and colour as the course line next to it (Manual da Codame, chapter 11, p. 95). It is not hidden, shrunk, greyed out or moved away from the course.
- [ ] A course without its official name is `pendente` and does not appear on the page.
- [ ] A course not yet completed carries the `EM CURSO` marker in its card, as text read by screen readers and right after the institution, so the card does not state a completed course (Art. 11, XVI).
- [ ] A course not registered at the CRM is shown only under a recorded decision by Filipe. Current decision: shown while the CREMESP keeps registration frozen, and the release in 2.6 does not wait for it ([`docs/inputs/0.2-pending-inputs.md`](../inputs/0.2-pending-inputs.md) → 2). Art. 13, §1, d reads "devidamente cadastrado no CRM"; this is a recorded risk.
- [ ] No year, workload or course name was invented.
- [ ] Any other mention of a postgraduate area, such as in "Sobre", is followed by `NÃO ESPECIALISTA` (Art. 13, §1, d; Filipe's decision, issue 2.6).
- [ ] The degree is shown with its institution and year (Art. 13, §1, a), on the page that carries `MÉDICA`.

## C. Nothing suggests a specialty

She may not present herself as a pediatrician or as a specialist.

- [ ] The terms `pediatra`, `especialista em`, `neonatologista`, `intensivista` and `área de atuação` (applied to her) do not appear. `NÃO ESPECIALISTA` is the only accepted exception.
- [ ] Roles and experience follow the wording rule below.

### Wording rule for roles and experience

Source: Resolution CFM 2.336/2023, Art. 4, II; Art. 7; Art. 11, I, XVI and §3; Art. 13, §1, c and §1º. Decided by Filipe on 2026-11-15. Applies to "Atuação", "Sobre" and any future sentence about what she does.

A non-specialist may say **where she works and in what setting** (Art. 7: advertising informs "dos ambientes [...] onde exercem sua profissão"). She may not claim the **title** of a specialty or área de atuação (Art. 4, II; Art. 13), nor say she **treats** specific organs, systems or diseases (Art. 11, I), nor give herself privileged qualities (Art. 11, XVI and §3).

| Write | Do not write |
| --- | --- |
| Function + unit + workplace: "Médica na UTI neonatal do Hospital X" | A title: "neonatologista", "intensivista pediátrica", "pediatra" |
| The unit or service as a place: "UTI pediátrica", "maternidade", "pronto-socorro infantil" | The field as her qualification: "área de atuação: Neonatologia", "atua como especialista em…" |
| A start year: "desde 2022" | A treatment claim: "trata doenças respiratórias do recém-nascido" |
| Plain facts, in the first person when she speaks | Privileged qualities: "referência em", "a melhor", "ampla experiência", superlatives |

- The name of a postgraduate area appears only in the Art. 13 format, followed by `NÃO ESPECIALISTA` (section B).
- Experience is a start year ("desde 2022"), not a count of years that ages, unless the count is computed at build time from the start year.
- Workplaces are named in text only, without their logos.
- [ ] The Instagram account is shown with its existing handle, `pediatria.dravictoria` (URL `https://www.instagram.com/pediatria.dravictoria`), by Filipe's decision of 2026-11-16: the handle is not changed. Recorded risk: the handle names a field ("pediatria") next to a physician without RQE, and this checklist covers URLs. It does not trigger the vetoed-term check (`pediatra`), which is why the decision is written here.
- [ ] No title, heading, service name or phrase reads as a specialty (the legacy site has "Atendimento Pediátrico", "Puericultura" and "Consultas de Emergência"; none of these returns).
- [ ] The check covers visible text, `<title>`, meta description, Open Graph tags, the social image, image `alt` text, JSON-LD, file names and URLs.
- [ ] Structured data is `Person` with `jobTitle: Médica`. It has no `medicalSpecialty`. `Physician` is used only with acquisition switched on (issue 6.2).

### Points from the full text (issue 2.6)

- [ ] Her portrait is her own image (Art. 9, I; Art. 8, III), sober, with no before-and-after, no patient and no image bank (Art. 14 does not apply).
- [ ] No award, ranking or "melhor médico" style title (Art. 11, XIII), no promise of results (Art. 11, XII), no free service on offer (Art. 11, §4, c).
- [ ] The text "Sobre" stays within Art. 9, XV: a generic comment on her work that identifies no patient.
- [ ] Instagram and WhatsApp are her own social networks under Art. 8, §1, so the same rules bind them. Her Instagram bio carries name, `MÉDICA` and CRM on its main page (Art. 6; Manual, chapter 6). This is outside the site and is Filipe's and her responsibility; the site only links to it.

## D. Site rules that protect the above

These come from the approved plan and design brief, not from a cited article of the resolution. They are enforced the same way.

- [ ] "Atuação" lists roles with their current workplace and start year, under the wording rule in section C. No invitation to a consultation, no mention of home care.
- [ ] No statistics (patients seen, procedures done), testimonials, ratings or promotional language. A start year is not a statistic. The earlier description "Médica muito amada pelos seus pacientinhos e mães" is self-promotion and does not return.
- [ ] The text "Sobre" is the one she wrote, published without a change of meaning.
- [ ] Acquisition (`captacao.*`) is off unless the issue turns it on. Any text it shows passed this checklist and her approval.
- [ ] The only e-mail is `victorialaufersaude@gmail.com`.
- [ ] No "Lorem ipsum", "TODO" or placeholder text is visible.

## E. Release (issue 2.6 only)

- [ ] Sections A to D were checked against the full text of Resolution CFM 2.336/2023, and new findings were added here.
- [ ] Dra. Victória approved the content in writing. The approval is recorded in the issue.
- [ ] The pending report is empty for identification and training.
- [ ] Only then is `noindex` removed.

## How to report it in a PR

Copy sections A to D into the PR description, tick each item, and state how it was checked (built page, page source, validator). An item that does not apply is marked "n/a" with the reason. An unticked item blocks the merge.

## Changelog

| Date | Change | Source |
| --- | --- | --- |
| 2026-11-15 | First version | Approved plan v2 and the points of the resolution given by Filipe |
| 2026-11-15 | Course names recorded. Wording rule for roles and experience added; `neonatologista`, `intensivista` and `área de atuação` vetoed. "Atuação" may name current workplaces and a start year; "no numbers" narrowed to statistics | Text of Resolution CFM 2.336/2023 (Art. 4, 7, 11, 13), read in issue 0.2; decision by Filipe |
| 2026-11-15 | Planning record "two registered" corrected: none is registered, registration frozen by the CREMESP. Unregistered courses shown by Filipe's decision, and the release does not wait for registration; a course in progress is marked `(em curso)` | Art. 13, §1, d; Art. 11, XVI; facts and decision from Filipe |
| 2026-11-16 | Instagram handle `pediatria.dravictoria` kept as is, recorded as a risk in C | Filipe's decision, 2026-11-16 |
| 2026-11-17 | A course in progress is marked by the `EM CURSO` marker in its card instead of `(em curso)` inside the course line. The marker is text, read by screen readers, so the card still does not state a completed course (Art. 11, XVI) | Filipe's decision in issue 2.3, 2026-11-17 |
| 2026-11-18 | Identification: `MÉDICA` and the CRM in one font, size and colour; the name may differ, as in the Manual's approved examples. The page keeps the `DESIGN.md` hierarchy | Manual da Codame (CFM, 2024), chapter 1 and examples 1.1 and 6.4; Filipe's decision in issue 2.6 |
| 2026-11-18 | Checked against the full text and the Manual da Codame. B: same font, size and colour for `NÃO ESPECIALISTA`; area and institution; any other mention of a postgraduate area followed by `NÃO ESPECIALISTA` ("Sobre" amended); degree with institution and year. C: points from the full text (own image, Art. 11 XII and XIII, Art. 9 XV, own networks under Art. 8 §1) | Resolution CFM 2.336/2023, full text; Manual da Codame (CFM, 2024); Filipe's decisions in issue 2.6 |
