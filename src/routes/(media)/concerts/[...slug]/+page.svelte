<script lang="ts">
	import type { Component } from 'svelte';
	import Section from '$lib/helpers/Section.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Window from '$lib/helpers/Window.svelte';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { externalLinks } from '$lib/utils/external-links';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import { formatDate } from '$lib/utils/blog';
	import { page } from '$app/state';

	const content = page.data;

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
	<a href="/concerts"><Heading hed={content.title} /></a>

	<article class="flex flex-col gap-8">
		<Window color="bg-orange" width="w-fit" class="concert-header mx-auto">
			<header class="flex flex-col gap-4 sm:flex-col sm:gap-5">
				{#if show.poster}
					<Image
						src="concerts/{year}/{show.poster}"
						alt="Concert poster for {show.artist}"
						class="border-outset-small w-full shrink-0 sm:w-80"
					/>
				{/if}

				<div class="flex flex-col gap-1">
					<h1 class="body-xl font-heading uppercase text-left text-black">{show.artist}</h1>

					{#if show.date}
						<time class="detail-sm text-black/60" datetime={show.date}>
							{formatDate(show.date)}
						</time>
					{/if}

					{#if place}
						<p class="detail-sm mb-0 uppercase">{place}</p>
					{/if}

					{#if show.support?.length}
						<p class="body-md mb-0 text-black">with {show.support.join(', ')}</p>
					{/if}
				</div>
			</header>
		</Window>

		<div class="e-content blog float" use:addLightbox use:externalLinks>
			<Content />
		</div>
	</article>

	<CommentBox />
</Section>
