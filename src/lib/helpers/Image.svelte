<script lang="ts" module>
	// Match files directly in assets folder and in subdirectories
	const imports = import.meta.glob(
		[
			'../assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			'../assets/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'
		],
		{
			query: { enhanced: true },
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
</script>

<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		lazy?: boolean;
		src: string;
		alt: string;
		class?: ClassValue;
		ref?: HTMLElement;
	}

	let { lazy = true, src, alt, class: classes = '', ref = $bindable() }: Props = $props();

	const imageSrc = $derived(pictures[src]);
</script>

{#if imageSrc}
	<enhanced:img
		bind:this={ref}
		src={imageSrc}
		{alt}
		loading={lazy ? 'lazy' : 'eager'}
		class={classes}
	/>
{:else}
	<div class="text-red-500">Image not found: {src}</div>
{/if}
