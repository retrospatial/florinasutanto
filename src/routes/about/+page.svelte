<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import LastFM from '$lib/components/home/LastFM.svelte';
	import Polaroids from '$lib/components/home/Polaroids.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	let imgFolder = '/assets/images/random/';
</script>

<Section small class="relative">
	<!-- <div class="absolute top-[10%] left-0 scale-80 -rotate-4">
		<LastFM />
	</div> -->

	<!-- <Image
					src="{imgFolder}redline.webp"
					alt="redline"
					class="max-w-40 w-full ml-4 mb-4 -rotate-4 hover:rotate-0 transition-all duration-300"
				/> -->
	<!-- images -->
	<div class="absolute top-1/3">
		<Image src="{imgFolder}wes.png" alt="wes flag" class="" />
		<Image
			src="{imgFolder}pin.png"
			alt="pin"
			class="absolute top-0 left-1/4 translate-x-2 z-10 w-6"
		/>
	</div>

	<h1 class="heading-md text-center">
		{content.title}
	</h1>

	<section class="">
		<p class="">{@html md(content.intro)}</p>

		<p class="about-text">{@html md(content.wes)}</p>

		<p class="about-text">{@html md(content.work)}</p>

		<p class="about-text">{@html md(content.camb)}</p>

		<div class="-mx-20">
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
	@reference '$lib/styles/app.css';

	/* :global(.flag) {
		transform-origin: top center;
		animation: sway var(--sway-duration, 4s) ease-in-out infinite;
		animation-delay: var(--sway-delay, 0s);
	} */

	@keyframes sway {
		0%,
		100% {
			rotate: 3deg;
		}
		50% {
			rotate: -3deg;
		}
	}
</style>
