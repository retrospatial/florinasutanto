/**
 * Simple frontmatter parser (ESM-compatible replacement for gray-matter)
 */
export function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

	if (!match) {
		return { data: {}, content };
	}

	const [, frontmatterBlock, body] = match;
	const data: Record<string, unknown> = {};

	// Parse YAML-like frontmatter (simple key: value pairs)
	for (const line of frontmatterBlock.split('\n')) {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) continue;

		const key = line.slice(0, colonIndex).trim();
		let value: unknown = line.slice(colonIndex + 1).trim();

		// Handle arrays (tags: [a, b, c] or tags: - a format)
		if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
			value = value
				.slice(1, -1)
				.split(',')
				.map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
		}
		// Handle quoted strings
		else if (typeof value === 'string' && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
			value = value.slice(1, -1);
		}
		// Handle booleans
		else if (value === 'true') {
			value = true;
		} else if (value === 'false') {
			value = false;
		}
		// Handle numbers
		else if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
			value = Number(value);
		}

		if (key) {
			data[key] = value;
		}
	}

	return { data, content: body.trim() };
}
