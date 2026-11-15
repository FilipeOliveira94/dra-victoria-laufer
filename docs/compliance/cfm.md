# CFM compliance checklist

Checklist for medical advertising on this site under **CFM Resolution 2.336/2023**. It is mandatory for every pull request that touches content, metadata, alt text, structured data, file names or URLs ([`AGENTS.md`](../../AGENTS.md) §8).

| | |
| --- | --- |
| Applies to | Every published page, its `<head>`, its JSON-LD, the social image, file names and URLs |
| Run by | Dev before the PR; PO during review; again in issues 2.5 and 6.2 |
| Automated part | Issue 1.7 (vetoed terms, "Lorem"). Until then, by hand |
| Final review | Issue 2.5, against the full text of the resolution, with her written approval |

## Limits of this checklist

- It covers the points of the resolution that Filipe passed on during planning. It has **not** been checked against the full text. That check is part of issue 2.5.
- It is not legal advice. In case of doubt, do not publish and consult the CREMESP.
- A rule here changes only with its source recorded in the changelog below.

## Confirmed facts

| Fact | Value |
| --- | --- |
| Registration | CRM 240550, São Paulo. Written on the site as `CRM-SP 240550` |
| RQE | None. She is not a registered specialist |
| Postgraduate courses | Three. Two are known and registered at the CREMESP: pediatric intensive care (Hospital Sírio-Libanês) and pediatrics and neonatology (HC FMUSP). The third is pending: area, institution and registration still to come from Dra. Victória |
| Official course names | Pending from Dra. Victória. Not to be guessed |

## A. Identification

- [ ] The main page shows her name, `CRM-SP 240550` and the word `MÉDICA`.
- [ ] The three appear as real text (not inside an image) in the first fold at 360 px width.
- [ ] The same identification appears in the footer.
- [ ] No RQE number is shown or implied.

## B. Postgraduate courses (Art. 13)

- [ ] Each course is written `MÉDICA com pós-graduação em (área)`, with the official course name and the institution.
- [ ] Each is followed by `NÃO ESPECIALISTA`, in capitals.
- [ ] `NÃO ESPECIALISTA` has the same font size and the same contrast as the text next to it. It is not hidden, shrunk, greyed out or moved away from the course.
- [ ] A course without its official name is `pendente` and does not appear on the page.
- [ ] No year, workload or course name was invented.

## C. Nothing suggests a specialty

She may not present herself as a pediatrician or as a specialist.

- [ ] The terms `pediatra` and `especialista em` do not appear. `NÃO ESPECIALISTA` is the only accepted exception.
- [ ] No title, heading, service name or phrase reads as a specialty (the legacy site has "Atendimento Pediátrico", "Puericultura" and "Consultas de Emergência"; none of these returns).
- [ ] The check covers visible text, `<title>`, meta description, Open Graph tags, the social image, image `alt` text, JSON-LD, file names and URLs.
- [ ] Structured data is `Person` with `jobTitle: Médica`. It has no `medicalSpecialty`. `Physician` is used only with acquisition switched on (issue 6.2).

## D. Site rules that protect the above

These come from the approved plan and design brief, not from a cited article of the resolution. They are enforced the same way.

- [ ] "Atuação" lists roles only: no workplace, no period, no invitation to a consultation, no mention of home care.
- [ ] No numbers, testimonials, ratings or promotional language. The earlier description "Médica muito amada pelos seus pacientinhos e mães" is self-promotion and does not return.
- [ ] The text "Sobre" is the one she wrote, published without a change of meaning.
- [ ] Acquisition (`captacao.*`) is off unless the issue turns it on. Any text it shows passed this checklist and her approval.
- [ ] The only e-mail is `victorialaufersaude@gmail.com`.
- [ ] No "Lorem ipsum", "TODO" or placeholder text is visible.

## E. Release (issue 2.5 only)

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
