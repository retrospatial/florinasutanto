import type { Component } from 'svelte';

export interface PostMetadata {
	title?: string;
	desc?: string;
	cover?: string;
	tags?: string[];
	date_published?: string;
	date_updated?: string;
	slug?: string;
}

export interface MdsvexModule {
	default: Component;
	metadata: PostMetadata;
}

export function getPostSlug(path: string, metadata: PostMetadata): string {
	const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
	const year = metadata.date_published ? new Date(metadata.date_published).getFullYear() : null;
	return metadata.slug ? (year ? `${year}/${metadata.slug}` : metadata.slug) : fileSlug;
}

export function toISODate(dateString?: string): string | null {
	if (!dateString) return null;
	return new Date(dateString).toISOString().split('T')[0];
}

export function formatDate(dateString: string | null): string {
	if (!dateString) return '';
	const [y, m, d] = dateString.split('-').map(Number);
	return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}
