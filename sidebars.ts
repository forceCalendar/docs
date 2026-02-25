import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'installation',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/overview',
      ],
    },
    {
      type: 'category',
      label: 'Core API Reference',
      collapsed: false,
      items: [
        'core/calendar',
        'core/event',
        'core/event-store',
        'core/state-manager',
        'core/timezone',
        'core/recurrence',
        'core/date-utils',
        'core/ics',
        'core/search',
      ],
    },
    {
      type: 'category',
      label: 'Interface Components',
      collapsed: false,
      items: [
        'interface/forcecal-main',
        'interface/event-form',
        'interface/base-component',
      ],
    },
    {
      type: 'category',
      label: 'Salesforce Integration',
      collapsed: false,
      items: [
        'salesforce/setup',
        'salesforce/apex-controller',
        'salesforce/lwc-component',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/theming',
        'guides/examples',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/performance',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/index',
      ],
    },
  ],
};

export default sidebars;
