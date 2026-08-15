import { type MdsvexModule, toISODate } from '$lib/utils/blog';
import { extractToc } from '$lib/utils/toc';

export const prerender = true;

export const load = () => {
	const files = import.meta.glob<MdsvexModule>('/content/pages/cheatsheet.md', { eager: true });
	const { default: Content, metadata } = Object.values(files)[0];

	// same file again, unprocessed, so the TOC can be built from the source
	const source = import.meta.glob('/content/pages/cheatsheet.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	return {
		Content,
		toc: extractToc(Object.values(source)[0]),
		post: {
			title: metadata.title ?? '',
			desc: metadata.desc ?? '',
			date_updated: toISODate(metadata.date_updated)
		}
	};
};
