# Installation

Learn how to install and set up ForceCalendar in your project.

## Prerequisites

Before installing ForceCalendar, ensure you have:

- Node.js 16+ (for web projects)
- npm or yarn package manager
- Basic knowledge of JavaScript/TypeScript

## Installation Methods

### Core Library (JavaScript)

Install the core calendar engine:

```bash
npm install @forcecalendar/core
# or
yarn add @forcecalendar/core
```

### Web Interface

Install the web components interface:

```bash
npm install @forcecalendar/interface
# or
yarn add @forcecalendar/interface
```

### Salesforce Integration

For Salesforce projects, use our pre-built LWC:

```bash
# Clone the Salesforce integration repo
git clone https://github.com/forcecalendar/salesforce.git
cd salesforce

# Build the distribution
npm run build

# Deploy to your Salesforce org
sf project deploy start
```

## Basic Setup

### Using Core Library

```javascript
import { Calendar, Event } from '@forcecalendar/core';

// Create a calendar instance
const calendar = new Calendar({
  timeZone: 'America/New_York',
  view: 'month'
});

// Add an event
const event = new Event({
  id: 'meeting-1',
  title: 'Team Meeting',
  start: new Date('2024-12-25T10:00:00'),
  end: new Date('2024-12-25T11:00:00'),
  timeZone: 'America/New_York'
});

calendar.addEvent(event);
```

### Using Web Components

```html
<!DOCTYPE html>
<html>
<head>
  <title>ForceCalendar Demo</title>
  <script type="module" src="@forcecalendar/interface"></script>
</head>
<body>
  <force-calendar 
    view="month"
    timezone="America/New_York"
    height="800px">
  </force-calendar>
</body>
</html>
```

### Using with React

```jsx
import React, { useEffect, useRef } from 'react';
import '@forcecalendar/interface';

function CalendarComponent() {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      // Calendar is ready
      const calendar = calendarRef.current;
      calendar.addEvent({
        id: 'event-1',
        title: 'React Meeting',
        start: new Date(),
        end: new Date(Date.now() + 3600000)
      });
    }
  }, []);

  return (
    <force-calendar 
      ref={calendarRef}
      view="week"
      timezone="UTC">
    </force-calendar>
  );
}
```

## Salesforce-Specific Setup

### Lightning Web Component

1. **Deploy the LWC**:
   ```bash
   sf project deploy start --source-dir force-app/main/default/lwc
   ```

2. **Use in your component**:
   ```html
   <template>
     <c-forceCalendar 
       view="month"
       oncalendarevent="handleCalendarEvent">
     </c-forceCalendar>
   </template>
   ```

3. **JavaScript controller**:
   ```javascript
   import { LightningElement } from 'lwc';
   import getEvents from '@salesforce/apex/ForceCalendarController.getEvents';
   
   export default class MyCalendar extends LightningElement {
     handleCalendarEvent(event) {
       console.log('Calendar event:', event.detail);
     }
     
     connectedCallback() {
       getEvents()
         .then(events => {
           this.template.querySelector('c-forceCalendar').setEvents(events);
         })
         .catch(error => {
           console.error('Error loading events:', error);
         });
     }
   }
   ```

## Next Steps

Now that you have ForceCalendar installed, check out our:

- [Quick Start Guide](quick-start) - Get up and running quickly
- [Core Concepts](core/calendar) - Learn about the calendar architecture
- [API Reference](/api) - Detailed API documentation
