<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="relative">
	<Heading hed={content.title} />

	<section class="">
		<p class="">{@html md(content.text[0])}</p>
	</section>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';
</style>
