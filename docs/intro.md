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

## The Three Parts

ForceCalendar is split into three independent packages:

### @forcecalendar/core

The engine. Pure JavaScript with zero dependencies and no DOM manipulation. This is where all the business logic lives:

- **Calendar** - Main orchestrator class
- **Event** - Event data model with validation
- **EventStore** - Indexed event storage with O(1) lookups
- **StateManager** - Application state with undo/redo
- **TimezoneManager** - DST-aware timezone conversions
- **RecurrenceEngine** - RFC 5545 RRULE expansion
- **ICSParser** - iCalendar import/export
- **EventSearch** - Full-text search with fuzzy matching

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

## Quick Example

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

## Design Principles

1. **Zero Dependencies** - We use native JavaScript APIs (Date, Intl, Map, Set). No external libraries.

2. **Framework Agnostic** - Core has no DOM code. Use it with React, Vue, Angular, Svelte, or vanilla JS.

3. **Separation of Concerns** - Business logic in core, UI in interface, platform-specific in salesforce.

4. **Performance First** - Spatial indexing, lazy loading, caching, and efficient algorithms throughout.

5. **Standards Compliant** - RFC 5545 for recurrence rules, IANA for timezones, iCalendar for import/export.

## Next Steps

- [Installation](./installation) - Get started with npm
- [Architecture Overview](./architecture/overview) - Understand how it all fits together
- [Calendar API](./core/calendar) - Main entry point documentation
