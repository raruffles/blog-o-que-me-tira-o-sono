import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless'; // <- Adicionando a importação do adaptador

export default defineConfig({
  output: 'server', // <- ESSA É A LINHA QUE CURA O ERRO 500
  adapter: vercel(), // <- Conectando o adaptador aqui
  integrations: [
    react(), 
    tailwind(), 
    keystatic()
  ],
});