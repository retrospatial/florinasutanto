import { type MdsvexModule, toISODate } from '$lib/utils/blog';

export const prerender = true;

export const load = () => {
	const files = import.meta.glob<MdsvexModule>('/content/pages/colophon.md', { eager: true });
	const { default: Content, metadata } = Object.values(files)[0];

	return {
		Content,
		post: {
			title: metadata.title ?? '',
			desc: metadata.desc ?? '',
			date_updated: toISODate(metadata.date_updated)
		}
	};
};
