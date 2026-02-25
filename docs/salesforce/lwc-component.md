---
sidebar_position: 3
title: LWC Component
sidebar_label: LWC Component
description: Lightning Web Component wrapper for forcecal-main with Apex data binding and event CRUD.
---

# LWC Component

The `forceCalendar` LWC wraps `<forcecal-main>` for use in Salesforce Lightning pages. It handles library loading, Apex data binding, and event CRUD.

## How It Works

1. **Load library**: `connectedCallback` loads the `forcecalendar` static resource via `loadScript`
2. **Create element**: `renderedCallback` creates a `<forcecal-main>` element and appends it to a `lwc:dom="manual"` container
3. **Wire data**: `@wire(getEvents)` fetches events from Apex and loads them into the calendar
4. **Handle events**: Custom event listeners on `<forcecal-main>` trigger Apex CRUD operations
5. **Refresh**: After each CRUD operation, `refreshApex` reloads the wire data

## Public API

| Method | Parameters | Description |
|--------|-----------|-------------|
| `@api refreshEvents()` | — | Force refresh from Salesforce |
| `@api addEvent(event)` | `EventData` | Add event to calendar UI |
| `@api setView(view)` | `'month' \| 'week' \| 'day'` | Change view |
| `@api goToDate(date)` | `Date` | Navigate to date |

## Public Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `@api currentView` | `String` | `'month'` | Current view type |
| `@api height` | `String` | `'800px'` | Calendar height |
| `@api recordId` | `Id` | `undefined` | Filter events by record |
| `@api readOnly` | `Boolean` | `false` | Disable event mutations |

## Events Dispatched

| Event | Detail | When |
|-------|--------|------|
| `navigate` | `{ action, date, view }` | User navigated |
| `viewchange` | `{ view }` | View changed |
| `dateselect` | `{ date }` | Date clicked |
| `eventcreate` | `{ ...eventData }` | Event created in Salesforce |
| `eventupdate` | `{ ...eventData }` | Event updated in Salesforce |
| `eventdelete` | `{ eventId }` | Event deleted from Salesforce |

## Date Range Calculation

The component calculates a date range based on the current view to limit the Apex query:

| View | Range |
|------|-------|
| Month | Previous month start to next month end |
| Week | -7 days to +7 days from current week |
| Day | -1 day to +1 day |

When the user navigates, the date range updates and the `@wire` adapter re-fetches events.

## Read-Only Mode

Set `readOnly="true"` to prevent event creation, updates, and deletion. Navigation and view changes still work. The `calendar-event-added`, `calendar-event-updated`, and `calendar-event-deleted` listeners are skipped.
