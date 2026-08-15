import { createHighlighter } from 'shiki';

export const THEME = 'tokyo-night';

export const LANGS = [
	'javascript',
	'typescript',
	'bash',
	'svelte',
	'css',
	'html',
	'json',
	'markdown',
	'yaml'
];

export const highlighter = await createHighlighter({ themes: [THEME], langs: LANGS });

/**
 * @param {string} code
 * @param {string} lang
 */
export function highlight(code, lang) {
	return highlighter.codeToHtml(code, {
		lang: LANGS.includes(lang) ? lang : 'text',
		theme: THEME
	});
}
