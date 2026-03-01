import type { Component } from 'svelte';

interface MdsvexModule {
	default: Component;
	metadata: Record<string, unknown>;
}

export const prerender = 'auto';

export const load = async ({ params, data }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const entry = Object.entries(files).find(([path, module]) => {
		const metadata = module.metadata as { slug?: string; date?: string };
		const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
		const year = metadata.date ? new Date(metadata.date).getFullYear() : null;
		const slug = metadata.slug
			? year ? `${year}/${metadata.slug}` : metadata.slug
			: fileSlug;
		return slug === params.slug;
	});

	return {
		...data,
		Content: entry?.[1].default
	};
};
