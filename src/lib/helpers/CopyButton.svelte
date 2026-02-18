<script lang="ts" module>
	export function addCopyButtons(node: HTMLElement) {
		node.querySelectorAll('pre').forEach((pre) => {
			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			pre.replaceWith(wrapper);
			wrapper.append(pre);

			const button = document.createElement('button');
			button.className = 'copy-btn';
			button.innerHTML = `
				<iconify-icon class="icon-outline" icon="icon-park-outline:copy"></iconify-icon>
				<iconify-icon class="icon-hover" icon="icon-park-twotone:copy"></iconify-icon>
				<iconify-icon class="icon-solid" icon="icon-park-solid:copy"></iconify-icon>
			`;

			const feedback = document.createElement('span');
			feedback.className = 'copy-feedback';
			feedback.textContent = 'COPIED!';

			button.onclick = async () => {
				await navigator.clipboard.writeText(pre.textContent || '');
				button.classList.add('copied');
				feedback.classList.add('show');

				setTimeout(() => {
					button.classList.remove('copied');
					feedback.classList.remove('show');
				}, 1000);
			};

			wrapper.append(button, feedback);
		});
	}
</script>

<style>
	:global(.code-block-wrapper) {
		position: relative;
	}

	:global(.copy-btn) {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.35rem;
		font-size: 1.25rem;
		line-height: 1;
		background: transparent;
		color: var(--color-accent-pink);
		border: none;
		cursor: pointer;
		opacity: 0;
		transition:
			opacity 0.2s,
			transform 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.code-block-wrapper:hover .copy-btn) {
		opacity: 1;
	}

	:global(.copy-btn iconify-icon) {
		position: absolute;
		transition: opacity 300ms ease;
	}

	:global(.copy-btn .icon-outline) {
		opacity: 1;
	}

	:global(.copy-btn .icon-hover),
	:global(.copy-btn .icon-solid) {
		opacity: 0;
	}

	:global(.copy-btn:hover .icon-outline) {
		opacity: 0;
	}

	:global(.copy-btn:hover .icon-hover) {
		opacity: 1;
	}

	:global(.copy-btn.copied .icon-outline),
	:global(.copy-btn.copied .icon-hover) {
		opacity: 0;
	}

	:global(.copy-btn.copied .icon-solid) {
		opacity: 1;
	}

	:global(.copy-feedback) {
		position: absolute;
		top: 2.5rem;
		right: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-accent-pink);
		text-align: center;
		display: none;
	}

	:global(.copy-feedback.show) {
		display: block;
	}
</style>
