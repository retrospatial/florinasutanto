<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;
</script>

<Section small class="">
	<Heading hed={content.title} dek={md(content.desc)} />

	<div class="columns-1 md:columns-2 gap-4">
		{#each content.blogroll as item}
			<div class="w-full mb-4 break-inside-avoid bg-linear-to-b from-bone to-[#c9c4b5] text-black">
				<div class="relative flex items-center justify-center w-full h-12">
					<div class="absolute inset-0 bg-[#c9c4b5]"></div>
					<p class="font-heading text-2xl relative z-10 lowercase">
						{item.title}
					</p>
				</div>
				<ul class="list-none pt-4 pb-1 px-6">
					{#each item.links as link}
						<li class="body-md blogroll-content">
							<a href={link.link} target="_blank" rel="noopener noreferrer">
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blogroll-content :global(a) {
		@apply cursor-pointer text-black underline decoration-transparent decoration-2 underline-offset-2 transition-colors duration-300 hover:decoration-black;
	}
</style>
