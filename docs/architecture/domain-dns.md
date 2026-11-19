# Domain and DNS

How `dravictorialaufer.com.br` reaches the site. Decision: [ADR-0003](../decisions/0003-hosting-github-pages-actions.md). Switch of the build to the domain: [ADR-0004](../decisions/0004-deploy-target-switch.md), issue 3.2.

| Domain | Current |
| --- | --- |
| Name | `dravictorialaufer.com.br` |
| Registrar | Registro.br, under her CPF |
| Registered | 2026-11-18 |
| Expires | 2028-11-18 (renewal reminder: issue 7.2) |
| Name servers | `a.auto.dns.br`, `b.auto.dns.br` (Registro.br DNS) |
| GitHub verification | Verified in Filipe's GitHub account (Settings → Pages → Verified domains) |

## Records

The zone holds only the site records and the GitHub verification. There is no mailbox on the domain, so no MX, SPF, DKIM or DMARC record ([ADR-0007](../decisions/0007-contact-and-single-email.md)).

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| A | root | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | GitHub Pages, IPv4 |
| AAAA | root | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` | GitHub Pages, IPv6 |
| CNAME | `www` | `filipeoliveira94.github.io` | GitHub Pages; Pages redirects `www` to the root once the custom domain is set (3.2) |
| TXT | `_github-pages-challenge-FilipeOliveira94` | value given by GitHub | Domain verification: no other GitHub account can take the domain for its Pages site. Keep it |

The addresses are the ones GitHub publishes for Pages apex domains. If GitHub changes them, its documentation is the source.

## Checks

From any machine, with the system resolver or a DNS-over-HTTPS query:

- `getent ahostsv4 dravictorialaufer.com.br`: the four A addresses, and nothing else.
- `getent ahostsv6 dravictorialaufer.com.br`: the four AAAA addresses.
- `getent hosts www.dravictorialaufer.com.br`: an alias of `filipeoliveira94.github.io`.
- The TXT record answers; the MX query has no answer.

Until 3.2 sets the custom domain in Pages, `http://dravictorialaufer.com.br` answers GitHub's 404 and there is no HTTPS certificate. Both are expected.
