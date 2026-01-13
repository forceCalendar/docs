# Event

The `Event` class represents a calendar event with validation, normalization, and timezone support.

## Import

```javascript
import { Event } from '@forcecalendar/core';
```

## Constructor

```javascript
new Event(data)
```

Creates a new Event instance with validation.

### Parameters

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | string | Yes | - | Unique identifier |
| `title` | string | Yes | - | Event title |
| `start` | Date | Yes | - | Start date/time |
| `end` | Date | No | start + 1 hour | End date/time |
| `allDay` | boolean | No | false | All-day event |
| `description` | string | No | '' | Description |
| `location` | string | No | '' | Location |
| `category` | string | No | '' | Category |
| `status` | string | No | 'confirmed' | 'confirmed', 'tentative', 'cancelled' |
| `showAs` | string | No | 'busy' | 'busy', 'free' |
| `recurring` | boolean | No | false | Is recurring |
| `recurrenceRule` | string | No | null | RRULE string |
| `timeZone` | string | No | system TZ | Event timezone |
| `attendees` | array | No | [] | Attendee list |
| `reminders` | array | No | [] | Reminder list |
| `metadata` | object | No | {} | Custom data |

### Example

```javascript
const event = new Event({
  id: 'meeting-1',
  title: 'Team Standup',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:30:00'),
  location: 'Conference Room A',
  category: 'meetings',
  attendees: [
    { email: 'john@example.com', name: 'John' },
    { email: 'jane@example.com', name: 'Jane' }
  ],
  reminders: [
    { minutes: 15, type: 'popup' }
  ]
});
```

---

## Properties

### Core Properties

```javascript
event.id          // string - Unique identifier
event.title       // string - Event title
event.start       // Date - Start date/time (local)
event.end         // Date - End date/time (local)
event.startUTC    // Date - Start in UTC
event.endUTC      // Date - End in UTC
event.allDay      // boolean - Is all-day event
event.timeZone    // string - Event timezone
```

### Description Properties

```javascript
event.description // string - Event description
event.location    // string - Event location
event.category    // string - Event category
```

### Status Properties

```javascript
event.status      // 'confirmed' | 'tentative' | 'cancelled'
event.showAs      // 'busy' | 'free'
```

### Recurrence Properties

```javascript
event.recurring       // boolean - Is recurring event
event.recurrenceRule  // string | null - RRULE string
```

### People Properties

```javascript
event.organizer   // { email, name } | null - Event organizer
event.attendees   // Array<{ email, name, status }> - Attendees
```

### Reminder Properties

```javascript
event.reminders   // Array<{ minutes, type }> - Reminders
```

### Custom Data

```javascript
event.metadata    // object - Custom key-value data
```

---

## Computed Properties

### duration

Get event duration in milliseconds.

```javascript
event.duration // number (milliseconds)
```

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Meeting',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

console.log(event.duration);      // 3600000 (1 hour)
console.log(event.duration / 60000); // 60 (minutes)
```

### durationHours

Get duration in hours.

```javascript
event.durationHours // number
```

### durationMinutes

Get duration in minutes.

```javascript
event.durationMinutes // number
```

### isMultiDay

Check if event spans multiple days.

```javascript
event.isMultiDay // boolean
```

**Example:**

```javascript
const conference = new Event({
  id: '1',
  title: 'Annual Conference',
  start: new Date('2024-03-15'),
  end: new Date('2024-03-17'),
  allDay: true
});

console.log(conference.isMultiDay); // true
```

### isPast

Check if event is in the past.

```javascript
event.isPast // boolean
```

### isFuture

Check if event is in the future.

```javascript
event.isFuture // boolean
```

### isOngoing

Check if event is currently happening.

```javascript
event.isOngoing // boolean
```

---

## Instance Methods

### occursOn()

Check if event occurs on a specific date.

```javascript
event.occursOn(date)
```

**Parameters:**
- `date` (Date) - Date to check

**Returns:** `boolean`

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Multi-day Event',
  start: new Date('2024-01-15'),
  end: new Date('2024-01-17'),
  allDay: true
});

event.occursOn(new Date('2024-01-14')); // false
event.occursOn(new Date('2024-01-15')); // true
event.occursOn(new Date('2024-01-16')); // true
event.occursOn(new Date('2024-01-17')); // true
event.occursOn(new Date('2024-01-18')); // false
```

---

### overlaps()

Check if event overlaps with another event.

```javascript
event.overlaps(otherEvent)
```

**Parameters:**
- `otherEvent` (Event) - Event to check against

**Returns:** `boolean`

**Example:**

```javascript
const meeting1 = new Event({
  id: '1',
  title: 'Meeting 1',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

const meeting2 = new Event({
  id: '2',
  title: 'Meeting 2',
  start: new Date('2024-01-15T09:30:00'),
  end: new Date('2024-01-15T10:30:00')
});

meeting1.overlaps(meeting2); // true
```

---

### clone()

Create a copy of the event with optional updates.

```javascript
event.clone(updates?)
```

**Parameters:**
- `updates` (object) - Fields to update in the clone

**Returns:** `Event` - New Event instance

**Example:**

```javascript
const original = new Event({
  id: '1',
  title: 'Original Meeting',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

// Simple clone
const copy = original.clone();
copy.id; // '1' (same)

// Clone with updates
const modified = original.clone({
  title: 'Modified Meeting',
  start: new Date('2024-01-16T09:00:00')
});
modified.title; // 'Modified Meeting'
```

---

### update()

Update event properties (returns new Event, original is immutable).

```javascript
event.update(updates)
```

**Parameters:**
- `updates` (object) - Fields to update

**Returns:** `Event` - New Event instance with updates

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Original',
  start: new Date('2024-01-15T09:00:00')
});

const updated = event.update({
  title: 'Updated Title'
});

event.title;    // 'Original' (unchanged)
updated.title;  // 'Updated Title' (new instance)
```

---

### toJSON()

Convert event to plain object.

```javascript
event.toJSON()
```

**Returns:** Plain object representation

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Meeting',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

const json = event.toJSON();
// {
//   id: '1',
//   title: 'Meeting',
//   start: '2024-01-15T09:00:00.000Z',
//   end: '2024-01-15T10:00:00.000Z',
//   allDay: false,
//   ...
// }

// Useful for serialization
JSON.stringify(event.toJSON());
localStorage.setItem('event', JSON.stringify(event.toJSON()));
```

---

### toString()

Get string representation.

```javascript
event.toString()
```

**Returns:** `string` - Human-readable summary

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Team Meeting',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T10:00:00')
});

console.log(event.toString());
// "Team Meeting (Jan 15, 2024 9:00 AM - 10:00 AM)"
```

---

## Static Methods

### Event.normalize()

Normalize event data with defaults.

```javascript
Event.normalize(data)
```

**Parameters:**
- `data` (object) - Raw event data

**Returns:** Normalized data object

**Example:**

```javascript
const normalized = Event.normalize({
  id: '1',
  title: 'Meeting',
  start: '2024-01-15T09:00:00' // string
});

normalized.start instanceof Date; // true
normalized.end instanceof Date;   // true (auto-generated)
normalized.status;                // 'confirmed' (default)
```

---

### Event.validate()

Validate event data.

```javascript
Event.validate(data)
```

**Parameters:**
- `data` (object) - Event data to validate

**Throws:** `Error` if validation fails

**Validation Rules:**
- `id` is required
- `title` is required
- `start` is required and must be valid Date
- `end` must be after `start` if provided
- `status` must be 'confirmed', 'tentative', or 'cancelled'
- `showAs` must be 'busy' or 'free'

**Example:**

```javascript
// Throws error
Event.validate({ title: 'No ID' });
// Error: Event must have an id

// Throws error
Event.validate({ id: '1' });
// Error: Event must have a title

// Throws error
Event.validate({
  id: '1',
  title: 'Test',
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T09:00:00') // Before start!
});
// Error: Event end must be after start
```

---

### Event.fromJSON()

Create Event from plain object.

```javascript
Event.fromJSON(json)
```

**Parameters:**
- `json` (object) - Plain object with event data

**Returns:** `Event` instance

**Example:**

```javascript
const json = {
  id: '1',
  title: 'Meeting',
  start: '2024-01-15T09:00:00.000Z',
  end: '2024-01-15T10:00:00.000Z'
};

const event = Event.fromJSON(json);
event instanceof Event; // true
event.start instanceof Date; // true
```

---

## Attendee Object

```javascript
{
  email: string,     // Required - Attendee email
  name: string,      // Optional - Display name
  status: string,    // Optional - 'accepted', 'declined', 'tentative', 'pending'
  required: boolean  // Optional - Is required attendee
}
```

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Team Meeting',
  start: new Date(),
  attendees: [
    { email: 'alice@example.com', name: 'Alice', status: 'accepted', required: true },
    { email: 'bob@example.com', name: 'Bob', status: 'pending', required: false }
  ]
});
```

---

## Reminder Object

```javascript
{
  minutes: number,   // Required - Minutes before event
  type: string       // Optional - 'popup', 'email', 'sms'
}
```

**Example:**

```javascript
const event = new Event({
  id: '1',
  title: 'Important Meeting',
  start: new Date(),
  reminders: [
    { minutes: 60, type: 'email' },   // 1 hour before
    { minutes: 15, type: 'popup' },   // 15 minutes before
    { minutes: 5, type: 'popup' }     // 5 minutes before
  ]
});
```

---

## Complete Example

```javascript
import { Event } from '@forcecalendar/core';

// Create a recurring meeting
const meeting = new Event({
  id: 'weekly-standup',
  title: 'Weekly Team Standup',
  description: 'Weekly sync to discuss progress and blockers',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:30:00'),
  location: 'Zoom',
  category: 'meetings',
  status: 'confirmed',
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO',
  timeZone: 'America/New_York',
  organizer: {
    email: 'manager@example.com',
    name: 'Manager'
  },
  attendees: [
    { email: 'dev1@example.com', name: 'Developer 1', status: 'accepted' },
    { email: 'dev2@example.com', name: 'Developer 2', status: 'tentative' }
  ],
  reminders: [
    { minutes: 15, type: 'popup' }
  ],
  metadata: {
    projectId: 'proj-123',
    meetingType: 'standup'
  }
});

// Check properties
console.log(meeting.durationMinutes); // 30
console.log(meeting.isMultiDay);      // false
console.log(meeting.isPast);          // depends on current time

// Check if occurs on specific date
console.log(meeting.occursOn(new Date('2024-01-15'))); // true
console.log(meeting.occursOn(new Date('2024-01-16'))); // false

// Clone with modifications
const rescheduled = meeting.clone({
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T10:30:00')
});

// Serialize for storage
const json = meeting.toJSON();
localStorage.setItem('meeting', JSON.stringify(json));

// Restore from storage
const restored = Event.fromJSON(JSON.parse(localStorage.getItem('meeting')));
```
