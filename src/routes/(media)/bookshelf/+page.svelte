<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	interface Book {
		title: string;
		slug?: string | null;
		pages?: number;
		release_date?: string;
		last_read_date?: string;
		authors?: string;
		rating?: number;
		review?: string;
		image?: string;
		url?: string;
	}

	let books = $state<Book[]>([]);

	function hasReview(book: Book): boolean {
		return !!book.review && book.review.replace(/<[^>]*>/g, '').trim().length > 0;
	}

	const byYear = $derived.by(() => {
		const groups = new Map<string, Book[]>();

		for (const book of books) {
			const year = (book.last_read_date ?? '').slice(0, 4) || 'undated';
			groups.set(year, [...(groups.get(year) ?? []), book]);
		}

		return [...groups.entries()].sort(([a], [b]) => b.localeCompare(a));
	});

	onMount(async () => {
		const res = await fetch('/api/books?list=recent');
		if (!res.ok) return;
		books = (await res.json()).books ?? [];
	});
</script>

<Section small class="">
	<Heading hed={content.title} dek={md(content.note)} />

	{#each byYear as [year, yearBooks]}
		<section class="mb-8">
			<h2 class="bg-bone detail-lg text-night mb-4 w-fit px-2">{year}</h2>

			<ul class="grid list-none grid-cols-4 gap-2 md:grid-cols-6 md:gap-4">
				{#each yearBooks as book}
					<li>
						{#if book.image}
							{#if hasReview(book) && book.slug}
								<a
									href="/bookshelf/{book.slug}"
									class="border-lime group relative block border-2 transition-transform duration-300 hover:-translate-y-2"
								>
									<img src={book.image} alt={book.title} />

									<span
										class="bg-lime text-night absolute top-0 right-0 flex size-4 items-center justify-center text-[0.6rem] leading-none md:size-5 md:text-xs"
										aria-hidden="true">✧</span
									>

									<div
										class="bg-night/75 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									>
										<span class="detail-sm text-lime px-1 text-center leading-tight"
											>read review</span
										>
									</div>
								</a>
							{:else}
								<img src={book.image} alt={book.title} class="block border-2 border-transparent" />
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</Section>
