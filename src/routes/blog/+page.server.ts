import matter from 'gray-matter';

export const load = async () => {
	const files = import.meta.glob('/content/posts/*.md', { eager: true, as: 'raw' });

	const posts = Object.entries(files)
		.map(([path, raw]) => {
			const { data, content } = matter(raw as string);

			const date = data.date ? new Date(data.date).toISOString().split('T')[0] : null;

			return {
				slug: path.split('/').pop()?.replace('.md', '') ?? '',
				...data,
				date,
				body: content
			};
		})
		.sort((a: any, b: any) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());

	return { posts };
};
