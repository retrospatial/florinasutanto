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

	const ditherSrc = (poster?: string | null) =>
		(poster ?? '').replace(/\.[^.]+$/, '') + '-dither.png';

	const written: string[] = content.written ?? [];
	const linkTo = (year: number, show: Show) => {
		const path = `${year}/${slugify(show.artist)}`;
		return written.includes(path) ? `/concerts/${path}` : null;
	};

	const years = ((content.concerts ?? []) as Year[]).filter((y) => y.shows?.length);
</script>

<Section medium class="-ml-2 md:mx-auto">
	<Heading hed={content.title} class="mb-12" />

	{#each years as { year, shows }}
		<section class="mb-14 grid grid-cols-[1.75rem_1fr] gap-3 md:grid-cols-[5rem_1fr] md:gap-6">
			<h2
				class="font-heading sticky top-20 m-0 self-start text-[clamp(1.75rem,6vw,4.5rem)] leading-none text-transparent opacity-75 [-webkit-text-stroke:1px_var(--color-bone)] [writing-mode:vertical-rl]"
			>
				{year}
			</h2>

			<ul class="grid list-none grid-cols-2 items-center gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
				{#each shows ?? [] as show, i}
					{@const href = linkTo(year, show)}
					<li class="show group/show" style="--tilt: {i % 2 ? 1.25 : -1.25}deg">
						{#if href}
							<a
								{href}
								class="card group/card no-link-decor focus-visible:outline-lime flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-4"
							>
								{@render details(year, show)}
							</a>
						{:else}
							<div class="card flex flex-col gap-2">
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
	<div
		class="relative isolate max-h-full shadow-[0_1px_2px_rgb(0_0_0/0.5),0_6px_14px_rgb(0_0_0/0.35)]"
	>
		<Image
			src="concerts/{year}/{show.poster}"
			alt="Concert poster for {show.artist}"
			class="block w-full"
			lightbox={false}
		/>

		<img
			src="/assets/images/concerts/{year}/{ditherSrc(show.poster)}"
			alt=""
			aria-hidden="true"
			loading="lazy"
			class="absolute inset-0 h-full w-full transition-opacity duration-450 ease-[ease] group-hover/show:opacity-0 group-focus-visible/card:opacity-0 motion-reduce:transition-none [@media(hover:none)]:opacity-0"
		/>

		<span
			class="bg-bone/42 pointer-events-none absolute -top-2 left-1/2 z-2 h-[1.05rem] w-13 -translate-x-1/2 rotate-[calc(var(--tilt)*-2)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
			aria-hidden="true"
		></span>
	</div>

	<div class="border-bone/40 flex flex-col gap-0.5 border-t border-dashed pt-2">
		<p
			class="text-orange group-hover/card:text-lime group-focus-visible/card:text-lime mb-0 font-mono text-sm leading-normal transition-colors duration-300 md:text-base"
		>
			{show.artist}
		</p>

		{#if show.date}
			<time class="detail-xs text-bone/60" datetime={show.date}>{formatDate(show.date)}</time>
		{/if}

		{#if place(show)}
			<p class="detail-xs text-bone/85 mb-0">{place(show)}</p>
		{/if}

		{#if show.support?.length}
			<p class="font-handwriting text-teal/90 mb-0 text-[0.9rem] leading-[1.4]">
				＋{show.support.join(', ')}
			</p>
		{/if}
	</div>
{/snippet}

<style lang="postcss">
	.card {
		transform: rotate(var(--tilt));
		transition: transform 350ms ease;
	}

	a.card:hover,
	a.card:focus-visible {
		transform: rotate(0deg) translateY(-0.5rem);
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		a.card:hover,
		a.card:focus-visible {
			transform: none;
			transition: none;
		}
	}
</style>
