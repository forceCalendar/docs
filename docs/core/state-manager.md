---
sidebar_position: 4
title: StateManager
sidebar_label: StateManager
description: Central state management with immutable updates, subscriptions, and undo/redo history.
---

# StateManager

Central state management with immutable updates, property-level subscriptions, and undo/redo history.

```javascript
import { StateManager } from '@forcecalendar/core';

const state = new StateManager({
  view: 'month',
  locale: 'en-US',
  weekStartsOn: 1
});
```

## Default State

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `view` | `string` | `'month'` | Current view type |
| `currentDate` | `Date` | `new Date()` | Displayed date |
| `selectedEventId` | `string?` | `null` | Selected event ID |
| `selectedDate` | `Date?` | `null` | Selected date |
| `hoveredEventId` | `string?` | `null` | Hovered event ID |
| `hoveredDate` | `Date?` | `null` | Hovered date |
| `weekStartsOn` | `number` | `0` | Week start (0=Sun) |
| `showWeekNumbers` | `boolean` | `false` | Show week numbers |
| `showWeekends` | `boolean` | `true` | Show weekends |
| `fixedWeekCount` | `boolean` | `true` | 6-week month view |
| `timeZone` | `string` | System TZ | IANA timezone |
| `locale` | `string` | `'en-US'` | Locale |
| `hourFormat` | `'12h' \| '24h'` | `'12h'` | Hour format |
| `businessHours` | `object` | `{ start: '09:00', end: '17:00' }` | Business hours |
| `filters` | `FilterState` | See below | Active filters |
| `isDragging` | `boolean` | `false` | Drag state |
| `isResizing` | `boolean` | `false` | Resize state |
| `isCreating` | `boolean` | `false` | Create state |
| `isLoading` | `boolean` | `false` | Loading flag |
| `loadingMessage` | `string` | `''` | Loading text |
| `error` | `string?` | `null` | Error message |
| `metadata` | `object` | `{}` | Custom data |

### FilterState

| Key | Type | Default |
|-----|------|---------|
| `searchTerm` | `string` | `''` |
| `categories` | `string[]` | `[]` |
| `showAllDay` | `boolean` | `true` |
| `showTimed` | `boolean` | `true` |

## Reading State

```javascript
state.getState();       // Returns frozen state snapshot
state.get('view');      // Get a single key
state.get('filters');   // Get nested object
```

## Updating State

```javascript
// Object form
state.setState({ view: 'week' });

// Function updater
state.setState(current => ({
  filters: { ...current.filters, searchTerm: 'standup' }
}));
```

## Subscriptions

```javascript
// Global subscription (fires on any change)
const unsub = state.subscribe((newState, oldState) => {
  if (newState.view !== oldState.view) {
    console.log('View changed to', newState.view);
  }
});

unsub();
```

## Navigation Helpers

```javascript
state.setView('week');
state.setCurrentDate(new Date());
state.navigateNext();
state.navigatePrevious();
state.navigateToday();
```

## Selection

```javascript
state.selectEvent('evt-1');
state.clearEventSelection();
state.selectDate(new Date());
state.clearDateSelection();
```

## History (Undo/Redo)

StateManager maintains a history stack (max 50 entries by default) for undo/redo support.
