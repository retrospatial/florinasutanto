<script lang="ts" module>
	const isDev = import.meta.env.DEV;

	function getFullPath(src: string): string {
		if (src.startsWith('/')) return src;
		const basePath =
			src.startsWith('cover_imgs/') || src.startsWith('blog/') ? '/assets/' : '/assets/images/';
		return `${basePath}${src}`;
	}

	function getVercelUrl(fullPath: string, width: number, quality: number): string {
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
		lightbox?: boolean;
		src: string;
		alt: string;
		class?: ClassValue;
		style?: string;
		ref?: HTMLElement;
		width?: number;
		quality?: number;
	}

	let {
		lazy = true,
		lightbox = false,
		src,
		alt,
		class: classes = '',
		style = '',
		ref = $bindable(),
		width = 1200,
		quality = 75
	}: Props = $props();

	const fullPath = $derived(getFullPath(src));

	const imageSrc = $derived(isDev ? fullPath : getVercelUrl(fullPath, width, quality));
</script>

<img
	bind:this={ref}
	src={imageSrc}
	{alt}
	loading={lazy ? 'lazy' : 'eager'}
	class={classes}
	{style}
	data-lightbox={lightbox ? '' : undefined}
/>
