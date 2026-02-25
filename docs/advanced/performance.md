---
sidebar_position: 1
title: Performance
---

# Performance

ForceCalendar includes several built-in performance optimizations for handling large event sets.

## EnhancedCalendar

`EnhancedCalendar` extends `Calendar` with integrated search, conflict detection, and performance optimization:

```javascript
import { EnhancedCalendar } from '@forcecalendar/core';

const calendar = new EnhancedCalendar({
  view: 'month',
  timeZone: 'America/New_York'
});
```

## PerformanceOptimizer

Batches DOM-triggering operations and schedules renders:

```javascript
import { PerformanceOptimizer } from '@forcecalendar/core';
```

Features:
- Batch event additions to minimize re-renders
- Debounced render scheduling
- Operation coalescing

## AdaptiveMemoryManager

Monitors memory pressure and evicts caches when needed:

- Tracks cache sizes across EventStore, search indexes, and timezone caches
- Evicts least-recently-used entries when memory thresholds are exceeded
- Adaptive thresholds based on available memory

## LRUCache

Generic least-recently-used cache used internally:

```javascript
import { LRUCache } from '@forcecalendar/core';

const cache = new LRUCache(100); // Max 100 entries
cache.set('key', value);
cache.get('key');
cache.has('key');
cache.delete('key');
cache.clear();
```

## Tips

- **Batch event loading**: Use `calendar.setEvents(events)` instead of calling `addEvent` in a loop. `setEvents` triggers a single store update.
- **Limit date ranges**: Query only the visible date range rather than loading all events at once. The Salesforce integration does this automatically.
- **Use Web Workers for search**: `SearchWorkerManager` offloads search indexing and querying to a Web Worker, keeping the main thread responsive.
- **Leverage view data caching**: `getViewData()` computes view data on demand. Cache the result if you call it multiple times per render cycle.
