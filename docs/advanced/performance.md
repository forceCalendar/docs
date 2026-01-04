# Performance Optimization

ForceCalendar is designed to handle thousands of events with minimal latency.

## Spatial Indexing

Unlike traditional calendar libraries that iterate over all events for every render, ForceCalendar uses a **spatial indexing** approach. 

- Events are indexed by their time ranges.
- Only events within the visible viewport are processed and rendered.
- Queries are $O(\log N + K)$ where $N$ is total events and $K$ is visible events.

## Recurrence Optimization

Recurring events are expanded lazily. The engine only calculates instances for the currently viewed date range, preventing memory bloat when dealing with infinite recurrence series.

## Virtual Rendering

The UI layer utilizes virtual rendering techniques to ensure that even with a high density of events, the DOM remains lightweight and responsive.
