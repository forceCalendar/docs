# Recurrence

The `RecurrenceEngine` and `RRuleParser` classes handle recurring event expansion following the RFC 5545 iCalendar specification.

## Import

```javascript
import { RecurrenceEngine, RRuleParser } from '@forcecalendar/core';
```

## RRULE Format

Recurrence rules follow the RFC 5545 RRULE format:

```
FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=10
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `FREQ` | Frequency (required) | DAILY, WEEKLY, MONTHLY, YEARLY |
| `INTERVAL` | Interval between occurrences | 1, 2, 3... |
| `COUNT` | Total number of occurrences | 10 |
| `UNTIL` | End date | 20241231T235959Z |
| `BYDAY` | Days of week | MO, TU, WE, TH, FR, SA, SU |
| `BYMONTH` | Months of year | 1-12 |
| `BYMONTHDAY` | Days of month | 1-31, -1 (last day) |
| `BYSETPOS` | Position in set | 1, 2, -1 (last) |
| `WKST` | Week start day | MO, SU |

---

## RecurrenceEngine

### expandEvent()

Expand a recurring event into individual occurrences.

```javascript
RecurrenceEngine.expandEvent(event, rangeStart, rangeEnd, maxOccurrences?, timezone?)
```

**Parameters:**
- `event` (Event) - The recurring event
- `rangeStart` (Date) - Start of expansion range
- `rangeEnd` (Date) - End of expansion range
- `maxOccurrences` (number) - Maximum occurrences (default: 365)
- `timezone` (string) - Timezone for expansion

**Returns:** Array of occurrence objects

```javascript
[
  {
    start: Date,
    end: Date,
    recurringEventId: string,
    timezone: string,
    originalStart: Date
  },
  // ...
]
```

**Example:**

```javascript
const event = {
  id: 'weekly-meeting',
  title: 'Team Standup',
  start: new Date('2024-01-15T09:00:00'),
  end: new Date('2024-01-15T09:30:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
};

const occurrences = RecurrenceEngine.expandEvent(
  event,
  new Date('2024-01-01'),
  new Date('2024-01-31')
);

console.log(`${occurrences.length} occurrences in January`);
occurrences.forEach(occ => {
  console.log(occ.start.toDateString());
});
```

---

### parseRule()

Parse an RRULE string into a rule object.

```javascript
RecurrenceEngine.parseRule(ruleString)
```

**Parameters:**
- `ruleString` (string | object) - RRULE string or rule object

**Returns:** Parsed rule object

```javascript
{
  freq: string,        // 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'
  interval: number,    // Default: 1
  count: number,       // Optional
  until: Date,         // Optional
  byDay: string[],     // ['MO', 'WE', 'FR']
  byMonth: number[],   // [1, 6, 12]
  byMonthDay: number[],// [1, 15, -1]
  bySetPos: number[],  // [1, -1]
  wkst: string,        // 'MO'
  exceptions: Date[]   // Excluded dates
}
```

---

### getNextOccurrence()

Calculate the next occurrence from a given date.

```javascript
RecurrenceEngine.getNextOccurrence(currentDate, rule, timezone?)
```

**Parameters:**
- `currentDate` (Date) - Current occurrence date
- `rule` (object) - Parsed recurrence rule
- `timezone` (string) - Timezone for calculation

**Returns:** `Date` - Next occurrence

---

### getDescription()

Get human-readable description of a rule.

```javascript
RecurrenceEngine.getDescription(rule)
```

**Parameters:**
- `rule` (string | object) - RRULE string or rule object

**Returns:** `string` - Human-readable description

**Example:**

```javascript
RecurrenceEngine.getDescription('FREQ=DAILY');
// "Daily"

RecurrenceEngine.getDescription('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE,FR');
// "Every 2 weeks on Monday, Wednesday, Friday"

RecurrenceEngine.getDescription('FREQ=MONTHLY;BYMONTHDAY=15');
// "Monthly on day 15"

RecurrenceEngine.getDescription('FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1;COUNT=5');
// "Yearly, 5 times"
```

---

### isException()

Check if a date is an exception.

```javascript
RecurrenceEngine.isException(date, rule, eventId?)
```

**Parameters:**
- `date` (Date) - Date to check
- `rule` (object) - Rule with exceptions
- `eventId` (string) - Optional event ID

**Returns:** `boolean`

---

### addExceptions()

Add exception dates to a rule.

```javascript
RecurrenceEngine.addExceptions(rule, exceptions, options?)
```

**Parameters:**
- `rule` (object) - Recurrence rule
- `exceptions` (Date | Date[]) - Exception date(s)
- `options.reason` (string) - Optional reason
- `options.matchTime` (boolean) - Match exact time

**Returns:** Updated rule

**Example:**

```javascript
const rule = RecurrenceEngine.parseRule('FREQ=DAILY');

// Add exception for holiday
RecurrenceEngine.addExceptions(rule, new Date('2024-12-25'), {
  reason: 'Christmas Holiday'
});

// Add multiple exceptions
RecurrenceEngine.addExceptions(rule, [
  new Date('2024-01-01'),
  new Date('2024-07-04')
]);
```

---

## RRuleParser

### parse()

Parse RRULE string to object.

```javascript
RRuleParser.parse(rrule)
```

**Example:**

```javascript
const rule = RRuleParser.parse('FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10');
console.log(rule);
// {
//   freq: 'WEEKLY',
//   interval: 1,
//   count: 10,
//   byDay: ['MO', 'WE', 'FR'],
//   ...
// }
```

---

### buildRRule()

Build RRULE string from object.

```javascript
RRuleParser.buildRRule(rule)
```

**Example:**

```javascript
const rrule = RRuleParser.buildRRule({
  freq: 'WEEKLY',
  interval: 2,
  byDay: ['MO', 'FR'],
  count: 10
});
console.log(rrule);
// "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,FR;COUNT=10"
```

---

### getDescription()

Get human-readable description.

```javascript
RRuleParser.getDescription(rule)
```

---

## Common Patterns

### Daily

```javascript
// Every day
'FREQ=DAILY'

// Every 2 days
'FREQ=DAILY;INTERVAL=2'

// Every day for 30 days
'FREQ=DAILY;COUNT=30'

// Every day until end of year
'FREQ=DAILY;UNTIL=20241231'
```

### Weekly

```javascript
// Every week (same day)
'FREQ=WEEKLY'

// Every Monday
'FREQ=WEEKLY;BYDAY=MO'

// Every Monday, Wednesday, Friday
'FREQ=WEEKLY;BYDAY=MO,WE,FR'

// Every 2 weeks on Tuesday
'FREQ=WEEKLY;INTERVAL=2;BYDAY=TU'

// Weekdays only
'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'

// Weekends only
'FREQ=WEEKLY;BYDAY=SA,SU'
```

### Monthly

```javascript
// Same day each month (e.g., 15th)
'FREQ=MONTHLY'

// First day of month
'FREQ=MONTHLY;BYMONTHDAY=1'

// Last day of month
'FREQ=MONTHLY;BYMONTHDAY=-1'

// 15th of each month
'FREQ=MONTHLY;BYMONTHDAY=15'

// First Monday of month
'FREQ=MONTHLY;BYDAY=1MO'

// Second Tuesday of month
'FREQ=MONTHLY;BYDAY=2TU'

// Last Friday of month
'FREQ=MONTHLY;BYDAY=-1FR'

// Every other month
'FREQ=MONTHLY;INTERVAL=2'

// First and third Mondays
'FREQ=MONTHLY;BYDAY=MO;BYSETPOS=1,3'
```

### Yearly

```javascript
// Same date each year
'FREQ=YEARLY'

// January 1st each year
'FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=1'

// Last day of year
'FREQ=YEARLY;BYMONTH=12;BYMONTHDAY=31'

// Third Thursday of November (Thanksgiving)
'FREQ=YEARLY;BYMONTH=11;BYDAY=4TH'

// Every other year
'FREQ=YEARLY;INTERVAL=2'
```

---

## Complex Examples

### Bi-weekly Team Meeting

```javascript
// Every 2 weeks on Monday at 10am
const event = {
  id: 'biweekly-team',
  title: 'Bi-weekly Team Meeting',
  start: new Date('2024-01-08T10:00:00'),
  end: new Date('2024-01-08T11:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO'
};
```

### Quarterly Review

```javascript
// First Monday of January, April, July, October
const event = {
  id: 'quarterly-review',
  title: 'Quarterly Review',
  start: new Date('2024-01-01T14:00:00'),
  end: new Date('2024-01-01T16:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO;BYMONTH=1,4,7,10'
};
```

### Payday (15th and Last Day)

```javascript
// 15th and last day of each month
const event = {
  id: 'payday',
  title: 'Payday',
  start: new Date('2024-01-15'),
  allDay: true,
  recurring: true,
  recurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=15,-1'
};
```

### Anniversary

```javascript
// Same date each year
const event = {
  id: 'anniversary',
  title: 'Company Anniversary',
  start: new Date('2024-03-15'),
  allDay: true,
  recurring: true,
  recurrenceRule: 'FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=15'
};
```

---

## Exception Handling

### Skip Specific Dates

```javascript
const event = {
  id: 'daily-standup',
  title: 'Daily Standup',
  start: new Date('2024-01-02T09:00:00'),
  end: new Date('2024-01-02T09:15:00'),
  recurring: true,
  recurrenceRule: 'FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR'
};

// Add exceptions for holidays
const rule = RecurrenceEngine.parseRule(event.recurrenceRule);
RecurrenceEngine.addExceptions(rule, [
  new Date('2024-01-15'), // MLK Day
  new Date('2024-02-19'), // Presidents Day
  new Date('2024-12-25')  // Christmas
]);
```

### ICS EXDATE Format

```javascript
// In ICS format, exceptions are specified with EXDATE:
'RRULE:FREQ=DAILY;COUNT=30'
'EXDATE:20240115,20240219,20241225'
```

---

## DST Handling

The RecurrenceEngine handles DST transitions automatically:

```javascript
// Event at 9am Eastern
const event = {
  start: new Date('2024-03-01T09:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=DAILY',
  timeZone: 'America/New_York'
};

// Expand through DST transition (March 10, 2024)
const occurrences = RecurrenceEngine.expandEvent(
  event,
  new Date('2024-03-08'),
  new Date('2024-03-12'),
  100,
  'America/New_York'
);

// All occurrences maintain 9am local time
// even though UTC offset changes
```

---

## Performance Considerations

### Limit Expansion Range

```javascript
// BAD: Expanding too many occurrences
const occurrences = RecurrenceEngine.expandEvent(
  event,
  new Date('2020-01-01'),
  new Date('2030-12-31') // 10 years!
);

// GOOD: Expand only what you need
const occurrences = RecurrenceEngine.expandEvent(
  event,
  new Date('2024-01-01'),
  new Date('2024-12-31'), // 1 year
  365 // Cap at 365 occurrences
);
```

### Use maxOccurrences

```javascript
// Protect against runaway expansion
const occurrences = RecurrenceEngine.expandEvent(
  event,
  rangeStart,
  rangeEnd,
  100 // Stop after 100 occurrences
);
```

---

## Complete Example

```javascript
import { RecurrenceEngine, RRuleParser } from '@forcecalendar/core';

// Create recurring event
const event = {
  id: 'weekly-team',
  title: 'Weekly Team Sync',
  start: new Date('2024-01-08T10:00:00'),
  end: new Date('2024-01-08T11:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR',
  timeZone: 'America/New_York'
};

// Parse the rule
const rule = RecurrenceEngine.parseRule(event.recurrenceRule);
console.log('Rule:', rule);

// Get human-readable description
const description = RecurrenceEngine.getDescription(event.recurrenceRule);
console.log('Description:', description);
// "Weekly on Monday, Wednesday, Friday"

// Add holiday exceptions
RecurrenceEngine.addExceptions(rule, [
  new Date('2024-01-15'), // MLK Day
  new Date('2024-12-25')  // Christmas
]);

// Expand for January
const january = RecurrenceEngine.expandEvent(
  event,
  new Date('2024-01-01'),
  new Date('2024-01-31'),
  50,
  'America/New_York'
);

console.log('January occurrences:');
january.forEach(occ => {
  console.log(`  ${occ.start.toDateString()}`);
});

// Build new rule programmatically
const newRule = RRuleParser.buildRRule({
  freq: 'MONTHLY',
  byDay: ['2TU'],    // Second Tuesday
  count: 12          // For one year
});
console.log('New rule:', newRule);
// "FREQ=MONTHLY;BYDAY=2TU;COUNT=12"

// Validate and describe
const parsed = RRuleParser.parse(newRule);
const desc = RRuleParser.getDescription(parsed);
console.log('New rule description:', desc);
// "Every month on the second Tuesday, 12 times"
```
