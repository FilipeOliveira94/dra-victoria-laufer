# Search Console and Bing Webmaster Tools

How the site is registered with Google Search Console and Bing Webmaster Tools, and how to keep it registered. Issue 7.1. DNS records: [`docs/architecture/domain-dns.md`](../architecture/domain-dns.md).

The site itself carries nothing for this: no verification meta tag, no verification HTML file, no script, tag or cookie. Verification lives only in the domain's DNS.

| Service | Current |
| --- | --- |
| Google Search Console | Property of type Domain, `dravictorialaufer.com.br` |
| Google owners | Filipe (property created in his Google account); Dra. Victória, added as owner |
| Google verification | TXT record `google-site-verification=…` at the root of the domain, in the Registro.br DNS |
| Bing Webmaster Tools | Site imported from Google Search Console |
| Sitemap | `https://dravictorialaufer.com.br/sitemap.xml`, listed in `robots.txt` |
| DNS | Registro.br, name servers `a.sec.dns.br` and `b.sec.dns.br` |

## Rules

1. **Never delete the domain's TXT records in Registro.br.** Search Console verification depends on the `google-site-verification` record, and Bing's import depends on the Search Console verification. The GitHub Pages verification depends on the `_github-pages-challenge-…` record. Google re-checks the record periodically; without it the property loses its verification.
2. **The verification token never goes into the repository.** No meta tag, no HTML verification file, no token value in code, docs, commits, PRs or CI logs. The value is read in Search Console and typed only into the Registro.br DNS.

## Setup (done by Filipe on 2026-11-19)

1. In Google Search Console, in Filipe's Google account, add a property of type **Domain** for `dravictorialaufer.com.br`. Search Console shows a TXT value `google-site-verification=…`.
2. In Registro.br → the domain → DNS, add a TXT record with the **name empty** (the root of the domain) and the **value** exactly as Search Console shows it, prefix included. A record under the name `google-site-verification` is a subdomain and does not verify a Domain property.
3. Back in Search Console, choose **Verify**. DNS changes can take minutes to hours to be seen.
4. In Search Console → Settings → Users and permissions, add Dra. Victória as **owner**.
5. In Search Console → Sitemaps, submit `https://dravictorialaufer.com.br/sitemap.xml`.
6. In Search Console → URL Inspection, inspect `https://dravictorialaufer.com.br/` and choose **Request indexing**.
7. In Bing Webmaster Tools, sign in and choose **Import from Google Search Console**, selecting the property. Bing takes the verification and the sitemap from Search Console.

`robots.txt` already lists the sitemap (`Sitemap: https://dravictorialaufer.com.br/sitemap.xml`) since 1.6 and 3.2; no change to the site was needed.

## Re-verify

When Search Console reports the property unverified:

1. Check the record from any machine with a DNS-over-HTTPS query, for example `curl -s "https://dns.google/resolve?name=dravictorialaufer.com.br&type=TXT"`. The answer must contain a `google-site-verification=` value at the root name. Do not paste the value anywhere.
2. If it is missing, open Search Console → Settings → Ownership verification, copy the value it shows, and add the TXT record again as in step 2 of the setup.
3. Choose **Verify** in Search Console. Bing follows the Search Console verification; if Bing also reports the site unverified, import it again from Search Console.

## Resubmit the sitemap

After a change in the site's pages (a new page, a removed page), or when Search Console reports the sitemap with errors:

1. Check that `https://dravictorialaufer.com.br/sitemap.xml` answers 200 and lists the expected pages (`curl -s`).
2. Search Console → Sitemaps: submit the same URL again. Status must read "Success" with the number of discovered pages.
3. Bing Webmaster Tools → Sitemaps: resubmit the same URL if Bing shows an error.

## Acceptance (issue 7.1)

| Check | Status |
| --- | --- |
| Property verified in Google Search Console | Done 2026-11-19 (Filipe); TXT record answers at the root. `docs/status-log.md` |
| Site verified in Bing Webmaster Tools (import) | Done 2026-11-19 (Filipe). `docs/status-log.md` |
| Sitemap submitted and read without errors | Done 2026-11-19: status "Success", 3 pages discovered (Filipe). `docs/status-log.md` |
| Home page indexed (URL Inspection) | Done 2026-11-25 (Filipe, from Search Console). `docs/status-log.md` |
