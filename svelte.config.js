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
				highlighter: (code, lang, meta) => {
					let filename = meta?.match(/filename:\s*(.+)/)?.[1]?.trim();

					if (!filename) {
						const firstLine = code.split('\n')[0];
						const match = firstLine.match(/^filename:\s*(.+)/);
						if (match) {
							filename = match[1].trim();
							code = code.split('\n').slice(1).join('\n');
						}
					}

					let html = highlighter.codeToHtml(code, {
						lang: lang || 'text',
						theme: 'tokyo-night'
					});

					if (filename) {
						html = html.replace('<pre', `<pre data-filename="${filename}"`);
					}

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
		prerender: {
			handleHttpError({ path }) {
				if (
					path.startsWith('/animorphs') ||
					path.startsWith('/tumblr-fandometrics') ||
					path.startsWith('/buffy-podcasts')
				)
					return;
				throw new Error(`404: ${path}`);
			}
		},
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
