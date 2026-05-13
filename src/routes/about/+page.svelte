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

		<div class="mt-12">
			<Polaroids />
		</div>
	</section>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	/* :global(.flag) {
		transform-origin: top center;
		animation: sway var(--sway-duration, s4) ease-in-out infinite;
		animation-delay: var(--sway-delay, 0s);
	} */
</style>
