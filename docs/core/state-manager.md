# StateManager

The `StateManager` class handles application state with built-in undo/redo support.

## Import

```javascript
import { StateManager } from '@forcecalendar/core';
```

## Constructor

```javascript
new StateManager(initialState?)
```

### Initial State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `view` | string | 'month' | Current view type |
| `currentDate` | Date | now | Focused date |
| `selectedEventId` | string | null | Selected event ID |
| `selectedDate` | Date | null | Selected date |
| `hoveredEventId` | string | null | Hovered event ID |
| `hoveredDate` | Date | null | Hovered date |
| `weekStartsOn` | number | 0 | Week start (0=Sun) |
| `showWeekNumbers` | boolean | false | Show week numbers |
| `showWeekends` | boolean | true | Show weekend days |
| `fixedWeekCount` | boolean | true | Always 6 weeks in month |
| `timeZone` | string | system | Calendar timezone |
| `locale` | string | 'en-US' | Locale for formatting |
| `hourFormat` | string | '12h' | '12h' or '24h' |
| `businessHours` | object | {start:'09:00',end:'17:00'} | Business hours |
| `filters` | object | {} | Active filters |
| `isDragging` | boolean | false | Drag state |
| `isResizing` | boolean | false | Resize state |
| `isCreating` | boolean | false | Create state |
| `isLoading` | boolean | false | Loading state |
| `loadingMessage` | string | '' | Loading message |
| `error` | string | null | Error message |
| `metadata` | object | {} | Custom data |

### Example

```javascript
const state = new StateManager({
  view: 'week',
  weekStartsOn: 1,
  hourFormat: '24h',
  timeZone: 'Europe/London'
});
```

---

## Getting State

### getState()

Get the full state object (frozen/immutable).

```javascript
state.getState()
```

**Returns:** `Object` - Frozen state object

**Example:**

```javascript
const currentState = state.getState();
console.log(currentState.view);        // 'month'
console.log(currentState.currentDate); // Date object
```

---

### get()

Get a specific state value.

```javascript
state.get(key)
```

**Parameters:**
- `key` (string) - State key

**Returns:** Value of the state property

**Example:**

```javascript
state.get('view');         // 'month'
state.get('currentDate');  // Date
state.get('filters');      // { ... }
```

---

## Setting State

### setState()

Update state with partial updates.

```javascript
state.setState(updates)
state.setState(updaterFn)
```

**Parameters:**
- `updates` (object) - Fields to update
- `updaterFn` (function) - Function that receives current state and returns updates

**Example:**

```javascript
// Object form
state.setState({ view: 'week' });

// Function form (for updates based on current state)
state.setState(current => ({
  currentDate: new Date(current.currentDate.getTime() + 86400000)
}));

// Multiple updates
state.setState({
  view: 'day',
  selectedDate: new Date()
});
```

---

## Convenience Methods

### setView()

Set the current view.

```javascript
state.setView(view)
```

**Parameters:**
- `view` (string) - 'month', 'week', 'day', or 'list'

**Throws:** Error if invalid view

---

### setCurrentDate()

Set the focused date.

```javascript
state.setCurrentDate(date)
```

**Parameters:**
- `date` (Date | string) - Target date

---

### navigateNext()

Navigate to next period.

```javascript
state.navigateNext()
```

- Month view: next month
- Week view: next week
- Day view: next day

---

### navigatePrevious()

Navigate to previous period.

```javascript
state.navigatePrevious()
```

---

### navigateToday()

Navigate to today.

```javascript
state.navigateToday()
```

---

### selectEvent()

Select an event.

```javascript
state.selectEvent(eventId)
```

---

### clearEventSelection()

Clear event selection.

```javascript
state.clearEventSelection()
```

---

### selectDate()

Select a date.

```javascript
state.selectDate(date)
```

---

### clearDateSelection()

Clear date selection.

```javascript
state.clearDateSelection()
```

---

### setLoading()

Set loading state.

```javascript
state.setLoading(isLoading, message?)
```

**Example:**

```javascript
state.setLoading(true, 'Loading events...');
// ... async operation
state.setLoading(false);
```

---

### setError()

Set error state.

```javascript
state.setError(error)
```

**Parameters:**
- `error` (Error | string | null) - Error to display

---

### updateFilters()

Update filter settings.

```javascript
state.updateFilters(filters)
```

**Example:**

```javascript
state.updateFilters({
  searchTerm: 'meeting',
  categories: ['work', 'personal'],
  showAllDay: false
});
```

---

## Subscriptions

### subscribe()

Subscribe to all state changes.

```javascript
state.subscribe(callback)
```

**Parameters:**
- `callback` (function) - Called with (newState, oldState)

**Returns:** Unsubscribe function

**Example:**

```javascript
const unsubscribe = state.subscribe((newState, oldState) => {
  console.log('State changed');
  console.log('View:', oldState.view, '->', newState.view);
});

// Later:
unsubscribe();
```

---

### watch()

Subscribe to specific state key changes.

```javascript
state.watch(keys, callback)
```

**Parameters:**
- `keys` (string | string[]) - Key(s) to watch
- `callback` (function) - Called when watched keys change

**Returns:** Unsubscribe function

**Callback Arguments:**
- `newValue` - New value of the key
- `oldValue` - Previous value
- `newState` - Full new state
- `oldState` - Full old state

**Example:**

```javascript
// Watch single key
state.watch('view', (newView, oldView) => {
  console.log(`View changed: ${oldView} -> ${newView}`);
});

// Watch multiple keys
state.watch(['currentDate', 'view'], (newVal, oldVal, newState) => {
  console.log('Date or view changed');
});
```

---

## Undo/Redo

### canUndo()

Check if undo is available.

```javascript
state.canUndo() // boolean
```

---

### canRedo()

Check if redo is available.

```javascript
state.canRedo() // boolean
```

---

### getUndoCount()

Get number of undo operations available.

```javascript
state.getUndoCount() // number
```

---

### getRedoCount()

Get number of redo operations available.

```javascript
state.getRedoCount() // number
```

---

### undo()

Undo the last state change.

```javascript
state.undo()
```

**Returns:** `boolean` - True if undo was performed

**Example:**

```javascript
state.setState({ view: 'month' });
state.setState({ view: 'week' });
state.setState({ view: 'day' });

state.get('view'); // 'day'

state.undo();
state.get('view'); // 'week'

state.undo();
state.get('view'); // 'month'

state.redo();
state.get('view'); // 'week'
```

---

### redo()

Redo the next state change.

```javascript
state.redo()
```

**Returns:** `boolean` - True if redo was performed

---

### reset()

Reset to initial state.

```javascript
state.reset()
```

Clears history and restores initial state.

---

## History Configuration

The StateManager maintains a history of state changes for undo/redo:

```javascript
state.maxHistorySize = 50;  // Maximum history entries (default: 50)
```

When history exceeds `maxHistorySize`, oldest entries are removed.

---

## Deep Clone Strategy

State history uses deep cloning to prevent reference sharing:

```javascript
// Without deep clone (BAD - reference sharing)
history.push(currentState);
currentState.filters.categories.push('new');
// History entry is corrupted!

// With deep clone (GOOD)
history.push(deepClone(currentState));
currentState.filters.categories.push('new');
// History entry is safe
```

The StateManager deep clones:
- Date objects (creates new Date)
- Arrays (recursively clones elements)
- Objects (recursively clones properties)

---

## Filter Object

```javascript
{
  searchTerm: string,    // Text search
  categories: string[],  // Category filter
  showAllDay: boolean,   // Show all-day events
  showTimed: boolean     // Show timed events
}
```

---

## Business Hours Object

```javascript
{
  start: string,  // Start time (e.g., '09:00')
  end: string     // End time (e.g., '17:00')
}
```

---

## Complete Example

```javascript
import { StateManager } from '@forcecalendar/core';

// Create with initial state
const state = new StateManager({
  view: 'month',
  weekStartsOn: 1,
  timeZone: 'America/New_York',
  hourFormat: '24h'
});

// Subscribe to all changes
const unsubscribeAll = state.subscribe((newState, oldState) => {
  console.log('State changed');
});

// Watch specific keys
const unsubscribeView = state.watch('view', (newView, oldView) => {
  console.log(`View: ${oldView} -> ${newView}`);
  // Update UI, fetch data, etc.
});

const unsubscribeDate = state.watch('currentDate', (newDate) => {
  console.log(`Navigated to: ${newDate.toDateString()}`);
});

// Navigation
state.setView('week');
state.navigateNext();
state.navigateToday();

// Selection
state.selectEvent('event-123');
state.selectDate(new Date('2024-01-15'));

// Loading state
state.setLoading(true, 'Fetching events...');
// ... async operation
state.setLoading(false);

// Error handling
try {
  // ... operation
} catch (error) {
  state.setError(error.message);
}

// Filters
state.updateFilters({
  searchTerm: 'meeting',
  categories: ['work']
});

// Undo/Redo
console.log(`Undo available: ${state.canUndo()}`);
console.log(`Redo available: ${state.canRedo()}`);

state.undo();
state.redo();

// Get current state
const current = state.getState();
console.log(current);

// Cleanup
unsubscribeAll();
unsubscribeView();
unsubscribeDate();
state.reset();
```

---

## React Integration Example

```jsx
import { useState, useEffect, useMemo } from 'react';
import { StateManager } from '@forcecalendar/core';

function useCalendarState(initialState) {
  const stateManager = useMemo(() => new StateManager(initialState), []);
  const [state, setState] = useState(stateManager.getState());

  useEffect(() => {
    const unsubscribe = stateManager.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, [stateManager]);

  return [state, stateManager];
}

function CalendarApp() {
  const [state, manager] = useCalendarState({
    view: 'month',
    weekStartsOn: 1
  });

  return (
    <div>
      <button onClick={() => manager.setView('month')}>Month</button>
      <button onClick={() => manager.setView('week')}>Week</button>
      <button onClick={() => manager.navigatePrevious()}>Prev</button>
      <button onClick={() => manager.navigateToday()}>Today</button>
      <button onClick={() => manager.navigateNext()}>Next</button>
      <button onClick={() => manager.undo()} disabled={!manager.canUndo()}>
        Undo
      </button>

      <p>View: {state.view}</p>
      <p>Date: {state.currentDate.toDateString()}</p>
    </div>
  );
}
```
