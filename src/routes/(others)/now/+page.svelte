<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="">
	<Heading hed={content.title} updated={content.date} class="text-balance" />

	<div class="flex flex-col gap-4 items-center detail-sm">
		<a
			href="https://nownownow.com/about"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:bg-teal text-bone hover:text-black transition-colors duration-300 w-fit px-1"
			>nownownow.com</a
		>
	</div>

	<div class="mt-section columns-1 md:columns-2 gap-4">
		{#each content.sections as section}
			<div class="w-full mb-4 break-inside-avoid bg-linear-to-b from-bone to-[#c9c4b5] text-black">
				<div class="relative flex items-center justify-center w-full h-12">
					<div class="absolute inset-0 bg-[#c9c4b5]"></div>
					<p class="font-heading body-xl relative z-10 lowercase">
						{section.title}
					</p>
				</div>
				<ul class="pt-4 pb-1 px-6">
					{#each section.items as item}
						<li class="body-md now-content">
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

	.now-content :global(a) {
		@apply cursor-pointer text-black underline decoration-2 underline-offset-2;
	}
</style>
