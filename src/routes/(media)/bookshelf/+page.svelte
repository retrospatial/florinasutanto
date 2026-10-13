<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
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
		dnf?: boolean;
	}

	let books = $state<Book[]>([]);

	function hasReview(book: Book): boolean {
		return !!book.review && book.review.replace(/<[^>]*>/g, '').trim().length > 0;
	}

	const byYear = $derived.by(() => {
		const groups: Record<string, Book[]> = {};

		for (const book of books) {
			const year = (book.last_read_date ?? '').slice(0, 4) || 'undated';
			(groups[year] ??= []).push(book);
		}

		return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
	});

	onMount(async () => {
		const res = await fetch('/api/books?list=recent');
		if (!res.ok) return;
		books = (await res.json()).books ?? [];

		// console.log(
		// 	books.map((book) => ({
		// 		title: book.title,
		// 		cover: book.image
		// 	}))
		// );
	});
</script>

<Section small class="">
	<Heading hed={content.title} dek={md(content.note)} />

	{#each byYear as [year, yearBooks] (year)}
		<section class="mb-8">
			<h2 class="bg-bone detail-lg text-night mb-4 w-fit px-2">{year}</h2>

			<ul class="grid list-none grid-cols-4 gap-2 md:grid-cols-6 md:gap-4">
				{#each yearBooks as book (book.slug ?? book.title)}
					<li>
						{#if book.image}
							{#if hasReview(book) && book.slug}
								<a
									href={resolve('/(media)/bookshelf/[slug]', { slug: book.slug })}
									class={[
										'group relative block border-2 transition-transform duration-300 hover:-translate-y-2',
										book.dnf ? 'border-bone' : 'border-lime'
									]}
								>
									<img
										src={book.image}
										alt={book.title}
										class={['aspect-2/3 w-full object-cover', book.dnf && 'opacity-60 grayscale']}
									/>

									<span
										class={[
											'text-night absolute top-0 right-0 flex size-4 items-center justify-center leading-none md:size-5',
											book.dnf
												? 'bg-bone/85 font-mono text-sm md:text-lg'
												: 'bg-lime text-[0.6rem] md:text-xs'
										]}
										aria-hidden="true">{book.dnf ? '×' : '✧'}</span
									>

									<div
										class="bg-night/75 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									>
										<span
											class={[
												'detail-sm px-1 text-center leading-tight',
												book.dnf ? 'text-bone' : 'text-lime'
											]}>read review</span
										>
									</div>
								</a>
							{:else}
								<div class="relative border-2 border-transparent">
									<img
										src={book.image}
										alt={book.title}
										class={[
											'block aspect-2/3 w-full object-cover',
											book.dnf && 'opacity-60 grayscale'
										]}
									/>

									{#if book.dnf}
										<span
											class="bg-bone/85 text-night absolute top-0 right-0 flex size-4 items-center justify-center font-mono text-sm leading-none md:size-5 md:text-lg"
											aria-hidden="true">×</span
										>
									{/if}
								</div>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</Section>
