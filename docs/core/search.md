# EventSearch

The `EventSearch` class provides full-text search and filtering for calendar events.

## Import

```javascript
import { EventSearch } from '@forcecalendar/core';
```

## Constructor

```javascript
new EventSearch(eventStore)
```

**Parameters:**
- `eventStore` (EventStore) - The EventStore to search

**Example:**

```javascript
import { EventStore, EventSearch } from '@forcecalendar/core';

const store = new EventStore();
const search = new EventSearch(store);
```

---

## Text Search

### search()

Search events by text query.

```javascript
search.search(query, options?)
```

**Parameters:**
- `query` (string) - Search query
- `options.fields` (string[]) - Fields to search (default: title, description, location, category)
- `options.fuzzy` (boolean) - Enable fuzzy matching (default: true)
- `options.caseSensitive` (boolean) - Case sensitive search (default: false)
- `options.limit` (number) - Maximum results
- `options.sortBy` (string) - Sort by 'relevance', 'date', or 'title'

**Returns:** `Event[]` - Matching events

**Example:**

```javascript
// Simple search
const results = search.search('meeting');

// Search specific fields
const titleOnly = search.search('standup', {
  fields: ['title']
});

// Exact match (no fuzzy)
const exact = search.search('Project Alpha', {
  fuzzy: false,
  caseSensitive: true
});

// Limited results sorted by date
const recent = search.search('review', {
  limit: 10,
  sortBy: 'date'
});
```

---

### Fuzzy Matching

Fuzzy search finds approximate matches:

```javascript
// Will match "meeting", "meetings", "meating" (typo)
search.search('meeting', { fuzzy: true });

// Uses Levenshtein distance
// "meeting" vs "meating" = distance 1 (acceptable)
// "meeting" vs "lunch" = distance 6 (too different)
```

---

### Search Scoring

Results are scored by relevance:

| Factor | Score |
|--------|-------|
| Exact match | +10 |
| Fuzzy match (distance 1) | +4 |
| Fuzzy match (distance 2) | +3 |
| Title field match | 2x multiplier |

---

## Filtering

### filter()

Filter events by criteria.

```javascript
search.filter(filters)
```

**Filter Options:**

| Option | Type | Description |
|--------|------|-------------|
| `dateRange` | `{start, end}` | Date range filter |
| `categories` | `string[]` | Category filter |
| `locations` | `string[]` | Location filter |
| `attendees` | `string[]` | Attendee filter |
| `status` | `string | string[]` | Status filter |
| `allDay` | `boolean` | All-day events only |
| `recurring` | `boolean` | Recurring events only |
| `hasReminders` | `boolean` | Events with reminders |
| `custom` | `function` | Custom filter function |

**Example:**

```javascript
// Filter by date range
const thisWeek = search.filter({
  dateRange: {
    start: new Date('2024-01-15'),
    end: new Date('2024-01-21')
  }
});

// Filter by categories
const meetings = search.filter({
  categories: ['meetings', 'calls']
});

// Filter by status
const confirmed = search.filter({
  status: 'confirmed'
});

// Filter by multiple criteria
const filtered = search.filter({
  dateRange: {
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31')
  },
  categories: ['work'],
  status: ['confirmed', 'tentative'],
  allDay: false
});

// Custom filter
const longEvents = search.filter({
  custom: (event) => event.durationHours >= 2
});
```

---

### advancedSearch()

Combine text search with filters.

```javascript
search.advancedSearch(query, filters, options?)
```

**Example:**

```javascript
// Search "meeting" within work category this month
const results = search.advancedSearch(
  'meeting',
  {
    categories: ['work'],
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    }
  },
  {
    limit: 20,
    sortBy: 'relevance'
  }
);
```

---

## Autocomplete

### getSuggestions()

Get search suggestions for autocomplete.

```javascript
search.getSuggestions(partial, options?)
```

**Parameters:**
- `partial` (string) - Partial search term
- `options.field` (string) - Field to get suggestions from (default: 'title')
- `options.limit` (number) - Maximum suggestions (default: 10)
- `options.minLength` (number) - Minimum query length (default: 2)

**Returns:** `string[]` - Suggested values

**Example:**

```javascript
// Title suggestions
const suggestions = search.getSuggestions('mee');
// ['Meeting with John', 'Meeting Room Booking', 'Weekly Meeting']

// Location suggestions
const locations = search.getSuggestions('conf', {
  field: 'location'
});
// ['Conference Room A', 'Conference Room B', 'Conference Call']
```

---

## Aggregation

### getUniqueValues()

Get unique values for a field.

```javascript
search.getUniqueValues(field)
```

**Returns:** `any[]` - Sorted unique values

**Example:**

```javascript
// Get all categories
const categories = search.getUniqueValues('category');
// ['holidays', 'meetings', 'personal', 'work']

// Get all locations
const locations = search.getUniqueValues('location');
// ['Conference Room A', 'Conference Room B', 'Virtual', 'Office']

// Get all statuses
const statuses = search.getUniqueValues('status');
// ['cancelled', 'confirmed', 'tentative']
```

---

### groupBy()

Group events by a field.

```javascript
search.groupBy(field, options?)
```

**Parameters:**
- `field` (string) - Field to group by
- `options.sortGroups` (boolean) - Sort group keys (default: true)
- `options.sortEvents` (boolean) - Sort events within groups (default: false)
- `options.includeEmpty` (boolean) - Include events without field value

**Returns:** `Object` - Grouped events

**Example:**

```javascript
// Group by category
const byCategory = search.groupBy('category');
// {
//   'meetings': [Event, Event, ...],
//   'holidays': [Event, Event, ...],
//   'personal': [Event, ...]
// }

// Group by status with sorted events
const byStatus = search.groupBy('status', {
  sortEvents: true,
  includeEmpty: true
});

// Group by location
const byLocation = search.groupBy('location');
```

---

## Index Management

### rebuildIndex()

Rebuild the search index.

```javascript
search.rebuildIndex()
```

Call after bulk imports or when the index may be stale.

**Example:**

```javascript
// After importing many events
store.batchAdd(importedEvents);
search.rebuildIndex();
```

---

## Complete Example

```javascript
import { Calendar, EventSearch } from '@forcecalendar/core';

const calendar = new Calendar();

// Add sample events
calendar.addEvent({
  id: '1',
  title: 'Team Meeting',
  description: 'Weekly team sync to discuss progress',
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T11:00:00'),
  location: 'Conference Room A',
  category: 'meetings'
});

calendar.addEvent({
  id: '2',
  title: 'Project Review',
  description: 'Quarterly project review meeting',
  start: new Date('2024-01-20T14:00:00'),
  end: new Date('2024-01-20T16:00:00'),
  location: 'Conference Room B',
  category: 'meetings'
});

calendar.addEvent({
  id: '3',
  title: 'Lunch with John',
  start: new Date('2024-01-16T12:00:00'),
  end: new Date('2024-01-16T13:00:00'),
  location: 'Cafe',
  category: 'personal'
});

// Create search instance
const search = new EventSearch(calendar.eventStore);

// ================
// TEXT SEARCH
// ================

// Search for "meeting"
const meetingResults = search.search('meeting');
console.log(`Found ${meetingResults.length} results for "meeting"`);
// Found 2 results for "meeting"

// Fuzzy search for typo
const fuzzyResults = search.search('meating');
console.log(`Fuzzy found ${fuzzyResults.length} results`);
// Fuzzy found 2 results (matches "meeting")

// ================
// FILTERING
// ================

// Get all meetings
const meetings = search.filter({
  categories: ['meetings']
});

// Get events this week
const thisWeek = search.filter({
  dateRange: {
    start: new Date('2024-01-15'),
    end: new Date('2024-01-21')
  }
});

// Get events in Conference Room A
const roomA = search.filter({
  locations: ['Conference Room A']
});

// ================
// COMBINED SEARCH
// ================

// Search "review" in meetings category
const reviewMeetings = search.advancedSearch(
  'review',
  { categories: ['meetings'] },
  { sortBy: 'date' }
);

// ================
// AUTOCOMPLETE
// ================

// Get title suggestions
const titleSuggestions = search.getSuggestions('Pro');
console.log('Suggestions:', titleSuggestions);
// ['Project Review']

// Get location suggestions
const locationSuggestions = search.getSuggestions('Conf', {
  field: 'location'
});
console.log('Locations:', locationSuggestions);
// ['Conference Room A', 'Conference Room B']

// ================
// AGGREGATION
// ================

// Get unique categories (for filter dropdown)
const categories = search.getUniqueValues('category');
console.log('Categories:', categories);
// ['meetings', 'personal']

// Get unique locations
const locations = search.getUniqueValues('location');
console.log('Locations:', locations);
// ['Cafe', 'Conference Room A', 'Conference Room B']

// Group events by category
const byCategory = search.groupBy('category');
Object.entries(byCategory).forEach(([cat, events]) => {
  console.log(`${cat}: ${events.length} events`);
});
// meetings: 2 events
// personal: 1 events

// Group by location with sorted events
const byLocation = search.groupBy('location', {
  sortEvents: true
});
```

---

## Building a Search UI

```jsx
// React example
function EventSearchUI({ calendar }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({});

  const search = useMemo(
    () => new EventSearch(calendar.eventStore),
    [calendar]
  );

  // Get filter options
  const categories = search.getUniqueValues('category');
  const locations = search.getUniqueValues('location');

  // Handle search input
  const handleSearch = (value) => {
    setQuery(value);

    if (value.length >= 2) {
      setSuggestions(search.getSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  // Execute search
  const executeSearch = () => {
    const results = search.advancedSearch(query, filters, {
      limit: 50,
      sortBy: 'relevance'
    });
    setResults(results);
  };

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search events..."
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => setQuery(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* Category filter */}
      <select
        onChange={(e) => setFilters({
          ...filters,
          categories: e.target.value ? [e.target.value] : null
        })}
      >
        <option value="">All categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Search button */}
      <button onClick={executeSearch}>Search</button>

      {/* Results */}
      <div className="results">
        {results.map(event => (
          <div key={event.id} className="result">
            <h4>{event.title}</h4>
            <p>{event.start.toLocaleString()}</p>
            <p>{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```
