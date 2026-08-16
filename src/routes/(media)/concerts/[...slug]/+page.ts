import { error } from '@sveltejs/kit';
import type { MdsvexModule } from '$lib/utils/blog';
import { slugify } from '$lib/utils/slug.js';
import page from '../+page.yaml';

export const prerender = true;

interface Show {
	artist: string;
	date?: string | null;
	venue?: string | null;
	city?: string | null;
	support?: string[];
	poster?: string | null;
}

const writeups = import.meta.glob<MdsvexModule>('/content/concerts/**/*.md', { eager: true });

export const load = ({ params }) => {
	// "<year>/<artist-slug>"
	const [year, slug] = params.slug.split('/');

	const group = page.concerts?.find((g: { year: number }) => String(g.year) === year);
	const show: Show | undefined = group?.shows?.find((s: Show) => slugify(s.artist) === slug);

	const file = writeups[`/content/concerts/${year}/${slug}.md`];

	// a concert only has a page if there's a write-up file for it
	if (!show || !file) throw error(404, 'No write-up for that concert');

	// the page title lives in the list route's yaml, and a sibling's load doesn't
	// flow down here — pass it through explicitly
	return { title: page.title, show, year, Content: file.default };
};
