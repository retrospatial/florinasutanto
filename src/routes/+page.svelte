<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
	import Radio from '$lib/helpers/Radio.svelte';
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
			icon: 'fa-file-text',
			href: 'https://drive.google.com/file/d/1aW5xy3op26oF5P-lFiHu6OLcgDaXxvyN/view?usp=share_link'
		},
		{ name: 'github', icon: 'fa-github', href: 'https://github.com/retrospatial/' },
		{ name: 'twitter', icon: 'fa-twitter', href: 'https://twitter.com/flosutanto' },
		{
			name: 'linkedin',
			icon: 'fa-linkedin-square',
			href: 'https://linkedin.com/in/florinasutanto'
		},
		{ name: 'email', icon: 'fa-envelope', href: 'mailto:florinasutanto@gmail.com' }
	];
</script>

<section class="w-4/5 mx-auto body flex flex-row {selectedOption === 'short' ? 'gap-12' : 'gap-0'}">
	<div class={selectedOption === 'short' ? ' basis-3/5 pr-2' : 'basis-full'}>
		{#key selectedOption}
			<h1
				class="heading-1 lowercase text-accent-blue ease-out transition-all duration-300 delay-200 transform"
				in:fly={{ x: -40, duration: 600, easing: cubicOut }}
			>
				{selectedOption === 'short' ? content.about_short.title : content.about_long.title}
			</h1>
		{/key}

		<div class="my-2">
			<Radio bind:value={selectedOption} {options} />
		</div>

		{#key selectedOption}
			<div in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 200 }}>
				<div class="body intro text-white">
					{@html md(
						selectedOption === 'short' ? content.about_short.text : content.about_long.text
					)}
				</div>

				{#if selectedOption === 'short'}
					<div class="flex flex-row gap-6 mb-8">
						{#each icons as icon}
							<a
								href={icon.href}
								title={icon.name}
								target="_blank"
								aria-label={icon.name}
								class="social-icons"
							>
								<i class="fa {icon.icon}"></i>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/key}
	</div>

	<div class={selectedOption === 'short' ? 'basis-2/5' : 'basis-0'}>
		{#if selectedOption === 'short'}
			<Image
				src="me.png"
				alt="pic of me"
				class="w-full md:max-w-sm h-full object-contain hidden md:block"
			/>
		{/if}
	</div>
</section>
