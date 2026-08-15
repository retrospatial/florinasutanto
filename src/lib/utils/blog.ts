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
	const fileSlug = path
		.replace('/content/posts/', '')
		.replace(/\/index\.md$/, '')
		.replace(/\.md$/, '');
	const year = metadata.date_published ? new Date(metadata.date_published).getFullYear() : null;
	return metadata.slug ? (year ? `${year}/${metadata.slug}` : metadata.slug) : fileSlug;
}

const postAssets = import.meta.glob<string>(
	'/content/posts/**/*.{webp,png,jpg,jpeg,gif,avif,svg}',
	{ eager: true, query: '?url', import: 'default' }
);

export function resolvePostAsset(postPath: string, ref?: string): string {
	if (!ref) return '';
	if (/^(https?:)?\//.test(ref)) return ref;
	const dir = postPath.slice(0, postPath.lastIndexOf('/'));
	return postAssets[`${dir}/${ref.replace(/^\.\//, '')}`] ?? '';
}

export function toISODate(dateString?: string): string | null {
	if (!dateString) return null;
	return new Date(dateString).toISOString().split('T')[0];
}

export function formatMonth(dateString: string | null): string {
	if (!dateString) return '';
	const [y, m] = dateString.split('-').map(Number);
	if (!y || !m) return dateString;
	return new Date(y, m - 1, 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
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
