import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';
import assert from 'node:assert/strict';

const root = 'content/docs';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const files = walk(root);
const pages = files.filter(file => file.endsWith('.mdx'));
const routes = new Map(pages.map(file => [
  '/docs/' + relative(root, file).replace(/\.mdx$/, '').replace(/(^|\/)index$/, '').replace(/\/$/, ''), file,
]));
if (routes.has('/docs/')) { routes.set('/docs', routes.get('/docs/')); routes.delete('/docs/'); }
const errors = [];
const headings = file => new Set([...readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '').matchAll(/^#{1,6} (.+)$/gm)].map(([, title]) => title.toLowerCase().replace(/[`*_]/g, '').replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-')));
for (const file of pages) {
  const text = readFileSync(file, 'utf8');
  if (!/^---\ntitle: .+\ndescription: .+\n---\n/.test(text)) errors.push(`${file}: missing title/description frontmatter`);
  for (const [, target] of text.matchAll(/\]\((\/docs(?:\/[^\s)#?]*)?)(?:#[^\s)]*)?\)/g)) {
    if (!routes.has(target.replace(/\/$/, ''))) errors.push(`${file}: broken internal route ${target}`);
  }
  for (const [, target, fragment] of text.matchAll(/\]\((\/docs(?:\/[^\s)#?]*)?)#([^\s)]+)\)/g)) {
    const linked = routes.get(target.replace(/\/$/, ''));
    if (linked && !headings(linked).has(fragment)) errors.push(`${file}: broken section ${target}#${fragment}`);
  }
  const count = (text.match(/^```/gm) || []).length;
  if (count % 2) errors.push(`${file}: unclosed code fence`);
}
for (const file of files.filter(file => file.endsWith('meta.json'))) {
  const { pages: order } = JSON.parse(readFileSync(file, 'utf8'));
  for (const page of order || []) {
    if (page.startsWith('---') || page === '...') continue;
    const target = join(dirname(file), page);
    if (!existsSync(target + '.mdx') && !existsSync(join(target, 'meta.json'))) errors.push(`${file}: missing navigation target ${page}`);
  }
}
assert.equal(errors.length, 0, errors.join('\n'));
console.log(`Content checks passed: ${pages.length} MDX pages, internal routes and navigation.`);
