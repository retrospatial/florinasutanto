<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import content from '../+page.yaml';

	interface Book {
		title: string;
		review?: string | null;
		last_read_date?: string;
		url?: string | null;
		image?: string | null;
		authors?: string | null;
	}

	interface Props {
		data: { book: Book };
	}

	let { data }: Props = $props();
	const book = $derived(data.book);

	const readYear = $derived(book.last_read_date ? new Date(book.last_read_date).getFullYear() : '');
</script>

<Section small>
	<a
		href="/bookshelf"
		class="group detail-xs text-night mb-6 inline-flex w-fit -rotate-1 items-center gap-2 border-l-2 border-[#ED7064] bg-white py-1 pr-3 pl-2 shadow-[2px_2px_0_rgb(0_0_0/0.35)] transition duration-300 hover:rotate-0 hover:text-[#3a2ee6] hover:underline motion-reduce:rotate-none"
	>
		<span class="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
		all books
	</a>

	<section
		class="notebook-page relative rounded-tr-2xl rounded-br-2xl bg-white py-8 pr-4 pl-10 text-black! lg:pr-10 lg:pl-16"
	>
		<div class="absolute top-0 bottom-0 left-6 w-0.5 bg-[#ED7064] lg:left-8"></div>

		<h2 class="font-heading mt-1 text-xl leading-6 lg:mt-0 lg:text-3xl lg:leading-8">
			<span class="uppercase">{book.title}</span> by {book.authors}
		</h2>

		<div class="review-content mt-6 leading-6 lg:mt-4 lg:leading-8">
			{@html book.review}
		</div>
	</section>
</Section>

<style>
	.notebook-page {
		background-image: repeating-linear-gradient(
			transparent,
			transparent calc(1.5rem - 1px),
			#85c2e9 calc(1.5rem - 1px),
			#85c2e9 1.5rem
		);
		background-size: 100% 1.5rem;
		background-position: 0 0.75rem;
	}

	.review-content {
		font-size: 1rem;
	}

	.review-content :global(p) {
		font-size: inherit;
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
		.notebook-page {
			background-image: repeating-linear-gradient(
				transparent,
				transparent calc(2rem - 1px),
				#85c2e9 calc(2rem - 1px),
				#85c2e9 2rem
			);
			background-size: 100% 2rem;
			background-position: 0 1rem;
		}

		.review-content {
			font-size: 1.125rem;
		}

		.review-content :global(p) {
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
