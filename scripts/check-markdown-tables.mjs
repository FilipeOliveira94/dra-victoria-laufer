// Fails if a tracked Markdown file has a table whose header row is empty
// (`| | |`). GFM always renders the header row, so an empty one shows up as a
// blank row on top of the table. Give every table a header that names its
// columns. Fenced code blocks are skipped.
//
// Usage: node scripts/check-markdown-tables.mjs

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const EMPTY_ROW = /^\s*\|(\s*\|)+\s*$/;
const SEPARATOR = /^\s*\|(\s*:?-{3,}:?\s*\|)+\s*$/;
const FENCE = /^\s*(```|~~~)/;

const files = execFileSync('git', ['ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

const failures = [];
for (const path of files) {
  const lines = readFileSync(path, 'utf8').split('\n');
  let fenced = false;
  lines.forEach((line, i) => {
    if (FENCE.test(line)) fenced = !fenced;
    if (!fenced && EMPTY_ROW.test(line) && SEPARATOR.test(lines[i + 1] ?? '')) {
      failures.push(`${path}:${i + 1}`);
    }
  });
}

console.log(`markdown tables: ${files.length} files, ${failures.length} with an empty header row`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
