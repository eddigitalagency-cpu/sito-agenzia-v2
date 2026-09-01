import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eddigitalagency.it',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-US', de: 'de-AT' },
      },
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
  security: {
    checkOrigin: false,
  },
  server: {
    allowedHosts: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
