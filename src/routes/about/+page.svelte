<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import image from '$lib/helpers/Image.svelte';
	import lastfm from '$lib/components/home/LastFM.svelte';
	import Polaroids from '$lib/components/home/Polaroids.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	let imgfolder = '/assets/images/random/';
</script>

<Section small class="relative">
	<h1 class="heading-md text-center">
		{content.title}
	</h1>

	<section class="">
		<p class="">{@html md(content.intro)}</p>

		<div class="">
			<Polaroids />
		</div>
	</section>
</Section>

<ul class="text-white">
	<li>last fm</li>
	<li>reads</li>
	<li>red line</li>
	<li>piano</li>
</ul>

<style lang="postcss">
	@reference '';

	/* :global(.flag) {
		transform-origin: top center;
		animation: sway var(--sway-duration, 4s) ease-in-out infinite;
		animation-delay: var(--sway-delay, 0s);
	} */
</style>
