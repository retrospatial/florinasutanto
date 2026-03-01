import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

interface MdsvexModule {
	default: Component;
	metadata: {
		title?: string;
		desc?: string;
		cover?: string;
		tags?: string[];
		date?: string;
		slug?: string;
	};
}

export const entries = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	return Object.entries(files).map(([path, module]) => {
		const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
		const slug = module.metadata.slug ?? fileSlug;
		return { slug };
	});
};

export const load = async ({ params }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});

	const entry = Object.entries(files).find(([path, module]) => {
		const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
		return (module.metadata.slug ?? fileSlug) === params.slug;
	});

	if (!entry) throw error(404, 'Post not found');

	const [, module] = entry;
	const { metadata } = module;

	return {
		post: {
			slug: params.slug,
			title: metadata.title ?? '',
			desc: metadata.desc ?? '',
			cover: metadata.cover ?? '',
			tags: metadata.tags ?? [],
			date: metadata.date ? new Date(metadata.date).toISOString().split('T')[0] : null
		}
	};
};
