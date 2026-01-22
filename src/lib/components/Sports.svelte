<!-- SPORTS: parkour, aerials, climbing, scuba diving, swimming -->

<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';

	let content = page.data.about_long.text[2];

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

<div class="relative grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center">
	{#each content.desc as item, i}
		<div
			class="polaroid border-[#E3E3E3] md:border-r-20 md:border-t-20 md:border-l-20 border-r-10 border-t-10 border-l-10 transition-all duration-300 drop-shadow-2xl {i %
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
			<Image src={item.src} alt={item.title} class="w-full aspect-square  object-cover " />
			<div class="bg-[#E3E3E3] py-4">
				<p class="text-black text-center font-rock-salt text-sm md:text-lg">
					{item.title}
				</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.polaroid {
		z-index: var(--base-z);
	}

	.polaroid:hover {
		z-index: 100;
	}
</style>
