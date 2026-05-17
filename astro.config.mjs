import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

function keystaticAdminOverrides() {
	return {
		name: 'keystatic-admin-overrides',
		hooks: {
			'astro:config:setup': ({ injectScript }) => {
				injectScript('page', 'import "/src/keystatic-admin-overrides.js";');
			},
		},
	};
}
// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [react(), keystatic(), keystaticAdminOverrides()],
});