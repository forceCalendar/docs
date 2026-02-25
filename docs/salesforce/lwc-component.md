---
sidebar_position: 3
title: LWC Component
sidebar_label: LWC Component
description: Lightning Web Component wrapper for forcecal-main with Apex data binding and event CRUD.
---

# LWC Component

The `forceCalendar` LWC wraps `<forcecal-main>` for use in Salesforce Lightning pages. It handles library loading, Apex data binding, and event CRUD.

## Screenshots

### Month View
![Month View](/img/salesforce/monthview.png)

### Week View
![Week View](/img/salesforce/weekview.png)

### Day View
![Day View](/img/salesforce/dayview.png)

## How It Works

1. **Load library**: `connectedCallback` loads the `forcecalendar` static resource via `loadScript`, then calls `_tryInit()`
2. **Initialize (race-condition safe)**: `_tryInit()` is called from **both** `connectedCallback` (after load) and `renderedCallback`. Whichever fires last with all prerequisites met creates the `<forcecal-main>` element.
3. **Wire data**: `@wire(getEvents)` fetches events from Apex and loads them into the calendar
4. **Handle events**: Custom event listeners on `<forcecal-main>` trigger Apex CRUD operations
5. **Refresh**: After each CRUD operation, `refreshApex` reloads the wire data
6. **Cleanup**: `disconnectedCallback` removes the calendar element from the DOM

### The `_tryInit()` Pattern

Salesforce LWC has a timing issue: `renderedCallback` can fire before `loadScript` completes (since `loadScript` is async), and `connectedCallback` may complete before the template is rendered. The solution is the `_tryInit()` guard pattern:

```javascript
async connectedCallback() {
    this._calculateDateRange();
    if (!this._libraryLoaded) {
        try {
            await loadScript(this, FORCECALENDAR_LIB);
            this._libraryLoaded = true;
            this._tryInit();
        } catch (err) {
            this._error = 'Failed to load calendar library';
        }
    }
}

renderedCallback() {
    this._tryInit();
}

_tryInit() {
    if (!this._libraryLoaded || this._calendarElement) {
        return;
    }
    const container = this.template.querySelector('.calendar-container');
    if (!container) {
        return;
    }
    this._initCalendar();
}
```

`_tryInit()` checks three conditions before initializing:
- The library must be loaded (`_libraryLoaded`)
- The calendar must not already exist (`_calendarElement`)
- The DOM container must be available (`.calendar-container`)

This guarantees initialization happens exactly once, regardless of lifecycle timing.

### Element Creation

The `<forcecal-main>` element is created dynamically to bypass Salesforce's static module analysis, which would reject an unrecognized element name at compile time:

```javascript
// Dynamic element name to bypass Salesforce static module analysis
const tag = ['forcecal', 'main'].join('-');
this._calendarElement = document.createElement(tag);
```

The element is appended to a `lwc:dom="manual"` container in the template:

```html
<div class="calendar-container" lwc:dom="manual"></div>
```

### Wire Data Timing

If the `@wire` adapter returns data before the calendar element is created, the data is cached in `_wiredEventResult`. When `_initCalendar()` runs, it checks for pending data and loads it immediately:

```javascript
// If wire data already arrived before the calendar was ready, load it now
if (this._wiredEventResult && this._wiredEventResult.data) {
    this._loadEventsIntoCalendar(this._wiredEventResult.data);
}
```

## Public API

| Method | Parameters | Description |
|--------|-----------|-------------|
| `@api refreshEvents()` | -- | Force refresh from Salesforce via `refreshApex` |
| `@api addEvent(event)` | `EventData` | Add event to calendar UI (does not persist to Salesforce) |
| `@api setView(view)` | `'month' \| 'week' \| 'day'` | Change view and recalculate date range |
| `@api goToDate(date)` | `Date` | Navigate to date and recalculate date range |

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

## Internal Event Listeners

The component listens for these events from `<forcecal-main>`:

| forcecal-main Event | Handler | Behavior |
|---------------------|---------|----------|
| `calendar-navigate` | `_handleNavigate` | Updates date range, re-dispatches as `navigate` |
| `calendar-view-change` | `_handleViewChange` | Updates `currentView` and date range, re-dispatches as `viewchange` |
| `calendar-date-select` | -- | Re-dispatches as `dateselect` |
| `calendar-event-added` | `_handleEventCreate` | Calls `createEvent` Apex, then `refreshApex` (skipped in read-only mode) |
| `calendar-event-updated` | `_handleEventUpdate` | Calls `updateEvent` Apex, then `refreshApex` (skipped in read-only mode) |
| `calendar-event-deleted` | `_handleEventDelete` | Calls `deleteEvent` Apex, then `refreshApex` (skipped in read-only mode) |

## Date Range Calculation

The component calculates a date range based on the current view to limit the Apex query:

| View | Range |
|------|-------|
| Month | Previous month start to next month end |
| Week | -7 days to +7 days from current week |
| Day | -1 day to +1 day |

When the user navigates, the date range updates and the `@wire` adapter re-fetches events automatically (since `_startDateTime` and `_endDateTime` are reactive wire parameters).

## Read-Only Mode

Set `readOnly="true"` to prevent event creation, updates, and deletion. Navigation and view changes still work. The `calendar-event-added`, `calendar-event-updated`, and `calendar-event-deleted` listeners are skipped.

## Template Structure

The LWC template provides SLDS-styled UI with loading and error states:

```html
<template>
    <div class="slds-card slds-p-around_medium calendar-wrapper">
        <!-- Loading Spinner -->
        <template if:true={showSpinner}>
            <lightning-spinner
                alternative-text="Loading events..."
                size="large"
                variant="brand">
            </lightning-spinner>
        </template>

        <!-- Error Message with Retry -->
        <template if:true={hasError}>
            <div class="slds-box slds-theme_shade slds-m-bottom_medium error-box"
                 role="alert">
                <p class="slds-text-color_error">
                    <lightning-icon icon-name="utility:error"
                                   variant="error" size="small"
                                   class="slds-m-right_x-small">
                    </lightning-icon>
                    {errorMessage}
                </p>
                <lightning-button label="Retry"
                                  onclick={refreshEvents}
                                  variant="base"
                                  class="slds-m-top_small">
                </lightning-button>
            </div>
        </template>

        <!-- Calendar Container (manual DOM) -->
        <div class="calendar-container" lwc:dom="manual"></div>

        <!-- Refresh Button -->
        <div class="slds-m-top_small slds-text-align_right">
            <lightning-button-icon
                icon-name="utility:refresh"
                alternative-text="Refresh Events"
                title="Refresh Events"
                onclick={refreshEvents}
                variant="border-filled">
            </lightning-button-icon>
        </div>
    </div>
</template>
```

## Cleanup

The `disconnectedCallback` removes the calendar element from the DOM and nullifies the reference to prevent memory leaks:

```javascript
disconnectedCallback() {
    if (this._calendarElement) {
        const container = this.template.querySelector('.calendar-container');
        if (container && this._calendarElement.parentNode === container) {
            container.removeChild(this._calendarElement);
        }
        this._calendarElement = null;
    }
}
```
