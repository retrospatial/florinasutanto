<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="border-2 border-lime mb-6">
	<div
		class="bg-lime detail-sm text-black font-bold uppercase border-lime border-b-2 md:px-4 md:py-2 px-2 py-1"
	>
		{#if title}
			{title}
		{/if}
	</div>

	<div class="callout bg-night p-2 text-bone md:p-4">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.callout :global(a) {
		@apply text-lime;
	}

	.callout :global(p:last-child) {
		@apply mb-0;
	}
</style>
