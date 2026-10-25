#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// The colour themes (README.md), read from their files: they are the current
// build of build.js; each mode of each file sets every colour property and its
// color-scheme; each prints as luccet.css prints; every text colour reaches its
// family's contrast (4.5:1, 7:1 for high-contrast) against what it is drawn
// on, and every code colour too on the code background, with 3:1
// (high-contrast 4.5:1) on a highlighted line; a control's border is 3:1
// against the page; text in a highlight is the text colour, so muted text and
// links on a highlight are the checked fg-on-mark pair; each file answers
// prefers-contrast and forced-colors as luccet.css does (engine/luccet.css);
// and README.md lists every file.
//
//   node test.js
'use strict';

const fs = require('fs');
const path = require('path');
const T = require('./build');

const ROOT = __dirname;
const DIR = ROOT;

let failed = 0;
const results = [];
function test(name, fn) {
  const problems = [];
  try {
    fn(problems);
  } catch (e) {
    problems.push((e && e.message) || String(e));
  }
  if (problems.length) failed++;
  results.push(problems.length ? `✗ ${name}\n  ${problems.join('\n  ')}` : `✓ ${name}`);
}

// A file's modes: {light|dark|auto-light|auto-dark|print: {scheme, colours}}.
const props = (block) => Object.fromEntries([...block.matchAll(/(?<![\w-])(--t-[a-z-]+|color-scheme):\s*([^;]+);/g)].map((m) => [m[1].replace(/^--t-/, ''), m[2].trim()]));
function modes(css) {
  const at = (re) => {
    const m = re.exec(css);
    return m ? props(css.slice(m.index, css.indexOf('}', css.indexOf(':root {', m.index)))) : null;
  };
  const top = props(css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {'))));
  const dark = at(/@media \(prefers-color-scheme: dark\)/);
  const print = at(/@media print/);
  if (dark) return { 'auto-light': top, 'auto-dark': { ...top, ...dark }, print };
  return { [top['color-scheme']]: top, print };
}

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((n) => n.endsWith('.css')).sort() : [];
const family = (file) => T.FAMILIES.find((f) => file === `${f.name}.css` || file === `${f.name}-light.css` || file === `${f.name}-dark.css`);

test('the stylesheets are the current build of build.js', (p) => {
  const built = T.build();
  for (const n of Object.keys(built)) {
    if (!files.includes(n)) p.push(`${n} is missing: run node build.js`);
    else if (fs.readFileSync(path.join(DIR, n), 'utf8') !== built[n]) p.push(`${n} is stale: run node build.js`);
  }
  for (const n of files) if (!(n in built)) p.push(`${n} is not built by build.js`);
});

test('every mode sets every colour property and its color-scheme; every file prints as luccet.css does', (p) => {
  const print = T.printPalette();
  for (const n of files) {
    const m = modes(fs.readFileSync(path.join(DIR, n), 'utf8'));
    const want = n.endsWith('-light.css') ? ['light'] : n.endsWith('-dark.css') ? ['dark'] : null;
    const got = Object.keys(m).filter((k) => k !== 'print');
    if (want && got.join() !== want.join()) p.push(`${n}: modes ${got.join(', ')}, want ${want.join(', ')}`);
    if (!want && !(got.join() === 'auto-light,auto-dark' || got.join() === 'light' || got.join() === 'dark')) p.push(`${n}: modes ${got.join(', ')}`);
    if (m['auto-light'] && m['auto-light']['color-scheme'] !== 'light dark') p.push(`${n}: color-scheme ${m['auto-light']['color-scheme']}, want "light dark"`);
    for (const [mode, c] of Object.entries(m)) {
      const missing = T.COLOURS.filter((k) => !/^#[0-9a-f]{3}([0-9a-f]{3})?$/.test(c[k] || ''));
      if (missing.length) p.push(`${n} (${mode}): no colour for ${missing.join(', ')}`);
    }
    if (!m.print) p.push(`${n}: no print block`);
    else {
      if (m.print['color-scheme'] !== 'light') p.push(`${n}: prints with color-scheme ${m.print['color-scheme']}`);
      for (const k of T.COLOURS) if (m.print[k] !== print[k]) p.push(`${n}: prints --t-${k} ${m.print[k]}, luccet.css ${print[k]}`);
    }
  }
});

// What each colour is drawn on: text pairs need the family's contrast; the
// rest only need to be told apart from the page.
const TEXT = [
  ['fg', 'bg'], ['fg', 'soft'], ['fg', 'mark'],
  ['muted', 'bg'], ['muted', 'soft'],
  ['link', 'bg'], ['link', 'soft'],
  ['error', 'error-bg'], ['error', 'bg'],
  ['warn', 'bg'],
];
const APART = [['line', 'bg', 1.15], ['line-strong', 'bg', 3], ['soft', 'bg', 1.03], ['mark', 'bg', 1.05], ['error-bg', 'bg', 1.05]];
const expand = (h) => (h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h);
function pairs(name, c, min, p) {
  const x = Object.fromEntries(T.COLOURS.map((k) => [k, expand(c[k])]));
  const text = [...TEXT.map(([a, b]) => [a, b, min]), ...T.CODE.flatMap((k) => [[`code-${k}`, 'soft', min], [`code-${k}`, 'mark', T.onMark(min)]])];
  for (const [a, b, least] of text) {
    const r = T.contrast(x[a], x[b]);
    if (r < least) p.push(`${name}: --t-${a} on --t-${b} is ${r.toFixed(2)}:1, under ${least}:1`);
  }
  for (const [a, b, least] of APART) {
    const r = T.contrast(x[a], x[b]);
    if (r < least) p.push(`${name}: --t-${a} and --t-${b} are ${r.toFixed(2)}:1 apart, under ${least}:1`);
  }
}

test('every text and code colour reaches its contrast against what it is drawn on (4.5:1, high-contrast 7:1; code on a highlighted line 3:1, high-contrast 4.5:1)', (p) => {
  for (const n of files) {
    const f = family(n);
    const min = (f && f.min) || 4.5;
    for (const [mode, c] of Object.entries(modes(fs.readFileSync(path.join(DIR, n), 'utf8')))) if (mode !== 'print') pairs(`${n} (${mode})`, c, min, p);
  }
});

// The themes copy two blocks of the engine's stylesheet; the build reads them
// from engine/luccet.css and throws when one is missing.
test("engine/luccet.css's forced-colors block gives each page colour a system colour", (p) => {
  const forced = T.forcedColors();
  for (const k of ['bg', 'fg', 'muted', 'line', 'line-strong', 'soft', 'link', 'mark']) if (!new RegExp(`--t-${k}: [A-Z][A-Za-z]+;`).test(forced)) p.push(`forced-colors gives --t-${k} no system colour`);
});

test('every theme answers prefers-contrast (muted as the text colour, rules as the strong line) and forced-colors as luccet.css does', (p) => {
  const forced = T.forcedColors();
  for (const n of files) {
    const css = fs.readFileSync(path.join(DIR, n), 'utf8');
    if (!css.includes(forced)) p.push(`${n}: no forced-colors block, or not luccet.css's`);
    const m = modes(css);
    const more = css.slice(css.indexOf('@media (prefers-contrast: more)'));
    if (!more.startsWith('@media')) {
      p.push(`${n}: no prefers-contrast block`);
      continue;
    }
    for (const [mode, c] of Object.entries(m)) {
      if (mode === 'print') continue;
      const want = `:root { --t-muted: ${c.fg}; --t-line: ${c['line-strong']}; }`;
      if (!more.includes(want)) p.push(`${n} (${mode}): prefers-contrast lacks ${want}`);
    }
  }
});

test('README.md lists every file', (p) => {
  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
  for (const n of files) if (!readme.includes(`](${n})`)) p.push(`${n} is not linked from README.md's table: run node build.js`);
});

console.log(results.join('\n'));
console.log(`\n${results.length - failed}/${results.length} theme checks pass; ${files.length} files`);
process.exit(failed ? 1 : 0);
