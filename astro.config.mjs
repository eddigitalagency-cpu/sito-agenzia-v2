import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eddigitalagency.it',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind(),
    react(),
    sitemap(),
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
