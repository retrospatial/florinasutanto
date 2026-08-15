<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		children: Snippet;
		class?: string;
		small?: boolean;
		medium?: boolean;
	}

	let { children, class: className = '', small = false, medium = false, ...rest }: Props = $props();

	const width = $derived(small ? 'max-w-[51rem]' : medium ? 'max-w-5xl' : 'md:px-12');
</script>

<section class="w-full {width} body-lg px-6 text-bone mx-auto mt-4 md:mt-8 {className}" {...rest}>
	{@render children()}
</section>
