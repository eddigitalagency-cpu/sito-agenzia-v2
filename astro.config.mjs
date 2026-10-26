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
        locales: { it: 'it', en: 'en', de: 'de' },
      },
      filter: (page) => !page.includes('/admin/'),
      // Canonical URLs carry no trailing slash — keep the sitemap consistent
      serialize(item) {
        const strip = (u) => (u.replace(/\/+$/, '') === 'https://eddigitalagency.it' ? u : u.replace(/\/+$/, ''));
        item.url = strip(item.url);
        if (item.links) item.links = item.links.map((l) => ({ ...l, url: strip(l.url) }));
        return item;
      },
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
