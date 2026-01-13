# Core Overview

The Core package (`@forcecalendar/core`) contains all the business logic for calendar operations. It has zero dependencies, no DOM manipulation, and works in any JavaScript environment.

---

## Key Components

### TimezoneManager

Handles all timezone conversions using IANA timezone identifiers. Properly accounts for Daylight Saving Time transitions.

```javascript
const tz = new TimezoneManager('America/New_York');
const offset = tz.getOffset(new Date());
const converted = tz.convert(date, 'America/New_York', 'Asia/Tokyo');
```

### EventStore

Provides indexed event storage with O(1) lookups using spatial indexing by date. Events are indexed by day, month, and category for fast retrieval even with 10,000+ events.

```javascript
const store = new EventStore();
store.add(event);
const events = store.getByDateRange(start, end);
```

### RecurrenceEngine

Implements RFC 5545 RRULE specification for recurring events. Supports daily, weekly, monthly, and yearly patterns with complex rules like "2nd Tuesday of every month."

```javascript
const engine = new RecurrenceEngine();
const occurrences = engine.expand(event, startDate, endDate);
```

---

## Basic Usage

```javascript
import { Calendar } from '@forcecalendar/core';

// Create a calendar instance
const calendar = new Calendar({
  timeZone: 'UTC'
});

// Add an event
calendar.addEvent({
  title: 'Team Meeting',
  start: new Date()
});

// Retrieve events
const events = calendar.getEventsForDate(new Date());
```

---

## Architecture

The Core is designed with separation of concerns:

| Component | Responsibility |
|-----------|----------------|
| `Calendar` | Main orchestrator, public API |
| `EventStore` | Event storage and indexing |
| `StateManager` | State management with undo/redo |
| `TimezoneManager` | Timezone conversions |
| `RecurrenceEngine` | RRULE expansion |
| `ICSParser` | iCalendar import/export |
| `EventSearch` | Full-text search |

See the individual API reference pages for detailed documentation on each component.
