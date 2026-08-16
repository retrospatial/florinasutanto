import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { colocatedAssets } from './scripts/colocated-assets.js';
import { escapeAngles } from './scripts/escape-angles.js';
import { highlight } from './scripts/shiki.js';
import { rehypeHeadingIds } from './scripts/rehype-heading-ids.js';

export default {
	extensions: ['.svelte', '.md'],
	preprocess: [
		colocatedAssets(),
		escapeAngles(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeHeadingIds],
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

					let html = highlight(code, lang);

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
		alias: {
			$scripts: 'scripts'
		},
		prerender: {
			handleHttpError({ path }) {
				// vercel's image optimizer only exists at runtime, not during prerender
				if (path.startsWith('/_vercel/image')) return;
				if (
					path.startsWith('/animorphs') ||
					path.startsWith('/tumblr-fandometrics') ||
					path.startsWith('/buffy-podcasts') ||
					path.startsWith('/html-comment-box-demo')
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
