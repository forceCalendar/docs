---
sidebar_position: 1
title: Setup & Deploy
sidebar_label: Setup & Deploy
description: Build, deploy, and configure ForceCalendar in Salesforce Lightning pages.
---

# Salesforce Setup & Deploy

Deploy ForceCalendar to Salesforce as an LWC component with Apex backend.

## Prerequisites

- Salesforce CLI (`sf`) installed and authenticated to your org
- Node.js 20+
- Git

## Build

The build step bundles `@forcecalendar/core` and `@forcecalendar/interface` into an IIFE static resource.

```bash
# Clone the Salesforce integration
git clone https://github.com/forceCalendar/salesforce.git
cd salesforce

# Install build dependencies
npm install

# Install runtime dependencies (in src/)
cd src && npm install && cd ..

# Build the distribution
npm run build
```

This creates a `dist/` directory containing:

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
        forceCalendarDemo/      # Demo component
      staticresources/
        forcecalendar.js        # Bundled IIFE
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
| Default View | `month \| week \| day` | `month` | Initial view |
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
