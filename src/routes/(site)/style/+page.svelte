<script lang="ts">
	import { externalLinks } from '$lib/utils/external-links';
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import md, { mdInline } from '$lib/utils/md';

	const content = page.data;
</script>

<Section medium class="">
	<Heading hed={content.title} />

	<main class="flex flex-col gap-12">
		<section class="flex flex-col gap-4">
			<h2 class="heading-sm mb-0 text-left">Colors</h2>

			<ul class="grid list-none grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each content.swatches as swatch}
					<li class="flex flex-col gap-2">
						<div
							class="border-outset-small h-15 w-full"
							style="background-color: {swatch.hex}"
						></div>
						<div class="detail-xs flex items-baseline justify-between gap-2">
							<span>{swatch.name}</span>
							<span class="text-bone/60">{swatch.hex}</span>
						</div>
					</li>
				{/each}
			</ul>

			<div>{@html md(content.color_notes.title)}</div>
			<div class="blog">
				<ul class="color-notes list-inside list-disc" use:externalLinks>
					{#each content.color_notes.list as note}
						<li>{@html mdInline(note)}</li>
					{/each}
				</ul>
			</div>
		</section>

		<section class="flex flex-col gap-4">
			<h2 class="heading-sm mb-0 text-left">Type</h2>

			<ul class="type-list flex list-none flex-col gap-6">
				{#each content.fonts as font}
					<li class="flex flex-col gap-2">
						<p
							class="bg-bone text-black mb-0 w-fit px-2 py-1 text-xl leading-tight md:text-2xl"
							style="font-family: {font.stack}"
						>
							{font.family}
						</p>

						{#if font.note}
							<p class="body-md">{@html md(font.note)}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>

		<section class="flex flex-col gap-4">
			<h2 class="heading-sm mb-0 text-left">Highlighter</h2>

			<p class="body-md mb-2">{@html md(content.highlighter_note)}</p>

			{#if content.snippet}
				<div class="blog snippet">{@html content.snippet.html}</div>
			{/if}
		</section>

		<section class="flex flex-col gap-4">
			<h2 class="heading-sm mb-0 text-left">Reminders</h2>

			<div class="blog">
				<ul class="" use:externalLinks>
					{#each content.reminders.list as item}
						<li>{@html mdInline(item)}</li>
					{/each}
				</ul>
			</div>
		</section>
	</main>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.snippet :global(pre) {
		@apply my-0;
	}

	.type-list :global(li:last-child),
	.color-notes :global(li:last-child) {
		@apply mb-0;
	}
</style>
