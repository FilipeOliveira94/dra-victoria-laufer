---
name: Revisão semestral
about: Revisão do conteúdo, da conformidade CFM e da infraestrutura do site (aberta pelo workflow semiannual-review.yml em 1º de janeiro e 1º de julho)
title: Revisão semestral
---

Revisão semestral do site <https://dravictorialaufer.com.br/> (issue 7.2). Roteiro: [`docs/runbooks/maintenance.md`](https://github.com/FilipeOliveira94/dra-victoria-laufer/blob/main/docs/runbooks/maintenance.md).

- [ ] Conteúdo ainda verdadeiro: nome, CRM, formação, atuação (locais e anos), contatos e texto "Sobre" conferidos em `src/content/data/`
- [ ] Checklist CFM refeito na página publicada ([`docs/compliance/cfm.md`](https://github.com/FilipeOliveira94/dra-victoria-laufer/blob/main/docs/compliance/cfm.md))
- [ ] Dra. Victória reaprovou o conteúdo (via Filipe); se aprovou, `medica.revisao` atualizado para a data da aprovação, em um PR
- [ ] Links externos respondem 200, consulta do CREMESP incluída (`https://guiamedico.cremesp.org.br/`)
- [ ] Search Console e Bing Webmaster sem erros ([`docs/runbooks/search-console.md`](https://github.com/FilipeOliveira94/dra-victoria-laufer/blob/main/docs/runbooks/search-console.md))
- [ ] Registros TXT do domínio no lugar (`google-site-verification` na raiz) ([`docs/architecture/domain-dns.md`](https://github.com/FilipeOliveira94/dra-victoria-laufer/blob/main/docs/architecture/domain-dns.md))

Feche esta issue quando todos os itens estiverem conferidos. Uma correção encontrada vira um PR próprio.
