# ADR-0007: Contact channels and a single e-mail

| Field | Value |
| --- | --- |
| Status | `approved` |
| Date opened | 2026-11-15 (recorded from the approved plan v2) |
| Date decided | 2026-11-15 (recorded) |
| Owner | Filipe |
| Index ID | D-007 |
| Related issues | 1.2, 2.1, 3.1, 3.3 (withdrawn), 5.1, 6.1, 6.2 |
| Supersedes | — |
| Superseded by | — |

## Context / problem

The legacy site shows two different e-mail addresses. The plan first considered a mailbox on the new domain. Dra. Victória is seeing few patients, so the site should let people reach her without inviting new appointments. Messages from patients are sensitive data under medical confidentiality.

## Decision

- The e-mail on the site is **`victorialaufersaude@gmail.com`**, and it is the only one. It is her professional mailbox, already configured. There is no mailbox on the domain.
- The address may change later if she asks, for example because of spam. That is a future decision, recorded as a new ADR when it is made.
- **WhatsApp and Instagram are public**, shown as contact.
- An **invitation to schedule** is acquisition and stays behind the `captacao.*` flags, off by default.

## Alternatives considered

| Option | Pros | Cons | Why not (if rejected) |
| --- | --- | --- | --- |
| Her existing professional Gmail (chosen) | Her own mailbox; nothing to set up or pay; no mail DNS | The address is not on the site's domain | — |
| Mailbox on the domain (Zoho Mail or Google Workspace) | Address matches the domain | A provider to choose and maintain; MX, SPF, DKIM and DMARC records | Rejected by Filipe; issue 3.3 withdrawn |
| Filipe's e-mail as contact | None needed | Patient messages would reach someone who is not her physician | Rejected |
| Hide WhatsApp until acquisition is on | Fewer incoming messages | Removes a contact channel she accepts as public | Rejected |

## Consequences and trade-offs

- The Registro.br DNS holds only the site records (A, AAAA and the `www` CNAME).
- A public e-mail and WhatsApp attract spam and clinical messages through an informal channel. Issue 5.1 adds the notice.
- With the flags off, no call-to-action block is generated in the HTML.

## Evidence / validation

None yet. The preference for her own mailbox is a reading of the LGPD and of medical confidentiality made during planning, not a legal opinion.

## Revisit when

She asks for a different address (for example because of spam) or for one on the domain, or the channels she wants public change. A new address goes through the typed `contato` collection only, so the change is one data edit plus a new ADR; a mailbox on the domain would also reopen issue 3.3 and the mail DNS records.
