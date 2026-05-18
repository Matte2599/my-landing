#!/usr/bin/env node
/**
 * Post-build anonymizer.
 *
 * Astro emits hoisted-script chunks named like
 *   `Base.astro_astro_type_script_index_1_lang.HASH.js`
 * which leak the framework name to fingerprinting tools (Wappalyzer,
 * BuiltWith, etc). This pass:
 *
 *   1. Renames every file in `dist/static/` whose name matches a
 *      framework regex to a neutral `<contentHash><ext>` name.
 *   2. Rewrites every reference to the old name found in HTML, JS,
 *      CSS, XML and JSON files under `dist/`.
 */
import {
  readdirSync,
  renameSync,
  readFileSync,
  writeFileSync,
  statSync,
  existsSync,
} from 'node:fs';
import { join, extname } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = 'dist';
const STATIC_DIR = join(DIST, 'static');

if (!existsSync(STATIC_DIR)) {
  console.warn(`[anonymize] ${STATIC_DIR} not found — nothing to do`);
  process.exit(0);
}

const FRAMEWORK_RE = /(astro|svelte|react|vue|next|nuxt|remix|qwik|solid)/i;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield p;
  }
}

// 1) Rename revealing static files
const rename = new Map();
for (const name of readdirSync(STATIC_DIR)) {
  if (!FRAMEWORK_RE.test(name)) continue;
  const oldPath = join(STATIC_DIR, name);
  const content = readFileSync(oldPath);
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 10);
  const ext = extname(name) || '';
  const newName = `${hash}${ext}`;
  if (newName === name) continue;
  renameSync(oldPath, join(STATIC_DIR, newName));
  rename.set(name, newName);
}

// 2) Rewrite references + strip framework-specific attribute names
const TEXTUAL_RE = /\.(html|js|css|mjs|cjs|xml|json|txt)$/i;
// Framework-revealing attribute prefixes injected at build time.
// Astro tags every scoped-style element with `data-astro-cid-<hash>`.
const ATTR_SUBSTITUTIONS = [
  [/data-astro-cid-/g, 'data-c-'],
];
let replacements = 0;
let attrRewrites = 0;
for (const file of walk(DIST)) {
  if (!TEXTUAL_RE.test(file)) continue;
  let content = readFileSync(file, 'utf8');
  let dirty = false;
  for (const [oldName, newName] of rename) {
    if (content.includes(oldName)) {
      content = content.split(oldName).join(newName);
      dirty = true;
      replacements++;
    }
  }
  for (const [pattern, repl] of ATTR_SUBSTITUTIONS) {
    if (pattern.test(content)) {
      content = content.replace(pattern, repl);
      dirty = true;
      attrRewrites++;
    }
  }
  if (dirty) writeFileSync(file, content);
}

console.log(
  `[anonymize] renamed ${rename.size} file(s), rewrote ${replacements} reference(s), stripped framework attrs in ${attrRewrites} file(s)`,
);
