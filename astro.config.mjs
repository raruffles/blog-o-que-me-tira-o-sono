import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid', // <--- Mude apenas esta linha!
  adapter: vercel(),
  integrations: [
    react(), 
    tailwind(), 
    keystatic()
  ],
});