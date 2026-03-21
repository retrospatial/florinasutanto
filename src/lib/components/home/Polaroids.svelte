<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';

	const images = [
		{ src: `polaroids/parkour.webp`, title: 'Parkour' },
		{ src: `polaroids/aerials.webp`, title: 'Aerials' },
		{ src: `polaroids/climbing.webp`, title: 'Climbing' },
		{ src: `polaroids/scuba.webp`, title: 'Scuba Diving' },
		{ src: `polaroids/rowing.webp`, title: 'Dragon Boating' },
		{ src: `polaroids/investigating.webp`, title: 'Investigating' }
	];

	const positions = [
		{ rotate: -4, x: 0, y: 0, z: 1 },
		{ rotate: 6, x: 0, y: 0, z: 2 },
		{ rotate: -2, x: 0, y: 10, z: 4 },
		{ rotate: -2, x: 0, y: -5, z: 3 },
		{ rotate: 2, x: 0, y: 10, z: 6 },
		{ rotate: -4, x: 0, y: 0, z: 5 }
	];
</script>

<!-- use image popover -->

<ul class="relative grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center">
	{#each images as image, i}
		<li
			class="polaroid border-[#E3E3E3] md:border-r-15 md:border-t-15 md:border-l-15 border-r-10 border-t-10 border-l-10 transition-all duration-300 drop-shadow-2xl {i %
				2 ===
			0
				? 'hover:rotate-2'
				: 'hover:-rotate-2'} hover:scale-105"
			style="
				transform: rotate({positions[i % positions.length].rotate}deg) translateX({positions[
				i % positions.length
			].x}px) translateY({positions[i % positions.length].y}px);
				--base-z: {positions[i % positions.length].z};
			"
		>
			<Image
				src={image.src}
				alt={image.title}
				class="w-full aspect-square object-cover"
				lightbox={true}
			/>
			<div class="bg-[#E3E3E3] py-4 flex items-center justify-center">
				<p
					class="text-black text-center font-rock-salt text-sm md:text-lg text-wrap wrap-break-word self-center"
				>
					{image.title}
				</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	.polaroid {
		z-index: var(--base-z);
	}

	.polaroid:hover {
		z-index: 100;
	}
</style>
