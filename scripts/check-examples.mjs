import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { Calendar, Event, EventStore, RecurrenceEngine, RecurrenceEngineV2, VERSION } from '@forcecalendar/core';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
assert.equal(VERSION, pkg.devDependencies['@forcecalendar/core']);
// Execute the exact complete Core example from Quick Start, in several host zones.
const quickstart = readFileSync('content/docs/quick-start.mdx', 'utf8');
const snippet = quickstart.split('## Headless Core')[1].match(/```js\n([\s\S]*?)```/)[1];
for (const zone of ['UTC', 'America/Los_Angeles', 'Asia/Kolkata', 'Pacific/Auckland']) {
  const run = spawnSync(process.execPath, ['--input-type=module', '-e', snippet], {
    encoding: 'utf8', env: { ...process.env, TZ: zone }, timeout: 10000,
  });
  assert.equal(run.status, 0, `${zone}: ${run.stderr}`);
}
// Execute the published V2 DST example independently on different host zones.
const recurrenceGuide = readFileSync('content/docs/core/recurrence.mdx', 'utf8');
const recurrenceSnippet = recurrenceGuide.split('## V2 timezone contract')[1].match(/```js\n([\s\S]*?)```/)[1];
const expectedStarts = ['2026-03-06T14:00:00.000Z', '2026-03-07T14:00:00.000Z', '2026-03-08T13:00:00.000Z', '2026-03-09T13:00:00.000Z', '2026-03-10T13:00:00.000Z'];
for (const zone of ['UTC', 'America/Los_Angeles', 'Asia/Kolkata', 'Australia/Melbourne']) {
  const check = recurrenceSnippet + '\nimport assert from "node:assert/strict"; assert.deepEqual(occurrences.map(o => o.start.toISOString()), ' + JSON.stringify(expectedStarts) + ');';
  const run = spawnSync(process.execPath, ['--input-type=module', '-e', check], {
    encoding: 'utf8', env: { ...process.env, TZ: zone }, timeout: 10000,
  });
  assert.equal(run.status, 0, `V2 recurrence ${zone}: ${run.stderr}`);
}
const row = { id: 'planning', title: 'Planning', start: new Date(2026, 9, 5, 9), end: new Date(2026, 9, 5, 10) };
const calendar = new Calendar();
try {
  let changes = 0, mutations = 0;
  calendar.on('eventsSet', () => changes++);
  for (const type of ['eventAdd', 'eventUpdate', 'eventRemove']) calendar.on(type, () => mutations++);
  const first = calendar.reconcileEvents([row]);
  assert.equal(first.added.length, 1);
  const saved = calendar.getEvent(row.id);
  const second = calendar.setEvents([row], { reconcile: true });
  assert.equal(second.unchanged.length, 1);
  assert.equal(calendar.getEvent(row.id), saved);
  assert.equal(changes, 2);
  assert.equal(mutations, 0);
  calendar.setEvents([row]);
  assert.notEqual(calendar.getEvent(row.id), saved, 'Core setEvents default replaces instances');
  assert.equal(typeof calendar.getEventsVersion(), 'number');
} finally { calendar.destroy(); }
assert.throws(() => Event.validate(Event.normalize({ title: 'No ID', start: new Date() })), /id/);
const event = new Event({ ...row, timeZone: 'UTC', endTimeZone: 'Asia/Tokyo' });
assert.equal(event.clone().endTimeZone, 'Asia/Tokyo');
assert.equal(event.toObject().endTimeZone, 'Asia/Tokyo');
const allDay = new Event({ ...row, allDay: true, start: new Date(2026, 9, 5), end: new Date(2026, 9, 5) });
assert.equal(allDay.start.getHours(), 0);
assert.equal(allDay.end.getHours(), 23);
assert.equal(allDay.end.getMilliseconds(), 999);
const series = { ...row, start: new Date('2026-10-05T09:00:00Z'), end: new Date('2026-10-05T09:15:00Z'), timeZone: 'UTC', recurring: true, recurrenceRule: 'FREQ=DAILY;COUNT=3' };
for (const engine of [RecurrenceEngine, new RecurrenceEngineV2()]) {
  const two = engine.takeOccurrences(series, 2, { after: series.start, inclusive: true, timezone: 'UTC' });
  assert.equal(two.length, 2);
  assert.equal(two[0].start.toISOString(), series.start.toISOString());
  assert.equal(engine.nextOccurrence(series, series.start, { timezone: 'UTC' }).start.toISOString(), two[1].start.toISOString());
}
const store = new EventStore({ timezone: 'UTC' });
try {
  store.addEvent(series);
  assert.equal(store.takeOccurrences(series.id, 2, { after: series.start, inclusive: true, timezone: 'UTC' }).length, 2);
} finally { store.destroy(); }
console.log(`Example checks passed against published Core ${VERSION}, including four host timezones.`);
