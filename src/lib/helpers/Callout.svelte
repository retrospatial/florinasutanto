<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="callout bg-lime mb-6 p-2 text-black md:p-4">
	{@render children()}
</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.callout :global(a) {
		@apply text-black underline;
	}

	.callout :global(p:last-child) {
		@apply mb-0;
	}
</style>
