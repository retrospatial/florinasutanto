<script lang="ts" module>
	export function addLightbox(node: HTMLElement) {
		node.querySelectorAll('img').forEach((img) => img.setAttribute('data-lightbox', ''));
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let lightboxImages = $state<{ src: string; alt: string }[]>([]);
	let lightboxIndex = $state(0);
	const lightboxSrc = $derived(lightboxImages[lightboxIndex]?.src ?? null);
	const lightboxAlt = $derived(lightboxImages[lightboxIndex]?.alt ?? '');

	onMount(() => {
		function handleImageClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (target.tagName === 'IMG' && target.hasAttribute('data-lightbox')) {
				e.preventDefault();
				e.stopPropagation();
				const clicked = target as HTMLImageElement;
				const all = [...document.querySelectorAll<HTMLImageElement>('img[data-lightbox]')];
				lightboxImages = all.map((img) => ({ src: img.src, alt: img.alt }));
				lightboxIndex = all.indexOf(clicked);
			}
		}

		document.addEventListener('click', handleImageClick, true);
		return () => document.removeEventListener('click', handleImageClick, true);
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (!lightboxSrc) return;
		if (e.key === 'Escape') lightboxImages = [];
		if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
		if (e.key === 'ArrowLeft')
			lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
	}}
/>

{#if lightboxSrc}
	<div
		data-lightbox-overlay
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 backdrop-blur-sm"
		onclick={() => (lightboxImages = [])}
		role="dialog"
		aria-modal="true"
		aria-label={lightboxAlt}
	>
		<img
			src={lightboxSrc}
			alt={lightboxAlt}
			class="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
		/>

		{#if lightboxImages.length > 1}
			<button
				class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
				onclick={(e) => {
					e.stopPropagation();
					lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
				}}
				aria-label="Previous image"
			>
				<iconify-icon icon="lucide:chevron-left" width="32"></iconify-icon>
			</button>
			<button
				class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
				onclick={(e) => {
					e.stopPropagation();
					lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
				}}
				aria-label="Next image"
			>
				<iconify-icon icon="lucide:chevron-right" width="32"></iconify-icon>
			</button>
		{/if}
	</div>
{/if}
