<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<section class="w-4/5 mx-auto body-lg text-white {className}" {...rest}>
	{@render children()}
</section>
