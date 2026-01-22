import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
	plugins: [enhancedImages(), tailwindcss(), sveltekit(), yaml()],
	ssr: {
		external: ['gray-matter']
	}
});
