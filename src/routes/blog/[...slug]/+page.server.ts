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
	};
}

export const entries = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});
	const filePaths = Object.keys(files);

	return filePaths.map((path) => {
		const slug = path.replace('/content/posts/', '').replace('.md', '');
		return { slug };
	});
};

export const load = async ({ params }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', {
		eager: true
	});
	const module = files[`/content/posts/${params.slug}.md`];

	if (!module) throw error(404, 'Post not found');

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
