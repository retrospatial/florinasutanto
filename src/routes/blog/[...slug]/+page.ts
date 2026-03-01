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
		const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
		return ((module.metadata.slug as string | undefined) ?? fileSlug) === params.slug;
	});

	return {
		...data,
		Content: entry?.[1].default
	};
};
