<script lang="ts">
	export let data;
	const { posts } = data;

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<section class="w-4/5 mx-auto">
	<h2 class="heading-2 text-accent-pink mb-4 md:mb-8">ideas, thoughts, reflections, etc.</h2>
	<div class="flex flex-col">
		{#each posts as post}
			<article class="text-white group">
				<a href="/blog/{post.slug}">
					<div
						class="flex flex-col md:flex-row justify-center md:justify-between items-center w-full"
					>
						{#if post.cover}
							<img
								src={post.cover}
								alt={post.title}
								class="w-full aspect-video object-cover block md:hidden mt-4 max-h-40"
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
											<span class="blog-list-tag border-[0.5px] border-white rounded-md px-2 py-1"
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
								class="w-full max-w-[300px] aspect-video object-cover max-h-40 hidden md:block"
							/>
						{/if}
					</div>
					<div
						class="w-1/4 md:w-1/12 h-0.5 bg-accent-pink group-hover:w-full transition-all duration-300"
					></div>
				</a>
			</article>
		{/each}
	</div>
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-list-title {
		@apply font-exposure text-2xl leading-none font-[375] md:text-3xl;
	}

	.blog-list-desc {
		@apply font-exposure text-base leading-normal md:text-lg;
	}

	.blog-list-tag {
		@apply font-mono text-xs leading-none uppercase md:text-sm;
	}

	.blog-list-date {
		@apply font-mono text-xs leading-normal uppercase md:text-sm;
	}
</style>
