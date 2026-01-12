<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { isVideo } from '$lib/utils/video';

	const content = $derived(page.data);
</script>

<section class="w-4/5 mx-auto body">
	<h2 class="heading-2 text-accent-purple mb-8 md:mb-4">data stories</h2>
	<div class="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
		{#each [...content.authored, ...content.contributed] as item}
			<a href={item.link} target="_blank" rel="noopener noreferrer" class="group">
				<div class="flex flex-col gap-4">
					<!-- cover -->
					<div class="relative w-full aspect-video overflow-hidden">
						<!-- overlay -->
						<div
							class="absolute inset-0 bg-accent-purple opacity-100 mix-blend-overlay
							 group-hover:opacity-0 transition-opacity duration-300 z-10 pointer-events-none"
						></div>

						{#if isVideo(item.cover)}
							<video
								class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
								autoplay
								loop
								muted
								playsinline
								preload="auto"
								aria-label="screencapture"
							>
								<source src={`/assets/covers/${item.cover}`} type="video/mp4" />
							</video>
						{:else}
							<img
								src={`/assets/covers/${item.cover}`}
								alt={item.title}
								class="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
							/>
						{/if}
					</div>

					<!-- title -->
					<h2
						class="entry-heading lowercase text-white group-hover:text-accent-purple transition-colors duration-300"
					>
						{item.title}
					</h2>
					<!-- description -->
					<p class="entry-body text-white">{item.desc}</p>
					<!-- tags -->
					<div class="flex flex-wrap items-center gap-2">
						<span
							class="entry-role {item.role === 'Author' ? 'bg-accent-blue' : 'bg-accent-green'}"
						>
							{item.role}
						</span>

						{#each item.tags as tag}
							<span class="entry-tag text-white">[{tag}]</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
