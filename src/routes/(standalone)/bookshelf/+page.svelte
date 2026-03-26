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

<Section small class="flex flex-col gap-8">
	<h1 class="heading-md mb-0">my bookshelf</h1>

	<div class="body-md mx-auto">{@html md(content.note)}</div>

	<!-- read shelf -->
	<div class="flex flex-col">
		<!-- read books -->
		<div class="flex flex-col gap-4 shrink-0 w-fit mb-6">
			<ul class="list-none grid grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4">
				{#each booksData[shelves[2].listType] as book}
					<li>
						{#if book.image}
							<button
								class="cursor-pointer bg-transparent p-0 border-2 border-transparent hover:border-lime transition-all duration-300"
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
									class=""
									class:selected={selectedBook === book}
								/>
							</button>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		<!-- review -->
		<div id="review-section" class="w-full scroll-mt-14 lg:scroll-mt-18">
			<section
				class="notebook-page text-black! relative bg-white rounded-br-2xl rounded-tr-2xl py-8 pl-10 pr-4 lg:pr-10 lg:pl-16"
			>
				<div class="absolute top-0 left-6 lg:left-8 bottom-0 w-0.5 bg-[#ED7064]"></div>

				<div class="lg:text-3xl text-xl uppercase lg:leading-8 leading-6 font-heading mt-1 lg:mt-0">
					Review: <a
						href={selectedBook?.url}
						target="_blank"
						rel="noopener noreferrer"
						class="underline">{selectedBook?.title}</a
					>
				</div>
				{#if selectedBook?.review}
					<div class="review-content leading-6 lg:leading-8 mt-6 lg:mt-4">
						{@html selectedBook.review}

						<p class="italic">
							read in {selectedBook?.last_read_date
								? new Date(selectedBook.last_read_date).getFullYear()
								: ''}
						</p>
					</div>
				{/if}
			</section>
		</div>
	</div>
</Section>

<style>
	:global(.notebook-page) {
		background-image: repeating-linear-gradient(
			transparent,
			transparent calc(1.5rem - 1px),
			#85c2e9 calc(1.5rem - 1px),
			#85c2e9 1.5rem
		);
		background-size: 100% 1.5rem;
		background-position: 0 0.75rem;
	}

	.review-content :global(p) {
		font-size: 0.875rem !important;
		margin-bottom: 1.5rem;
		line-height: 1.5rem;
	}

	.review-content :global(blockquote) {
		border-left: none;
		padding-left: 1rem;
		margin: 0 0 1.5rem 0;
		opacity: 0.85;
		font-style: italic;
		position: relative;
		font-size: 0.75rem;
		line-height: 1.5rem;
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
		margin-bottom: 1.5rem;
		line-height: 1.5rem;
	}

	.review-content :global(a) {
		color: #3a2ee6;
		text-decoration: underline;
	}

	@media (min-width: 1024px) {
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

		.review-content :global(p) {
			font-size: 1.125rem !important;
			margin-bottom: 2rem;
			line-height: 2rem;
		}

		.review-content :global(blockquote) {
			margin: 0 0 2rem 0;
			font-size: 1rem;
			line-height: 2rem;
			padding-left: 1.25rem;
		}

		.review-content :global(ul),
		.review-content :global(ol) {
			margin-bottom: 2rem;
			line-height: 2rem;
		}
	}
</style>
