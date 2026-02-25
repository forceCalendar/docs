---
sidebar_position: 3
title: Architecture
sidebar_label: Architecture
description: Layered architecture overview of ForceCalendar's core, interface, and Salesforce integration.
---

# Architecture

ForceCalendar uses a layered architecture where each layer depends only on the one below it.

```
+-----------------------------------------------------+
|                   Applications                       |
|  +-----------+  +---------------+  +--------------+  |
|  |    www    |  |  Salesforce   |  |  Your App    |  |
|  | (Next.js) |  |    (LWC)     |  | (React/Vue/…)|  |
|  +-----------+  +---------------+  +--------------+  |
+-----------------------------------------------------+
                        |
+-----------------------------------------------------+
|              @forcecalendar/interface                 |
|  Web Components . View Renderers . CSS Tokens        |
|  <forcecal-main> . <forcecal-event-form>             |
+-----------------------------------------------------+
                        |
+-----------------------------------------------------+
|                @forcecalendar/core                    |
|  Calendar . Event . EventStore . StateManager        |
|  TimezoneManager . RecurrenceEngine . ICS . Search   |
+-----------------------------------------------------+
```

## Core (`@forcecalendar/core`)

The headless engine. Pure JavaScript with no DOM dependencies. Provides:

| Module | Class | Purpose |
|--------|-------|---------|
| `calendar` | `Calendar` | Main orchestrator -- navigation, view data, event CRUD, timezone, plugins |
| `events` | `Event` | Event model with normalization, validation, color, and metadata |
| `events` | `EventStore` | Indexed event storage with range queries, overlap detection, subscriptions |
| `events` | `RecurrenceEngine` / `RecurrenceEngineV2` | RFC 5545 RRULE expansion |
| `events` | `RRuleParser` | RRULE string parser |
| `state` | `StateManager` | Immutable state with subscribers, undo/redo history |
| `timezone` | `TimezoneManager` | IANA timezone conversion, formatting, system detection |
| `timezone` | `TimezoneDatabase` | Timezone offset data |
| `ics` | `ICSParser` | iCalendar (.ics) file parser |
| `ics` | `ICSHandler` | High-level import/export with merge, dedup, and filtering |
| `search` | `EventSearch` | Full-text search with fuzzy matching and relevance scoring |
| `search` | `SearchWorkerManager` | Web Worker offloading with inverted index |
| `conflicts` | `ConflictDetector` | Time, attendee, resource, and location conflict detection |
| `performance` | `PerformanceOptimizer` | Batch operations and render scheduling |
| `performance` | `AdaptiveMemoryManager` | Memory pressure monitoring and cache eviction |
| `performance` | `LRUCache` | Least-recently-used cache |
| `integration` | `EnhancedCalendar` | Extended Calendar with search, conflicts, and performance built in |

## Interface (`@forcecalendar/interface`)

Web Components layer built on Core. Uses Shadow DOM for style isolation and Locker Service compatibility.

| Module | Class | Purpose |
|--------|-------|---------|
| `components` | `ForceCalendar` | Main `<forcecal-main>` element -- header, navigation, view switching |
| `components` | `EventForm` | `<forcecal-event-form>` modal -- create events with title, time, color |
| `core` | `BaseComponent` | Base class for all components -- Shadow DOM, lifecycle, event handling |
| `core` | `StateManager` | Interface-level state with EventBus integration |
| `core` | `EventBus` | Pub/sub event system with wildcard support |
| `renderers` | `MonthViewRenderer` | Month grid with day cells and event chips |
| `renderers` | `WeekViewRenderer` | 7-day time grid with hourly slots |
| `renderers` | `DayViewRenderer` | Single-day time grid |
| `utils` | `StyleUtils` | CSS variable definitions and theme utilities |
| `utils` | `DateUtils` | Date formatting and calculation |
| `utils` | `DOMUtils` | Safe DOM operations, HTML escaping, focus trapping |

## Salesforce Integration

The Salesforce layer wraps Interface inside an LWC component:

1. **Build step**: Rollup bundles `@forcecalendar/interface` (which includes Core) into an IIFE.
2. **Static resource**: The IIFE bundle is deployed as a Salesforce static resource (`forcecalendar.js`).
3. **LWC wrapper**: `forceCalendar` LWC loads the bundle via `loadScript`, creates a `<forcecal-main>` element using `lwc:dom="manual"`, and bridges custom events to Apex CRUD operations.
4. **Apex controller**: `ForceCalendarController` provides `getEvents`, `createEvent`, `updateEvent`, and `deleteEvent` methods with CRUD/FLS enforcement (`WITH SECURITY_ENFORCED`).

## Data Flow

```
User Interaction
    |
<forcecal-main> (Web Component)
    | CustomEvent
LWC forceCalendar wrapper
    | @wire / imperative Apex
ForceCalendarController.cls
    | SOQL
Salesforce Event sObject
```
