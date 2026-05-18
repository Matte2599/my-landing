/**
 * Build anonymizer — reusable from both the CLI (`node scripts/anonymize.mjs`)
 * and from an Astro integration via the `astro:build:done` hook.
 *
 * Astro emits hoisted-script chunks named like
 *   `Base.astro_astro_type_script_index_1_lang.HASH.js`
 * and tags every scoped-style element with `data-astro-cid-<hash>`,
 * both of which leak the framework to fingerprinting tools.
 *
 * This pass:
 *   1. Renames every file in `<dist>/static/` whose name matches a
 *      framework regex to a neutral `<contentHash><ext>` name.
 *   2. Rewrites every reference to the old name found in HTML, JS,
 *      CSS, XML and JSON files under `<dist>`.
 *   3. Strips framework-specific attribute prefixes (`data-astro-cid-`).
 */
import {
  readdirSync,
  renameSync,
  readFileSync,
  writeFileSync,
  statSync,
  existsSync,
} from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const FRAMEWORK_RE = /(astro|svelte|react|vue|next|nuxt|remix|qwik|solid)/i;
const TEXTUAL_RE = /\.(html|js|css|mjs|cjs|xml|json|txt)$/i;
const ATTR_SUBSTITUTIONS = [[/data-astro-cid-/g, 'data-c-']];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** Run the anonymizer over a built `dist` directory. */
export function anonymize(distDir) {
  const staticDir = join(distDir, 'static');
  if (!existsSync(staticDir)) {
    console.warn(`[anonymize] ${staticDir} not found — nothing to do`);
    return { renamed: 0, replacements: 0, attrRewrites: 0 };
  }

  // 1) Rename revealing static files
  const rename = new Map();
  for (const name of readdirSync(staticDir)) {
    if (!FRAMEWORK_RE.test(name)) continue;
    const oldPath = join(staticDir, name);
    const content = readFileSync(oldPath);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 10);
    const ext = extname(name) || '';
    const newName = `${hash}${ext}`;
    if (newName === name) continue;
    renameSync(oldPath, join(staticDir, newName));
    rename.set(name, newName);
  }

  // 2) Rewrite references + strip framework attribute names
  let replacements = 0;
  let attrRewrites = 0;
  for (const file of walk(distDir)) {
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

  const summary = {
    renamed: rename.size,
    replacements,
    attrRewrites,
  };
  console.log(
    `[anonymize] renamed ${summary.renamed} file(s), rewrote ${summary.replacements} reference(s), stripped framework attrs in ${summary.attrRewrites} file(s)`,
  );
  return summary;
}

/**
 * Astro integration form — registers `astro:build:done` so the pass
 * runs in-process at the end of every `astro build`, even when an
 * external CI does not chain extra commands after it.
 */
export function anonymizeIntegration() {
  return {
    name: 'site-anonymize',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const distDir = typeof dir === 'string' ? dir : fileURLToPath(dir);
        anonymize(distDir);
      },
    },
  };
}

// CLI entrypoint — `node scripts/anonymize.mjs` from the repo root
if (import.meta.url === `file://${process.argv[1]}`) {
  anonymize(resolve('dist'));
}
