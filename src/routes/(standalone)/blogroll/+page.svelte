<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="flex flex-col gap-8">
	<h1 class="heading-md mb-0">{content.title}</h1>

	<div class="body-md mx-auto">{@html md(content.text)}</div>
</Section>
