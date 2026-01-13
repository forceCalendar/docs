import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ForceCalendar',
  tagline: 'Enterprise Calendar Infrastructure',
  favicon: 'img/favicon.ico',

  url: 'https://docs.forcecalendar.org',
  baseUrl: '/',

  organizationName: 'forcecalendar',
  projectName: 'forcecalendar',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: 'https://github.com/forcecalendar/forceCalendar/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ForceCalendar',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/core/calendar',
          label: 'API Reference',
          position: 'left'
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/forcecalendar/forceCalendar',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/core/calendar',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture/overview',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/forcecalendar',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/forcecalendar/forceCalendar/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/forcecalendar/core/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Website',
              href: 'https://forcecalendar.org',
            },
          ],
        },
        {
          title: 'Built With',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io',
            },
            {
              label: 'Docusaurus GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ForceCalendar. MIT License. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
