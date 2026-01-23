import type { Component } from 'svelte';

interface MdsvexModule {
	default: Component;
	metadata: Record<string, unknown>;
}

export const prerender = 'auto';

export const load = async ({ params, data }) => {
	const indexPath = `/content/posts/${params.slug}/index.md`;
	const directPath = `/content/posts/${params.slug}.md`;

	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});
	const module = files[indexPath] || files[directPath];

	return {
		...data,
		Content: module?.default
	};
};
