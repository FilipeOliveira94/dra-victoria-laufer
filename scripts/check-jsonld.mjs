// Checks the structured data the build publishes (issue 4.1, ADR-0009,
// docs/compliance/cfm.md → C): the home page carries exactly one JSON-LD block,
// a schema.org Person with jobTitle "Médica" and the CRM as identifier. No page
// carries `medicalSpecialty`, the Physician type, a rating or a pending marker,
// and every mention of a postgraduate course ends with NÃO ESPECIALISTA.
//
// Usage: node scripts/check-jsonld.mjs

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const BLOCK = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
const BANNED_KEYS = ['medicalSpecialty', 'aggregateRating', 'review', 'pendente', 'motivo'];
const BANNED_TYPES = ['Physician', 'MedicalBusiness', 'MedicalOrganization'];

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

// Every key and string value, at any depth.
function* walk(node, key = '') {
  if (Array.isArray(node)) for (const v of node) yield* walk(v, key);
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) {
      yield ['key', k];
      yield* walk(v, k);
    }
  else if (typeof node === 'string') yield ['value', node, key];
}

const pages = (await readdir(DIST, { recursive: true })).filter((p) => p.endsWith('.html'));
let blocks = 0;
for (const page of pages) {
  const html = await readFile(join(DIST, page), 'utf8');
  const found = [...html.matchAll(BLOCK)];
  blocks += found.length;
  if (page === 'index.html' && found.length !== 1) fail(page, `${found.length} JSON-LD blocks, expected 1`);
  if (page !== 'index.html' && found.length > 0) fail(page, 'JSON-LD outside the home page');
  for (const [, raw] of found) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      fail(page, `invalid JSON: ${e.message}`);
      continue;
    }
    if (data['@context'] !== 'https://schema.org') fail(page, `@context ${data['@context']}`);
    if (data['@type'] !== 'Person') fail(page, `@type ${data['@type']}, expected Person`);
    if (data.jobTitle !== 'Médica') fail(page, `jobTitle ${data.jobTitle}, expected Médica`);
    if (!/^CRM-[A-Z]{2}$/.test(data.identifier?.propertyID ?? '') || !/^\d+$/.test(data.identifier?.value ?? ''))
      fail(page, 'no CRM identifier');
    if (!data.name || !data.url) fail(page, 'name or url missing');
    for (const [kind, v, key] of walk(data)) {
      if (kind === 'key' && BANNED_KEYS.includes(v)) fail(page, `key "${v}"`);
      if (kind === 'value' && key === '@type' && BANNED_TYPES.includes(v)) fail(page, `type "${v}"`);
      if (kind === 'value' && /pós-graduação em/i.test(v) && !/NÃO ESPECIALISTA$/.test(v))
        fail(page, `course without NÃO ESPECIALISTA: "${v}"`);
    }
  }
}

console.log(`json-ld: ${pages.length} pages, ${blocks} blocks, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
