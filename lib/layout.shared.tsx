import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'forceCalendar',
    },
    links: [
      {
        text: 'GitHub',
        url: 'https://github.com/forceCalendar',
      },
      {
        text: 'npm',
        url: 'https://www.npmjs.com/package/@forcecalendar/core',
      },
    ],
  };
}
