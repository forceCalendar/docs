# ICS (iCalendar)

The `ICSParser` and `ICSHandler` classes provide RFC 5545 compliant iCalendar import and export functionality.

## Import

```javascript
import { ICSParser, ICSHandler } from '@forcecalendar/core';
```

## ICS Format Overview

iCalendar (ICS) is a standard format for calendar data exchange. Example:

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ForceCalendar//EN
BEGIN:VEVENT
UID:meeting-123@example.com
DTSTAMP:20240115T120000Z
DTSTART:20240115T100000
DTEND:20240115T110000
SUMMARY:Team Meeting
DESCRIPTION:Weekly sync
LOCATION:Conference Room A
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```

---

## ICSParser

### parse()

Parse an ICS string into event objects.

```javascript
const parser = new ICSParser();
parser.parse(icsString)
```

**Parameters:**
- `icsString` (string) - ICS formatted string

**Returns:** `Array` - Array of event objects

**Example:**

```javascript
const parser = new ICSParser();

const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:meeting-1
SUMMARY:Team Meeting
DTSTART:20240115T100000
DTEND:20240115T110000
LOCATION:Room A
END:VEVENT
BEGIN:VEVENT
UID:meeting-2
SUMMARY:Lunch
DTSTART;VALUE=DATE:20240115
END:VEVENT
END:VCALENDAR`;

const events = parser.parse(icsContent);

events.forEach(event => {
  console.log(`${event.title} at ${event.start}`);
});
// Team Meeting at Mon Jan 15 2024 10:00:00
// Lunch at Mon Jan 15 2024 00:00:00
```

---

### export()

Export events to ICS format.

```javascript
parser.export(events, calendarName?)
```

**Parameters:**
- `events` (Array) - Array of event objects
- `calendarName` (string) - Calendar name (default: 'Lightning Calendar')

**Returns:** `string` - ICS formatted string

**Example:**

```javascript
const parser = new ICSParser();

const events = [
  {
    id: 'meeting-1',
    title: 'Team Meeting',
    start: new Date('2024-01-15T10:00:00'),
    end: new Date('2024-01-15T11:00:00'),
    location: 'Conference Room A',
    description: 'Weekly team sync'
  },
  {
    id: 'holiday-1',
    title: 'Company Holiday',
    start: new Date('2024-01-16'),
    allDay: true
  }
];

const icsString = parser.export(events, 'My Calendar');
console.log(icsString);
```

**Output:**

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Force Calendar Core//EN
X-WR-CALNAME:My Calendar
METHOD:PUBLISH
BEGIN:VEVENT
UID:meeting-1
DTSTAMP:20240115T120000Z
DTSTART;TZID=America/New_York:20240115T100000
DTEND;TZID=America/New_York:20240115T110000
SUMMARY:Team Meeting
DESCRIPTION:Weekly team sync
LOCATION:Conference Room A
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
UID:holiday-1
DTSTAMP:20240115T120000Z
DTSTART;VALUE=DATE:20240116
SUMMARY:Company Holiday
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
```

---

## ICSHandler

The `ICSHandler` class provides a higher-level API for ICS operations.

### importFromString()

Import events from an ICS string.

```javascript
ICSHandler.importFromString(icsString, options?)
```

**Parameters:**
- `icsString` (string) - ICS content
- `options.timezone` (string) - Default timezone for events without TZID

**Returns:** `Event[]` - Array of Event instances

---

### importFromFile()

Import events from a File object (browser).

```javascript
ICSHandler.importFromFile(file, options?)
```

**Parameters:**
- `file` (File) - File object from input or drag-drop
- `options.timezone` (string) - Default timezone

**Returns:** `Promise<Event[]>`

**Example:**

```javascript
// File input handler
async function handleFileUpload(event) {
  const file = event.target.files[0];

  if (!file.name.endsWith('.ics')) {
    throw new Error('Please select an ICS file');
  }

  const events = await ICSHandler.importFromFile(file, {
    timezone: 'America/New_York'
  });

  console.log(`Imported ${events.length} events`);
  return events;
}
```

---

### exportToString()

Export events to ICS string.

```javascript
ICSHandler.exportToString(events, options?)
```

**Parameters:**
- `events` (Event[]) - Events to export
- `options.calendarName` (string) - Calendar name
- `options.timezone` (string) - Export timezone

**Returns:** `string` - ICS formatted string

---

### exportToBlob()

Export events to a Blob (for download).

```javascript
ICSHandler.exportToBlob(events, options?)
```

**Returns:** `Blob` - ICS file as Blob

**Example:**

```javascript
function downloadCalendar(events) {
  const blob = ICSHandler.exportToBlob(events, {
    calendarName: 'My Calendar'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendar.ics';
  link.click();
  URL.revokeObjectURL(url);
}
```

---

### downloadICS()

Trigger a file download (browser).

```javascript
ICSHandler.downloadICS(events, filename?, options?)
```

**Parameters:**
- `events` (Event[]) - Events to export
- `filename` (string) - Download filename (default: 'calendar.ics')
- `options.calendarName` (string) - Calendar name

**Example:**

```javascript
// Export button handler
function handleExport() {
  const events = calendar.getAllEvents();
  ICSHandler.downloadICS(events, 'my-calendar.ics', {
    calendarName: 'Personal Calendar'
  });
}
```

---

## Property Mapping

### ICS to Event

| ICS Property | Event Field |
|--------------|-------------|
| `UID` | `id` |
| `SUMMARY` | `title` |
| `DESCRIPTION` | `description` |
| `LOCATION` | `location` |
| `DTSTART` | `start` |
| `DTEND` | `end` |
| `CATEGORIES` | `category` |
| `STATUS` | `status` |
| `TRANSP` | `showAs` |
| `ORGANIZER` | `organizer` |
| `ATTENDEE` | `attendees` |
| `RRULE` | `recurrence` |

### Status Mapping

| ICS Status | Event Status |
|------------|--------------|
| `TENTATIVE` | `tentative` |
| `CONFIRMED` | `confirmed` |
| `CANCELLED` | `cancelled` |

### Transparency Mapping

| ICS TRANSP | Event showAs |
|------------|--------------|
| `OPAQUE` | `busy` |
| `TRANSPARENT` | `free` |

---

## Date Formats

### Date-Time

```
DTSTART:20240115T100000      // Local time
DTSTART:20240115T100000Z     // UTC
DTSTART;TZID=America/New_York:20240115T100000  // With timezone
```

### Date Only (All-Day)

```
DTSTART;VALUE=DATE:20240115  // All-day event
```

---

## Recurrence Rules

```ics
RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10
EXDATE:20240115,20240122  // Exception dates
```

---

## Attendees

```ics
ATTENDEE;CN=John Doe;RSVP=TRUE:mailto:john@example.com
ATTENDEE;CN=Jane Doe;PARTSTAT=ACCEPTED:mailto:jane@example.com
```

---

## Alarms/Reminders

```ics
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:-PT15M  // 15 minutes before
DESCRIPTION:Reminder
END:VALARM
```

---

## Complete Example

```javascript
import { Calendar, ICSHandler, ICSParser } from '@forcecalendar/core';

const calendar = new Calendar({
  timeZone: 'America/New_York'
});

// ================
// IMPORT
// ================

// From string
const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google//Calendar//EN
BEGIN:VEVENT
UID:abc123@google.com
DTSTART:20240115T100000Z
DTEND:20240115T110000Z
SUMMARY:Imported Meeting
LOCATION:Virtual
RRULE:FREQ=WEEKLY;BYDAY=MO
END:VEVENT
END:VCALENDAR`;

const imported = ICSHandler.importFromString(icsContent, {
  timezone: 'America/New_York'
});

imported.forEach(event => {
  calendar.addEvent(event);
});

console.log(`Imported ${imported.length} events`);

// From file (browser)
async function handleFileInput(event) {
  const file = event.target.files[0];

  try {
    const events = await ICSHandler.importFromFile(file);
    events.forEach(e => calendar.addEvent(e));
    alert(`Imported ${events.length} events`);
  } catch (error) {
    alert(`Import failed: ${error.message}`);
  }
}

// ================
// EXPORT
// ================

// Export all events
const allEvents = calendar.getAllEvents();
const exportedICS = ICSHandler.exportToString(allEvents, {
  calendarName: 'My ForceCalendar'
});

console.log(exportedICS);

// Download as file
ICSHandler.downloadICS(allEvents, 'my-calendar.ics');

// Export specific events
const meetings = allEvents.filter(e => e.category === 'meetings');
ICSHandler.downloadICS(meetings, 'meetings.ics', {
  calendarName: 'Meeting Calendar'
});

// ================
// MANUAL PARSING
// ================

const parser = new ICSParser();

// Parse
const events = parser.parse(icsContent);
events.forEach(event => {
  console.log(`- ${event.title}`);
  console.log(`  Start: ${event.start}`);
  console.log(`  End: ${event.end}`);
  console.log(`  Location: ${event.location}`);
  if (event.recurrence) {
    console.log(`  Recurrence: ${event.recurrence}`);
  }
});

// Export with custom settings
const customEvents = [
  {
    id: 'custom-1',
    title: 'Custom Event',
    start: new Date('2024-01-20T14:00:00'),
    end: new Date('2024-01-20T15:00:00'),
    description: 'A custom event with rich details',
    location: '123 Main St, City',
    category: 'personal',
    attendees: [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' }
    ],
    reminders: [
      { minutes: 30 },
      { minutes: 10 }
    ]
  }
];

const customICS = parser.export(customEvents, 'Custom Calendar');
console.log(customICS);
```

---

## Drag-and-Drop Import

```javascript
// React example
function CalendarDropZone({ calendar }) {
  const handleDrop = async (event) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);
    const icsFile = files.find(f => f.name.endsWith('.ics'));

    if (!icsFile) {
      alert('Please drop an ICS file');
      return;
    }

    try {
      const events = await ICSHandler.importFromFile(icsFile);
      events.forEach(e => calendar.addEvent(e));
      alert(`Imported ${events.length} events!`);
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      Drop .ics file here to import
    </div>
  );
}
```

---

## Google Calendar Import

```javascript
// Google Calendar exports include timezone info
const googleExport = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Work
X-WR-TIMEZONE:America/New_York
BEGIN:VTIMEZONE
TZID:America/New_York
...
END:VTIMEZONE
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20240115T090000
DTEND;TZID=America/New_York:20240115T100000
RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR
SUMMARY:Daily Standup
UID:abc123@google.com
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

const events = ICSHandler.importFromString(googleExport);
```

---

## Outlook Import

```javascript
// Outlook uses slightly different formatting
const outlookExport = `BEGIN:VCALENDAR
METHOD:PUBLISH
PRODID:Microsoft Exchange Server 2010
VERSION:2.0
BEGIN:VEVENT
UID:040000008200E00074C5B7101A82E0080000000...
SUMMARY:Team Meeting
DTSTART:20240115T150000Z
DTEND:20240115T160000Z
CLASS:PUBLIC
PRIORITY:5
TRANSP:OPAQUE
STATUS:CONFIRMED
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
END:VEVENT
END:VCALENDAR`;

const events = ICSHandler.importFromString(outlookExport);
```
