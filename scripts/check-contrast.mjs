#!/usr/bin/env node
// Checks every approved text pair in DESIGN.md against WCAG 2.1 contrast (>= 4.5:1).
// Colour values come from the DESIGN.md frontmatter; pairs come from the table
// between <!-- contrast-pairs:start --> and <!-- contrast-pairs:end -->.
// The stated ratio in the table must match the computed one to two decimals.
// Usage: node scripts/check-contrast.mjs [path/to/DESIGN.md]
import { readFileSync } from "node:fs";

const MIN = 4.5;
const file = process.argv[2] ?? new URL("../DESIGN.md", import.meta.url);
const text = readFileSync(file, "utf8");

const front = text.match(/^---\n([\s\S]*?)\n---/);
if (!front) throw new Error("DESIGN.md has no frontmatter");
const colorsBlock = front[1].match(/^colors:\n((?: {2}.+\n?)+)/m);
if (!colorsBlock) throw new Error("frontmatter has no colors block");
const colors = Object.fromEntries(
  [...colorsBlock[1].matchAll(/^ {2}([\w-]+):\s*"(#[0-9A-Fa-f]{6})"/gm)].map((m) => [m[1], m[2]]),
);

const table = text.match(/<!-- contrast-pairs:start -->([\s\S]*?)<!-- contrast-pairs:end -->/);
if (!table) throw new Error("DESIGN.md has no contrast-pairs table");
const rows = table[1]
  .split("\n")
  .filter((l) => l.startsWith("|") && !/^\|\s*(Text|---)/.test(l))
  .map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failures = 0;
for (const [fg, bg, stated, use] of rows) {
  const problems = [];
  if (!colors[fg]) problems.push(`unknown token ${fg}`);
  if (!colors[bg]) problems.push(`unknown token ${bg}`);
  let value = NaN;
  if (!problems.length) {
    value = ratio(colors[fg], colors[bg]);
    if (value < MIN) problems.push(`below ${MIN}:1`);
    if (value.toFixed(2) !== stated) problems.push(`table says ${stated}`);
  }
  failures += problems.length ? 1 : 0;
  const shown = Number.isNaN(value) ? "  -  " : value.toFixed(2).padStart(5);
  console.log(`${problems.length ? "FAIL" : "ok  "} ${shown}  ${fg} on ${bg} (${use})${problems.length ? "  <- " + problems.join("; ") : ""}`);
}
console.log(`\n${rows.length} pairs, ${failures} failing`);
process.exit(failures ? 1 : 0);
