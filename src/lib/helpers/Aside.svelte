<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="text-bone/90 mb-4 -mt-2 body-md xl:my-0 xl:w-50 xl:-mr-60">
	{@render children()}
</aside>

<style lang="postcss">
	@media (width >= 80rem) {
		aside {
			position: absolute;
			right: 0;
		}
	}
</style>
