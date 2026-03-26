<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';
	import { isVideo, lazyVideo } from '$lib/utils/video';
	import Section from '$lib/helpers/Section.svelte';

	const content = $derived(page.data);
</script>

<Section class="flex flex-col">
	<div class="w-fit mx-auto mb-8">
		<div class="flex flex-row justify-center items-center gap-2 md:gap-4">
			<h1 class="heading-lg mb-0 max-w-[200px] md:max-w-none">
				<span class="relative inline-block">
					<Image
						src="random/hat.png"
						alt="hat"
						class="absolute md:-left-6 md:top-0 lg:-left-8 lg:top-1 z-10 -rotate-30 md:w-[70px] lg:w-[100px] w-[50px] -left-4 -top-1 h-auto max-w-none"
					/>
					p
				</span>ersonal projects
			</h1>
			<Image src="random/point.png" alt="point" class="h-auto w-16 md:w-27 self-center"></Image>
		</div>
	</div>

	<div class="gallery flex flex-row gap-8 overflow-x-auto items-center pb-4">
		{#each content.projects as item, i}
			<a
				href={item.link ?? undefined}
				target="_blank"
				rel="noopener noreferrer external"
				class="group w-80 md:w-100 shrink-0"
			>
				<div
					class="flex flex-col 2xl:h-140 md:h-120 h-100 bg-white border-white border-x-16 border-t-24 overflow-hidden"
				>
					<div class="flex-1 min-h-0 w-full">
						{#if isVideo(item.cover)}
							<video
								use:lazyVideo
								class="w-full h-full object-cover"
								autoplay
								loop
								muted
								playsinline
								preload="none"
								aria-label="screencapture"
							>
								<source data-src={`/assets/cover_vids/${item.cover}`} type="video/mp4" />
							</video>
						{:else}
							<Image
								src={`cover_imgs/${item.cover}`}
								alt={item.title}
								class="w-full h-full object-cover"
							/>
						{/if}
					</div>

					<div class="shrink-0 bg-white text-black text-center px-2 py-4 flex flex-col gap-1">
						<h2 class="font-heading text-xl md:text-2xl uppercase text-balance">
							{item.title}
						</h2>
						<div class="font-mono uppercase text-sm md:text-base">{item.type}</div>
						<div
							class="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300"
						>
							<div class="overflow-hidden">
								<p class=" body-lg pb-2">
									{@html item.desc}
								</p>
							</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</Section>

<style>
	.gallery::-webkit-scrollbar {
		display: block;
		height: 10px;
	}

	.gallery::-webkit-scrollbar-track {
		background-color: transparent;
	}

	.gallery::-webkit-scrollbar-thumb {
		background-color: var(--color-orange);
	}
</style>
