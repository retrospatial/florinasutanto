<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		title?: string;
		height?: number;
	}

	let { src, title = 'PDF document', height = 800 }: Props = $props();

	let isMobile = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;

		const handler = (e: MediaQueryListEvent) => (isMobile = e.matches);
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	});
</script>

{#if isMobile}
	<a href={src} target="_blank" rel="noopener">Click to view PDF</a> (on mobile)
	<br />
{:else}
	<iframe src="/files/{src}" {title} loading="lazy" m style="width: 100%; height: {height}px; " />
{/if}
