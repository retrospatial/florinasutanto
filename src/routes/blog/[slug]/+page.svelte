<!-- blog markdown is styled in app.css -->

<script lang="ts">
	import md from '$lib/utils/md';

	export let data;
	const { post } = data;

	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
</script>

<section class="w-4/5 md:w-1/2 mx-auto body text-white">
	<!-- <a href="/blog" class="cursor-pointer">
		<button
			class="blog-back-button flex flex-row gap-2 items-center mb-4 border-2 rounded-md border-accent-pink hover:bg-accent-pink/40 transition-colors duration-300 px-2 py-1"
		>
			<iconify-icon icon="mdi:arrow-left" class="text-xl"></iconify-icon>
			<span class="uppercase">back to all posts</span>
		</button></a
	> -->
	<article class=" flex flex-col gap-4">
		<h1 class="blog-title">{post.title}</h1>
		<p class="blog-date">{formattedDate}</p>
		<div class="blog-tags flex flex-row gap-2">
			{#each post.tags as tag}
				<span class="blog-tag border-[0.5px] border-white rounded-md px-2 py-1">{tag}</span>
			{/each}
		</div>
		<div class="mt-4">
			{@html md(post.body)}
		</div>
	</article>
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-title {
		@apply font-exposure text-4xl leading-normal font-[375] md:text-6xl;
	}

	.blog-tag {
		@apply font-mono text-sm leading-none uppercase md:text-base;
	}

	.blog-date {
		@apply font-mono text-sm leading-normal uppercase md:text-base;
	}

	.blog-back-button {
		@apply font-mono text-base leading-normal;
	}
</style>
