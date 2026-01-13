# Architecture Overview

This document explains the internal architecture of ForceCalendar Core, the design decisions behind it, and how the components work together.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Your Application                          │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          Calendar                                │
│  The main orchestrator. Creates and coordinates all components.  │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ EventStore  │  │StateManager │  │   TimezoneManager       │  │
│  │             │  │             │  │   (Singleton)           │  │
│  │ events: Map │  │ state: {}   │  │                         │  │
│  │ indices: {} │  │ history: [] │  │ offsetCache: Map        │  │
│  │ listeners   │  │ listeners   │  │ database: TimezoneDB    │  │
│  └──────┬──────┘  └─────────────┘  └─────────────────────────┘  │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Supporting Classes                        ││
│  │  ┌─────────┐  ┌─────────────────┐  ┌───────────┐            ││
│  │  │  Event  │  │RecurrenceEngine │  │ ICSParser │            ││
│  │  └─────────┘  └─────────────────┘  └───────────┘            ││
│  │  ┌───────────┐  ┌────────────┐  ┌─────────────────────┐     ││
│  │  │ DateUtils │  │EventSearch │  │ PerformanceOptimizer│     ││
│  │  └───────────┘  └────────────┘  └─────────────────────┘     ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### Calendar (Orchestrator)

The `Calendar` class is the main entry point and orchestrator. It:

- Creates and owns `EventStore`, `StateManager`
- Uses the shared `TimezoneManager` singleton
- Provides a unified API for all calendar operations
- Manages event subscriptions and notifications
- Generates view-specific data (month/week/day/list)

```javascript
class Calendar {
  constructor(config) {
    this.timezoneManager = TimezoneManager.getInstance();
    this.eventStore = new EventStore({ timezone: config.timeZone });
    this.state = new StateManager({ ... });
    this.listeners = new Map();
  }
}
```

### EventStore (Data Layer)

The `EventStore` manages all event data with optimized querying:

**Primary Storage:**
```javascript
this.events = new Map();  // id -> Event (O(1) lookup)
```

**Indices for Fast Queries:**
```javascript
this.indices = {
  byDate: new Map(),     // 'YYYY-MM-DD' -> Set<eventId>
  byMonth: new Map(),    // 'YYYY-MM' -> Set<eventId>
  recurring: new Set(),  // Set<eventId>
  byCategory: new Map(), // category -> Set<eventId>
  byStatus: new Map()    // status -> Set<eventId>
};
```

**Why This Design:**
- `Map` for O(1) lookups by ID
- Date indices use consistent `YYYY-MM-DD` format strings
- Events are indexed on add, unindexed on remove
- Lazy indexing for events spanning many days (>7 days)

### StateManager (UI State)

The `StateManager` handles application state with undo/redo:

```javascript
this.state = {
  view: 'month',           // Current view type
  currentDate: new Date(), // Focused date
  selectedEventId: null,   // Currently selected
  weekStartsOn: 0,         // Sunday = 0
  timeZone: 'UTC',         // Calendar timezone
  filters: { ... },        // Active filters
  // ... more state
};

this.history = [];         // State history for undo
this.historyIndex = -1;    // Current position
```

**Key Features:**
- Immutable state updates (new object on each change)
- Deep cloning for history (prevents reference sharing)
- Key-specific subscriptions via `watch()`
- Global subscriptions via `subscribe()`

### TimezoneManager (Singleton)

A shared singleton to avoid memory bloat:

```javascript
// Bad: Each Event creates its own TimezoneManager
constructor() {
  this.timezoneManager = new TimezoneManager(); // Memory leak!
}

// Good: All Events share one instance
constructor() {
  this.timezoneManager = TimezoneManager.getInstance();
}
```

**Why Singleton:**
- Timezone calculations are expensive
- Offset cache is shared across all events
- Single database instance saves memory
- `getInstance()` pattern for testability

### Event (Data Model)

The `Event` class is the data model for calendar events:

```javascript
class Event {
  constructor(data) {
    // Validation
    Event.validate(Event.normalize(data));

    // Store both local and UTC times
    this.start = normalizedData.start;
    this.startUTC = this._timezoneManager.toUTC(this.start, this.timeZone);

    // Computed property caching
    this._cache = {};
  }

  get duration() {
    if (!this._cache.duration) {
      this._cache.duration = this.endUTC - this.startUTC;
    }
    return this._cache.duration;
  }
}
```

**Design Decisions:**
- Always clone input Date objects (prevent mutation)
- Store both local time and UTC for queries
- Cache computed properties (duration, isMultiDay)
- Static `normalize()` and `validate()` for reuse

## Data Flow

### Adding an Event

```
1. calendar.addEvent(data)
       │
       ▼
2. EventStore.addEvent(data)
       │
       ├─► Create Event instance (validates, normalizes)
       ├─► Store in events Map
       ├─► Index by date/month/category
       └─► Notify listeners
       │
       ▼
3. Calendar emits 'eventAdd' event
```

### Querying Events

```
1. calendar.getEventsForDate(date)
       │
       ▼
2. EventStore.getEventsForDate(date)
       │
       ├─► Convert date to index key (YYYY-MM-DD)
       ├─► Look up candidates from byDate index
       ├─► Also check byMonth for long-running events
       └─► Filter to events that actually overlap
       │
       ▼
3. Return sorted array of Event instances
```

### State Changes

```
1. calendar.setView('week')
       │
       ▼
2. StateManager.setState({ view: 'week' })
       │
       ├─► Create new state object
       ├─► Check if actually changed
       ├─► Deep clone to history
       └─► Notify listeners
       │
       ▼
3. Calendar emits 'stateChange' event
```

## Performance Optimizations

### 1. Spatial Indexing

Events are indexed by date for O(1) lookups:

```javascript
// Without index: O(n) scan
events.filter(e => e.occursOn(date));

// With index: O(1) lookup + filter
const candidates = indices.byDate.get(dateKey);
candidates.filter(id => events.get(id).occursOn(date));
```

### 2. Lazy Indexing

Events spanning many days (>7) only index boundaries:

```javascript
// Instead of indexing all 30 days:
[Jan 1, Jan 2, Jan 3, ..., Jan 30]

// Only index first and last week:
[Jan 1-7] + [Jan 24-30]

// Middle dates found via byMonth index
```

### 3. Caching

Multiple cache layers:

```javascript
// TimezoneManager caches offsets
offsetCache: new Map()  // 'tz_2024_1_15' -> offset

// Event caches computed properties
_cache: { duration: 3600000, isMultiDay: false }

// PerformanceOptimizer caches queries
queryCache: new Map()   // 'query_hash' -> results
```

### 4. DST-Safe Date Arithmetic

```javascript
// WRONG: Millisecond arithmetic breaks on DST
result.setTime(date.getTime() + days * 86400000);

// RIGHT: Calendar arithmetic handles DST
result.setDate(result.getDate() + days);
```

## Error Handling

### Validation

Events are validated on creation:

```javascript
static validate(data) {
  if (!data.id) throw new Error('Event must have an id');
  if (!data.title) throw new Error('Event must have a title');
  if (!data.start) throw new Error('Event must have a start date');
  if (data.end < data.start) throw new Error('End before start');
}
```

### Batch Operations with Rollback

```javascript
eventStore.startBatch(enableRollback: true);
try {
  // Multiple operations...
  eventStore.commitBatch();
} catch (error) {
  eventStore.rollbackBatch();  // Restore previous state
}
```

## Extension Points

### Event Listeners

```javascript
calendar.on('eventAdd', callback);
calendar.on('eventUpdate', callback);
calendar.on('eventRemove', callback);
calendar.on('viewChange', callback);
calendar.on('navigate', callback);
```

### State Watchers

```javascript
state.watch('view', (newView, oldView) => { ... });
state.watch(['currentDate', 'view'], callback);
state.subscribe((newState, oldState) => { ... });
```

### Plugins

```javascript
const myPlugin = {
  install(calendar) {
    calendar.on('eventAdd', this.onEventAdd);
  },
  uninstall(calendar) {
    calendar.off('eventAdd', this.onEventAdd);
  }
};

calendar.use(myPlugin);
```

## File Structure

```
core/
├── calendar/
│   ├── Calendar.js      # Main orchestrator
│   └── DateUtils.js     # Date manipulation utilities
├── events/
│   ├── Event.js         # Event data model
│   ├── EventStore.js    # Event storage and indexing
│   ├── RecurrenceEngine.js  # RRULE expansion
│   └── RRuleParser.js   # RRULE string parsing
├── state/
│   └── StateManager.js  # Application state
├── timezone/
│   ├── TimezoneManager.js   # Timezone operations
│   └── TimezoneDatabase.js  # Timezone data
├── ics/
│   ├── ICSParser.js     # ICS parsing
│   └── ICSHandler.js    # ICS import/export
├── search/
│   └── EventSearch.js   # Full-text search
├── performance/
│   ├── PerformanceOptimizer.js
│   └── LRUCache.js
├── conflicts/
│   └── ConflictDetector.js
└── index.js             # Public exports
```
