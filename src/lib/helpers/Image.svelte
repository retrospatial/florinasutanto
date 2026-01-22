<script lang="ts" module>
	const isDev = import.meta.env.DEV;

	function getOptimizedUrl(src: string, width: number, quality: number): string {
		// Determine base path - cover_imgs is at /assets/cover_imgs, others at /assets/images
		const basePath = src.startsWith('cover_imgs/') ? '/assets/' : '/assets/images/';
		const fullPath = `${basePath}${src}`;

		// In dev, serve directly from static
		if (isDev) return fullPath;
		// In production, use Vercel image optimization
		const params = new URLSearchParams({
			url: fullPath,
			w: width.toString(),
			q: quality.toString()
		});
		return `/_vercel/image?${params}`;
	}
</script>

<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		lazy?: boolean;
		src: string;
		alt: string;
		class?: ClassValue;
		ref?: HTMLElement;
		width?: number;
		quality?: number;
	}

	let {
		lazy = true,
		src,
		alt,
		class: classes = '',
		ref = $bindable(),
		width = 1200,
		quality = 75
	}: Props = $props();

	const imageSrc = $derived(getOptimizedUrl(src, width, quality));
</script>

<img bind:this={ref} src={imageSrc} {alt} loading={lazy ? 'lazy' : 'eager'} class={classes} />
