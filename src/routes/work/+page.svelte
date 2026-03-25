<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';
	import md from '$lib/utils/md';
	import { isVideo, lazyVideo } from '$lib/utils/video';
	import Section from '$lib/helpers/Section.svelte';

	const content = $derived(page.data);
</script>

<Section class="">
	<h1 class="heading-lg relative z-10">˙✧˖ data stories</h1>

	<div class="lg:gap-8 gap-16 flex flex-col">
		{#each content.work as item}
			<a href={item.link} target="_blank" rel="noopener noreferrer" class="group w-full">
				<div
					class="flex w-full gap-4 flex-col lg:flex-row items-center transition-colors duration-300 {item.role ===
					'Author'
						? 'group-hover:bg-lime '
						: 'group-hover:bg-teal '}"
				>
					<!-- cover -->
					<div class="lg:w-50 shrink-0 lg:mr-10">
						{#if isVideo(item.cover)}
							<video
								use:lazyVideo
								class="cover"
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
							<Image src={`cover_imgs/${item.cover}`} alt={item.title} class="cover" />
						{/if}
					</div>

					<div
						class="flex flex-1 min-w-0 flex-col gap-2 transition-colors duration-300 text-center lg:text-left"
					>
						<!-- title -->
						<h2 class="font-heading text-xl lg:text-3xl uppercase group-hover:text-black">
							{item.title}
						</h2>
						<!-- description -->
						<p class="body-lg text-bone text-balance group-hover:text-black">
							{item.desc}
						</p>
					</div>

					<!-- tag group -->
					<div class="flex flex-col font-mono text-xs lg:text-sm w-60 lg:ml-8">
						<div
							class="flex items-center font-mono justify-center text-black uppercase shrink-0 self-stretch px-2 {item.role ===
							'Author'
								? 'bg-lime'
								: 'bg-teal'}"
						>
							{item.role}
						</div>

						<div class="flex flex-row">
							{#each item.tags as tag, i}
								<span
									class="flex-1 flex items-center justify-center text-black uppercase px-1"
									style="background-color: color-mix(in oklch, {item.role === 'Author'
										? 'var(--color-lime)'
										: 'var(--color-teal)'} {90 - i * 5}%, black)"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div></a
			>
		{/each}
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	:global(.cover) {
		@apply aspect-video w-full object-cover;
	}
</style>
