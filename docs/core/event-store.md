---
sidebar_position: 3
title: EventStore
sidebar_label: EventStore
description: Indexed event storage with range queries, overlap detection, and change subscriptions.
---

# EventStore

Indexed event storage with efficient range queries, overlap detection, change subscriptions, and batch operations.

```javascript
import { EventStore } from '@forcecalendar/core';

const store = new EventStore({ timezone: 'America/New_York' });
```

## Methods

### Adding Events

```javascript
const event = store.addEvent({
  id: 'evt-1',
  title: 'Meeting',
  start: new Date('2026-03-01T10:00:00'),
  end: new Date('2026-03-01T11:00:00')
});
```

### Updating Events

```javascript
const updated = store.updateEvent('evt-1', { title: 'New Title' });
```

### Removing Events

```javascript
store.removeEvent('evt-1'); // Returns boolean
```

### Querying

```javascript
store.getEvent('evt-1');           // Single event or null
store.getAllEvents();               // All events
store.getEventsForDate(date, tz);  // Events on a specific date
store.getEventsInRange(start, end, inclusive, tz); // Range query

store.queryEvents({
  start: new Date('2026-03-01'),
  end: new Date('2026-03-31'),
  allDay: false,
  status: 'confirmed',
  categories: ['work'],
  sort: 'start'
});
```

### Overlap Detection

```javascript
// Get groups of overlapping events for a date
const groups = store.getOverlapGroups(date, timedOnly);
// [[event1, event2], [event3, event4]]

// Calculate column positions for rendering
const positions = store.calculateEventPositions(overlapGroup);
// Map { 'evt-1' => { column: 0, totalColumns: 2 } }
```

### Bulk Operations

```javascript
store.loadEvents(eventsArray); // Replace all events
store.clear();                 // Remove all events
```

## Change Subscriptions

```javascript
const unsubscribe = store.subscribe((change) => {
  console.log(change.type);    // 'add' | 'update' | 'remove' | 'clear'
  console.log(change.event);   // The affected event
  console.log(change.version); // Incrementing version number
});

// Later:
unsubscribe();
```

### Change Object

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'add' \| 'update' \| 'remove' \| 'clear'` | Change type |
| `event` | `Event?` | Affected event |
| `oldEvent` | `Event?` | Previous state (for updates) |
| `oldEvents` | `Event[]?` | Previous events (for clear) |
| `version` | `number` | Store version number |

## Cleanup

```javascript
store.destroy(); // Clears events, caches, and timers
```
