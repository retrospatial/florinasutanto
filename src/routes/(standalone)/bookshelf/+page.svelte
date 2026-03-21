<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	interface Book {
		title: string;
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

	let selectedBook = $state<Book | null>(null);

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

<Section class="mt-8">
	<section
		class="notebook-page text-black! relative bg-white rounded-br-2xl rounded-tr-2xl py-8 pl-12 pr-4 lg:pr-12 lg:pl-24"
	>
		<div class="absolute top-0 left-6 lg:left-14 bottom-0 w-0.5 bg-[#ED7064]"></div>

		<p class="note-content mt-4 text-base lg:text-lg leading-8">
			{@html md(content.note)}
		</p>

		<div class="flex flex-col gap-12 lg:gap-16">
			{#each shelves.slice(0, 2) as shelf}
				<div class="shelf">
					<div class="shelf-title">{shelf.title}</div>
					<ul class="book-list">
						{#each booksData[shelf.listType] as book}
							<li>
								{#if book.image}
									<a href={book.url} target="_blank" rel="noopener noreferrer">
										<img src={book.image} alt={book.title} class="book-cover" /></a
									>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}

			<!-- read section -->
			<div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
				<!-- read books -->
				<div class="shelf shrink-0 w-fit">
					<div class="shelf-title">{shelves[2].title}</div>
					<ul class="list-none grid grid-cols-3 gap-4 w-fit">
						{#each booksData[shelves[2].listType] as book}
							<li>
								{#if book.image}
									<button
										class="all-unset cursor-pointer"
										onclick={() => {
											selectedBook = selectedBook === book ? null : book;
											if (selectedBook) {
												document
													.getElementById('review-section')
													?.scrollIntoView({ behavior: 'smooth' });
											}
										}}
									>
										<img
											src={book.image}
											alt={book.title}
											class="book-cover"
											class:selected={selectedBook === book}
										/>
									</button>
								{/if}
							</li>
						{/each}
					</ul>
				</div>

				<!-- review -->
				<div id="review-section" class="w-full scroll-mt-4 lg:scroll-mt-8">
					<div class="shelf-title">
						Review: <a
							href={selectedBook?.url}
							target="_blank"
							rel="noopener noreferrer"
							class="underline">{selectedBook?.title}</a
						>
					</div>
					{#if selectedBook?.review}
						<div class="review-content text-sm lg:text-base leading-8 mt-4 lg:mt-5.5">
							{@html selectedBook.review}

							<p class="italic">
								read in {selectedBook?.last_read_date
									? new Date(selectedBook.last_read_date).getFullYear()
									: ''}
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
</Section>

<style>
	:global(.notebook-page) {
		background-image: repeating-linear-gradient(
			transparent,
			transparent calc(2rem - 1px),
			#85c2e9 calc(2rem - 1px),
			#85c2e9 2rem
		);
		background-size: 100% 2rem;
		background-position: 0 1rem;
	}

	.shelf {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.shelf-title {
		font-size: 1.5rem;
		font-family: 'Rock Salt', cursive;
	}

	.book-list {
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0;
		margin: 0;
	}

	.book-cover {
		height: 6rem;
		width: auto;
		object-fit: cover;
		box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.5);
		flex-shrink: 0;
		transition:
			transform 0.3s ease-in-out,
			outline 0.2s ease;
		cursor: pointer;

		&:hover {
			transform: translateY(-8px);
		}

		&.selected {
			transform: translateY(-8px);
		}
	}

	.all-unset {
		all: unset;
	}

	.note-content :global(p) {
		line-height: 2rem;
		margin-bottom: 2rem;
	}

	.note-content :global(a) {
		text-decoration: underline;
	}

	.review-content :global(p) {
		margin-bottom: 2rem;
	}

	.review-content :global(blockquote) {
		border-left: none;
		padding-left: 1.5rem;
		margin: 0 0 2rem 0;
		opacity: 0.85;
		font-style: italic;
		position: relative;
	}

	.review-content :global(blockquote)::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 6px;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='12'%3E%3Cpath d='M3 0 Q0 3 3 6 Q6 9 3 12' fill='none' stroke='%2385c2e9' stroke-width='2'/%3E%3C/svg%3E")
			repeat-y;
	}

	.review-content :global(ul),
	.review-content :global(ol) {
		padding-left: 1.5rem;
		margin-bottom: 2rem;
	}

	.review-content :global(a) {
		color: #3a2ee6;
		text-decoration: underline;
	}

	@media (min-width: 1024px) {
		.shelf-title {
			font-size: 2.25rem;
		}

		.book-cover {
			height: 10.5rem;
		}
	}
</style>
