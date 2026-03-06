import { error } from '@sveltejs/kit';
import { type MdsvexModule, getPostSlug, toISODate } from '$lib/utils/blog';

export const entries = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	return Object.entries(files).map(([path, module]) => {
		const slug = getPostSlug(path, module.metadata);
		return { slug };
	});
};

export const load = async ({ params }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const entry = Object.entries(files).find(([path, module]) => {
		return getPostSlug(path, module.metadata) === params.slug;
	});

	if (!entry) throw error(404, 'Post not found');

	const { metadata } = entry[1];

	return {
		post: {
			slug: params.slug,
			title: metadata.title ?? '',
			desc: metadata.desc ?? '',
			cover: metadata.cover ?? '',
			tags: metadata.tags ?? [],
			date_published: toISODate(metadata.date_published),
			date_updated: toISODate(metadata.date_updated)
		}
	};
};
