<script lang="ts" module>
	// Match files directly in assets folder and in subdirectories
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
			// Remove '../assets/' prefix and normalize path separators
			const normalizedKey = key.replace('../assets/', '').replace(/\\/g, '/');
			return [normalizedKey, value];
		})
	) as Record<string, string>;

	// Build Vercel image optimization URL
	function getVercelImageUrl(src: string, width: number = 1200, quality: number = 75): string {
		const params = new URLSearchParams({
			url: src,
			w: width.toString(),
			q: quality.toString()
		});
		return `/_vercel/image?${params}`;
	}
</script>

<script lang="ts">
	import { dev } from '$app/environment';
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
	// Use Vercel image optimization in production, direct src in dev
	const imageSrc = $derived(
		baseSrc ? (dev ? baseSrc : getVercelImageUrl(baseSrc, width, quality)) : undefined
	);
</script>

{#if baseSrc}
	<img bind:this={ref} src={imageSrc} {alt} loading={lazy ? 'lazy' : 'eager'} class={classes} />
{:else}
	<div class="text-red-500">Image not found: {src}</div>
{/if}
