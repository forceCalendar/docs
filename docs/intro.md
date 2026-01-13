# Introduction

ForceCalendar is a modern, zero-dependency calendar engine designed for performance and flexibility. It provides everything you need to build calendar applications: event management, recurring events, timezone handling, and ICS import/export.

## Why ForceCalendar?

| Feature | ForceCalendar | Others |
|---------|---------------|--------|
| Dependencies | 0 | moment.js, date-fns, etc. |
| Bundle Size | ~25KB | 50-200KB |
| Framework Lock-in | None | Often React/Angular specific |
| Salesforce Ready | Yes | Requires adaptation |
| Timezone Support | Built-in IANA | Often requires plugins |
| Recurrence | Full RFC 5545 | Partial or external lib |

---

## Architecture

ForceCalendar is split into three independent layers:

### @forcecalendar/core

The engine. Pure JavaScript with zero dependencies and no DOM manipulation. This is where all the business logic lives:

| Class | Purpose |
|-------|---------|
| `Calendar` | Main orchestrator class |
| `Event` | Event data model with validation |
| `EventStore` | Indexed event storage with O(1) lookups |
| `StateManager` | Application state with undo/redo |
| `TimezoneManager` | DST-aware timezone conversions |
| `RecurrenceEngine` | RFC 5545 RRULE expansion |
| `ICSParser` | iCalendar import/export |
| `EventSearch` | Full-text search with fuzzy matching |

### @forcecalendar/interface

The UI. Web Components that work in any framework:

- `<force-calendar>` - Full calendar component
- Month, week, day, and list views
- CSS custom properties for theming
- Accessible keyboard navigation

### salesforce/

The Salesforce integration:

- Lightning Web Component wrappers
- Locker Service compatible
- Apex controller for server-side operations
- SLDS styling integration

---

## Core Capabilities

### RFC 5545 Recurrence Rules

Full RRULE support. Daily, weekly, monthly, yearly patterns with complex rules like "2nd Tuesday of every month."

```javascript
calendar.addEvent({
  title: 'Team Standup',
  start: new Date('2024-01-15T09:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'
});
```

### IANA Timezone Handling

DST-aware conversions. Convert between any IANA timezone. Events store both local and UTC times.

```javascript
const calendar = new Calendar({
  timeZone: 'America/New_York'
});

// Convert event to different timezone
const tokyoTime = calendar.timezoneManager.convert(
  event.start,
  'America/New_York',
  'Asia/Tokyo'
);
```

### ICS Import/Export

iCalendar format support. Import from Google Calendar, Outlook. Export for sharing anywhere.

```javascript
import { ICSHandler } from '@forcecalendar/core';

// Import from file
const events = await ICSHandler.importFromFile(file);

// Export to file
ICSHandler.downloadICS(calendar.getAllEvents(), 'my-calendar.ics');
```

### O(1) Fast Lookups

Spatial indexing by date. Events indexed by day, month, category. Handle 10,000+ events smoothly.

### Undo/Redo State History

Built-in undo/redo. Navigate up to 50 state changes. Deep cloning prevents reference bugs.

```javascript
calendar.addEvent({ ... });
calendar.undo();  // Event removed
calendar.redo();  // Event restored
```

### Zero Dependencies

No moment.js. No date-fns. Pure JavaScript using native Date and Intl APIs. Tiny bundle size.

---

## How Data Flows

Unidirectional data flow. Events flow down, changes bubble up.

```
┌─────────────────────────────────────────────────────────┐
│                     Your Application                     │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Calendar                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ EventStore   │  │ StateManager │  │ Timezone     │  │
│  │              │  │              │  │ Manager      │  │
│  │ - events Map │  │ - state      │  │              │  │
│  │ - indices    │  │ - history    │  │ - offsets    │  │
│  │ - listeners  │  │ - listeners  │  │ - DST rules  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────────┐   ┌──────────┐
    │ Event    │   │ Recurrence   │   │ ICSParser│
    │          │   │ Engine       │   │          │
    │ - start  │   │ - expand     │   │ - parse  │
    │ - end    │   │ - RRULE      │   │ - export │
    │ - tz     │   │ - exceptions │   │          │
    └──────────┘   └──────────────┘   └──────────┘
```

---

## Quick Start

### Install

```bash
npm install @forcecalendar/core
```

### Usage

```javascript
import { Calendar } from '@forcecalendar/core';

// Create a calendar instance
const calendar = new Calendar({
  timeZone: 'America/New_York',
  weekStartsOn: 1 // Monday
});

// Add an event
calendar.addEvent({
  id: 'meeting-1',
  title: 'Weekly Standup',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:30:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'
});

// Get events for today
const todayEvents = calendar.getEventsForDate(new Date());

// Subscribe to changes
calendar.on('eventAdd', ({ event }) => {
  console.log('New event:', event.title);
});
```

---

## Design Principles

1. **Zero Dependencies** - We use native JavaScript APIs (Date, Intl, Map, Set). No external libraries.

2. **Framework Agnostic** - Core has no DOM code. Use it with React, Vue, Angular, Svelte, or vanilla JS.

3. **Separation of Concerns** - Business logic in core, UI in interface, platform-specific in salesforce.

4. **Performance First** - Spatial indexing, lazy loading, caching, and efficient algorithms throughout.

5. **Standards Compliant** - RFC 5545 for recurrence rules, IANA for timezones, iCalendar for import/export.

---

## Next Steps

- [Installation](./installation) - Get started with npm
- [Architecture Overview](./architecture/overview) - Deep dive into how it all fits together
- [Calendar API](./core/calendar) - Main entry point documentation
