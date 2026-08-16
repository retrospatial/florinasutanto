<script lang="ts">
	import type { Component } from 'svelte';
	import Section from '$lib/helpers/Section.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import { externalLinks } from '$lib/utils/external-links';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import { formatDate } from '$lib/utils/blog';

	interface Show {
		artist: string;
		date?: string | null;
		venue?: string | null;
		city?: string | null;
		support?: string[];
		poster?: string | null;
	}

	interface Props {
		data: { show: Show; year: string; Content: Component };
	}

	let { data }: Props = $props();
	const { show, year, Content } = data;

	const place = [show.venue, show.city].filter(Boolean).join(', ');
</script>

<Section small class="h-entry">
	<a
		href="/concerts"
		class="group detail-xs text-bone/80 border-bone/40 hover:text-lime hover:border-lime hover:bg-lime/10 mb-8 inline-flex w-fit -rotate-1 items-center gap-2 border border-dashed px-3 py-1 transition duration-300 hover:rotate-0 motion-reduce:rotate-none"
	>
		<span class="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
		all concerts
	</a>

	<article class="flex flex-col gap-10">
		<header
			class="grid grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-8"
		>
			{#if show.poster}
				<div
					class="relative rotate-[-1.25deg] shadow-[0_1px_2px_rgb(0_0_0/0.5),0_8px_18px_rgb(0_0_0/0.35)] motion-reduce:rotate-none"
				>
					<Image
						src="concerts/{year}/{show.poster}"
						alt="Concert poster for {show.artist}"
						class="block w-full"
						lightbox={true}
					/>

					<!-- the tape, counter-tilted against the poster so it reads as stuck on after -->
					<span
						class="bg-bone/42 pointer-events-none absolute top-[-0.6rem] left-1/2 z-2 h-[1.2rem] w-16 -translate-x-1/2 rotate-[2.5deg] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
						aria-hidden="true"
					></span>
				</div>
			{/if}

			<div class="flex flex-col">
				<p
					class="font-heading mb-1 text-[clamp(2.5rem,9vw,5rem)] leading-[0.9] text-transparent opacity-65 [-webkit-text-stroke:1px_var(--color-bone)]"
					aria-hidden="true"
				>
					{year}
				</p>

				<h1
					class="p-name text-orange font-heading mb-3 text-left text-3xl leading-tight md:text-5xl"
				>
					{show.artist}
				</h1>

				<div class="border-bone/40 flex flex-col gap-1 border-t border-dashed pt-3">
					{#if show.date}
						<time class="dt-published detail-sm text-bone/60" datetime={show.date}>
							{formatDate(show.date)}
						</time>
					{/if}

					{#if place}
						<p class="detail-sm text-bone/85 mb-0">{place}</p>
					{/if}

					{#if show.support?.length}
						<p class="font-handwriting text-teal mb-0 text-[1.2rem] leading-[1.4]">
							with {show.support.join(' & ')}
						</p>
					{/if}
				</div>
			</div>
		</header>

		<div class="e-content blog" use:addLightbox use:externalLinks>
			<Content />
		</div>
	</article>

	<CommentBox />
</Section>
