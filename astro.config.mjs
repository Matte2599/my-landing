// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { anonymizeIntegration } from './scripts/anonymize.mjs';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://feroldi.cloud',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-US' },
      },
    }),
    // Runs at the end of every `astro build` — strips framework fingerprints
    // (chunk filenames, scoped-style data-attributes) so the deployed site
    // is opaque to Wappalyzer / BuiltWith.
    anonymizeIntegration(),
  ],

  build: {
    inlineStylesheets: 'auto',
    // Rename the chunk/asset folder to avoid the default `_astro/` fingerprint
    // that Wappalyzer / BuiltWith match for framework detection.
    assets: 'static',
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          // Strip framework-revealing names from chunk filenames.
          chunkFileNames: 'static/[hash].js',
          entryFileNames: 'static/[hash].js',
          assetFileNames: 'static/[hash][extname]',
        },
      },
    },
  },

  adapter: cloudflare(),
});