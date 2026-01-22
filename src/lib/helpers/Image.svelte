<script lang="ts" module>
	import { dev } from '$app/environment';

	const imports = import.meta.glob(
		[
			'../assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			'../assets/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
		],
		{
			eager: true,
			import: 'default'
		}
	);

	const pictures = Object.fromEntries(
		Object.entries(imports).map(([key, value]) => {
			const normalizedKey = key.replace('../assets/', '').replace(/\\/g, '/');
			return [normalizedKey, value];
		})
	) as Record<string, string>;

	// Build Vercel image optimization URL
	function getOptimizedUrl(src: string, width: number, quality: number): string {
		if (dev) return src;
		const params = new URLSearchParams({
			url: src,
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

	const baseSrc = $derived(pictures[src]);
	const imageSrc = $derived(baseSrc ? getOptimizedUrl(baseSrc, width, quality) : undefined);
</script>

{#if imageSrc}
	<img bind:this={ref} src={imageSrc} {alt} loading={lazy ? 'lazy' : 'eager'} class={classes} />
{:else}
	<div class="text-red-500">Image not found: {src}</div>
{/if}
