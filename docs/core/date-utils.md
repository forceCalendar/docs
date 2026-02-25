---
sidebar_position: 7
title: DateUtils
sidebar_label: DateUtils
description: Date calculation and locale-aware formatting utilities.
---

# DateUtils

Date calculation and formatting utilities used internally by Calendar. Also available for direct use.

```javascript
import { DateUtils } from '@forcecalendar/core';
```

## Date Calculations

```javascript
DateUtils.addDays(date, 5);         // Add 5 days
DateUtils.startOfWeek(date, 0);     // Start of week (0 = Sunday)
DateUtils.endOfWeek(date, 0);       // End of week
DateUtils.isToday(date);            // Boolean
DateUtils.getWeekNumber(date);      // ISO week number
DateUtils.getDayOfWeek(date, weekStartsOn); // Day index within week
```

## Formatting

```javascript
DateUtils.getMonthName(date, 'en-US');  // 'March'
DateUtils.getDayName(date, 'en-US');    // 'Monday'
DateUtils.formatTime(date, 'en-US');    // '9:00 AM'
```

All formatting methods accept a locale string and delegate to `Intl.DateTimeFormat`.
