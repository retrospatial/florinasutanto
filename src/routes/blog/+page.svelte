<script lang="ts">
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

	const filteredPosts = $derived(
		selectedTag ? posts.filter((p: { tags: string[] }) => p.tags.includes(selectedTag!)) : posts
	);

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '';
		const [y, m, d] = dateString.split('-').map(Number);
		return new Date(y, m - 1, d).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<section class="w-4/5 mx-auto">
	<h2 class="heading-2 text-accent-pink mb-4">even more words</h2>
	<div class="flex flex-col md:flex-row gap-8">
		<div class="flex flex-col gap-4 flex-1">
			{#each filteredPosts as post}
				<article class="text-white group post-card relative rounded">
					<a href="/blog/{post.slug}">
						<div
							class="flex flex-col lg:flex-row justify-center lg:justify-between lg:gap-4 items-center w-full px-4 lg:px-6"
						>
							{#if post.cover}
								<img
									src={post.cover}
									alt={post.title}
									loading="lazy"
									class="w-full aspect-video object-cover block lg:hidden mt-4 max-h-40"
								/>
							{/if}
							<div class="flex flex-col gap-2 md:gap-4 w-full py-4 md:py-6">
								<h2
									class="blog-list-title group-hover:text-accent-pink transition-colors duration-300 mb-1"
								>
									{post.title}
								</h2>
								<p class="blog-list-desc">{post.desc}</p>
								<div class="flex flex-row items-center gap-2">
									<span class="blog-list-date">{formatDate(post.date)}</span>

									{#if post.tags}
										<span class="">•</span>

										<div class="blog-list-tags flex flex-row gap-2">
											{#each post.tags as tag}
												<span class="blog-list-tag border-[0.5px] border-white rounded px-2 py-1"
													>{tag}</span
												>
											{/each}
										</div>
									{/if}
								</div>
							</div>
							{#if post.cover}
								<img
									src={post.cover}
									alt={post.title}
									loading="lazy"
									class="w-full max-w-[300px] aspect-video object-cover hidden lg:block"
								/>
							{/if}
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
					onclick={() => (selectedTag = selectedTag === tag ? null : tag)}
				>
					<span>{tag}</span>
					<span class="">{tagCounts[tag]}</span>
				</button>
			{/each}
		</aside>
	</div>
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-list-title {
		@apply font-exposure -mb-1 text-2xl leading-normal font-[375] md:text-3xl;
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
