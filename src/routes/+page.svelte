<script lang="ts">
	import Radio from '$lib/helpers/Radio.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Scrapbook from '$lib/components/Scrapbook.svelte';
	import MePath from '$lib/components/MePath.svelte';
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

	const icons = [
		{
			name: 'resume',
			icon: 'mdi:resume',
			href: 'https://drive.google.com/file/d/1aW5xy3op26oF5P-lFiHu6OLcgDaXxvyN/view?usp=share_link'
		},
		{ name: 'github', icon: 'mdi:github', href: 'https://github.com/retrospatial/' },
		{ name: 'twitter', icon: 'mdi:twitter', href: 'https://twitter.com/flosutanto' },
		{ name: 'linkedin', icon: 'mdi:linkedin', href: 'https://linkedin.com/in/florinasutanto' },
		{ name: 'email', icon: 'ic:round-email', href: 'mailto:florinasutanto@gmail.com' }
	];
</script>

<section class="w-4/5 mx-auto flex flex-row {selectedOption === 'short' ? 'gap-8' : 'gap-0'}">
	<div class="{selectedOption === 'short' ? 'basis-full md:basis-3/5' : 'basis-full'} ">
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
			<div in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 200 }}>
				<div class="text-white">
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

				{#if selectedOption === 'short'}
					<div class="flex flex-row gap-6">
						{#each icons as icon}
							<a
								href={icon.href}
								title={icon.name}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={icon.name}
								class="social-icons -ml-1"
							>
								<iconify-icon icon={icon.icon}></iconify-icon>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/key}
	</div>

	<div
		class="{selectedOption === 'short'
			? 'md:basis-2/5'
			: 'basis-0'} hidden md:flex items-center justify-center scale-110"
	>
		{#if selectedOption === 'short'}
			<MePath {selectedOption} />
		{/if}
	</div>
</section>
