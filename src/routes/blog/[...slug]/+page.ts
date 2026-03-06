import { type MdsvexModule, getPostSlug } from '$lib/utils/blog';

export const prerender = 'auto';

export const load = async ({ params, data }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const entry = Object.entries(files).find(([path, module]) => {
		return getPostSlug(path, module.metadata) === params.slug;
	});

	return {
		...data,
		Content: entry?.[1].default
	};
};
