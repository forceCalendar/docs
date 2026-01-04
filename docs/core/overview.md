# Core Overview

The `@forcecalendar/core` library is the heart of the ForceCalendar ecosystem. It provides all the logic for calendar management, event handling, and recurrence without being tied to any specific UI framework.

## Key Concepts

### Calendar Engine
The `Calendar` class is the main entry point. It manages the state, configuration, and event store.

### Event Store
A high-performance store for calendar events, utilizing spatial indexing to allow for rapid querying of events within specific date ranges.

### Recurrence Engine
Handles complex recurring event patterns (RRule) and expands them into individual event instances for rendering.

### Timezone Management
Built-in support for IANA timezones, ensuring events are correctly displayed and adjusted across different regions.

## Usage Example

```javascript
import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  timeZone: 'UTC',
  initialView: 'month'
});

calendar.on('eventAdd', (event) => {
  console.log('Event added:', event.title);
});
```
