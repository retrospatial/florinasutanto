<script lang="ts">
	import Radio from '$lib/helpers/Radio.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Window from '$lib/helpers/Window.svelte';
	import Scrapbook from '$lib/components/home/Scrapbook.svelte';
	import List from '$lib/components/home/List.svelte';
	import Section from '$lib/helpers/Section.svelte';

	import { isVideo } from '$lib/utils/video';
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

<Section
	class="h-card flex flex-col md:flex-row {selectedOption === 'short' ? 'gap-4 md:gap-8' : 'gap-0'}"
>
	<a class="u-url" href="https://florinasutanto.com" hidden>Florina Sutanto</a>
	<div class="w-full">
		{#key selectedOption}
			<h1
				class="heading-1 lowercase leading-normal mb-4 text-accent-blue ease-out transition-all duration-300 delay-200 transform"
				in:fly={{ x: -40, duration: 600, easing: cubicOut }}
			>
				<span class="p-name"
					>{selectedOption === 'short' ? content.about_short.title : content.about_long.title}</span
				>
			</h1>
		{/key}

		<div class="my-2 cursor-pointer">
			<Radio bind:value={selectedOption} {options} />
		</div>

		{#key selectedOption}
			<div in:fly={{ y: 40, duration: 600, easing: cubicOut, delay: 200 }} class="text-white">
				{#if selectedOption === 'short'}
					<div class="flex flex-col -mb-4">
						<div class="flex md:flex-row flex-col gap-4 md:gap-8 md:basis-3/5">
							<!-- about me -->
							<Window class="text-pretty">
								<h1 class="title">
									{content.about_short.desc}
								</h1>
								<div class="p-note">{@html md(content.about_short.text)}</div>
							</Window>

							<div class="flex flex-col md:basis-2/5 gap-4 md:gap-0 justify-between">
								<!-- social links -->
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
													rel="me noopener noreferrer"
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

								<!-- misc links -->
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
														target="_self"
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

						<!-- featured
						<Window color="bg-[#19a4cf]" class="w-full"
							><h1 class="title">
								{content.featured.title}
							</h1>
							<ul class="flex flex-row justify-around mb-2">
								{#each content.featured.features as feature}
									<div
										class="aspect-video max-w-full w-full border-outset hover:border-inset cursor-pointer lg:max-w-xs"
									>
										<a
											href={feature.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="screencapture"
										>
											{#if isVideo(feature.cover)}
												<video
													class="w-full h-full object-cover"
													autoplay
													loop
													muted
													playsinline
													preload="metadata"
												>
													<source src={`/assets/${feature.cover}`} type="video/mp4" />
												</video>
											{:else if feature.cover.includes('youtube')}
												<iframe
													class="w-full h-full object-cover"
													src={feature.cover}
													title="YouTube video player"
													frameborder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerpolicy="strict-origin-when-cross-origin"
													allowfullscreen
												></iframe>
											{:else}
												<Image
													class="w-full h-full object-cover"
													src={`/assets/${feature.cover}`}
													alt=""
												/>
											{/if}
										</a>
									</div>
								{/each}
							</ul></Window
						> -->
					</div>
				{:else}
					<div class="mt-10 -mx-[5vw] lg:mx-0">
						<Scrapbook />
					</div>
				{/if}
			</div>
		{/key}
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.title {
		@apply text-lg font-[375] uppercase md:text-xl;
	}
</style>
