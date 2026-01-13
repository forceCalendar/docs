# Timezone

The `TimezoneManager` class handles timezone conversions, DST transitions, and provides timezone utilities.

## Import

```javascript
import { TimezoneManager } from '@forcecalendar/core';

// Get the shared singleton instance (recommended)
const tzManager = TimezoneManager.getInstance();

// Or import database directly
import { TimezoneDatabase } from '@forcecalendar/core';
```

## Singleton Pattern

TimezoneManager uses a singleton pattern to avoid memory bloat:

```javascript
// GOOD: All components share one instance
const tz1 = TimezoneManager.getInstance();
const tz2 = TimezoneManager.getInstance();
tz1 === tz2; // true

// BAD: Don't create new instances directly
const tz = new TimezoneManager(); // Creates duplicate caches
```

---

## Timezone Conversion

### convertTimezone()

Convert a date from one timezone to another.

```javascript
tzManager.convertTimezone(date, fromTimezone, toTimezone)
```

**Parameters:**
- `date` (Date) - Date to convert
- `fromTimezone` (string) - Source IANA timezone
- `toTimezone` (string) - Target IANA timezone

**Returns:** `Date` - Converted date

**Example:**

```javascript
const nyTime = new Date('2024-01-15T09:00:00');
const londonTime = tzManager.convertTimezone(
  nyTime,
  'America/New_York',
  'Europe/London'
);
// London is 5 hours ahead of NY in January
console.log(londonTime); // 2024-01-15T14:00:00
```

---

### toUTC()

Convert a local time to UTC.

```javascript
tzManager.toUTC(date, timezone)
```

**Parameters:**
- `date` (Date) - Date in local timezone
- `timezone` (string) - Source IANA timezone

**Returns:** `Date` - Date in UTC

**Example:**

```javascript
const nyTime = new Date('2024-01-15T09:00:00');
const utcTime = tzManager.toUTC(nyTime, 'America/New_York');
// NY is UTC-5 in January
console.log(utcTime); // 2024-01-15T14:00:00Z
```

---

### fromUTC()

Convert UTC time to a local timezone.

```javascript
tzManager.fromUTC(utcDate, timezone)
```

**Parameters:**
- `utcDate` (Date) - Date in UTC
- `timezone` (string) - Target IANA timezone

**Returns:** `Date` - Date in target timezone

**Example:**

```javascript
const utcTime = new Date('2024-01-15T14:00:00Z');
const nyTime = tzManager.fromUTC(utcTime, 'America/New_York');
// NY is UTC-5 in January
console.log(nyTime); // 2024-01-15T09:00:00
```

---

## Offset Methods

### getTimezoneOffset()

Get timezone offset in minutes from UTC.

```javascript
tzManager.getTimezoneOffset(date, timezone)
```

**Parameters:**
- `date` (Date) - Date to check (for DST calculation)
- `timezone` (string) - IANA timezone identifier

**Returns:** `number` - Offset in minutes (positive = behind UTC)

**Example:**

```javascript
const winter = new Date('2024-01-15');
const summer = new Date('2024-07-15');

// NY in winter: UTC-5 (300 minutes)
tzManager.getTimezoneOffset(winter, 'America/New_York'); // 300

// NY in summer: UTC-4 (240 minutes) - DST
tzManager.getTimezoneOffset(summer, 'America/New_York'); // 240
```

---

### getTimezoneDifference()

Get hour difference between two timezones.

```javascript
tzManager.getTimezoneDifference(timezone1, timezone2, date?)
```

**Parameters:**
- `timezone1` (string) - First timezone
- `timezone2` (string) - Second timezone
- `date` (Date) - Optional date for DST calculation

**Returns:** `number` - Hour difference

**Example:**

```javascript
// How many hours ahead is London from New York?
const diff = tzManager.getTimezoneDifference(
  'America/New_York',
  'Europe/London'
);
console.log(diff); // 5 (in winter), 5 (in summer - both have DST)
```

---

## DST Methods

### isDST()

Check if a date is in Daylight Saving Time.

```javascript
tzManager.isDST(date, timezone, dstRule?)
```

**Parameters:**
- `date` (Date) - Date to check
- `timezone` (string) - IANA timezone
- `dstRule` (object) - Optional DST rule

**Returns:** `boolean` - True if in DST

**Example:**

```javascript
const winter = new Date('2024-01-15');
const summer = new Date('2024-07-15');

tzManager.isDST(winter, 'America/New_York'); // false
tzManager.isDST(summer, 'America/New_York'); // true
tzManager.isDST(summer, 'Asia/Tokyo');       // false (Japan has no DST)
```

---

### getNthWeekdayOfMonth()

Get nth weekday of a month (used for DST transition dates).

```javascript
tzManager.getNthWeekdayOfMonth(year, month, week, dayOfWeek)
```

**Parameters:**
- `year` (number) - Year
- `month` (number) - Month (0-11)
- `week` (number) - Week number (1-5, or -1 for last)
- `dayOfWeek` (number) - Day of week (0=Sunday)

**Returns:** `Date`

**Example:**

```javascript
// US DST starts 2nd Sunday of March
const dstStart = tzManager.getNthWeekdayOfMonth(2024, 2, 2, 0);
console.log(dstStart); // 2024-03-10

// US DST ends 1st Sunday of November
const dstEnd = tzManager.getNthWeekdayOfMonth(2024, 10, 1, 0);
console.log(dstEnd); // 2024-11-03
```

---

## Formatting

### formatInTimezone()

Format a date in a specific timezone.

```javascript
tzManager.formatInTimezone(date, timezone, options?)
```

**Parameters:**
- `date` (Date) - Date to format
- `timezone` (string) - Target timezone
- `options` (object) - Intl.DateTimeFormat options

**Returns:** `string` - Formatted date string

**Example:**

```javascript
const date = new Date('2024-01-15T14:00:00Z');

tzManager.formatInTimezone(date, 'America/New_York');
// "01/15/2024, 09:00 AM"

tzManager.formatInTimezone(date, 'Europe/London');
// "01/15/2024, 02:00 PM"

tzManager.formatInTimezone(date, 'Asia/Tokyo', {
  hour12: false,
  weekday: 'long'
});
// "Monday, 01/15/2024, 23:00"
```

---

## Timezone Utilities

### getSystemTimezone()

Get the system/browser timezone.

```javascript
tzManager.getSystemTimezone()
```

**Returns:** `string` - IANA timezone identifier

**Example:**

```javascript
const systemTz = tzManager.getSystemTimezone();
console.log(systemTz); // e.g., 'America/New_York'
```

---

### isValidTimezone()

Check if a timezone identifier is valid.

```javascript
tzManager.isValidTimezone(timezone)
```

**Parameters:**
- `timezone` (string) - Timezone to validate

**Returns:** `boolean`

**Example:**

```javascript
tzManager.isValidTimezone('America/New_York'); // true
tzManager.isValidTimezone('EST');               // true (alias)
tzManager.isValidTimezone('Invalid/Zone');      // false
```

---

### parseTimezone()

Parse various timezone formats to IANA identifier.

```javascript
tzManager.parseTimezone(tzString)
```

**Parameters:**
- `tzString` (string) - Timezone string (IANA, abbreviation, or offset)

**Returns:** `string` - IANA timezone identifier

**Example:**

```javascript
tzManager.parseTimezone('America/New_York'); // 'America/New_York'
tzManager.parseTimezone('EST');               // 'America/New_York'
tzManager.parseTimezone('PST');               // 'America/Los_Angeles'
tzManager.parseTimezone('-05:00');            // Best match for UTC-5
tzManager.parseTimezone('invalid');           // 'UTC' (fallback)
```

---

### getCommonTimezones()

Get list of common timezones with labels.

```javascript
tzManager.getCommonTimezones()
```

**Returns:** Array of timezone objects

```javascript
[
  {
    value: 'America/New_York',
    label: 'Eastern Time (New York)',
    region: 'Americas',
    offset: 'UTC-05:00',
    offsetMinutes: 300
  },
  // ... more timezones
]
```

**Example:**

```javascript
const timezones = tzManager.getCommonTimezones();

// Render in a dropdown
timezones.forEach(tz => {
  console.log(`${tz.label} (${tz.offset})`);
});

// Group by region
const byRegion = timezones.reduce((acc, tz) => {
  acc[tz.region] = acc[tz.region] || [];
  acc[tz.region].push(tz);
  return acc;
}, {});
```

---

## Caching

### getCacheStats()

Get cache statistics.

```javascript
tzManager.getCacheStats()
```

**Returns:**

```javascript
{
  offsetCacheSize: number,
  dstCacheSize: number,
  maxCacheSize: number,
  cacheHits: number,
  cacheMisses: number,
  hitRate: string // e.g., "95.50%"
}
```

**Example:**

```javascript
const stats = tzManager.getCacheStats();
console.log(`Cache hit rate: ${stats.hitRate}`);
console.log(`Offset cache entries: ${stats.offsetCacheSize}`);
```

---

### clearCache()

Clear all caches.

```javascript
tzManager.clearCache()
```

Useful when crossing date boundaries or when cache may be stale.

---

## TimezoneDatabase

The `TimezoneDatabase` class provides raw timezone data.

### Methods

```javascript
const db = new TimezoneDatabase();

// Get timezone data
db.getTimezone('America/New_York');
// { offset: -300, dst: { ... } }

// Resolve aliases
db.resolveAlias('EST'); // 'America/New_York'

// Check validity
db.isValidTimezone('America/New_York'); // true
```

### Timezone Data Structure

```javascript
{
  offset: number,        // Base offset in minutes from UTC
  dst: {
    offset: number,      // DST offset to add (usually 60)
    start: {
      month: number,     // Start month (0-11)
      week: number,      // Week of month (1-5 or -1 for last)
      day: number        // Day of week (0=Sunday)
    },
    end: {
      month: number,
      week: number,
      day: number
    }
  } | null               // null if no DST
}
```

---

## IANA Timezone Identifiers

Common IANA timezone identifiers:

| Region | Timezone | Offset (Winter) |
|--------|----------|-----------------|
| **Americas** | | |
| | America/New_York | UTC-5 |
| | America/Chicago | UTC-6 |
| | America/Denver | UTC-7 |
| | America/Los_Angeles | UTC-8 |
| | America/Toronto | UTC-5 |
| | America/Vancouver | UTC-8 |
| | America/Mexico_City | UTC-6 |
| | America/Sao_Paulo | UTC-3 |
| **Europe** | | |
| | Europe/London | UTC+0 |
| | Europe/Paris | UTC+1 |
| | Europe/Berlin | UTC+1 |
| | Europe/Moscow | UTC+3 |
| **Asia** | | |
| | Asia/Dubai | UTC+4 |
| | Asia/Kolkata | UTC+5:30 |
| | Asia/Shanghai | UTC+8 |
| | Asia/Tokyo | UTC+9 |
| | Asia/Singapore | UTC+8 |
| **Oceania** | | |
| | Australia/Sydney | UTC+10/11 |
| | Pacific/Auckland | UTC+12/13 |
| **UTC** | | |
| | UTC | UTC+0 |

---

## Complete Example

```javascript
import { TimezoneManager } from '@forcecalendar/core';

const tz = TimezoneManager.getInstance();

// User's timezone
const userTz = tz.getSystemTimezone();
console.log(`User timezone: ${userTz}`);

// Schedule a meeting for 2pm Eastern
const meetingTime = new Date('2024-01-15T14:00:00');
const meetingTz = 'America/New_York';

// Convert to user's local time
const localTime = tz.convertTimezone(meetingTime, meetingTz, userTz);
console.log(`Meeting at: ${localTime.toLocaleString()}`);

// Show time in multiple locations
const offices = [
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' }
];

offices.forEach(office => {
  const time = tz.formatInTimezone(meetingTime, office.tz, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  console.log(`${office.name}: ${time}`);
});
// New York: 02:00 PM
// London: 07:00 PM
// Tokyo: 04:00 AM (+1 day)

// Check DST status
const isDST = tz.isDST(new Date(), userTz);
console.log(`Currently in DST: ${isDST}`);

// Build timezone picker
const timezones = tz.getCommonTimezones();
console.log('Available timezones:');
timezones.forEach(t => {
  console.log(`  ${t.label} (${t.offset})`);
});

// Cache stats
const stats = tz.getCacheStats();
console.log(`Cache hit rate: ${stats.hitRate}`);
```

---

## DST Handling Best Practices

### Store UTC, Display Local

```javascript
// Store event in UTC
event.startUTC = tz.toUTC(event.start, event.timeZone);

// Display in user's timezone
const displayTime = tz.fromUTC(event.startUTC, userTimezone);
```

### Handle DST Transitions

```javascript
// Be careful with recurring events across DST
const recurringEvent = {
  start: new Date('2024-03-09T09:00:00'), // Day before DST
  recurrence: 'FREQ=DAILY'
};

// March 10, 2024: DST starts at 2am -> 3am
// A 9am meeting should still be at 9am local time
// But the UTC offset changes from -5 to -4
```

### Avoid Midnight Edge Cases

```javascript
// Problematic: midnight events may shift days
const event = new Date('2024-01-15T00:00:00');

// Better: use noon or explicit all-day
const allDayEvent = {
  start: new Date('2024-01-15'),
  allDay: true
};
```
