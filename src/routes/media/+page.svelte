<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import { mdInline } from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="relative">
	<Heading hed={content.title} />

	<section class="">
		<p class="title">{@html mdInline(content.text[0])}</p>
		<p class="title">{@html mdInline(content.text[1])}</p>
		<p class="title">{@html mdInline(content.text[2])}</p>
	</section>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.title {
		@apply font-handwriting text-2xl md:text-4xl;
	}
</style>
