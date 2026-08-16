<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import Polaroids from '$lib/components/about/Polaroids.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="relative">
	<Heading hed={content.title} />

	<section class="">
		<p class="">{@html md(content.intro)}</p>

		<div class="mt-12">
			<Polaroids />
		</div>
	</section>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';
</style>
