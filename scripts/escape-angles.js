/**
 * Let markdown files contain a bare `<3`.

/** split on fenced blocks and inline code — a literal `<` belongs there as-is */
function outsideCode(content, transform) {
	return content
		.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g)
		.map((chunk, i) => (i % 2 === 0 ? transform(chunk) : chunk))
		.join('');
}

export function escapeAngles() {
	return {
		name: 'escape-angles',

		markup({ content, filename }) {
			if (!filename?.endsWith('.md')) return;

			// frontmatter is yaml, not markup — escaping there would corrupt values
			const match = /^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/.exec(content);
			const [frontmatter, body] = match ? [match[1], match[2]] : ['', content];

			const escaped = outsideCode(body, (chunk) => chunk.replace(/<(?![A-Za-z/!])/g, '&lt;'));

			if (escaped === body) return;
			return { code: frontmatter + escaped };
		}
	};
}
