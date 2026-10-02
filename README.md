# docs.forcecalendar.org

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Documentation portal for [forceCalendar](https://forcecalendar.org), built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Content map

All content is MDX under `content/docs/`:

- **Getting started** — installation, quick start, migration, release status
- **`core/`** — engine guides: calendar, events, recurrence, timezones, ICS, search, state, performance
- **`api/`** — per-class API reference (Calendar, EventStore, RecurrenceEngine, RRuleParser, ICSParser/Handler, StateManager, …)
- **`interface/`** — Web Components, views, theming, event bus
- **`salesforce/`** — LWC integration, Apex controller, LWS, permissions, deployment
- **`agent/`** — private pre-release scope and integration boundaries
- **`security/`** — security model and remediation history

Navigation order is controlled by `meta.json` files alongside the content.

## Development

```bash
npm ci
npm test         # API coverage, internal links/navigation, and runnable Core examples
npm run dev      # http://localhost:3000
npm run build
```

## Contributing

Documentation fixes are the easiest way to contribute to forceCalendar — edit the MDX under `content/docs/` and open a PR. See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE)
