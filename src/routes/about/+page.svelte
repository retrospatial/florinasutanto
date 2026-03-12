<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import md from '$lib/utils/md';
	import Section from '$lib/helpers/Section.svelte';

	let content = page.data;

	let tvHovered = $state(false);

	const imgFolder = '/assets/images/room/';
</script>

<svelte:head>
	<style>
		.background {
			display: none !important;
		}

		body {
			background:
				radial-gradient(
						ellipse 100% 100% at 50% 55%,
						rgba(255, 255, 255, 1) 0%,
						rgba(255, 255, 255, 0.75) 45%,
						rgba(255, 255, 255, 0) 75%
					)
					fixed,
				url('/assets/images/room/tilebg.jpg') repeat;
		}

		.nav-title {
			color: var(--color-dark-gray);
		}

		nav {
			display: none !important;
		}

		footer {
			display: none !important;
		}

		html,
		body {
			overflow: hidden !important;
			height: 100vh !important;
		}
	</style>
</svelte:head>

<Section class="relative h-screen">
	<svg width="0" height="0" aria-hidden="true">
		<filter id="halftone" color-interpolation-filters="sRGB">
			<feTurbulence type="turbulence" baseFrequency="4" numOctaves="1" result="dots" seed="2" />
			<feComponentTransfer in="dots" result="dotmask">
				<feFuncR type="discrete" tableValues="0.2 1" />
				<feFuncG type="discrete" tableValues="0.2 1" />
				<feFuncB type="discrete" tableValues="0.2 1" />
			</feComponentTransfer>
			<feComponentTransfer in="SourceGraphic" result="posterized">
				<feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1" />
				<feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1" />
				<feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1" />
			</feComponentTransfer>
			<feBlend in="posterized" in2="dotmask" mode="multiply" result="halftoned" />
			<feComposite in="halftoned" in2="SourceGraphic" operator="in" />
		</filter>
	</svg>
	<svg
		viewBox="0 5 100 82"
		class="absolute inset-0 w-full h-full"
		preserveAspectRatio="xMidYMid meet"
	>
		<a href={content.links[0].href} aria-label="clock">
			<image
				href="{imgFolder}clock.webp"
				x="0"
				y="15"
				preserveAspectRatio="none"
				width="10"
				class="halftone hover:-rotate-10 cursor-pointer"
				style="transform-origin: 5px 20px;"
			/></a
		>

		<g transform="translate(-10, 0)">
			<rect x="25" y="64" width="30" height="12" fill="#4D260D" class="halftone" />
			<image href="{imgFolder}stand2.webp" x="5" y="55" width="70" class="halftone" />
			<image
				href="{imgFolder}tv.webp"
				x="20"
				y="27"
				width="40"
				class="halftone tv-image cursor-pointer"
				style="transform-origin: 40px 60px; transform: {tvHovered
					? 'skewY(2deg) scaleX(0.96)'
					: 'skewY(0) scaleX(1)'}; "
				onmouseenter={() => (tvHovered = true)}
				onmouseleave={() => (tvHovered = false)}
				aria-label="click to open"
			/>

			<image
				href="{imgFolder}books.webp"
				x="27"
				y="65.5"
				width="27"
				preserveAspectRatio="none"
				class="halftone hover:scale-102 hover:-translate-y-[0.5px] hover:-translate-x-[1.5px] cursor-pointer"
			/>
			<image
				href="{imgFolder}mug.webp"
				x="60"
				y="54"
				preserveAspectRatio="none"
				width="10"
				class="halftone hover:-translate-y-px cursor-pointer"
			/>
			<image
				href="{imgFolder}notes.webp"
				x="10"
				y="56"
				preserveAspectRatio="none"
				width="12"
				class="halftone hover:-translate-y-px cursor-pointer rotate-20"
				style="transform-origin: 10px 58px;"
			/>
			<image
				href="{imgFolder}sticky.webp"
				x="82"
				y="40"
				preserveAspectRatio="none"
				width="7"
				class="halftone hover:-translate-x-px cursor-pointer rotate-20"
			/>
		</g>
		<!-- <image
			href="{imgFolder}shelf2.webp"
			x="58"
			y="19"
			height="70"
			preserveAspectRatio="none"
			width="60"
			class="halftone"
		/> -->
	</svg>
</Section>

<style>
	:global(.halftone) {
		filter: url(#halftone);
	}
</style>
