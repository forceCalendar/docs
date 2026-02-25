---
sidebar_position: 2
title: Installation
sidebar_label: Installation
description: Install @forcecalendar/core and @forcecalendar/interface via npm, CDN, or for Salesforce.
---

# Installation

## npm

```bash
# Core only (headless engine)
npm install @forcecalendar/core

# Core + Interface (Web Components)
npm install @forcecalendar/core @forcecalendar/interface
```

`@forcecalendar/interface` declares `@forcecalendar/core` as a peer dependency (`>=2.0.0`). Install both packages explicitly.

## CDN

### UMD (global)

```html
<script src="https://unpkg.com/@forcecalendar/interface/dist/force-calendar-interface.umd.js"></script>
```

The UMD bundle registers the `<forcecal-main>` and `<forcecal-event-form>` custom elements globally. No import statement needed.

### ESM

```html
<script type="module">
  import { ForceCalendar } from 'https://unpkg.com/@forcecalendar/interface/dist/force-calendar-interface.esm.js';
</script>
```

## ES Module Imports

Core uses subpath exports for tree-shaking:

```javascript
// Full import
import { Calendar, Event, EventStore, StateManager } from '@forcecalendar/core';

// Subpath imports (smaller bundles)
import { Calendar } from '@forcecalendar/core/calendar';
import { Event } from '@forcecalendar/core/events';
import { StateManager } from '@forcecalendar/core/state';
import { EventSearch } from '@forcecalendar/core/search';
import { ICSHandler } from '@forcecalendar/core/ics';
```

Interface exports from a single entry point:

```javascript
import {
  ForceCalendar,
  BaseComponent,
  StateManager,
  EventBus,
  MonthViewRenderer,
  WeekViewRenderer,
  DayViewRenderer,
  DateUtils,
  DOMUtils,
  StyleUtils
} from '@forcecalendar/interface';
```

## Salesforce

Salesforce deployment uses a build step that bundles Core + Interface into an IIFE static resource. See the [Salesforce Setup Guide](/docs/salesforce/setup).

## Requirements

- Node.js 20+
- Modern browser with Custom Elements v1 support (all current browsers)
