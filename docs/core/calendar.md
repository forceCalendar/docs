---
sidebar_position: 1
title: Calendar
---

# Calendar

The main entry point for the core engine. Orchestrates events, state, navigation, timezones, and plugins.

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  view: 'month',
  date: new Date(),
  weekStartsOn: 0,
  locale: 'en-US',
  timeZone: 'America/New_York',
  showWeekNumbers: false,
  showWeekends: true,
  fixedWeekCount: true,
  businessHours: { start: '09:00', end: '17:00' },
  events: []
});
```

## Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `view` | `'month' \| 'week' \| 'day' \| 'list'` | `'month'` | Initial view |
| `date` | `Date` | `new Date()` | Initial date to display |
| `weekStartsOn` | `number` | `0` | Week start day (0=Sunday, 6=Saturday) |
| `locale` | `string` | `'en-US'` | Locale for date formatting |
| `timeZone` | `string` | System timezone | IANA timezone identifier |
| `showWeekNumbers` | `boolean` | `false` | Display week numbers |
| `showWeekends` | `boolean` | `true` | Show weekend columns |
| `fixedWeekCount` | `boolean` | `true` | Always show 6 weeks in month view |
| `businessHours` | `{ start: string, end: string }` | `{ start: '09:00', end: '17:00' }` | Business hours (HH:MM format) |
| `events` | `EventData[]` | `[]` | Initial events to load |

## Navigation

```javascript
calendar.setView('week');           // Switch to week view
calendar.setView('day', new Date()); // Switch view and navigate

calendar.next();                    // Next period (month/week/day)
calendar.previous();                // Previous period
calendar.today();                   // Navigate to today
calendar.goToDate(new Date('2026-06-15')); // Navigate to specific date

calendar.getView();                 // Returns current view type
calendar.getCurrentDate();          // Returns current date (cloned)
```

## Event CRUD

```javascript
// Add an event
const event = calendar.addEvent({
  id: 'evt-1',
  title: 'Meeting',
  start: new Date('2026-03-01T10:00:00'),
  end: new Date('2026-03-01T11:00:00'),
  color: '#2563EB',
  description: 'Weekly sync',
  location: 'Room 301'
});

// Update an event
calendar.updateEvent('evt-1', {
  title: 'Updated Meeting',
  end: new Date('2026-03-01T11:30:00')
});

// Remove an event
calendar.removeEvent('evt-1'); // Returns boolean
calendar.deleteEvent('evt-1'); // Alias for removeEvent

// Get events
calendar.getEvent('evt-1');        // Single event or null
calendar.getEvents();              // All events
calendar.setEvents([...]);         // Replace all events
```

## Querying Events

```javascript
// Events for a specific date
calendar.getEventsForDate(new Date('2026-03-01'));

// Events in a date range
calendar.getEventsInRange(
  new Date('2026-03-01'),
  new Date('2026-03-31')
);

// Advanced query with filters
calendar.queryEvents({
  start: new Date('2026-03-01'),
  end: new Date('2026-03-31'),
  allDay: false,
  recurring: true,
  status: 'confirmed',
  categories: ['work', 'meetings'],
  matchAllCategories: false,
  hasAttendees: true,
  organizerEmail: 'alice@example.com',
  sort: 'start'
});
```

## View Data

`getViewData()` returns a structured object for rendering the current view. The shape depends on the active view type.

```javascript
const data = calendar.getViewData();
```

### Month View Data

```javascript
{
  type: 'month',
  year: 2026,
  month: 2,           // 0-indexed (March)
  monthName: 'March',
  startDate: Date,     // First visible date
  endDate: Date,       // Last visible date
  weeks: [
    {
      weekNumber: 10,
      days: [
        {
          date: Date,
          dayOfMonth: 1,
          isCurrentMonth: true,
          isToday: false,
          isWeekend: false,
          events: [Event, ...]
        }
      ]
    }
  ]
}
```

### Week View Data

```javascript
{
  type: 'week',
  weekNumber: 10,
  startDate: Date,
  endDate: Date,
  days: [
    {
      date: Date,
      dayOfMonth: 1,
      dayOfWeek: 0,
      dayName: 'Sunday',
      isToday: false,
      isWeekend: true,
      events: [Event, ...],
      overlapGroups: [[Event, Event], ...],
      getEventPositions: (events) => Map
    }
  ]
}
```

### Day View Data

```javascript
{
  type: 'day',
  date: Date,
  dayName: 'Monday',
  isToday: true,
  allDayEvents: [Event, ...],
  hours: [
    { hour: 0, time: '12:00 AM', events: [] },
    { hour: 9, time: '9:00 AM', events: [Event, ...] },
    // ... 24 slots
  ]
}
```

### List View Data

```javascript
{
  type: 'list',
  startDate: Date,
  endDate: Date,        // 30 days from start
  totalEvents: 42,
  days: [
    {
      date: Date,
      dayName: 'Monday',
      isToday: false,
      events: [Event, ...]
    }
  ]
}
```

## Selection

```javascript
calendar.selectEvent('evt-1');
calendar.clearEventSelection();

calendar.selectDate(new Date('2026-03-15'));
calendar.clearDateSelection();
```

## Timezones

```javascript
calendar.setTimezone('America/Los_Angeles');
calendar.getTimezone(); // 'America/Los_Angeles'

// Convert between timezones
const converted = calendar.convertTimezone(
  new Date(),
  'America/New_York',
  'Europe/London'
);

// Convert to/from calendar timezone
calendar.toCalendarTimezone(date, 'UTC');
calendar.fromCalendarTimezone(date, 'Asia/Tokyo');

// Format in a timezone
calendar.formatInTimezone(new Date(), 'Europe/Berlin', {
  dateStyle: 'full',
  timeStyle: 'short'
});

// Get timezone list with offsets
const timezones = calendar.getTimezones();
// [{ value: 'America/New_York', label: 'Eastern Time', offset: '-05:00' }, ...]
```

## Configuration

```javascript
calendar.setLocale('de-DE');
calendar.setWeekStartsOn(1); // Monday
```

## Overlap Detection

```javascript
// Get groups of overlapping events for a date
const groups = calendar.getOverlapGroups(new Date(), true);

// Calculate column positions for overlapping events
const positions = calendar.calculateEventPositions(events);
// Map { 'evt-1' => { column: 0, totalColumns: 2 }, ... }
```

## Plugins

```javascript
const myPlugin = {
  install(calendar) {
    calendar.on('eventAdd', ({ event }) => {
      console.log('Event added:', event.title);
    });
  },
  uninstall(calendar) {
    // cleanup
  }
};

calendar.use(myPlugin);
```

## Events

Subscribe to calendar events using `on()`. Returns an unsubscribe function.

```javascript
const unsub = calendar.on('eventAdd', ({ event }) => {
  console.log('Added:', event.title);
});

// Later: unsub();
```

| Event | Payload | When |
|-------|---------|------|
| `viewChange` | `{ view, date }` | View type changed |
| `navigate` | `{ direction, date, view }` | Navigation occurred |
| `eventAdd` | `{ event }` | Event added |
| `eventUpdate` | `{ event, oldEvent }` | Event updated |
| `eventRemove` | `{ event }` | Event removed |
| `eventsSet` | `{ events }` | All events replaced |
| `eventSelect` | `{ event }` | Event selected |
| `eventDeselect` | `{ eventId }` | Event deselected |
| `dateSelect` | `{ date }` | Date selected |
| `dateDeselect` | `{ date }` | Date deselected |
| `stateChange` | `{ newState, oldState }` | Any state change |
| `eventStoreChange` | `EventStoreChange` | Store-level change |
| `timezoneChange` | `{ timezone, previousTimezone }` | Timezone changed |
| `localeChange` | `{ locale }` | Locale changed |
| `weekStartsOnChange` | `{ weekStartsOn }` | Week start changed |
| `destroy` | — | Calendar destroyed |

## Cleanup

```javascript
calendar.destroy(); // Removes all listeners, clears stores, uninstalls plugins
```
