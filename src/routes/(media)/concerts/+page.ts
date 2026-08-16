import page from './+page.yaml';

export const prerender = true;

const writeups = import.meta.glob('/content/concerts/**/*.md');

export const load = () => {
	return {
		...page,
		written: Object.keys(writeups).map((path) =>
			path.replace('/content/concerts/', '').replace(/\.md$/, '')
		)
	};
};
