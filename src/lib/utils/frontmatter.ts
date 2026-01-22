/**
 * Simple frontmatter parser (ESM-compatible replacement for gray-matter)
 */
export function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

	if (!match) {
		return { data: {}, content };
	}

	const [, frontmatterBlock, body] = match;
	const data: Record<string, unknown> = {};
	const lines = frontmatterBlock.split('\n');

	let currentKey: string | null = null;
	let currentArray: string[] | null = null;

	for (const line of lines) {
		// Check if this is a list item (starts with whitespace + -)
		const listMatch = line.match(/^\s+-\s+(.*)$/);
		if (listMatch && currentKey) {
			if (!currentArray) {
				currentArray = [];
			}
			currentArray.push(listMatch[1].trim().replace(/^['"]|['"]$/g, ''));
			continue;
		}

		// If we were building an array, save it
		if (currentKey && currentArray) {
			data[currentKey] = currentArray;
			currentArray = null;
			currentKey = null;
		}

		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) continue;

		const key = line.slice(0, colonIndex).trim();
		let value: unknown = line.slice(colonIndex + 1).trim();

		// Empty value after colon means array follows on next lines
		if (value === '') {
			currentKey = key;
			currentArray = [];
			continue;
		}

		// Handle inline arrays (tags: [a, b, c])
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
			currentKey = null;
		}
	}

	// Don't forget to save any trailing array
	if (currentKey && currentArray) {
		data[currentKey] = currentArray;
	}

	return { data, content: body.trim() };
}
