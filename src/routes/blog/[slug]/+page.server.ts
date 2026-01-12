import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const path = `/content/posts/${params.slug}.md`;

	const files = import.meta.glob('/content/posts/*.md', { eager: true, as: 'raw' });
	const raw = files[path];

	if (!raw) throw error(404, 'Post not found');

	const { data, content } = matter(raw as string);

	return {
		post: {
			slug: params.slug,
			...data,
			date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
			body: content
		}
	};
};
