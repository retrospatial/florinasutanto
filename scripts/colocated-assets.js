const RELATIVE = /^(?!\/|https?:|data:|#)/;
const IMAGE_EXT = /\.(webp|png|jpe?g|gif|avif|svg)$/i;

const isColocated = (src) => RELATIVE.test(src) && IMAGE_EXT.test(src);

/** split on fenced code blocks so examples inside ``` are never rewritten */
function outsideFences(content, transform) {
	return content
		.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)
		.map((chunk, i) => (i % 2 === 0 ? transform(chunk) : chunk))
		.join('');
}

export function colocatedAssets({ include = '/content/posts/' } = {}) {
	return {
		name: 'colocated-assets',

		markup({ content, filename }) {
			if (!filename?.endsWith('.md') || !filename.includes(include)) return;

			const imports = new Map();
			const ref = (src) => {
				const key = src.replace(/^\.\//, '');
				if (!imports.has(key)) imports.set(key, `__asset_${imports.size}`);
				return imports.get(key);
			};

			let code = outsideFences(content, (chunk) =>
				chunk
					// <Image src="photo.webp" ... />
					.replace(/(<Image\b[^>]*?\ssrc=)"([^"]+)"/g, (match, prefix, src) =>
						isColocated(src) ? `${prefix}{${ref(src)}}` : match
					)
					// ![alt](photo.webp)
					.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (match, alt, src) =>
						isColocated(src) ? `<img src={${ref(src)}} alt="${alt}" />` : match
					)
			);

			if (imports.size === 0) return;

			const statements = [...imports]
				.map(([src, name]) => `\timport ${name} from './${src}';`)
				.join('\n');

			// append to the existing instance script, or open one after the frontmatter
			const script = /<script(?![^>]*\bcontext\s*=)[^>]*>/.exec(code);

			if (script) {
				const at = script.index + script[0].length;
				code = `${code.slice(0, at)}\n${statements}${code.slice(at)}`;
			} else {
				const frontmatter = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(code);
				const at = frontmatter ? frontmatter[0].length : 0;
				code = `${code.slice(0, at)}\n<script>\n${statements}\n</script>\n${code.slice(at)}`;
			}

			return { code };
		}
	};
}
