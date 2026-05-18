import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

const useNodeAdapter = process.env.LOCAL_NODE === '1';

export default defineConfig({
  output: 'server',
  adapter: useNodeAdapter ? node({ mode: 'standalone' }) : vercel(),
  integrations: [
    react(),
    keystatic(),
  ],
});