<script lang="ts">
	import Radio from '$lib/helpers/Radio.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Scrapbook from '$lib/components/home/Scrapbook.svelte';
	import List from '$lib/components/home/List.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let content = page.data;

	let selectedOption: 'short' | 'long' = $state('short');

	const options = [
		{ value: 'short', label: 'Intro' },
		{ value: 'long', label: 'Etc.' }
	];
</script>

<section
	class="w-4/5 mx-auto flex flex-col md:flex-row {selectedOption === 'short'
		? 'gap-4 md:gap-8'
		: 'gap-0'}"
>
	<div class={selectedOption === 'short' ? 'basis-full md:basis-3/5' : 'basis-full'}>
		{#key selectedOption}
			<h1
				class="heading-1 lowercase leading-tight mb-4 text-accent-blue ease-out transition-all duration-300 delay-200 transform"
				in:fly={{ x: -40, duration: 600, easing: cubicOut }}
			>
				{selectedOption === 'short' ? content.about_short.title : content.about_long.title}
			</h1>
		{/key}

		<div class="my-2 cursor-pointer">
			<Radio bind:value={selectedOption} {options} />
		</div>

		{#key selectedOption}
			<div in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 200 }} class="text-white">
				{#if selectedOption === 'short'}
					<div class="body-lg about-link">
						{@html md(content.about_short.text)}
					</div>
				{:else}
					<div class="mt-10 -mx-[5vw] lg:mx-0">
						<Scrapbook />
					</div>
				{/if}
			</div>
		{/key}
	</div>

	{#if selectedOption === 'short'}
		<div class="basis-full md:basis-2/5 flex items-center justify-center">
			<List />
		</div>
	{/if}
</section>
