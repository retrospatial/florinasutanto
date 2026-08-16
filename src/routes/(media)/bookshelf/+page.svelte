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

	// fetched here rather than in +page.ts: that load is prerendered, which would
	// freeze the shelf at build time
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
									class="border-lime block border-2 hover:-translate-y-2 transition-all duration-300"
								>
									<img src={book.image} alt={book.title} />
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
