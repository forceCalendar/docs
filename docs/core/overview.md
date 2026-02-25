---
sidebar_position: 0
title: Core Overview
sidebar_label: Overview
description: Overview of the @forcecalendar/core headless calendar engine.
---

# Core Overview

The Core package (`@forcecalendar/core`) contains all the business logic for calendar operations. It has zero dependencies, no DOM manipulation, and works in any JavaScript environment.

## Key Components

### Calendar

The main orchestrator. Manages events, navigation, views, timezones, and plugins.

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  view: 'month',
  timeZone: 'America/New_York'
});

calendar.addEvent({
  id: '1',
  title: 'Team Meeting',
  start: new Date('2026-03-01T10:00:00'),
  end: new Date('2026-03-01T11:00:00')
});

const events = calendar.getEventsForDate(new Date());
```

### TimezoneManager

Handles all timezone conversions using IANA timezone identifiers. TimezoneManager is a singleton accessed internally by Calendar. You interact with it through Calendar methods.

```javascript
const calendar = new Calendar({ timeZone: 'America/New_York' });

const converted = calendar.convertTimezone(
  new Date(),
  'America/New_York',
  'Asia/Tokyo'
);
```

### EventStore

Provides indexed event storage with efficient range queries. Events are indexed by day, month, and category for fast retrieval even with 10,000+ events.

```javascript
import { EventStore } from '@forcecalendar/core';

const store = new EventStore();
store.addEvent({ id: '1', title: 'Meeting', start: new Date(), end: new Date() });
const events = store.getEventsInRange(startDate, endDate);
```

### RecurrenceEngine

Implements RFC 5545 RRULE specification for recurring events. Supports daily, weekly, monthly, and yearly patterns with complex rules like "2nd Tuesday of every month."

```javascript
import { RecurrenceEngineV2 } from '@forcecalendar/core';

const engine = new RecurrenceEngineV2();
const occurrences = engine.expand(event, startDate, endDate);
```

## Architecture

The Core is designed with separation of concerns:

| Component | Responsibility |
|-----------|----------------|
| `Calendar` | Main orchestrator, public API |
| `EventStore` | Event storage and indexing |
| `StateManager` | State management with undo/redo |
| `TimezoneManager` | Timezone conversions |
| `RecurrenceEngine` | RRULE expansion |
| `ICSParser` / `ICSHandler` | iCalendar import/export |
| `EventSearch` | Full-text search |

See the individual API reference pages for detailed documentation on each component.
