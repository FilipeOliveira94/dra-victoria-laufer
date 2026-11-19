// Runs axe (WCAG 2.0/2.1 A and AA, plus best practice) on the built pages in
// a headless Chrome: the home, the privacy and legal notice pages and a
// missing path (the 404 page), at 360 and 1280 px. Fails on any violation,
// and on any result axe could not decide (incomplete), which then needs a
// person to look at it.
//
// Usage: node scripts/check-axe.mjs [base]   (default base "/")
// Chrome: CHROME_PATH, else google-chrome on PATH (present on GitHub runners).

import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { delimiter, join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { serveDist } from './lib/serve-dist.mjs';

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const server = await serveDist(process.argv[2]);
const pages = [
  ['home', server.base],
  ['404', `${server.base}nao-existe/mais-fundo/`],
  ['privacidade', `${server.base}privacidade/`],
  ['aviso-legal', `${server.base}aviso-legal/`],
];
const widths = [360, 1280];

const chrome =
  process.env.CHROME_PATH ||
  (process.env.PATH || '').split(delimiter).map((d) => join(d, 'google-chrome')).find(existsSync);
if (!chrome) {
  console.error('axe: Chrome not found. Set CHROME_PATH or put google-chrome on PATH.');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  args: ['--no-sandbox'],
});
const failures = [];
try {
  for (const [name, path] of pages) {
    for (const width of widths) {
      const page = await browser.newPage();
      await page.setViewport({ width, height: 800 });
      await page.goto(server.origin + path, { waitUntil: 'load' });
      await page.evaluate(axeSource);
      const { violations, incomplete } = await page.evaluate(() =>
        window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
        }),
      );
      for (const [kind, list] of [['violation', violations], ['incomplete', incomplete]]) {
        for (const r of list) {
          const targets = r.nodes.map((n) => n.target.join(' ')).join(', ');
          failures.push(`${name} @ ${width}px: ${kind} ${r.id} (${r.help}) at ${targets}`);
        }
      }
      console.log(`${name} @ ${width}px: ${violations.length} violations, ${incomplete.length} incomplete`);
      await page.close();
    }
  }
} finally {
  await browser.close();
  await server.close();
}

console.log(`axe: ${pages.length * widths.length} runs, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
