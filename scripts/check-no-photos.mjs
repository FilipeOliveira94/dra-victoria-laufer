// Fails if a photo or an image source file is in this repository: in the
// tracked tree, or added by any commit between the base branch and HEAD.
// Portraits and brand sources live only in the private assets repository
// (AGENTS.md §7, ADR-0010); the build fetches them. No image file is tracked
// here today, so there is no allow list.
//
// Usage: node scripts/check-no-photos.mjs [base-ref]   (default origin/main)
// The commit check needs the base ref in the clone (CI: fetch-depth 0).

import { execFileSync } from 'node:child_process';

const PHOTO = /\.(jpe?g|jfif|png|webp|avif|gif|bmp|tiff?|heic|heif|dng|cr2|nef|arw|raw|psd|xcf|ai|eps)$/i;
const baseRef = process.argv[2] || 'origin/main';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
const lines = (s) => s.split('\n').filter(Boolean);

const failures = [];
for (const path of lines(git('ls-files'))) {
  if (PHOTO.test(path)) failures.push(`tracked: ${path}`);
}

let range = 'no commit range';
try {
  git('rev-parse', '--verify', '--quiet', `${baseRef}^{commit}`);
  range = `${baseRef}..HEAD`;
  const log = git('log', '--diff-filter=AR', '--name-only', '--format=commit %h', range);
  let commit = '';
  for (const line of lines(log)) {
    if (line.startsWith('commit ')) commit = line.slice(7);
    else if (PHOTO.test(line)) failures.push(`added in ${commit}: ${line}`);
  }
} catch {
  failures.push(`base ref ${baseRef} not found: the commits of this branch were not checked`);
}

console.log(`photos: tracked tree and ${range}, ${failures.length} failing`);
for (const f of failures) console.log(`  ${f}`);
process.exit(failures.length ? 1 : 0);
