<script lang="ts" module>
	const isDev = import.meta.env.DEV;

	function getFullPath(src: string): string {
		// vite compiles a colocated asset import to `new URL(…, import.meta.url).href`,
		// which is absolute on the client but a plain path during SSR. without this the
		// hydrated src becomes /assets/images/https://… and 404s.
		if (/^https?:\/\//.test(src)) {
			const url = new URL(src);
			const sameOrigin = typeof location !== 'undefined' && url.origin === location.origin;
			return sameOrigin ? url.pathname : src;
		}

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
		lightbox = true,
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
