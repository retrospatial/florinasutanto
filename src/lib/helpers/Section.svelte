<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		children: Snippet;
		class?: string;
		small?: boolean;
	}

	let { children, class: className = '', small = false, ...rest }: Props = $props();
</script>

<section
	class="w-full {small
		? 'max-w-3xl md:px-0'
		: 'md:px-12'} body-lg px-6 text-bone mx-auto mt-4 md:mt-8 {className}"
	{...rest}
>
	{@render children()}
</section>
