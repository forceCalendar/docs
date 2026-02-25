---
sidebar_position: 2
title: Apex Controller
sidebar_label: Apex Controller
description: ForceCalendarController Apex methods for CRUD operations with CRUD/FLS enforcement.
---

# Apex Controller

`ForceCalendarController` provides Apex methods for CRUD operations on Salesforce Event records. All methods enforce CRUD/FLS via `WITH SECURITY_ENFORCED` and schema checks.

## Methods

### getEvents

```apex
@AuraEnabled(cacheable=true)
public static List<Map<String, Object>> getEvents(
    Datetime startDateTime,
    Datetime endDateTime,
    Id recordId
)
```

Queries Event records in the given date range. If `recordId` is provided, filters by `WhoId` or `WhatId`. Both `startDateTime` and `endDateTime` are required; omitting either throws an `AuraHandledException`.

**Returns** a list of maps with these keys:

| Key | Type | Source Field |
|-----|------|-------------|
| `id` | `Id` | `Event.Id` |
| `title` | `String` | `Event.Subject` |
| `start` | `Datetime` | `Event.StartDateTime` |
| `end` | `Datetime` | `Event.EndDateTime` |
| `allDay` | `Boolean` | `Event.IsAllDayEvent` |
| `description` | `String` | `Event.Description` |
| `location` | `String` | `Event.Location` |
| `whoId` | `Id` | `Event.WhoId` |
| `whatId` | `Id` | `Event.WhatId` |
| `backgroundColor` | `String` | Hardcoded `#0176D3` |

**Limits**: Returns up to 1,000 events, ordered by `StartDateTime ASC`.

**Wire usage in LWC**: The LWC component wires this method with reactive parameters `$_startDateTime`, `$_endDateTime`, and `$recordId`. When the user navigates or changes views, the date range parameters update and the wire adapter automatically re-fetches.

### createEvent

```apex
@AuraEnabled
public static Id createEvent(
    String title,
    Datetime startDateTime,
    Datetime endDateTime,
    Boolean isAllDay,
    String description,
    String location,
    Id whoId,
    Id whatId
)
```

Creates a new Event record. Validates:
- `Schema.sObjectType.Event.isCreateable()`
- Title is non-blank
- Start and end dates are provided
- End date is after start date

**Returns** the new Event Id.

:::note LWC Parameter Mapping
The LWC component currently passes `title`, `startDateTime`, `endDateTime`, `isAllDay`, and `description` from the calendar event data. The `location`, `whoId`, and `whatId` parameters are accepted by the Apex method but are not populated by the default LWC `_handleEventCreate` handler. To pass these values, extend the event handler or use the Apex method directly via imperative calls.
:::

### updateEvent

```apex
@AuraEnabled
public static void updateEvent(
    Id eventId,
    String title,
    Datetime startDateTime,
    Datetime endDateTime,
    Boolean isAllDay,
    String description,
    String location
)
```

Updates an existing Event. Only non-null parameters are applied. Validates:
- `Schema.sObjectType.Event.isUpdateable()`
- Event exists (`WITH SECURITY_ENFORCED`)
- End date is after start date (if both provided)

### deleteEvent

```apex
@AuraEnabled
public static void deleteEvent(Id eventId)
```

Deletes an Event record. Validates:
- `Schema.sObjectType.Event.isDeletable()`
- Event exists (`WITH SECURITY_ENFORCED`)

## Security

All SOQL queries use `WITH SECURITY_ENFORCED` to enforce field-level security and object-level permissions. DML operations check `isCreateable()`, `isUpdateable()`, and `isDeletable()` before executing.

The controller class uses `with sharing` to respect org sharing rules.

## Error Handling

All methods use a consistent exception handling pattern:

```apex
try {
    // Business logic
} catch (AuraHandledException e) {
    throw e;  // Re-throw known errors
} catch (Exception e) {
    throw new AuraHandledException(e.getMessage());  // Wrap unexpected errors
}
```

This ensures all errors reach the LWC layer as `AuraHandledException`, which the component displays via `ShowToastEvent`.

## Test Class

`ForceCalendarControllerTest` is included in the distribution and provides test coverage for all CRUD methods. It is deployed alongside the controller to satisfy Salesforce's code coverage requirements.
