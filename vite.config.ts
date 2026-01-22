import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), yaml()],
	ssr: {
		external: [
			'markdown-it',
			'markdown-it-attrs',
			'markdown-it-bracketed-spans',
			'markdown-it-task-lists'
		]
	},
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				// Suppress circular dependency warnings
				if (warning.code === 'CIRCULAR_DEPENDENCY') return;
				warn(warning);
			}
		}
	}
});
