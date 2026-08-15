import { makeSlugger } from '../src/lib/utils/slug.js';

/** @param {any} node */
function textOf(node) {
	if (node.type === 'text') return node.value ?? '';
	return (node.children ?? []).map(textOf).join('');
}

/**
 * mdsvex rehype plugin: give every heading an id at build time.
 **/
export function rehypeHeadingIds() {
	return (/** @type {any} */ tree) => {
		const slug = makeSlugger();

		/** @param {any} node */
		function walk(node) {
			for (const child of node.children ?? []) {
				if (/^h[2-4]$/.test(child.tagName ?? '')) {
					child.properties ??= {};
					child.properties.id ??= slug(textOf(child));
				}
				walk(child);
			}
		}

		walk(tree);
	};
}
