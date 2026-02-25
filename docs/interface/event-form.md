---
sidebar_position: 2
title: <forcecal-event-form>
---

# `<forcecal-event-form>`

Modal dialog for creating calendar events. Includes title, start/end datetime pickers, color selection, and validation.

Automatically rendered inside `<forcecal-main>`. Can also be used standalone:

```html
<forcecal-event-form id="event-modal"></forcecal-event-form>

<script type="module">
  import '@forcecalendar/interface';

  const modal = document.querySelector('#event-modal');

  // Open with a date
  modal.open(new Date('2026-03-15T10:00:00'));

  // Listen for save
  modal.addEventListener('save', (e) => {
    console.log(e.detail);
    // { title: 'Meeting', start: Date, end: Date, backgroundColor: '#2563EB' }
  });
</script>
```

## Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `open(date?)` | `Date` (default: now) | Open the modal. Pre-fills start time. End defaults to +60 minutes. |
| `close()` | — | Close the modal |

## Attributes

| Attribute | Description |
|-----------|-------------|
| `open` | Present when modal is visible. Set/remove to show/hide. |

## Custom Events

| Event | Payload | Description |
|-------|---------|-------------|
| `save` | `{ title, start, end, backgroundColor }` | User saved an event |

## Form Fields

- **Title** — Text input, required. Validates non-empty.
- **Start** — `datetime-local` input, required.
- **End** — `datetime-local` input, required. Validates end > start.
- **Color** — Radio button group with 6 preset colors:

| Color | Hex | Label |
|-------|-----|-------|
| Blue | `#2563EB` | Blue |
| Green | `#10B981` | Green |
| Amber | `#F59E0B` | Amber |
| Red | `#EF4444` | Red |
| Purple | `#8B5CF6` | Purple |
| Gray | `#6B7280` | Gray |

## Accessibility

- `role="dialog"` and `aria-modal="true"` on modal content
- `aria-labelledby` pointing to modal title
- Focus trap within modal when open
- Escape key closes the modal
- Color buttons use `role="radio"` with `aria-checked`
- Close button has `aria-label="Close modal"`
