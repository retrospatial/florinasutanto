import { parseFrontmatter } from '$lib/utils/frontmatter';
import { error } from '@sveltejs/kit';

export const entries = () => {
	const files = import.meta.glob('/content/posts/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	return Object.keys(files).map((path) => {
		const slug = path.replace('/content/posts/', '').replace('/index.md', '').replace('.md', '');
		return {
			slug
		};
	});
};

export const load = async ({ params }) => {
	const indexPath = `/content/posts/${params.slug}/index.md`;
	const directPath = `/content/posts/${params.slug}.md`;

	const files = import.meta.glob('/content/posts/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	const raw = files[indexPath] || files[directPath];

	if (!raw) throw error(404, 'Post not found');

	const { data, content } = parseFrontmatter(raw as string);

	return {
		post: {
			slug: params.slug,
			...data,
			date: data.date ? new Date(data.date as string | number).toISOString().split('T')[0] : null,
			body: content
		}
	};
};
