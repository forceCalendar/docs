import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// Mirrors the header on forcecalendar.org so navigation feels seamless
// across the www, docs, benchmark, and audit properties.
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="text-lg tracking-tight">
          <span className="font-light">force</span>
          <span className="font-semibold">Calendar</span>
          <span className="mx-1.5 font-light text-fd-muted-foreground/60 select-none">/</span>
          <span className="align-middle text-sm font-medium">Docs</span>
        </span>
      ),
    },
    githubUrl: 'https://github.com/forceCalendar',
    links: [
      { text: 'Home', url: 'https://forcecalendar.org' },
      { text: 'Playground', url: 'https://forcecalendar.org/playground' },
      { text: 'Benchmark', url: 'https://benchmark.forcecalendar.org' },
      { text: 'Audit', url: 'https://audit.forcecalendar.org' },
      { text: 'npm', url: 'https://www.npmjs.com/org/forcecalendar' },
    ],
  };
}
