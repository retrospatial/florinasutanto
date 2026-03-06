import { type MdsvexModule, getPostSlug, toISODate } from '$lib/utils/blog';

export const load = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const posts = Object.entries(files)
		.map(([path, module]) => {
			const metadata = module.metadata;
			const slug = getPostSlug(path, metadata);
			const date = toISODate(metadata.date_published);

			return {
				slug,
				title: metadata.title ?? '',
				desc: metadata.desc ?? '',
				cover: metadata.cover ?? '',
				tags: metadata.tags ?? [],
				date
			};
		})
		.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());

	return { posts };
};
