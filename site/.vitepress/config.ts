import { defineConfig } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';
import { description, name, repository } from '../../package.json';

import selfAssertTypedocSidebar from '../api/core/typedoc-sidebar.json';

const repositoryUrl = `${repository.url
  .replace(/^git\+/, '')
  .replace(/\.git$/, '')}`;

const coreApiSidebar = selfAssertTypedocSidebar
  .filter((item) => item.text !== 'Others')
  .map((item) => ({
    ...item,
    items: item.items?.map((subItem) => ({
      ...subItem,
      link: subItem.link.replace('/api/', '/api/core/'),
    })),
  }));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'self-assert',
  description:
    'A small TypeScript library for designing models with built-in validity',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'cTUKnbqvGsqzxM1IrYA89CmxyN_Yih7bo8_cHB6tzbM',
      },
    ],
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is self-assert?', link: '/what-is-self-assert' },
          { text: 'Why self-assert?', link: '/why-self-assert' },
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Acknowledgements', link: '/acknowledgements' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Using Rules', link: '/examples/using-rules' },
          {
            text: 'DraftAssistant for a Date field',
            link: '/examples/date-draft-assistant',
          },
        ],
      },
      {
        text: 'API',
        items: [
          {
            text: 'Overview',
            link: '/api/',
            collapsed: false,
          },
          ...coreApiSidebar,
        ],
      },
    ],

    editLink: {
      pattern: `${repositoryUrl}/edit/main/site/:path`,
      text: 'Edit this page on GitHub',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: repositoryUrl }],
    outline: {
      level: [2, 3],
    },
  },
});
