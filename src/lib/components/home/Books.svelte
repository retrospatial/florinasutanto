<script lang="ts">
	import { onMount } from 'svelte';

	interface Book {
		title: string;
		pages?: number;
		release_date?: string;
		authors?: string;
		rating?: number;
		image?: string;
		url?: string;
	}

	const shelves = [
		{ title: 'Favorites', listType: 'favorite' as const },
		{ title: 'Currently Reading', listType: 'currently-reading' as const },
		{ title: 'Recently Read', listType: 'recent' as const }
	];

	let booksData = $state<{ [key: string]: Book[] }>({
		favorite: [],
		'currently-reading': [],
		recent: []
	});

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

<div class="w-full max-w-sm mt-20 flex flex-col">
	<div class="w-full border-5 border-[#3a2ee6] border-b-15 rounded-md">
		{#each shelves as shelf}
			<div
				class="w-full border-10 border-[#3a2ee6] bg-linear-to-b from-[#eddbb9] to-[#f7ead3] border-b-[#e73213]"
			>
				<div class="relative flex items-center justify-center w-full mt-2 mb-4">
					<p class="text-xl md:text-2xl font-goudy text-[#3a2ee6]">
						{shelf.title}
					</p>
				</div>

				<div class="w-full grid grid-cols-3 -mb-1">
					{#each booksData[shelf.listType] as book}
						<div class="flex flex-col items-center text-center justify-end">
							{#if book.image}
								<a href={book.url} target="_blank" rel="noopener noreferrer">
									<img
										src={book.image}
										alt={book.title}
										class="w-full max-w-20 h-auto object-cover shadow-[3px_3px_10px_0px_#000000cc] hover:translate-y-[-5px] transition-all duration-300"
									/>
								</a>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<!-- <div class="w-full flex flex-row justify-between border-t-10 border-[#3a2ee6]">
		<div class="w-5 h-15 bg-[#e73213]"></div>
		<div class="w-5 h-15 bg-[#e73213]"></div>
	</div> -->
</div>
