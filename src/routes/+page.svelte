<script lang="ts">
	import Radio from '$lib/helpers/Radio.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Window from '$lib/helpers/Window.svelte';
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
	<div class="w-full">
		{#key selectedOption}
			<h1
				class="heading-1 lowercase leading-normal mb-4 text-accent-blue ease-out transition-all duration-300 delay-200 transform"
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
					<div class="flex md:flex-row flex-col gap-4 md:gap-8 md:basis-3/5">
						<Window class="text-pretty">
							<h1 class="title">
								{content.about_short.desc}
							</h1>
							{@html md(content.about_short.text)}
						</Window>

						<div class="flex flex-col md:basis-2/5 gap-4 md:gap-0 justify-between">
							<Window color="bg-[#2e3ebb]" class="h-full">
								<h1 class="title">
									{content.links_list.socials.title}
								</h1>
								<ul class="gap-1 flex flex-col">
									{#each content.links_list.socials.links as link}
										<li class="text-sm md:text-base group">
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												class="flex items-center gap-3 group-hover:text-[#2e3ebb] transition-colors duration-300"
											>
												<iconify-icon
													icon={link.icon}
													class="text-[#2e3ebb] shrink-0 inline-flex items-center"
												></iconify-icon>
												{link.title}
											</a>
										</li>
									{/each}
								</ul>
							</Window>

							<Window color="bg-[#4381cb]" class="h-full">
								<h1 class="title">
									{content.links_list.others.title}
								</h1>
								<div class="flex flex-col gap-2">
									<ul class="gap-1 flex flex-col">
										{#each content.links_list.others.links as link}
											<li class="text-sm md:text-base gap-2 group">
												<a
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center gap-3 group-hover:text-[#4381cb] transition-colors duration-300"
												>
													<iconify-icon
														icon={link.icon}
														class="text-[#4381cb] shrink-0 inline-flex items-center"
													></iconify-icon>
													{link.title}
												</a>
											</li>
										{/each}
									</ul>
								</div>
							</Window>
						</div>
					</div>
				{:else}
					<div class="mt-10 -mx-[5vw] lg:mx-0">
						<Scrapbook />
					</div>
				{/if}
			</div>
		{/key}
	</div>
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.title {
		@apply text-lg font-[375] uppercase md:text-xl;
	}
</style>
