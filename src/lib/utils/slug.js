/** @param {string} text */
export const slugify = (text) =>
	text
		.trim()
		.toLowerCase()
		.replace(/[`*_~]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-');

export function makeSlugger() {
	/** @type {Map<string, number>} */
	const seen = new Map();

	/** @param {string} text */
	return (text) => {
		const base = slugify(text);
		const count = seen.get(base) ?? 0;
		seen.set(base, count + 1);
		return count ? `${base}-${count}` : base;
	};
}
