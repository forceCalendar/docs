import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ForceCalendar',
  tagline: 'Enterprise Calendar Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://docs.forcecalendar.org',
  baseUrl: '/',

  organizationName: 'forceCalendar',
  projectName: 'docs',

  onBrokenLinks: 'warn',

  markdown: {
    format: 'detect',
    mermaid: true,
    preprocessor: ({filePath, fileContent}) => {
      return fileContent;
    },
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/forceCalendar/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ForceCalendar',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api',
          label: 'API Reference',
          position: 'left'
        },
        {
          href: 'https://forcecalendar.org/playground',
          label: 'Playground',
          position: 'left',
        },
        {
          href: 'https://benchmark.forcecalendar.org',
          label: 'Benchmark',
          position: 'left',
        },
        {
          href: 'https://audit.forcecalendar.org',
          label: 'Audit',
          position: 'left',
        },
        {
          href: 'https://github.com/forceCalendar',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'Core API', to: '/docs/core/calendar' },
            { label: 'Interface', to: '/docs/interface/forcecal-main' },
            { label: 'Salesforce', to: '/docs/salesforce/setup' },
          ],
        },
        {
          title: 'Properties',
          items: [
            { label: 'Documentation', to: '/' },
            { label: 'Benchmark', href: 'https://benchmark.forcecalendar.org' },
            { label: 'Audit', href: 'https://audit.forcecalendar.org' },
            { label: 'Playground', href: 'https://forcecalendar.org/playground' },
          ],
        },
        {
          title: 'GitHub',
          items: [
            { label: 'Core', href: 'https://github.com/forceCalendar/core' },
            { label: 'Interface', href: 'https://github.com/forceCalendar/interface' },
            { label: 'Website', href: 'https://github.com/forceCalendar/www' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Examples', to: '/docs/guides/examples' },
            { label: 'Theming', to: '/docs/guides/theming' },
            { label: 'Troubleshooting', to: '/docs/troubleshooting' },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} ForceCalendar. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'apex'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
