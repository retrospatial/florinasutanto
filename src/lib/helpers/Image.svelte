<script lang="ts" module>
	import { browser } from '$app/environment';

	const isDev = import.meta.env.DEV;

	function getOptimizedUrl(src: string, width: number, quality: number): string {
		const basePath = src.startsWith('cover_imgs/') ? '/assets/' : '/assets/images/';
		const fullPath = `${basePath}${src}`;

		// In dev or during SSR/prerendering, serve directly from static
		if (isDev || !browser) return fullPath;
		// In production browser, use Vercel image optimization
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
