---
sidebar_position: 2
title: Event
sidebar_label: Event
description: Event model with normalization, validation, recurrence rules, attendees, and metadata.
---

# Event

Represents a calendar event. Handles normalization, validation, timezone assignment, and color fallbacks.

```javascript
import { Event } from '@forcecalendar/core';
```

## EventData Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | *required* | Unique identifier |
| `title` | `string` | *required* | Event title |
| `start` | `Date \| string` | *required* | Start date/time |
| `end` | `Date \| string` | start date | End date/time |
| `allDay` | `boolean` | `false` | All-day event flag |
| `description` | `string` | `''` | Description text |
| `location` | `string` | `''` | Location |
| `color` | `string` | `null` | Shorthand for all color properties |
| `backgroundColor` | `string` | `null` | Background color |
| `borderColor` | `string` | `null` | Border color |
| `textColor` | `string` | `null` | Text color |
| `recurring` | `boolean` | `false` | Whether event recurs |
| `recurrenceRule` | `RecurrenceRule \| string` | `null` | RRULE definition |
| `timeZone` | `string` | `null` | IANA timezone |
| `status` | `'confirmed' \| 'tentative' \| 'cancelled'` | `'confirmed'` | Event status |
| `visibility` | `'public' \| 'private' \| 'confidential'` | `'public'` | Visibility |
| `organizer` | `Organizer` | `null` | Event organizer |
| `attendees` | `Attendee[]` | `[]` | Attendees list |
| `reminders` | `Reminder[]` | `[]` | Reminders |
| `categories` | `string[]` | `[]` | Categories/tags |
| `attachments` | `Attachment[]` | `[]` | Attached files |
| `conferenceData` | `ConferenceData` | `null` | Virtual meeting info |
| `metadata` | `Object` | `{}` | Custom key-value data |

## Static Methods

### `Event.normalize(data)`

Normalizes raw event data: clones dates, sets missing `end` to `start`, normalizes all-day times to midnight boundaries, coerces string fields, and applies color fallbacks.

```javascript
const normalized = Event.normalize({
  id: '1',
  title: 'Meeting',
  start: '2026-03-01T10:00:00',
  color: '#2563EB'
});
// normalized.end === normalized.start (cloned)
// normalized.backgroundColor === '#2563EB'
// normalized.borderColor === '#2563EB'
```

### `Event.validate(data)`

Validates normalized event data. Throws `Error` if required fields are missing or invalid.

```javascript
Event.validate({ id: '1', title: 'Test', start: new Date() }); // OK
Event.validate({ id: '', title: 'Test', start: new Date() });  // throws Error
```

## Nested Types

### Organizer

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string?` | Identifier |
| `name` | `string` | Name |
| `email` | `string` | Email |
| `phoneNumber` | `string?` | Phone |
| `photoUrl` | `string?` | Photo URL |

### Attendee

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string?` | — | Identifier |
| `name` | `string` | — | Name |
| `email` | `string` | — | Email |
| `responseStatus` | `'needs-action' \| 'accepted' \| 'declined' \| 'tentative' \| 'delegated'` | `'needs-action'` | RSVP status |
| `role` | `'required' \| 'optional' \| 'resource'` | `'required'` | Role |
| `optional` | `boolean` | `false` | Optional attendance |
| `resource` | `boolean` | `false` | Is a resource (room/equipment) |
| `comment` | `string?` | — | Note |
| `responseTime` | `Date?` | — | When they responded |

### RecurrenceRule

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `freq` | `'DAILY' \| 'WEEKLY' \| 'MONTHLY' \| 'YEARLY'` | — | Frequency |
| `interval` | `number` | `1` | Interval between occurrences |
| `count` | `number?` | `null` | Total occurrences |
| `until` | `Date?` | `null` | End date |
| `byDay` | `string[]` | `[]` | Days of week (`MO`, `TU`, etc.) |
| `byMonthDay` | `number[]` | `[]` | Days of month (1-31) |
| `byMonth` | `number[]` | `[]` | Months (1-12) |
| `bySetPos` | `number[]` | `[]` | Position in set (-1 = last) |
| `exceptions` | `Date[]` | `[]` | Excluded dates |

You can also pass an RRULE string:

```javascript
calendar.addEvent({
  id: '1',
  title: 'Weekly Standup',
  start: new Date('2026-03-02T09:00:00'),
  end: new Date('2026-03-02T09:30:00'),
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=12'
});
```

### Reminder

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `method` | `'email' \| 'popup' \| 'sms'` | — | Method |
| `minutesBefore` | `number` | — | Minutes before event |
| `message` | `string?` | — | Custom message |
| `enabled` | `boolean` | `true` | Active flag |

### ConferenceData

| Property | Type | Description |
|----------|------|-------------|
| `solution` | `string?` | Provider (e.g., `'zoom'`, `'teams'`, `'meet'`) |
| `url` | `string?` | Meeting URL |
| `phone` | `string?` | Dial-in number |
| `accessCode` | `string?` | Meeting ID |
| `password` | `string?` | Password |
