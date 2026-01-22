<script lang="ts">
	import { onMount } from 'svelte';

	interface Book {
		title: string;
		pages?: number;
		release_date?: string;
		authors?: string;
		rating?: number;
		image?: string;
	}

	interface Props {
		selectedScheme?: 'dark' | 'light';
	}

	let { selectedScheme = 'light' }: Props = $props();

	const shelfColors = {
		dark: {
			borderColor: '#5D1C27',
			fromBg: '#33181E',
			toBg: '#5D1C27',
			bottomBorder: '#33181E',
			textColor: '#EDA143'
		},
		light: {
			borderColor: '#EDA143',
			fromBg: '#A56226',
			toBg: '#BD803A',
			bottomBorder: '#a26b2c',
			textColor: '#5D1C27'
		}
	};

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
	{#each shelves as shelf}
		<div
			class="w-full bg-linear-to-b border-15"
			style="
				background-image: linear-gradient(to bottom, {shelfColors[selectedScheme].fromBg}, {shelfColors[
				selectedScheme
			].toBg});
				border-color: {shelfColors[selectedScheme].borderColor};
				border-bottom-color: {shelfColors[selectedScheme].bottomBorder};
			"
		>
			<div class="relative flex items-center justify-center w-full mt-2 mb-4">
				<p
					class="text-2xl font-quintessential"
					style="color: {shelfColors[selectedScheme].textColor}"
				>
					{shelf.title}
				</p>
			</div>

			<div class="w-full grid grid-cols-3 -mb-1">
				{#each booksData[shelf.listType] as book}
					<div class="flex flex-col items-center text-center justify-start">
						{#if book.image}
							<img
								src={book.image}
								alt={book.title}
								class="w-full max-w-20 h-auto object-cover drop-shadow-xl/50"
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}
	<div
		class="w-full flex flex-row justify-between border-t-15"
		style="border-top-color: {shelfColors[selectedScheme].borderColor}"
	>
		<div class="w-5 h-15" style="background-color: {shelfColors[selectedScheme].borderColor}"></div>
		<div class="w-5 h-15" style="background-color: {shelfColors[selectedScheme].borderColor}"></div>
	</div>
</div>
