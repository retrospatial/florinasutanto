<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/blog';
	import { slugify } from '$lib/utils/slug.js';

	const content = page.data;

	interface Show {
		artist: string;
		date?: string | null;
		venue?: string | null;
		city?: string | null;
		support?: string[];
		poster?: string | null;
	}

	interface Year {
		year: number;
		shows?: Show[] | null;
	}

	const place = (show: Show) => [show.venue, show.city].filter(Boolean).join(', ');

	const written: string[] = content.written ?? [];
	const linkTo = (year: number, show: Show) => {
		const path = `${year}/${slugify(show.artist)}`;
		return written.includes(path) ? `/concerts/${path}` : null;
	};

	const years = ((content.concerts ?? []) as Year[]).filter((y) => y.shows?.length);
</script>

<Section medium class="">
	<Heading hed={content.title} />

	{#each years as { year, shows }}
		<section class="mb-10">
			<h2 class="bg-bone detail-lg text-night mb-4 w-fit px-2">{year}</h2>

			<ul class="columns-2 list-none gap-4 md:columns-4 md:gap-6">
				{#each shows ?? [] as show}
					<li class="mb-6 break-inside-avoid">
						{#if linkTo(year, show)}
							<a href={linkTo(year, show)} class="card no-link-decor flex flex-col gap-2">
								{@render details(year, show)}
							</a>
						{:else}
							<div class="flex flex-col gap-2">
								{@render details(year, show)}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</Section>

{#snippet details(year: number, show: Show)}
	<Image
		src="concerts/{year}/{show.poster}"
						lightbox={false}
		alt="Concert poster for {show.artist}"
		class="border-outset w-full"
	/>

	<div class="flex flex-col gap-0.5">
		<p class="artist body-lg font-heading mb-0 font-bold uppercase">{show.artist}</p>

		{#if show.date}
			<time class="detail-sm text-bone/70" datetime={show.date}>{formatDate(show.date)}</time>
		{/if}

		{#if place(show)}
			<p class="detail-sm text-bone mb-0 uppercase">{place(show)}</p>
		{/if}

		{#if show.support?.length}
			<p class="body-md text-bone mb-0">+ {show.support.join(', ')}</p>
		{/if}
	</div>
{/snippet}

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.card :global(.artist) {
		@apply text-orange;
	}

	.card :global(img) {
		@apply transition-colors duration-300;
	}

	.card:hover :global(img) {
		border-color: var(--color-orange);
	}
</style>
