---
sidebar_position: 9
title: Search
---

# EventSearch

Full-text search engine for calendar events with fuzzy matching, field-level search, and relevance scoring.

```javascript
import { EventSearch } from '@forcecalendar/core';

const search = new EventSearch(calendar.eventStore);
```

## Search

```javascript
const results = search.search('standup', {
  fields: ['title', 'description', 'location', 'category'],
  fuzzy: true,           // Enable fuzzy matching (default: true)
  caseSensitive: false,  // Case-insensitive (default: false)
  limit: 20,             // Max results (default: null = unlimited)
  sortBy: 'relevance'    // 'relevance' | 'start' | 'title'
});
```

Results are Event objects sorted by relevance score. The search index is automatically rebuilt when events are added, updated, or removed from the EventStore.

## Index Fields

The search indexes these event fields by default:
- `title`
- `description`
- `location`
- `category`

## SearchWorkerManager

For large event sets, offload search to a Web Worker:

```javascript
import { SearchWorkerManager } from '@forcecalendar/core';

const workerSearch = new SearchWorkerManager(calendar.eventStore);
```

Uses an inverted index (`InvertedIndex`) for fast token-based lookups.

## Cleanup

```javascript
search.destroy(); // Unsubscribes from EventStore and clears the index
```
