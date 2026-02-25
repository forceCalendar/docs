---
sidebar_position: 5
title: Timezone
---

# TimezoneManager

Full IANA timezone support with conversion, formatting, system detection, and a built-in timezone database.

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'America/New_York' });
```

TimezoneManager is a singleton accessed internally by Calendar. You typically interact with it through Calendar methods.

## Convert Between Timezones

```javascript
const nyTime = new Date('2026-03-01T10:00:00');

// Convert New York to London
const londonTime = calendar.convertTimezone(
  nyTime,
  'America/New_York',
  'Europe/London'
);

// Convert to the calendar's timezone
const calTime = calendar.toCalendarTimezone(date, 'UTC');

// Convert from the calendar's timezone
const utcTime = calendar.fromCalendarTimezone(date, 'UTC');
```

## Format in a Timezone

```javascript
calendar.formatInTimezone(new Date(), 'Asia/Tokyo', {
  dateStyle: 'full',
  timeStyle: 'short'
});
// "Sunday, March 1, 2026 at 12:00 AM"
```

The options object is passed to `Intl.DateTimeFormat`.

## Get Available Timezones

```javascript
const timezones = calendar.getTimezones();
// [
//   { value: 'Pacific/Midway', label: 'Midway Island', offset: '-11:00' },
//   { value: 'America/New_York', label: 'Eastern Time', offset: '-05:00' },
//   { value: 'Europe/London', label: 'London', offset: '+00:00' },
//   ...
// ]
```

## Change Calendar Timezone

```javascript
calendar.setTimezone('Europe/Berlin');

// Listen for timezone changes
calendar.on('timezoneChange', ({ timezone, previousTimezone }) => {
  console.log(`Changed from ${previousTimezone} to ${timezone}`);
});
```

## Per-Event Timezones

Events can have their own timezone. When added to a Calendar, events without a `timeZone` property inherit the calendar's timezone.

```javascript
calendar.addEvent({
  id: '1',
  title: 'London Call',
  start: new Date('2026-03-01T15:00:00'),
  end: new Date('2026-03-01T16:00:00'),
  timeZone: 'Europe/London'
});
```
