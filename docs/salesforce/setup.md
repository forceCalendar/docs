---
sidebar_position: 1
title: Setup & Deploy
sidebar_label: Setup & Deploy
description: Build, deploy, and configure ForceCalendar in Salesforce Lightning pages.
---

# Salesforce Setup & Deploy

Deploy ForceCalendar to Salesforce as an LWC component with Apex backend.

![ForceCalendar Month View in Salesforce](/img/salesforce/monthview.png)

## Prerequisites

- Salesforce CLI (`sf`) installed and authenticated to your org
- Node.js 20+
- Git

## Build

The build step bundles `@forcecalendar/core` and `@forcecalendar/interface` into an IIFE static resource using Rollup with terser minification.

```bash
# Clone the Salesforce integration
git clone https://github.com/forceCalendar/salesforce.git
cd salesforce

# Install build dependencies (Rollup, terser, node-resolve)
npm install

# Install runtime dependencies (in src/)
cd src && npm install && cd ..

# Build the distribution
npm run build
```

### What the Build Does

The `scripts/build.js` pipeline performs these steps:

1. **Clean** the `dist/` directory
2. **Bundle** `@forcecalendar/interface` (which includes `@forcecalendar/core` as a peer dependency) into a minified IIFE via Rollup
3. **Copy** all Salesforce metadata (`force-app/`, `sfdx-project.json`) into `dist/`
4. **Write** the bundle as a static resource (`forcecalendar.js`) with its `.resource-meta.xml`
5. **Generate** `manifest/package.xml` (API version 62.0)
6. **Create** deployment scripts (`deploy.sh`, `deploy.bat`)

The resulting `dist/` directory is a self-contained, deployable Salesforce project:

```
dist/
  force-app/
    main/default/
      classes/
        ForceCalendarController.cls
        ForceCalendarController.cls-meta.xml
        ForceCalendarControllerTest.cls
        ForceCalendarControllerTest.cls-meta.xml
      lwc/
        forceCalendar/          # Main LWC component
        forceCalendarDemo/      # Demo component with sample events
      staticresources/
        forcecalendar.js        # Bundled IIFE (~minified)
        forcecalendar.resource-meta.xml
  manifest/
    package.xml
  sfdx-project.json
  deploy.sh
  deploy.bat
```

## Deploy

```bash
cd dist
sf project deploy start --source-dir force-app
```

Or use the included deploy scripts:

```bash
# macOS/Linux
./deploy.sh

# Windows
deploy.bat
```

## Add to a Lightning Page

1. Open **Lightning App Builder** (Setup > Lightning App Builder)
2. Edit or create an App Page, Record Page, or Home Page
3. Drag **Force Calendar** from the component palette onto the page
4. Configure properties in the right panel:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Default View | `month \| week \| day` | `month` | Initial calendar view |
| Calendar Height | `string` | `800px` | CSS height value |
| Read Only | `boolean` | `false` | Disable event creation/editing |

5. Save and activate the page

## Supported Page Types

| Target | Description |
|--------|-------------|
| `lightning__AppPage` | Standalone app pages |
| `lightning__RecordPage` | Record detail pages (receives `recordId`) |
| `lightning__HomePage` | Org home page |

On **Record Pages**, the component automatically filters events by the current record's `WhoId` or `WhatId`.

## Demo Component

The `forceCalendarDemo` LWC is included for testing. It loads the calendar with 15 randomly generated sample events and provides buttons to clear and reload events. No Apex connection is required -- it runs entirely in the browser.

To use the demo, add it to a Lightning page the same way as the main component. It uses the same `_tryInit()` lifecycle pattern as the production component but without Apex wiring.
