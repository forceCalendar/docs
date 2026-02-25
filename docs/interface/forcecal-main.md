---
sidebar_position: 1
title: <forcecal-main>
---

# `<forcecal-main>`

The primary calendar Web Component. Provides a complete calendar UI with month, week, and day views, navigation, event creation, and full CSS token theming.

```html
<forcecal-main
  view="month"
  date="2026-03-01"
  locale="en-US"
  timezone="America/New_York"
  week-starts-on="0"
  height="700px"
></forcecal-main>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `view` | `'month' \| 'week' \| 'day'` | `'month'` | Initial view |
| `date` | `string` (ISO date) | Today | Initial date |
| `locale` | `string` | `'en-US'` | Date formatting locale |
| `timezone` | `string` | Browser timezone | IANA timezone |
| `week-starts-on` | `string` (number) | `'0'` | Week start (0=Sunday) |
| `height` | `string` | `'800px'` | Calendar height (CSS value) |

## JavaScript API

Access methods on the DOM element:

```javascript
const cal = document.querySelector('forcecal-main');

// Event CRUD
cal.addEvent({ id: '1', title: 'Meeting', start: new Date(), end: new Date() });
cal.updateEvent('1', { title: 'Updated' });
cal.deleteEvent('1');
cal.getEvents(); // Returns all events

// Navigation
cal.setView('week');
cal.setDate(new Date('2026-04-01'));
cal.next();
cal.previous();
cal.today();

// Cleanup
cal.destroy();
```

## Custom Events

Listen for events on the element:

```javascript
const cal = document.querySelector('forcecal-main');

cal.addEventListener('calendar-navigate', (e) => {
  console.log(e.detail); // { action: 'next'|'previous'|'today', date, view }
});

cal.addEventListener('calendar-view-change', (e) => {
  console.log(e.detail); // { view: 'month'|'week'|'day' }
});

cal.addEventListener('calendar-date-select', (e) => {
  console.log(e.detail); // { date: Date }
});

// Event lifecycle
cal.addEventListener('calendar-event-add', (e) => {
  console.log(e.detail); // { event }
});

cal.addEventListener('calendar-event-update', (e) => {
  console.log(e.detail); // { event }
});

cal.addEventListener('calendar-event-remove', (e) => {
  console.log(e.detail); // { event }
});

// Confirmed lifecycle (past tense -- fires after internal state updates)
cal.addEventListener('calendar-event-added', (e) => { ... });
cal.addEventListener('calendar-event-updated', (e) => { ... });
cal.addEventListener('calendar-event-deleted', (e) => { ... });
```

| Event | Payload | Description |
|-------|---------|-------------|
| `calendar-navigate` | `{ action, date, view }` | User navigated |
| `calendar-view-change` | `{ view }` | View switched |
| `calendar-date-select` | `{ date }` | Date clicked |
| `calendar-event-add` | `{ event }` | Event being added |
| `calendar-event-update` | `{ event }` | Event being updated |
| `calendar-event-remove` | `{ event }` | Event being removed |
| `calendar-event-added` | `{ event }` | Event confirmed added |
| `calendar-event-updated` | `{ event }` | Event confirmed updated |
| `calendar-event-deleted` | `{ event }` | Event confirmed deleted |

## Shadow DOM

`<forcecal-main>` uses Shadow DOM (`mode: 'open'`). All styles are encapsulated. External styles do not leak in, and component styles do not leak out.

To customize appearance, use CSS custom properties (tokens). See the [Theming](/docs/guides/theming) guide.

## Views

### Month View

Default view. 7-column grid with 6 weeks (configurable via `fixedWeekCount`). Each cell shows the day number and up to 3 event chips. Overflow shows "+N more".

### Week View

7-day time grid with hourly slots. Overlapping events are positioned in columns. All-day events appear in a header row.

### Day View

Single-day time grid with 24 hourly slots. All-day events shown in a header section.
