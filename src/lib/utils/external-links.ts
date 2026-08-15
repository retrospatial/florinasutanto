/**
 * Svelte action: send absolute links inside `node` to a new tab.
 *
 * Runs on mount, so it only covers links present when the node is created —
 * which is the case for `{@html …}` output and rendered markdown.
 */
export function externalLinks(node: HTMLElement) {
	node.querySelectorAll('a[href^="http"]').forEach((link) => {
		link.setAttribute('target', '_blank');
		link.setAttribute('rel', 'noopener noreferrer');
	});
}
