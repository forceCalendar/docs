/**
 * Docs completeness gate: every class exported from @forcecalendar/core
 * must have a reference page in content/docs/api/. Fails the build when
 * a new export ships without documentation, so the API docs cannot
 * silently drift from the package.
 */
import { readdirSync } from 'fs';
import * as core from '@forcecalendar/core';

const pages = new Set(
  readdirSync('content/docs/api')
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', '').replace(/-/g, ''))
);

const missing = Object.entries(core)
  .filter(([name, value]) => typeof value === 'function' && name !== 'default')
  .map(([name]) => name)
  .filter(name => !pages.has(name.toLowerCase()));

if (missing.length > 0) {
  console.error('API reference pages missing for core exports:');
  for (const name of missing) console.error(`  - ${name}`);
  console.error('\nAdd content/docs/api/<kebab-name>.mdx for each (and list it in meta.json).');
  process.exit(1);
}
console.log(`API coverage OK: every core class export has a reference page (${pages.size} pages).`);
