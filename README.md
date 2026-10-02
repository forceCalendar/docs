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
- **`agent/`** — current headless calendar APIs and integrator-owned data/access boundaries
- **`security/`** — security model and remediation history

Navigation order is controlled by `meta.json` files alongside the content.

## Development

```bash
npm ci
npm test         # API coverage, internal links/navigation, and runnable Core examples
npm run dev      # http://localhost:3000
npm run build
```

## Dependency maintenance

The deployment remains on Next.js 15.5.27. Compatible transitive patches are locked, with a PostCSS 8.5.28 override because Next 15 pins an older PostCSS release. CI audits high/critical advisories as well as building the docs. Audit results are time-scoped, not a security certification.

The public search endpoint at `app/api/search/route.ts` indexes the same MDX source as the sidebar. Verify searches after deployment when changing source configuration.

## Contributing

Documentation fixes are the easiest way to contribute to forceCalendar — edit the MDX under `content/docs/` and open a PR. See the [contributing guide](https://github.com/forceCalendar/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE)
