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

	const shelves = [
		{ title: 'Favorites', listType: 'favorite' as const },
		{ title: 'Reading', listType: 'currently-reading' as const },
		{ title: 'Read', listType: 'recent' as const }
	];

	let booksData = $state<{ [key: string]: Book[] }>({
		favorite: [],
		'currently-reading': [],
		recent: []
	});

	function hasReview(book: Book): boolean {
		return !!book.review && book.review.replace(/<[^>]*>/g, '').trim().length > 0;
	}

	async function fetchBooks(listType: 'recent' | 'favorite' | 'currently-reading') {
		const response = await fetch(`/api/books?list=${listType}`);
		const result = await response.json();

		if (result.books && result.books.length > 0) {
			booksData[listType] = result.books;
		}
	}

	onMount(() => {
		shelves.forEach((shelf) => fetchBooks(shelf.listType));
	});
</script>

<Section small>
	<Heading hed={content.title} dek={md(content.note)} />

	<main class="flex flex-col gap-8">
		<!-- read shelf — each reviewed book links to its own /bookshelf/[slug] page -->
		<div class="mb-6 w-fit shrink-0">
			<ul class="grid list-none grid-cols-4 gap-2 md:grid-cols-6 md:gap-4">
				{#each booksData[shelves[2].listType].filter((book) => hasReview(book) && book.slug) as book}
					<li>
						{#if book.image}
							<a
								href="/bookshelf/{book.slug}"
								class="hover:border-lime block border-2 border-transparent transition-all duration-300"
							>
								<img src={book.image} alt={book.title} />
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</main>
</Section>
