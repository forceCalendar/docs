import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// Exercise the compiled public route, including its generated MDX index.
const require = createRequire(import.meta.url);
const { routeModule } = require('../.next/server/app/api/search/route.js');
const GET = routeModule.userland.GET;
for (const query of ['recurrence', 'Reader', 'readOnly']) {
  const response = await GET(new Request(`http://localhost/api/search?query=${encodeURIComponent(query)}`));
  assert.equal(response.status, 200);
  const results = await response.json();
  assert.ok(Array.isArray(results) && results.length > 0, `No indexed results for ${query}`);
  assert.ok(results.every(result => result.url.startsWith('/docs')), 'Search must return only public documentation');
}
const empty = await GET(new Request('http://localhost/api/search?query=zzzznonexistentdocumentationtermzzzz'));
assert.deepEqual(await empty.json(), []);
console.log('Compiled docs search passed: indexed queries and no-result behavior.');
