interface PostMetadata {
	title?: string;
	desc?: string;
	cover?: string;
	tags?: string[];
	date_published?: string;
	slug?: string;
}

interface MdsvexModule {
	default: unknown;
	metadata: PostMetadata;
}

export const load = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const posts = Object.entries(files)
		.map(([path, module]) => {
			const metadata = module.metadata;
			const date = metadata.date_published ? new Date(metadata.date_published).toISOString().split('T')[0] : null;
			const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
			const year = metadata.date_published ? new Date(metadata.date_published).getFullYear() : null;
			const slug = metadata.slug
				? year ? `${year}/${metadata.slug}` : metadata.slug
				: fileSlug;

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
