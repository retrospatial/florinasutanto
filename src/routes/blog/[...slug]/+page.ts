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
	const module = files[`/content/posts/${params.slug}.md`];

	return {
		...data,
		Content: module?.default
	};
};
