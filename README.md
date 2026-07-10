# docs.forcecalendar.org

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Documentation portal for [forceCalendar](https://forcecalendar.org), built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Content map

All content is MDX under `content/docs/`:

- **Getting started** — installation, quick start
- **`core/`** — engine guides: calendar, events, recurrence, timezones, ICS, search, state, performance
- **`api/`** — per-class API reference (Calendar, EventStore, RecurrenceEngine, RRuleParser, ICSParser/Handler, StateManager, …)
- **`interface/`** — Web Components, views, theming, event bus
- **`salesforce/`** — LWC integration, Apex controller, Locker Service, deployment
- **`security/`** — security model and remediation history

Navigation order is controlled by `meta.json` files alongside the content.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Contributing

Documentation fixes are the easiest way to contribute to forceCalendar — edit the MDX under `content/docs/` and open a PR. See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE)
