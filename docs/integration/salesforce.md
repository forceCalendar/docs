# Salesforce Integration

ForceCalendar is specifically optimized for the Salesforce platform, providing native Lightning Web Components (LWC) that work within the Locker Service and Lightning Locker security models.

## Deployment

To deploy ForceCalendar to your Salesforce org:

1. Navigate to the `salesforce` directory.
2. Build the project: `npm run build`.
3. Deploy using Salesforce CLI:
   ```bash
   sf project deploy start
   ```

## Using in LWC

```html
<template>
    <c-force-calendar-lwc
        view="month"
        oncalendarevent={handleEvent}>
    </c-force-calendar-lwc>
</template>
```

## Apex Controllers

ForceCalendar includes support for Apex controllers to fetch and save events directly to Salesforce objects.

```java
public with sharing class CalendarController {
    @AuraEnabled(cacheable=true)
    public static List<Event> getEvents(Date startDate, Date endDate) {
        // Query logic here
    }
}
```
