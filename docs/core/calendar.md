# Calendar

The `Calendar` class is the main entry point and orchestrator for ForceCalendar Core. It coordinates all calendar operations and provides a unified API.

## Import

```javascript
import { Calendar } from '@forcecalendar/core';

// Or as default export
import Calendar from '@forcecalendar/core';
```

## Constructor

```javascript
new Calendar(config?)
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `config.timeZone` | string | System TZ | IANA timezone identifier |
| `config.weekStartsOn` | number | 0 | Week start day (0=Sunday, 1=Monday) |
| `config.locale` | string | 'en-US' | Locale for formatting |
| `config.hourFormat` | string | '12h' | Hour format ('12h' or '24h') |
| `config.showWeekNumbers` | boolean | false | Display week numbers |
| `config.showWeekends` | boolean | true | Include weekends in views |
| `config.businessHours` | object | {start:'09:00',end:'17:00'} | Business hours range |

### Example

```javascript
const calendar = new Calendar({
  timeZone: 'America/New_York',
  weekStartsOn: 1,  // Monday
  locale: 'en-US',
  hourFormat: '24h',
  showWeekNumbers: true,
  businessHours: {
    start: '08:00',
    end: '18:00'
  }
});
```

---

## Properties

### eventStore

```javascript
calendar.eventStore // EventStore
```

The underlying EventStore instance. Direct access for advanced operations.

### state

```javascript
calendar.state // StateManager
```

The StateManager instance for UI state.

### timezoneManager

```javascript
calendar.timezoneManager // TimezoneManager
```

The shared TimezoneManager singleton.

---

## Event Methods

### addEvent()

Add a new event to the calendar.

```javascript
calendar.addEvent(eventData)
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `title` | string | Yes | Event title |
| `start` | Date | Yes | Start date/time |
| `end` | Date | No | End date/time (defaults to start + 1 hour) |
| `allDay` | boolean | No | All-day event flag |
| `description` | string | No | Event description |
| `location` | string | No | Event location |
| `category` | string | No | Event category |
| `status` | string | No | 'confirmed', 'tentative', 'cancelled' |
| `showAs` | string | No | 'busy', 'free' |
| `recurring` | boolean | No | Is recurring event |
| `recurrenceRule` | string | No | RRULE string |
| `timeZone` | string | No | Event timezone (defaults to calendar TZ) |
| `attendees` | array | No | List of attendees |
| `reminders` | array | No | List of reminders |

**Returns:** `Event` - The created event instance

**Example:**

```javascript
// Simple event
calendar.addEvent({
  id: 'event-1',
  title: 'Team Meeting',
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T11:00:00')
});

// All-day event
calendar.addEvent({
  id: 'holiday-1',
  title: 'Company Holiday',
  start: new Date('2024-12-25'),
  allDay: true
});

// Recurring event
calendar.addEvent({
  id: 'standup-1',
  title: 'Daily Standup',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:15:00'),
  recurring: true,
  recurrenceRule: 'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'
});
```

---

### updateEvent()

Update an existing event.

```javascript
calendar.updateEvent(eventId, updates)
```

**Parameters:**
- `eventId` (string) - ID of event to update
- `updates` (object) - Fields to update

**Returns:** `Event` - The updated event

**Example:**

```javascript
calendar.updateEvent('event-1', {
  title: 'Updated Meeting Title',
  end: new Date('2024-01-15T12:00:00')
});
```

---

### removeEvent()

Remove an event from the calendar.

```javascript
calendar.removeEvent(eventId)
```

**Parameters:**
- `eventId` (string) - ID of event to remove

**Returns:** `boolean` - True if event was removed

**Example:**

```javascript
calendar.removeEvent('event-1');
```

---

### getEvent()

Get an event by ID.

```javascript
calendar.getEvent(eventId)
```

**Parameters:**
- `eventId` (string) - Event ID

**Returns:** `Event | null`

**Example:**

```javascript
const event = calendar.getEvent('event-1');
if (event) {
  console.log(event.title);
}
```

---

### getAllEvents()

Get all events in the calendar.

```javascript
calendar.getAllEvents()
```

**Returns:** `Event[]` - Array of all events

---

## Query Methods

### getEventsForDate()

Get all events occurring on a specific date.

```javascript
calendar.getEventsForDate(date)
```

**Parameters:**
- `date` (Date) - The date to query

**Returns:** `Event[]` - Events on that date (sorted by start time)

**Example:**

```javascript
const today = new Date();
const events = calendar.getEventsForDate(today);
events.forEach(event => {
  console.log(`${event.title} at ${event.start}`);
});
```

---

### getEventsInRange()

Get events within a date range.

```javascript
calendar.getEventsInRange(startDate, endDate, options?)
```

**Parameters:**
- `startDate` (Date) - Range start
- `endDate` (Date) - Range end
- `options.includeRecurring` (boolean) - Expand recurring events (default: true)

**Returns:** `Event[]` - Events in range

**Example:**

```javascript
const startOfMonth = new Date('2024-01-01');
const endOfMonth = new Date('2024-01-31');
const events = calendar.getEventsInRange(startOfMonth, endOfMonth);
```

---

### getEventsForMonth()

Get all events for a specific month.

```javascript
calendar.getEventsForMonth(year, month)
```

**Parameters:**
- `year` (number) - Year
- `month` (number) - Month (0-11)

**Returns:** `Event[]`

**Example:**

```javascript
const january2024Events = calendar.getEventsForMonth(2024, 0);
```

---

### getEventsForWeek()

Get events for a week starting from a date.

```javascript
calendar.getEventsForWeek(date)
```

**Parameters:**
- `date` (Date) - Any date in the target week

**Returns:** `Event[]`

---

## View Methods

### getMonthView()

Generate month view data.

```javascript
calendar.getMonthView(date?)
```

**Parameters:**
- `date` (Date) - Target month (defaults to current date)

**Returns:**

```javascript
{
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          date: Date,
          isToday: boolean,
          isCurrentMonth: boolean,
          isWeekend: boolean,
          events: Event[]
        },
        // ... 7 days
      ]
    },
    // ... 4-6 weeks
  ],
  month: number,
  year: number
}
```

**Example:**

```javascript
const monthData = calendar.getMonthView(new Date('2024-01-15'));

monthData.weeks.forEach(week => {
  week.days.forEach(day => {
    console.log(`${day.date}: ${day.events.length} events`);
  });
});
```

---

### getWeekView()

Generate week view data.

```javascript
calendar.getWeekView(date?)
```

**Returns:**

```javascript
{
  days: [
    {
      date: Date,
      isToday: boolean,
      events: Event[],
      allDayEvents: Event[],
      timedEvents: Event[]
    },
    // ... 7 days
  ],
  weekNumber: number
}
```

---

### getDayView()

Generate day view data.

```javascript
calendar.getDayView(date?)
```

**Returns:**

```javascript
{
  date: Date,
  isToday: boolean,
  events: Event[],
  allDayEvents: Event[],
  timedEvents: Event[],
  hours: [
    { hour: 0, events: Event[] },
    // ... 24 hours
  ]
}
```

---

## Navigation Methods

### navigate()

Navigate to a specific date.

```javascript
calendar.navigate(date)
```

**Example:**

```javascript
calendar.navigate(new Date('2024-06-15'));
```

---

### navigateToday()

Navigate to today's date.

```javascript
calendar.navigateToday()
```

---

### navigateNext()

Navigate to next period (based on current view).

```javascript
calendar.navigateNext()
```

- In month view: next month
- In week view: next week
- In day view: next day

---

### navigatePrevious()

Navigate to previous period.

```javascript
calendar.navigatePrevious()
```

---

## State Methods

### setView()

Set the current view type.

```javascript
calendar.setView(view)
```

**Parameters:**
- `view` (string) - 'month', 'week', 'day', or 'list'

**Example:**

```javascript
calendar.setView('week');
```

---

### getView()

Get the current view type.

```javascript
calendar.getView() // Returns: 'month', 'week', 'day', or 'list'
```

---

### getCurrentDate()

Get the currently focused date.

```javascript
calendar.getCurrentDate() // Returns: Date
```

---

## Event Subscriptions

### on()

Subscribe to calendar events.

```javascript
calendar.on(eventName, callback)
```

**Event Types:**

| Event | Payload | Description |
|-------|---------|-------------|
| `eventAdd` | `{ event }` | Event added |
| `eventUpdate` | `{ event, previousEvent }` | Event updated |
| `eventRemove` | `{ event }` | Event removed |
| `viewChange` | `{ view, previousView }` | View changed |
| `navigate` | `{ date, previousDate }` | Navigation occurred |
| `stateChange` | `{ state, previousState }` | Any state change |

**Returns:** Unsubscribe function

**Example:**

```javascript
const unsubscribe = calendar.on('eventAdd', ({ event }) => {
  console.log(`New event: ${event.title}`);
});

// Later, to stop listening:
unsubscribe();
```

---

### off()

Remove an event listener.

```javascript
calendar.off(eventName, callback)
```

---

## ICS Methods

### importICS()

Import events from ICS string.

```javascript
calendar.importICS(icsString)
```

**Parameters:**
- `icsString` (string) - ICS formatted calendar data

**Returns:** `Event[]` - Array of imported events

**Example:**

```javascript
const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:meeting-1
SUMMARY:Team Meeting
DTSTART:20240115T100000
DTEND:20240115T110000
END:VEVENT
END:VCALENDAR`;

const imported = calendar.importICS(icsContent);
console.log(`Imported ${imported.length} events`);
```

---

### exportICS()

Export events to ICS format.

```javascript
calendar.exportICS(events?, calendarName?)
```

**Parameters:**
- `events` (Event[]) - Events to export (defaults to all)
- `calendarName` (string) - Calendar name in export

**Returns:** `string` - ICS formatted string

**Example:**

```javascript
const icsString = calendar.exportICS(
  calendar.getAllEvents(),
  'My Calendar'
);

// Download or save the string
```

---

## Utility Methods

### destroy()

Clean up resources. Call when done with the calendar.

```javascript
calendar.destroy()
```

**Example:**

```javascript
// In a React component's cleanup
useEffect(() => {
  const calendar = new Calendar();
  return () => calendar.destroy();
}, []);
```

---

### getTimezone()

Get the calendar's timezone.

```javascript
calendar.getTimezone() // Returns: string (IANA identifier)
```

---

### setTimezone()

Change the calendar's timezone.

```javascript
calendar.setTimezone(timezone)
```

**Parameters:**
- `timezone` (string) - IANA timezone identifier

**Example:**

```javascript
calendar.setTimezone('Europe/London');
```

---

## Complete Example

```javascript
import { Calendar } from '@forcecalendar/core';

// Create calendar
const calendar = new Calendar({
  timeZone: 'America/New_York',
  weekStartsOn: 1
});

// Subscribe to events
calendar.on('eventAdd', ({ event }) => {
  console.log(`Added: ${event.title}`);
});

calendar.on('eventUpdate', ({ event, previousEvent }) => {
  console.log(`Updated: ${previousEvent.title} -> ${event.title}`);
});

// Add events
calendar.addEvent({
  id: '1',
  title: 'Morning Meeting',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

calendar.addEvent({
  id: '2',
  title: 'Weekly Sync',
  start: new Date('2024-01-15T14:00:00'),
  end: new Date('2024-01-15T15:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO'
});

// Query events
const todayEvents = calendar.getEventsForDate(new Date());
console.log(`${todayEvents.length} events today`);

// Generate view data
const monthView = calendar.getMonthView();
monthView.weeks.forEach(week => {
  const eventCount = week.days.reduce((sum, day) => sum + day.events.length, 0);
  console.log(`Week ${week.weekNumber}: ${eventCount} events`);
});

// Navigate
calendar.setView('week');
calendar.navigateNext();

// Export
const ics = calendar.exportICS();
console.log(ics);

// Cleanup
calendar.destroy();
```
