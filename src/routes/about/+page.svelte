<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import Section from '$lib/helpers/Section.svelte';

	let content = page.data;
</script>

<Section>
	<h1 class="heading-1 text-accent-yellow">now</h1>

	<p class="text-white body-lg">{@html md(content.now)}</p>
</Section>
