<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import { page } from '$app/state';

	const content = page.data;
</script>

<Section
	medium
	class="media mx-auto md:px-20 grid w-fit grid-cols-1 justify-center gap-4  md:grid-cols-2 justify-items-center "
>
	{#each content.pages as item, i}
		<a href={item.link}>
			<div
				class="group hover:scale-105 duration-300 gap-2 flex md:-translate-y-4 items-center {i %
					2 ===
				0
					? ''
					: 'flex-row-reverse'}"
			>
				<p
					class="stamp font-lino text-night mb-0 h-fit text-4xl md:text-5xl lg:text-7xl leading-none [writing-mode:vertical-rl] {i %
						2 ===
					0
						? 'rotate-180 '
						: ''}"
				>
					{item.title}
				</p>

				<Image
					src="media/{item.img}"
					alt={item.alt}
					class="ink aspect-square w-40 shrink-0 object-contain mix-blend-multiply opacity-90 transition-transform duration-300 md:w-60 lg:w-70 {item.img ===
					'concert.png'
						? 'group-hover:rotate-1'
						: 'group-hover:rotate-3'}"
					lightbox={false}
				/>
			</div></a
		>
	{/each}
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	@supports (mask-mode: luminance) {
		:global(.ink) {
			mask-image: url('/assets/images/textures/paper.webp');
			mask-mode: luminance;
			mask-size: 740px 493px;
			mask-repeat: repeat;
			opacity: 1;
		}
	}

	:global(body:has(.media)) {
		@apply bg-lime;
	}

	:global(body:has(.media))::before {
		content: '';
		background-image: url('/assets/images/textures/paper.webp');
		background-size: cover;
		background-position: center;
		mix-blend-mode: multiply;
	}

	:global(body:has(.media))::after {
		content: none;
	}

	/* no entrance animation */
	:global(body:has(.media) .animation-fly-up),
	:global(body:has(.media) .animation-fly-down) {
		animation: none;
	}

	:global(body:has(.media) main),
	:global(body:has(.media) main > div) {
		@apply justify-center;
	}

	/* nav and footer */
	/* make nav*/
	:global(body:has(.media) nav) {
		@apply static;
	}

	:global(body:has(.media) nav),
	:global(body:has(.media) footer) {
		@apply bg-transparent;
	}

	:global(body:has(.media) footer) {
		@apply text-night pt-6;
	}

	:global(body:has(.media) nav p),
	:global(body:has(.media) nav a),
	:global(body:has(.media) nav button),
	:global(body:has(.media) nav a:hover p),
	:global(body:has(.media) nav button:hover),
	:global(body:has(.media) footer a),
	:global(body:has(.media) footer button),
	:global(body:has(.media) footer a:hover),
	:global(body:has(.media) footer button:hover),
	:global(body:has(.media) footer button span) {
		@apply text-night;
	}

	/* nav dropdown */
	:global(body:has(.media) nav .bg-night p),
	:global(body:has(.media) nav .bg-night a),
	:global(body:has(.media) nav .bg-night div),
	:global(body:has(.media) nav .bg-night a:hover p) {
		@apply text-lime;
	}

	:global(body:has(.media) nav .nav-line),
	:global(body:has(.media) nav:hover .nav-line) {
		@apply bg-night;
	}
</style>
