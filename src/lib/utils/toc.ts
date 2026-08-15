import { makeSlugger } from '$lib/utils/slug.js';

export interface TocItem {
	title: string;
	slug: string;
	children: TocItem[];
}

export function extractToc(markdown: string): TocItem[] {
	const toc: TocItem[] = [];
	const slug = makeSlugger();
	let fenced = false;

	// open ancestors by depth: [0] = current h2, [1] = current h3, …
	const open: TocItem[] = [];

	for (const line of markdown.split('\n')) {
		if (/^\s*(```|~~~)/.test(line)) {
			fenced = !fenced;
			continue;
		}
		if (fenced) continue;

		const heading = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
		if (!heading) continue;

		const depth = heading[1].length - 2;
		const title = heading[2].replace(/[`*_~]/g, '').trim();
		const item: TocItem = { title, slug: slug(title), children: [] };

		open.length = depth; // anything deeper than this heading is now closed
		const parent = open[depth - 1];

		if (depth === 0) toc.push(item);
		else if (parent) parent.children.push(item);
		else continue; // a heading that skips a level has nowhere to hang

		open[depth] = item;
	}

	return toc;
}
