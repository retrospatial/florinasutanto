import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';

export default {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md']
		})
	],
	kit: {
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200, 1920],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: ['florinasutanto.com']
			}
		})
	}
};
