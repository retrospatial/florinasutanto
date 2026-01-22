import matter from 'gray-matter';

interface PostFrontmatter {
	title?: string;
	desc?: string;
	cover?: string;
	tags?: string[];
	date?: string;
}

export const load = async () => {
	const files = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw', import: 'default' });

	const posts = Object.entries(files)
		.map(([path, raw]) => {
			const { data, content } = matter(raw as string);
			const frontmatter = data as PostFrontmatter;

			const date = frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : null;

			return {
				slug: path.split('/').pop()?.replace('.md', '') ?? '',
				title: frontmatter.title ?? '',
				desc: frontmatter.desc ?? '',
				cover: frontmatter.cover ?? '',
				tags: frontmatter.tags ?? [],
				date,
				body: content
			};
		})
		.sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime());

	return { posts };
};
