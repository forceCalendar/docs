---
sidebar_position: 8
title: ICS Import/Export
---

# ICS Import/Export

Import and export calendar data in iCalendar (.ics) format. Supports files, strings, and Blobs.

## ICSHandler

High-level API that works with a Calendar instance:

```javascript
import { Calendar, ICSHandler } from '@forcecalendar/core';

const calendar = new Calendar();
const ics = new ICSHandler(calendar);
```

### Import

```javascript
const result = await ics.import(icsStringOrFileOrBlob, {
  merge: true,           // Merge with existing events (default: true)
  updateExisting: false, // Update events with matching IDs
  skipDuplicates: true,  // Skip if event already exists
  dateRange: {           // Only import events in range
    start: new Date('2026-01-01'),
    end: new Date('2026-12-31')
  },
  categories: ['work']   // Only import specific categories
});

console.log(result.imported);  // EventData[]
console.log(result.skipped);   // { event, reason }[]
console.log(result.updated);   // EventData[]
console.log(result.errors);    // { event, error }[]
```

### Import from a file input

```javascript
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const result = await ics.import(file);
  console.log(`Imported ${result.imported.length} events`);
});
```

### Export

```javascript
const icsString = ics.export({
  events: calendar.getEvents(), // or a subset
  calendarName: 'My Calendar',
  prodId: '-//MyApp//EN'
});

// Download as file
const blob = new Blob([icsString], { type: 'text/calendar' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'calendar.ics';
a.click();
```

## ICSParser

Lower-level parser that converts ICS strings to event data arrays:

```javascript
import { ICSParser } from '@forcecalendar/core';

const parser = new ICSParser();
const events = parser.parse(icsString);
// EventData[]
```
