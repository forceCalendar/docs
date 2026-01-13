# DateUtils

The `DateUtils` class provides static utility methods for date manipulation. All methods are pure functions with no side effects.

## Import

```javascript
import { DateUtils } from '@forcecalendar/core';
```

## Design Principles

- **Pure functions** - No side effects, same input always produces same output
- **No mutations** - Original dates are never modified
- **DST-safe** - Uses calendar arithmetic, not milliseconds
- **No dependencies** - Uses only native JavaScript Date and Intl APIs

---

## Start/End Methods

### startOfDay()

Get the start of a day (00:00:00.000).

```javascript
DateUtils.startOfDay(date)
```

**Example:**

```javascript
const date = new Date('2024-01-15T14:30:00');
const start = DateUtils.startOfDay(date);
// 2024-01-15T00:00:00.000
```

---

### endOfDay()

Get the end of a day (23:59:59.999).

```javascript
DateUtils.endOfDay(date)
```

---

### startOfWeek()

Get the start of a week.

```javascript
DateUtils.startOfWeek(date, weekStartsOn?)
```

**Parameters:**
- `date` (Date) - Any date in the week
- `weekStartsOn` (number) - Week start day (0=Sunday, 1=Monday). Default: 0

**Example:**

```javascript
const date = new Date('2024-01-17'); // Wednesday

// Sunday start (default)
DateUtils.startOfWeek(date);    // 2024-01-14 (Sunday)

// Monday start
DateUtils.startOfWeek(date, 1); // 2024-01-15 (Monday)
```

---

### endOfWeek()

Get the end of a week.

```javascript
DateUtils.endOfWeek(date, weekStartsOn?)
```

---

### startOfMonth()

Get the first day of a month.

```javascript
DateUtils.startOfMonth(date)
```

**Example:**

```javascript
const date = new Date('2024-01-15');
const start = DateUtils.startOfMonth(date);
// 2024-01-01T00:00:00.000
```

---

### endOfMonth()

Get the last day of a month.

```javascript
DateUtils.endOfMonth(date)
```

**Example:**

```javascript
const date = new Date('2024-02-15');
const end = DateUtils.endOfMonth(date);
// 2024-02-29T23:59:59.999 (leap year)
```

---

### startOfYear()

Get the first day of a year.

```javascript
DateUtils.startOfYear(date)
```

---

### endOfYear()

Get the last day of a year.

```javascript
DateUtils.endOfYear(date)
```

---

## Add Methods

### addDays()

Add days to a date.

```javascript
DateUtils.addDays(date, days)
```

**Parameters:**
- `date` (Date) - Starting date
- `days` (number) - Days to add (can be negative)

**Example:**

```javascript
const date = new Date('2024-01-15');

DateUtils.addDays(date, 1);   // 2024-01-16
DateUtils.addDays(date, 7);   // 2024-01-22
DateUtils.addDays(date, -5);  // 2024-01-10
DateUtils.addDays(date, 30);  // 2024-02-14
```

**DST Safety:**

```javascript
// March 10, 2024: DST starts at 2am -> 3am
const beforeDST = new Date('2024-03-09T12:00:00');
const afterDST = DateUtils.addDays(beforeDST, 1);
// Correctly handles the 23-hour day
```

---

### addWeeks()

Add weeks to a date.

```javascript
DateUtils.addWeeks(date, weeks)
```

---

### addMonths()

Add months to a date.

```javascript
DateUtils.addMonths(date, months)
```

**Handles edge cases:**

```javascript
// Jan 31 + 1 month = Feb 29 (not Feb 31)
const jan31 = new Date('2024-01-31');
DateUtils.addMonths(jan31, 1); // 2024-02-29

// Jan 31 + 1 month in non-leap year = Feb 28
const jan31_2023 = new Date('2023-01-31');
DateUtils.addMonths(jan31_2023, 1); // 2023-02-28
```

---

### addYears()

Add years to a date.

```javascript
DateUtils.addYears(date, years)
```

---

## Comparison Methods

### isToday()

Check if a date is today.

```javascript
DateUtils.isToday(date)
```

---

### isPast()

Check if a date is in the past.

```javascript
DateUtils.isPast(date)
```

---

### isFuture()

Check if a date is in the future.

```javascript
DateUtils.isFuture(date)
```

---

### isSameDay()

Check if two dates are the same day.

```javascript
DateUtils.isSameDay(date1, date2)
```

**Example:**

```javascript
const d1 = new Date('2024-01-15T09:00:00');
const d2 = new Date('2024-01-15T17:00:00');
const d3 = new Date('2024-01-16T09:00:00');

DateUtils.isSameDay(d1, d2); // true
DateUtils.isSameDay(d1, d3); // false
```

---

### isSameWeek()

Check if two dates are in the same week.

```javascript
DateUtils.isSameWeek(date1, date2, weekStartsOn?)
```

---

### isSameMonth()

Check if two dates are in the same month.

```javascript
DateUtils.isSameMonth(date1, date2)
```

---

### isSameYear()

Check if two dates are in the same year.

```javascript
DateUtils.isSameYear(date1, date2)
```

---

## Difference Methods

### differenceInDays()

Get the difference in days between two dates.

```javascript
DateUtils.differenceInDays(date1, date2)
```

**Example:**

```javascript
const start = new Date('2024-01-01');
const end = new Date('2024-01-15');

DateUtils.differenceInDays(end, start); // 14
DateUtils.differenceInDays(start, end); // -14
```

---

### differenceInWeeks()

Get the difference in weeks.

```javascript
DateUtils.differenceInWeeks(date1, date2)
```

---

### differenceInMonths()

Get the difference in months.

```javascript
DateUtils.differenceInMonths(date1, date2)
```

---

## Query Methods

### getWeekNumber()

Get the week number of a date.

```javascript
DateUtils.getWeekNumber(date)
```

**Example:**

```javascript
DateUtils.getWeekNumber(new Date('2024-01-01')); // 1
DateUtils.getWeekNumber(new Date('2024-06-15')); // 24
```

---

### getDayOfWeek()

Get the day of week relative to week start.

```javascript
DateUtils.getDayOfWeek(date, weekStartsOn?)
```

**Example:**

```javascript
const wednesday = new Date('2024-01-17');

// Sunday start: Wednesday = 3
DateUtils.getDayOfWeek(wednesday, 0); // 3

// Monday start: Wednesday = 2
DateUtils.getDayOfWeek(wednesday, 1); // 2
```

---

### getDaysInMonth()

Get the number of days in a month.

```javascript
DateUtils.getDaysInMonth(date)
```

**Example:**

```javascript
DateUtils.getDaysInMonth(new Date('2024-02-01')); // 29 (leap year)
DateUtils.getDaysInMonth(new Date('2023-02-01')); // 28
DateUtils.getDaysInMonth(new Date('2024-01-01')); // 31
```

---

### isLeapYear()

Check if a year is a leap year.

```javascript
DateUtils.isLeapYear(year)
```

---

### getDateRange()

Get an array of dates between start and end.

```javascript
DateUtils.getDateRange(start, end)
```

**Example:**

```javascript
const dates = DateUtils.getDateRange(
  new Date('2024-01-15'),
  new Date('2024-01-18')
);
// [Jan 15, Jan 16, Jan 17, Jan 18]
```

---

## Format Methods

### format()

Format a date using Intl.DateTimeFormat.

```javascript
DateUtils.format(date, locale?, options?)
```

**Example:**

```javascript
const date = new Date('2024-01-15T14:30:00');

DateUtils.format(date);
// "1/15/2024"

DateUtils.format(date, 'en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "Monday, January 15, 2024"

DateUtils.format(date, 'de-DE');
// "15.1.2024"
```

---

### getMonthName()

Get the name of a month.

```javascript
DateUtils.getMonthName(date, locale?, format?)
```

**Parameters:**
- `format` (string) - 'long', 'short', or 'narrow'

**Example:**

```javascript
const date = new Date('2024-01-15');

DateUtils.getMonthName(date);              // "January"
DateUtils.getMonthName(date, 'en-US', 'short'); // "Jan"
DateUtils.getMonthName(date, 'en-US', 'narrow'); // "J"
DateUtils.getMonthName(date, 'es-ES');     // "enero"
```

---

### getDayName()

Get the name of a day.

```javascript
DateUtils.getDayName(date, locale?, format?)
```

---

### formatTime()

Format time portion of a date.

```javascript
DateUtils.formatTime(date, locale?, use24Hour?)
```

**Example:**

```javascript
const date = new Date('2024-01-15T14:30:00');

DateUtils.formatTime(date);              // "2:30 PM"
DateUtils.formatTime(date, 'en-US', true); // "14:30"
```

---

## Date String Methods

### getUTCDateString()

Get date as YYYY-MM-DD string (UTC).

```javascript
DateUtils.getUTCDateString(date)
```

---

### getLocalDateString()

Get date as YYYY-MM-DD string (local).

```javascript
DateUtils.getLocalDateString(date)
```

**Example:**

```javascript
const date = new Date('2024-01-15T14:30:00');

DateUtils.getLocalDateString(date); // "2024-01-15"
```

---

## Time Methods

### parseTime()

Parse a time string to hours and minutes.

```javascript
DateUtils.parseTime(timeString)
```

**Example:**

```javascript
DateUtils.parseTime('09:30');
// { hours: 9, minutes: 30 }

DateUtils.parseTime('14:00');
// { hours: 14, minutes: 0 }
```

---

### setTime()

Set time on a date.

```javascript
DateUtils.setTime(date, timeString)
```

**Example:**

```javascript
const date = new Date('2024-01-15');
const withTime = DateUtils.setTime(date, '14:30');
// 2024-01-15T14:30:00
```

---

## Timezone Methods

### toTimeZone()

Convert a date to a specific timezone.

```javascript
DateUtils.toTimeZone(date, timeZone)
```

**Example:**

```javascript
const utc = new Date('2024-01-15T14:00:00Z');
const ny = DateUtils.toTimeZone(utc, 'America/New_York');
// 2024-01-15T09:00:00 (UTC-5)
```

---

### getTimezoneOffset()

Get timezone offset in minutes.

```javascript
DateUtils.getTimezoneOffset(date, timeZone)
```

---

### isDST()

Check if DST is in effect.

```javascript
DateUtils.isDST(date, timeZone)
```

---

### addHoursWithDST()

Add hours accounting for DST transitions.

```javascript
DateUtils.addHoursWithDST(date, hours, timeZone)
```

---

### createInTimeZone()

Create a date in a specific timezone.

```javascript
DateUtils.createInTimeZone(year, month, day, hour?, minute?, second?, timeZone)
```

**Example:**

```javascript
// Create 9am in New York
const nyMorning = DateUtils.createInTimeZone(
  2024, 0, 15, 9, 0, 0, 'America/New_York'
);
```

---

## Utility Methods

### clone()

Clone a date.

```javascript
DateUtils.clone(date)
```

---

### isValidDate()

Check if a value is a valid date.

```javascript
DateUtils.isValidDate(value)
```

**Example:**

```javascript
DateUtils.isValidDate(new Date());           // true
DateUtils.isValidDate(new Date('invalid'));  // false
DateUtils.isValidDate('2024-01-15');         // false (not a Date)
DateUtils.isValidDate(null);                 // false
```

---

## Complete Example

```javascript
import { DateUtils } from '@forcecalendar/core';

// Calendar navigation
const currentDate = new Date();
const monthStart = DateUtils.startOfMonth(currentDate);
const monthEnd = DateUtils.endOfMonth(currentDate);

console.log(`Current month: ${DateUtils.getMonthName(currentDate)}`);
console.log(`Days in month: ${DateUtils.getDaysInMonth(currentDate)}`);

// Generate week headers
const weekStart = DateUtils.startOfWeek(currentDate, 1); // Monday
for (let i = 0; i < 7; i++) {
  const day = DateUtils.addDays(weekStart, i);
  console.log(DateUtils.getDayName(day, 'en-US', 'short'));
}
// Mon, Tue, Wed, Thu, Fri, Sat, Sun

// Generate calendar grid
const gridStart = DateUtils.startOfWeek(monthStart, 1);
const gridEnd = DateUtils.endOfWeek(monthEnd, 1);
const allDates = DateUtils.getDateRange(gridStart, gridEnd);

allDates.forEach(date => {
  const isCurrentMonth = DateUtils.isSameMonth(date, currentDate);
  const isToday = DateUtils.isToday(date);
  console.log(`${date.getDate()} ${isToday ? '(today)' : ''} ${!isCurrentMonth ? '(other month)' : ''}`);
});

// Navigation
const nextMonth = DateUtils.addMonths(currentDate, 1);
const prevMonth = DateUtils.addMonths(currentDate, -1);
const nextWeek = DateUtils.addWeeks(currentDate, 1);
const prevWeek = DateUtils.addWeeks(currentDate, -1);

// Event duration
const eventStart = new Date('2024-01-15T09:00:00');
const eventEnd = new Date('2024-01-18T17:00:00');
const days = DateUtils.differenceInDays(eventEnd, eventStart);
console.log(`Event spans ${days} days`);

// Format for display
console.log(DateUtils.format(eventStart, 'en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
}));
// "Mon, Jan 15, 9:00 AM"

// Timezone handling
const meeting = new Date('2024-01-15T14:00:00Z');
const localTime = DateUtils.toTimeZone(meeting, 'America/Los_Angeles');
console.log(`Meeting in LA: ${DateUtils.formatTime(localTime)}`);
```
