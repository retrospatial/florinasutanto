<script lang="ts">
	import ImageCarousel from '$lib/helpers/ImageCarousel.svelte';
	import Window from '$lib/helpers/Window.svelte';
	import { getTime } from '$lib/helpers/CurrentTime.svelte';
	import { onMount } from 'svelte';

	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	let currentIndex = $state(0);
	let condition = $state('');
	let temp = $state('');
	const images = ['coffee.webp', 'concert.webp', 'apples.webp', 'beach.webp'].map((f, i) => ({
		src: `/assets/images/me/${f}`,
		alt: `Photo of me ${i + 1}`
	}));

	onMount(async () => {
		const res = await fetch('/api/weather');
		const data = await res.json();
		if (data?.current) {
			condition = data.current.condition.text;
			temp = data.current.temp_c;
		}
	});
</script>

<Window color="bg-blue" class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<ImageCarousel
			{images}
			bind:currentIndex
			class="w-full aspect-square "
			style="border: 4px inset var(--color-gray-300)"
		/>
		<div class="flex flex-row gap-2 justify-end">
			{#each images as _, i}
				<button
					class={`w-2 h-2  ${currentIndex === i ? 'bg-black' : 'bg-white border border-black cursor-pointer'}`}
					onclick={() => (currentIndex = i)}
					aria-label={`Go to image ${i + 1}`}
				></button>
			{/each}
		</div>
	</div>
	<ul class="list-none">
		{#each content.about as item}
			<li class="uppercase font-mono text-sm lg:text-base flex flex-row gap-2 mb-0">
				<span class="font-semibold w-25">{item.title}</span>
				<span class="text-end w-full"
					>{item.title === 'Time'
						? getTime()
						: item.title === 'Weather'
							? condition + ' / ' + temp + '°C'
							: item.text}</span
				>
			</li>
		{/each}
	</ul>
</Window>
