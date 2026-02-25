---
sidebar_position: 1
title: Introduction
sidebar_label: Introduction
slug: /intro
description: Enterprise calendar infrastructure for Salesforce and the web. Zero dependencies. MIT licensed.
---

# ForceCalendar

Enterprise calendar infrastructure for Salesforce and the web. Zero dependencies. MIT licensed.

ForceCalendar is a three-layer architecture:

- **Core** (`@forcecalendar/core`) — Headless calendar engine. Pure JavaScript, no DOM. Handles dates, events, recurrence, timezones, search, and ICS import/export.
- **Interface** (`@forcecalendar/interface`) — Web Components built on Core. Drop-in `<forcecal-main>` element with month/week/day views, event creation, and full CSS token theming.
- **Salesforce** — LWC wrapper that loads Interface as a static resource and connects to Salesforce Event records via Apex.

## Quick Start

### Web (npm)

```bash
npm install @forcecalendar/core @forcecalendar/interface
```

```html
<forcecal-main view="month" height="700px"></forcecal-main>

<script type="module">
  import '@forcecalendar/interface';

  const cal = document.querySelector('forcecal-main');

  cal.addEvent({
    id: '1',
    title: 'Team Standup',
    start: new Date('2026-03-01T09:00:00'),
    end: new Date('2026-03-01T09:30:00'),
    color: '#2563EB'
  });
</script>
```

### Web (CDN)

```html
<script src="https://unpkg.com/@forcecalendar/interface/dist/force-calendar-interface.umd.js"></script>

<forcecal-main view="month" height="700px"></forcecal-main>
```

### Salesforce

See the [Salesforce Integration Guide](/docs/salesforce/setup) for full deployment instructions.

## Design Principles

- **Zero dependencies** — No runtime dependencies. Core is pure JS; Interface uses only the Web Components API.
- **Locker Service compatible** — Built from the ground up for Salesforce's strict CSP and Locker Service constraints.
- **Framework agnostic** — Works with React, Vue, Angular, Svelte, LWC, or plain HTML.
- **Headless-first** — Core provides all calendar logic without any rendering. Build your own UI or use Interface.
- **Timezone-aware** — Full IANA timezone support with conversion, formatting, and per-event timezones.

## Package Versions

| Package | Version | Size |
|---------|---------|------|
| `@forcecalendar/core` | 2.1.20 | ~318 KB |
| `@forcecalendar/interface` | 1.0.57 | ~704 KB |

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+
- Salesforce Locker Service / Lightning Web Security
