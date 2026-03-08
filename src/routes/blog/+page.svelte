<script lang="ts">
	import { formatDate } from '$lib/utils/blog';
	import Image from '$lib/helpers/Image.svelte';
	import Pagination from '$lib/helpers/Pagination.svelte';
	import Section from '$lib/helpers/Section.svelte';

	let { data } = $props();

	const posts = $derived(data.posts);
	const allTags = $derived(
		[...new Set(posts.flatMap((p: { tags: string[] }) => p.tags))].sort() as string[]
	);

	const tagCounts = $derived(
		Object.fromEntries(
			allTags.map((tag) => [
				tag,
				posts.filter((p: { tags: string[] }) => p.tags.includes(tag)).length
			])
		)
	);

	let selectedTag = $state<string | null>(null);
	let page = $state(1);
	const perPage = $state(10);

	const filteredPosts = $derived(
		selectedTag ? posts.filter((p: { tags: string[] }) => p.tags.includes(selectedTag!)) : posts
	);

	const paginatedPosts = $derived(filteredPosts.slice((page - 1) * perPage, page * perPage));
</script>

<Section>
	<h2 class="heading-2 text-accent-pink mb-4">more words</h2>
	<div class="flex flex-col md:flex-row gap-8">
		<div class="h-feed flex flex-col gap-4 flex-1">
			{#each paginatedPosts as post}
				<article class="h-entry text-white group post-card relative rounded">
					<a class="u-url" href="/blog/{post.slug}">
						<div
							class="flex flex-col md:flex-row justify-center md:justify-between gap-4 items-center w-full p-4"
						>
							<div
								class="flex flex-col gap-2 md:gap-4 md:flex-row justify-between w-full items-start"
							>
								<div class="flex flex-col gap-4 w-full">
									<h2
										class="p-name blog-list-title group-hover:text-accent-pink transition-colors duration-300"
									>
										{post.title}
									</h2>

									<div class="flex flex-row items-center gap-2">
										{#if post.tags}
											<div class="blog-list-tags flex flex-row gap-2">
												{#each post.tags as tag}
													<span
														class="p-category blog-list-tag border-[0.5px] border-white rounded px-2 py-1 text-white/80"
														>{tag}</span
													>
												{/each}
											</div>
										{/if}
									</div>
								</div>
								<time
									class="dt-published blog-list-date w-fit whitespace-nowrap md:mt-1"
									datetime={post.date}>{formatDate(post.date)}</time
								>
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>

		<aside class="flex flex-col gap-2 min-w-[120px] font-mono">
			<span class=" text-sm uppercase text-white/80 mb-1 tracking-widest">filter by tag</span>
			{#each allTags as tag}
				<button
					class="flex cursor-pointer gap-2 rounded border-[0.5px] px-2 py-1 text-xs uppercase transition-all duration-200 justify-between {selectedTag ===
					tag
						? 'border-accent-pink text-accent-pink'
						: 'border-white/50 text-white/80 hover:border-white/80 hover:text-white'}"
					onclick={() => {
						selectedTag = selectedTag === tag ? null : tag;
						page = 1;
					}}
				>
					<span>{tag}</span>
					<span class="">{tagCounts[tag]}</span>
				</button>
			{/each}
		</aside>
	</div>

	<Pagination count={filteredPosts.length} {perPage} bind:page />
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-list-title {
		@apply font-exposure -mb-1 text-xl leading-normal font-[375] md:text-2xl;
	}

	.blog-list-desc {
		@apply font-exposure text-base leading-normal md:text-lg;
	}

	.blog-list-tag {
		@apply font-mono text-[10px] leading-none uppercase md:text-xs;
	}

	.blog-list-date {
		@apply font-mono text-xs leading-normal uppercase md:text-sm;
	}

	.post-card {
		border: 2px dotted var(--color-accent-pink);
	}

	.post-card::before {
		content: '';
		position: absolute;
		inset: -2px;
		border: 2px solid var(--color-accent-pink);
		border-radius: inherit;
		opacity: 0;
		transition: opacity 300ms ease;
		pointer-events: none;
	}

	.post-card:hover::before {
		opacity: 1;
	}
</style>
