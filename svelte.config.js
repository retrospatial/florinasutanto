import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-dark', 'gruvbox-dark-hard', 'tokyo-night', 'dark-plus'],
	langs: ['javascript', 'typescript', 'bash', 'svelte', 'css', 'html', 'json', 'markdown', 'yaml']
});

export default {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: (code, lang) => {
					const html = highlighter.codeToHtml(code, {
						lang: lang || 'text',
						theme: 'tokyo-night'
					});
					const escaped = html
						.replace(/\\/g, '\\\\')
						.replace(/`/g, '\\`')
						.replace(/\$/g, '\\$')
						.replace(/{/g, '\\{');
					return `{@html \`${escaped}\`}`;
				}
			}
		})
	],
	kit: {
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200, 1920],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 86400,
				domains: ['florinasutanto.com']
			}
		})
	}
};
