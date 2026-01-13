# EventStore

The `EventStore` class manages event storage with optimized indexing for fast queries.

## Import

```javascript
import { EventStore } from '@forcecalendar/core';
```

## Constructor

```javascript
new EventStore(options?)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `options.timezone` | string | 'UTC' | Default timezone for events |

### Example

```javascript
const store = new EventStore({
  timezone: 'America/New_York'
});
```

---

## Properties

### events

```javascript
store.events // Map<string, Event>
```

Primary storage Map. Keys are event IDs, values are Event instances.

### indices

```javascript
store.indices // Object
```

Index structures for fast queries:

```javascript
{
  byDate: Map,      // 'YYYY-MM-DD' -> Set<eventId>
  byMonth: Map,     // 'YYYY-MM' -> Set<eventId>
  recurring: Set,   // Set<eventId>
  byCategory: Map,  // category -> Set<eventId>
  byStatus: Map     // status -> Set<eventId>
}
```

---

## Event Methods

### addEvent()

Add an event to the store.

```javascript
store.addEvent(eventData)
```

**Parameters:**
- `eventData` (object | Event) - Event data or Event instance

**Returns:** `Event` - The stored event

**Example:**

```javascript
const event = store.addEvent({
  id: '1',
  title: 'Meeting',
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T11:00:00')
});
```

---

### updateEvent()

Update an existing event.

```javascript
store.updateEvent(eventId, updates)
```

**Parameters:**
- `eventId` (string) - ID of event to update
- `updates` (object) - Fields to update

**Returns:** `Event` - Updated event

**Example:**

```javascript
store.updateEvent('1', {
  title: 'Updated Title',
  end: new Date('2024-01-15T12:00:00')
});
```

---

### removeEvent()

Remove an event from the store.

```javascript
store.removeEvent(eventId)
```

**Parameters:**
- `eventId` (string) - ID of event to remove

**Returns:** `boolean` - True if removed

---

### getEvent()

Get an event by ID.

```javascript
store.getEvent(eventId)
```

**Parameters:**
- `eventId` (string) - Event ID

**Returns:** `Event | undefined`

---

### hasEvent()

Check if an event exists.

```javascript
store.hasEvent(eventId)
```

**Parameters:**
- `eventId` (string) - Event ID

**Returns:** `boolean`

---

### getAllEvents()

Get all events.

```javascript
store.getAllEvents()
```

**Returns:** `Event[]` - Array of all events

---

### getEventCount()

Get total number of events.

```javascript
store.getEventCount() // number
```

---

### clear()

Remove all events.

```javascript
store.clear()
```

---

## Query Methods

### getEventsForDate()

Get events occurring on a specific date.

```javascript
store.getEventsForDate(date)
```

**Parameters:**
- `date` (Date) - Target date

**Returns:** `Event[]` - Events on that date (sorted by start time)

**How it works:**
1. Converts date to index key (YYYY-MM-DD)
2. Looks up candidates in `byDate` index
3. Also checks `byMonth` for long-running events
4. Filters to events that actually overlap the date
5. Sorts by start time

**Example:**

```javascript
const events = store.getEventsForDate(new Date('2024-01-15'));
events.forEach(e => console.log(e.title));
```

---

### getEventsInRange()

Get events within a date range.

```javascript
store.getEventsInRange(start, end, options?)
```

**Parameters:**
- `start` (Date) - Range start
- `end` (Date) - Range end
- `options.includeRecurring` (boolean) - Expand recurring events (default: true)

**Returns:** `Event[]`

**Example:**

```javascript
const events = store.getEventsInRange(
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
```

---

### getEventsForMonth()

Get events for a specific month.

```javascript
store.getEventsForMonth(year, month)
```

**Parameters:**
- `year` (number) - Year
- `month` (number) - Month (0-11)

**Returns:** `Event[]`

---

### getEventsByCategory()

Get events by category.

```javascript
store.getEventsByCategory(category)
```

**Parameters:**
- `category` (string) - Category name

**Returns:** `Event[]`

**Example:**

```javascript
const meetings = store.getEventsByCategory('meetings');
const holidays = store.getEventsByCategory('holidays');
```

---

### getEventsByStatus()

Get events by status.

```javascript
store.getEventsByStatus(status)
```

**Parameters:**
- `status` (string) - 'confirmed', 'tentative', or 'cancelled'

**Returns:** `Event[]`

---

### getRecurringEvents()

Get all recurring events.

```javascript
store.getRecurringEvents()
```

**Returns:** `Event[]` - All events with `recurring: true`

---

## Batch Operations

### batchAdd()

Add multiple events at once.

```javascript
store.batchAdd(events, options?)
```

**Parameters:**
- `events` (Array) - Array of event data
- `options.enableRollback` (boolean) - Enable rollback on failure

**Returns:** `Event[]` - Array of added events

**Example:**

```javascript
const events = store.batchAdd([
  { id: '1', title: 'Event 1', start: new Date() },
  { id: '2', title: 'Event 2', start: new Date() },
  { id: '3', title: 'Event 3', start: new Date() }
], { enableRollback: true });
```

---

### batchUpdate()

Update multiple events.

```javascript
store.batchUpdate(updates, options?)
```

**Parameters:**
- `updates` (Array) - Array of `{ id, updates }` objects
- `options.enableRollback` (boolean) - Enable rollback on failure

**Returns:** `Event[]` - Updated events

**Example:**

```javascript
store.batchUpdate([
  { id: '1', updates: { title: 'New Title 1' } },
  { id: '2', updates: { title: 'New Title 2' } }
]);
```

---

### batchRemove()

Remove multiple events.

```javascript
store.batchRemove(eventIds)
```

**Parameters:**
- `eventIds` (string[]) - Array of event IDs to remove

**Returns:** `number` - Number of events removed

---

## Transaction Methods

### startBatch()

Start a batch operation for manual control.

```javascript
store.startBatch(options?)
```

**Parameters:**
- `options.enableRollback` (boolean) - Create backup for rollback

---

### commitBatch()

Commit the current batch operation.

```javascript
store.commitBatch()
```

---

### rollbackBatch()

Rollback to state before batch started.

```javascript
store.rollbackBatch()
```

**Example:**

```javascript
store.startBatch({ enableRollback: true });

try {
  store.addEvent({ id: '1', title: 'Event 1', start: new Date() });
  store.addEvent({ id: '2', title: 'Event 2', start: new Date() });

  // Simulate error
  if (someCondition) {
    throw new Error('Validation failed');
  }

  store.commitBatch();
} catch (error) {
  store.rollbackBatch(); // Restores to state before batch
  console.error('Batch failed:', error);
}
```

---

## Event Subscriptions

### on()

Subscribe to store events.

```javascript
store.on(eventName, callback)
```

**Event Types:**

| Event | Payload | Description |
|-------|---------|-------------|
| `add` | `{ event }` | Event added |
| `update` | `{ event, previousEvent }` | Event updated |
| `remove` | `{ event }` | Event removed |
| `clear` | `{}` | Store cleared |

**Returns:** Unsubscribe function

**Example:**

```javascript
const unsubscribe = store.on('add', ({ event }) => {
  console.log(`Added: ${event.title}`);
});

// Later:
unsubscribe();
```

---

### off()

Remove a listener.

```javascript
store.off(eventName, callback)
```

---

## Index Methods

### rebuildIndices()

Rebuild all indices from scratch.

```javascript
store.rebuildIndices()
```

Useful after bulk imports or when indices may be stale.

---

### getIndexStats()

Get index statistics.

```javascript
store.getIndexStats()
```

**Returns:**

```javascript
{
  totalEvents: number,
  byDateKeys: number,
  byMonthKeys: number,
  recurringCount: number,
  categories: string[],
  statuses: string[]
}
```

---

## Utility Methods

### destroy()

Clean up resources.

```javascript
store.destroy()
```

Clears all events, indices, and listeners.

---

### toJSON()

Export store to JSON.

```javascript
store.toJSON()
```

**Returns:** Array of event JSON objects

**Example:**

```javascript
const json = store.toJSON();
localStorage.setItem('events', JSON.stringify(json));
```

---

### fromJSON()

Import events from JSON.

```javascript
store.fromJSON(json, options?)
```

**Parameters:**
- `json` (Array) - Array of event objects
- `options.clear` (boolean) - Clear existing events first (default: true)

**Example:**

```javascript
const saved = localStorage.getItem('events');
if (saved) {
  store.fromJSON(JSON.parse(saved));
}
```

---

## Index Strategy

### How Indexing Works

Events are indexed when added and unindexed when removed:

```javascript
// Adding event for Jan 15, 2024
_indexEvent(event) {
  // Index by date: 'YYYY-MM-DD' -> Set of event IDs
  const dateKey = '2024-01-15';
  this.indices.byDate.get(dateKey).add(event.id);

  // Index by month: 'YYYY-MM' -> Set of event IDs
  const monthKey = '2024-01';
  this.indices.byMonth.get(monthKey).add(event.id);

  // Index recurring events
  if (event.recurring) {
    this.indices.recurring.add(event.id);
  }

  // Index by category
  if (event.category) {
    this.indices.byCategory.get(event.category).add(event.id);
  }
}
```

### Lazy Indexing for Long Events

Events spanning more than 7 days use lazy indexing:

```javascript
// 30-day event: only index first and last weeks
// Days 1-7: indexed in byDate
// Days 8-23: found via byMonth index
// Days 24-30: indexed in byDate
```

### Query Performance

| Query Type | Without Index | With Index |
|------------|---------------|------------|
| By ID | O(1) | O(1) |
| By Date | O(n) | O(1) + filter |
| By Month | O(n) | O(1) + filter |
| By Category | O(n) | O(1) |
| All Events | O(n) | O(n) |

---

## Complete Example

```javascript
import { EventStore } from '@forcecalendar/core';

// Create store
const store = new EventStore({
  timezone: 'America/New_York'
});

// Subscribe to changes
store.on('add', ({ event }) => {
  console.log(`Added: ${event.title}`);
});

store.on('update', ({ event, previousEvent }) => {
  console.log(`Updated: ${previousEvent.title} -> ${event.title}`);
});

// Add events
store.addEvent({
  id: '1',
  title: 'Daily Standup',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:15:00'),
  category: 'meetings',
  recurring: true,
  recurrenceRule: 'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'
});

store.addEvent({
  id: '2',
  title: 'Project Review',
  start: new Date('2024-01-15T14:00:00'),
  end: new Date('2024-01-15T15:00:00'),
  category: 'meetings'
});

store.addEvent({
  id: '3',
  title: 'Company Holiday',
  start: new Date('2024-01-16'),
  allDay: true,
  category: 'holidays'
});

// Query events
const today = store.getEventsForDate(new Date('2024-01-15'));
console.log(`${today.length} events today`);

const meetings = store.getEventsByCategory('meetings');
console.log(`${meetings.length} meetings total`);

const recurring = store.getRecurringEvents();
console.log(`${recurring.length} recurring events`);

// Batch operations
store.batchAdd([
  { id: '4', title: 'Event 4', start: new Date() },
  { id: '5', title: 'Event 5', start: new Date() }
], { enableRollback: true });

// Export/Import
const backup = store.toJSON();
localStorage.setItem('events', JSON.stringify(backup));

// Later...
store.clear();
store.fromJSON(JSON.parse(localStorage.getItem('events')));

// Cleanup
store.destroy();
```
