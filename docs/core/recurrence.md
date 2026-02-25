---
sidebar_position: 6
title: Recurrence
---

# Recurrence

RFC 5545 (iCalendar) compliant recurrence rule expansion. Supports DAILY, WEEKLY, MONTHLY, and YEARLY frequencies with BYDAY, BYMONTHDAY, BYMONTH, BYSETPOS, COUNT, UNTIL, INTERVAL, and exception dates.

## Creating Recurring Events

### Using an object

```javascript
calendar.addEvent({
  id: 'standup',
  title: 'Daily Standup',
  start: new Date('2026-03-02T09:00:00'),
  end: new Date('2026-03-02T09:15:00'),
  recurring: true,
  recurrenceRule: {
    freq: 'DAILY',
    interval: 1,
    count: 30,
    exceptions: [new Date('2026-03-14')]  // Skip Pi Day
  }
});
```

### Using an RRULE string

```javascript
calendar.addEvent({
  id: 'weekly',
  title: 'Team Sync',
  start: new Date('2026-03-02T14:00:00'),
  end: new Date('2026-03-02T15:00:00'),
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20260601T000000Z'
});
```

## RecurrenceRule Properties

| Property | Type | Description |
|----------|------|-------------|
| `freq` | `'DAILY' \| 'WEEKLY' \| 'MONTHLY' \| 'YEARLY'` | Frequency |
| `interval` | `number` | Gap between occurrences (default: 1) |
| `count` | `number?` | Max occurrences |
| `until` | `Date?` | End date (exclusive) |
| `byDay` | `string[]` | Days of week: `MO`, `TU`, `WE`, `TH`, `FR`, `SA`, `SU` |
| `byMonthDay` | `number[]` | Days of month: 1-31 |
| `byMonth` | `number[]` | Months: 1-12 |
| `bySetPos` | `number[]` | Positions within set. Use `-1` for "last" |
| `exceptions` | `Date[]` | Dates to skip |

## Examples

### Every weekday

```javascript
{ freq: 'WEEKLY', byDay: ['MO', 'TU', 'WE', 'TH', 'FR'] }
```

### First Monday of every month

```javascript
{ freq: 'MONTHLY', byDay: ['MO'], bySetPos: [1] }
```

### Last Friday of every month

```javascript
{ freq: 'MONTHLY', byDay: ['FR'], bySetPos: [-1] }
```

### Every 2 weeks on Tuesday and Thursday

```javascript
{ freq: 'WEEKLY', interval: 2, byDay: ['TU', 'TH'] }
```

### Annually on March 15

```javascript
{ freq: 'YEARLY', byMonth: [3], byMonthDay: [15] }
```

## RRuleParser

Parses RRULE strings into RecurrenceRule objects:

```javascript
import { RRuleParser } from '@forcecalendar/core';

const rule = RRuleParser.parse('FREQ=MONTHLY;BYDAY=FR;BYSETPOS=-1;COUNT=6');
// { freq: 'MONTHLY', byDay: ['FR'], bySetPos: [-1], count: 6 }
```

## RecurrenceEngine

Two implementations are available. `RecurrenceEngineV2` is the current default with improved edge-case handling.

```javascript
import { RecurrenceEngineV2 } from '@forcecalendar/core';

const engine = new RecurrenceEngineV2();
const occurrences = engine.expand(event, startDate, endDate);
// [{ start: Date, end: Date, recurringEventId: 'standup' }, ...]
```
