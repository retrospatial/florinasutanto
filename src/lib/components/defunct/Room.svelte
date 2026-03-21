<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import md from '$lib/utils/md';
	import Section from '$lib/helpers/Section.svelte';

	const content = page.data;

	let tvHovered = $state(false);
	let hoveredItem = $state('');

	const imgFolder = '/assets/images/room/';

	const items = [
		{
			name: 'books',
			src: 'books.webp',
			x: 27,
			y: 65.5,
			w: 27,
			h: 10,
			label: 'reads',
			hoverTransform: 'scale(1.02) translate(-1.5px, -0.5px)'
		},
		{
			name: 'mug',
			src: 'mug.webp',
			x: 60,
			y: 54,
			w: 10,
			h: 10,
			label: 'drinks',
			hoverTransform: 'translate(0, -1px)'
		},
		{
			name: 'notes',
			src: 'notes.webp',
			x: 10,
			y: 56,
			w: 12,
			h: 10,
			label: 'writes',
			hoverTransform: 'translate(0, -1px)',
			style: 'transform-origin: 10px 58px; rotate: 20deg;'
		},
		{
			name: 'sticky',
			src: 'sticky.webp',
			x: 82,
			y: 40,
			w: 7,
			h: 10,
			label: 'notes',
			hoverTransform: 'translate(-1px, 0px)',
			style: 'rotate: 20deg;'
		}
	];
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

			{#each items as item}
				<image
					href="{imgFolder}{item.src}"
					x={item.x}
					y={item.y}
					width={item.w}
					preserveAspectRatio="none"
					class="halftone cursor-pointer"
					style="{item.style ?? ''} transform: {hoveredItem === item.name
						? item.hoverTransform
						: 'none'};"
				/>
				<rect
					x={item.x}
					y={item.y}
					width={item.w}
					height={item.h}
					fill="transparent"
					pointer-events="all"
					class="cursor-pointer"
					style={item.style ?? ''}
					onpointerenter={() => {
						hoveredItem = item.name;
					}}
					onpointerleave={() => {
						hoveredItem = '';
					}}
				/>
			{/each}

			{#if hoveredItem}
				{@const label = items.find((i) => i.name === hoveredItem)?.label}
				<text
					x="40"
					y="48"
					text-anchor="middle"
					font-size="5"
					fill="white"
					class="pointer-events-none"
					transition:fade={{ duration: 200 }}>{label}</text
				>
			{/if}
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
		/* transition: transform 0.3s ease; */
	}
</style>
