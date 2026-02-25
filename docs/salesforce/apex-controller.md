---
sidebar_position: 2
title: Apex Controller
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

Queries Event records in the given date range. If `recordId` is provided, filters by `WhoId` or `WhatId`.

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

All methods wrap exceptions in `AuraHandledException` for proper error propagation to the LWC layer. The LWC component displays errors via `ShowToastEvent`.
