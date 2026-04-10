<script lang="ts">
	import { formatDate } from '$lib/utils/blog';
	import Section from '$lib/helpers/Section.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="">
	<h1 class="heading-md mb-4">{content.title}</h1>
	<div class="flex flex-col gap-4 items-center detail-md">
		<a
			href="https://nownownow.com/about"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:bg-teal text-bone hover:text-black transition-colors duration-300 w-fit px-1"
			>nownownow.com</a
		>
		<time class="detail-md" datetime={content.date}>
			Last Updated: {formatDate(content.date)}
		</time>
	</div>

	<div class="mt-section columns-1 md:columns-2 gap-4">
		{#each content.sections as section}
			<div class="w-full mb-4 break-inside-avoid bg-linear-to-b from-bone to-[#c9c4b5] text-black">
				<div class="relative flex items-center justify-center w-full h-12">
					<div class="absolute inset-0 bg-[#c9c4b5]"></div>
					<p class="font-heading text-2xl relative z-10 lowercase">
						{section.title}
					</p>
				</div>
				<ul class="pt-4 pb-1 px-6">
					{#each section.items as item}
						<li class="body-md">
							{@html item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	li :global(a) {
		@apply cursor-pointer underline decoration-2 underline-offset-2;
	}
</style>
