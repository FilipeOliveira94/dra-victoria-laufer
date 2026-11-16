// Searches everything the build publishes (dist/: pages, <head>, JSON-LD,
// sitemap, robots, SVG) and every published file name for placeholder text
// and for the terms vetoed by the CFM checklist (docs/compliance/cfm.md, D).
// `NÃO ESPECIALISTA` is the only accepted exception: it is removed before the
// search. The search ignores case and accents, and treats HTML entities and
// line breaks as the characters they stand for.
//
// Usage: node scripts/check-content.mjs

import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';
const TEXT = /\.(html|xml|txt|json|webmanifest|svg|css|js)$/i;
const FORBIDDEN = ['lorem', 'pediatra', 'especialista em'];
const EXCEPTION = /nao\s+especialista/g;

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function normalize(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    // Accented letters (&aacute;, &Ccedil;…) become the bare letter: accents are ignored.
    .replace(/&([a-z])(?:acute|grave|circ|tilde|uml|cedil|ring);/gi, '$1')
    .replace(/&([a-z]+);/gi, (m, n) => entities[n.toLowerCase()] ?? m)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[\s ]+/g, ' ')
    .replace(EXCEPTION, ' ');
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    out.push(p);
    if (entry.isDirectory()) out.push(...(await walk(p)));
  }
  return out;
}

const failures = [];
const paths = await walk(DIST);
for (const p of paths) {
  const name = relative(DIST, p);
  const sources = [['file name', name]];
  if (TEXT.test(p)) sources.push(['content', await readFile(p, 'utf8')]);
  for (const [where, text] of sources) {
    const clean = normalize(text);
    for (const term of FORBIDDEN) {
      // Hyphens, dots and underscores in file names count as spaces.
      const hay = where === 'file name' ? clean.replace(/[-_.]+/g, ' ') : clean;
      const at = hay.indexOf(term);
      if (at !== -1) {
        const context = hay.slice(Math.max(0, at - 40), at + term.length + 40).trim();
        failures.push(`${name} (${where}): "${term}" in "…${context}…"`);
      }
    }
  }
}

console.log(`content: ${paths.length} paths searched, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
