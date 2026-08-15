import { highlight } from '$scripts/shiki.js';
import page from './+page.yaml';
import tokens from '$lib/styles/tokens.css?raw';

export const prerender = true;

export const load = () => {
	const swatches = [...tokens.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8});/g)].map(
		([, name, hex]) => ({ name, hex })
	);

	const fonts = [...tokens.matchAll(/--font-([a-z0-9-]+):\s*([^;]+);/g)].map(([, name, stack]) => ({
		name,
		stack: stack.trim(),
		family: stack.trim().split(',')[0].replace(/['"]/g, ''),
		fallback: stack
			.trim()
			.split(',')
			.slice(1)
			.map((part) => part.trim())
			.join(', '),
		note: page.font_notes?.[name] ?? ''
	}));

	const snippet = page.snippet
		? { ...page.snippet, html: highlight(page.snippet.code.trimEnd(), page.snippet.lang) }
		: null;

	const { snippet: _raw, ...rest } = page;

	return {
		...rest,
		swatches,
		fonts,
		snippet
	};
};
