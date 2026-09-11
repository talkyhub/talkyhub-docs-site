import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const docsearchAppId = process.env.DOCSEARCH_APP_ID;
const docsearchApiKey = process.env.DOCSEARCH_API_KEY;
const docsearchIndexName = process.env.DOCSEARCH_INDEX_NAME;
const hasDocSearchConfig = Boolean(
  docsearchAppId && docsearchApiKey && docsearchIndexName,
);

const config: Config = {
  title: 'TalkyHub Docs',
  tagline: 'Документация TalkyHub',
  favicon: 'img/favicon.svg',

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://docs.talkyhub.ru',
  baseUrl: '/',
  trailingSlash: true,

  organizationName: 'talkyhub',
  projectName: 'talkyhub-docs-site',

  onBrokenLinks: 'throw',

  // SVG favicon (from the landing) + the brand theme color.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#7e14ff',
      },
    },
  ],

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {label: 'Русский'},
      en: {label: 'English'},
    },
  },

  // Render ```mermaid fenced blocks as diagrams (used by the integration guide).
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    algolia: hasDocSearchConfig
      ? {
          appId: docsearchAppId!,
          apiKey: docsearchApiKey!,
          indexName: docsearchIndexName!,
          contextualSearch: true,
          searchPagePath: 'search',
        }
      : undefined,
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      // Brand (mark + wordmark + DOCS tag) is rendered by the swizzled
      // src/theme/Navbar/Logo.tsx using the real brand components.
      items: [
        {
          to: '/docs',
          position: 'left',
          label: 'Документация',
        },
        {
          href: 'https://talkyhub.ru',
          label: 'На сайт',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        ...(hasDocSearchConfig
          ? [
              {
                type: 'search' as const,
                position: 'right' as const,
              },
            ]
          : []),
      ],
    },
    // Footer is rendered by the swizzled src/theme/Footer (mirrors talkyhub.ru).
    prism: {
      // dark code blocks on the cream site → richer syntax highlighting
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
