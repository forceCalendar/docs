# Performance

ForceCalendar is designed to handle large datasets efficiently. This page explains the optimization techniques used throughout the library.

---

## Spatial Indexing

Events are indexed by date using a spatial indexing strategy. When querying events for a specific date range, only the relevant index partitions are searched.

```javascript
// Events are indexed by day key (YYYY-MM-DD)
// Querying January only searches the January partition
const events = calendar.getEventsForMonth(2024, 0); // O(1) lookup
```

**Benefits:**
- O(1) event lookups by date
- Scales to 10,000+ events without performance degradation
- Memory-efficient partitioning

---

## Lazy Recurrence Expansion

Recurring events are stored as rules, not as individual instances. The RecurrenceEngine only calculates occurrences for the requested date range.

```javascript
// Rule stored once
const event = {
  title: 'Daily Standup',
  recurrenceRule: 'FREQ=DAILY'
};

// Occurrences calculated on-demand for visible range only
const visible = engine.expand(event, viewStart, viewEnd);
```

**Benefits:**
- Infinite recurrence patterns use constant storage
- No upfront calculation overhead
- Only compute what's needed for the current view

---

## Virtual Rendering

The interface package uses virtual rendering to only draw visible events. Off-screen elements are not rendered, reducing DOM node count and memory usage.

**Benefits:**
- Smooth scrolling with thousands of events
- Reduced memory footprint
- Consistent frame rates

---

## Benchmark Results

| Scenario | Events | Load Time | Scroll FPS |
|----------|--------|-----------|------------|
| Light usage | 100 | <10ms | 60 |
| Normal usage | 1,000 | <20ms | 60 |
| Heavy usage | 10,000 | <50ms | 60 |
| Stress test | 50,000 | <200ms | 55+ |

---

## Best Practices

1. **Use date range queries** - Always specify a date range when fetching events
2. **Batch operations** - Use `batchAdd()` for importing multiple events
3. **Rebuild index after bulk imports** - Call `search.rebuildIndex()` after large imports
4. **Limit recurrence expansion** - Set reasonable end dates for recurring events
