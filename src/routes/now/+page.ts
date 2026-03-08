import type { Component } from 'svelte';

export const prerender = true;

export const load = async () => {
	const files = import.meta.glob<{ default: Component; metadata: Record<string, unknown> }>(
		'/content/now.md',
		{ eager: true }
	);
	const file = Object.values(files)[0];
	return {
		date: file.metadata.date as string,
		component: file.default
	};
};
