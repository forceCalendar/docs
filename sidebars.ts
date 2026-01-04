import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'intro',
        'installation',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core/overview',
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      items: [
        'integration/web-components',
        'integration/salesforce',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Features',
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
