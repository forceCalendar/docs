---
sidebar_position: 2
title: Examples
---

# Examples

## Basic Calendar (HTML)

```html
<\!DOCTYPE html>
<html>
<head>
  <title>ForceCalendar Demo</title>
  <script src="https://unpkg.com/@forcecalendar/interface/dist/force-calendar-interface.umd.js"></script>
</head>
<body>
  <forcecal-main view="month" height="600px"></forcecal-main>

  <script>
    const cal = document.querySelector('forcecal-main');

    cal.addEvent({
      id: '1',
      title: 'Project Kickoff',
      start: new Date('2026-03-02T10:00:00'),
      end: new Date('2026-03-02T11:30:00'),
      color: '#2563EB'
    });

    cal.addEvent({
      id: '2',
      title: 'Sprint Review',
      start: new Date('2026-03-06T14:00:00'),
      end: new Date('2026-03-06T15:00:00'),
      color: '#10B981'
    });

    cal.addEvent({
      id: '3',
      title: 'Company Holiday',
      start: new Date('2026-03-15'),
      end: new Date('2026-03-15'),
      allDay: true,
      color: '#F59E0B'
    });
  </script>
</body>
</html>
```

## Headless Core (No UI)

Use Core directly when you need calendar logic without a DOM:

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  view: 'month',
  timeZone: 'America/Chicago',
  locale: 'en-US'
});

// Add events
calendar.addEvent({
  id: 'standup',
  title: 'Daily Standup',
  start: new Date('2026-03-02T09:00:00'),
  end: new Date('2026-03-02T09:15:00'),
  recurring: true,
  recurrenceRule: { freq: 'DAILY', count: 20 }
});

// Get month data for custom rendering
const monthData = calendar.getViewData();
monthData.weeks.forEach(week => {
  week.days.forEach(day => {
    if (day.events.length > 0) {
      console.log(`${day.date.toDateString()}: ${day.events.length} events`);
    }
  });
});
```

## React Integration

```jsx
import { useEffect, useRef } from 'react';
import '@forcecalendar/interface';

function CalendarWidget({ events, onEventAdd }) {
  const ref = useRef(null);

  useEffect(() => {
    const cal = ref.current;
    if (\!cal) return;

    events.forEach(evt => cal.addEvent(evt));

    const handleAdd = (e) => onEventAdd?.(e.detail);
    cal.addEventListener('calendar-event-added', handleAdd);

    return () => {
      cal.removeEventListener('calendar-event-added', handleAdd);
    };
  }, [events, onEventAdd]);

  return <forcecal-main ref={ref} view="month" height="600px" />;
}
```

## Vue Integration

```vue
<template>
  <forcecal-main
    ref="calendar"
    view="month"
    height="600px"
    @calendar-event-added="handleEventAdded"
    @calendar-navigate="handleNavigate"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@forcecalendar/interface';

const calendar = ref(null);

onMounted(() => {
  calendar.value.addEvent({
    id: '1',
    title: 'Vue Event',
    start: new Date(),
    end: new Date(Date.now() + 3600000),
    color: '#8B5CF6'
  });
});

function handleEventAdded(e) {
  console.log('Event added:', e.detail);
}

function handleNavigate(e) {
  console.log('Navigated:', e.detail);
}
</script>
```

## ICS Import

```javascript
import { Calendar, ICSHandler } from '@forcecalendar/core';

const calendar = new Calendar();
const icsHandler = new ICSHandler(calendar);

// From a file input
document.querySelector('#ics-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const result = await icsHandler.import(file, {
    merge: true,
    skipDuplicates: true
  });
  console.log(`Imported: ${result.imported.length}, Skipped: ${result.skipped.length}`);
});
```

## Custom Theme

```html
<style>
  /* Purple theme */
  forcecal-main {
    --fc-primary-color: #7C3AED;
    --fc-primary-hover: #6D28D9;
    --fc-primary-light: #F5F3FF;
    --fc-background: #FAFAF9;
    --fc-background-alt: #F5F5F4;
    --fc-border-radius-lg: 12px;
    --fc-font-family: 'DM Sans', sans-serif;
  }
</style>

<forcecal-main view="month" height="700px"></forcecal-main>
```

## Timezone Conversion

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({ timeZone: 'America/New_York' });

// Add event in Tokyo time
calendar.addEvent({
  id: 'tokyo-meeting',
  title: 'Tokyo Office Sync',
  start: new Date('2026-03-02T10:00:00'),
  end: new Date('2026-03-02T11:00:00'),
  timeZone: 'Asia/Tokyo'
});

// Convert to New York time
const nyTime = calendar.toCalendarTimezone(
  new Date('2026-03-02T10:00:00'),
  'Asia/Tokyo'
);
console.log(nyTime); // ~2026-03-01T20:00:00 EST

// Format in Berlin
const formatted = calendar.formatInTimezone(
  new Date(),
  'Europe/Berlin',
  { dateStyle: 'long', timeStyle: 'short' }
);
```

## Conflict Detection

```javascript
import { EnhancedCalendar } from '@forcecalendar/core';

const calendar = new EnhancedCalendar();

calendar.addEvent({
  id: '1',
  title: 'Meeting A',
  start: new Date('2026-03-02T10:00:00'),
  end: new Date('2026-03-02T11:00:00'),
  attendees: [{ name: 'Alice', email: 'alice@example.com' }]
});

calendar.addEvent({
  id: '2',
  title: 'Meeting B',
  start: new Date('2026-03-02T10:30:00'),
  end: new Date('2026-03-02T11:30:00'),
  attendees: [{ name: 'Alice', email: 'alice@example.com' }]
});

// Check for conflicts
const summary = calendar.checkConflicts({
  checkAttendees: true,
  bufferMinutes: 15
});

console.log(summary.hasConflicts);    // true
console.log(summary.totalConflicts);  // 1
```
