<script lang="ts" module>
	export function addCopyButtons(node: HTMLElement) {
		node.querySelectorAll('pre').forEach((pre) => {
			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			pre.replaceWith(wrapper);

			const filename = pre.dataset.filename;
			if (filename) {
				const header = document.createElement('div');
				header.className = 'code-block-header';
				header.textContent = filename;
				wrapper.append(header);
			}

			wrapper.append(pre);

			const button = document.createElement('button');
			button.className = 'copy-btn';
			button.innerHTML = `
				<iconify-icon class="icon-outline" icon="icon-park-outline:copy"></iconify-icon>
				<iconify-icon class="icon-hover" icon="icon-park-twotone:copy"></iconify-icon>
				<iconify-icon class="icon-solid" icon="icon-park-solid:copy"></iconify-icon>
			`;

			const feedback = document.createElement('output');
			feedback.className = 'copy-feedback';
			feedback.setAttribute('aria-live', 'polite');
			// feedback.textContent = 'COPIED!';

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

	:global(.code-block-header) {
		background: var(--color-dark-gray);
		border-bottom: 1px solid var(--color-accent-pink);
		border-radius: 4px 4px 0 0;
		padding: 0.75rem 1rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-accent-pink);
	}

	:global(.code-block-header + pre) {
		border-radius: 0 0 0.375rem 0.375rem !important;
		margin-top: 0 !important;
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

	/* :global(.copy-feedback) {
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
	} */
</style>
