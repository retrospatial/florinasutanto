<!-- blog markdown is styled in app.css -->

<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		data: {
			post: {
				slug: string;
				title: string;
				desc: string;
				cover: string;
				tags: string[];
				date: string | null;
			};
			Content: Component;
		};
	}

	let { data }: Props = $props();
	const { post, Content } = data;

	const formattedDate = post.date
		? new Date(post.date).toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})
		: '';
</script>

<section class="w-4/5 md:w-3/5 mx-auto body text-white">
	<article class="flex flex-col gap-4">
		<h1 class="blog-title">{post.title}</h1>
		<p class="blog-date">{formattedDate}</p>
		{#if post.tags && post.tags.length > 0}
			<div class="blog-tags flex flex-row gap-2">
				{#each post.tags as tag}
					<span class="blog-tag border-[0.5px] border-white rounded-md px-2 py-1">{tag}</span>
				{/each}
			</div>
		{/if}
		<div class="mt-4 markdown">
			<Content />
		</div>
	</article>
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-title {
		@apply font-exposure text-4xl leading-normal font-[375] md:text-6xl;
	}

	.blog-tag {
		@apply font-mono text-xs leading-none uppercase md:text-sm;
	}

	.blog-date {
		@apply font-mono text-sm leading-normal uppercase md:text-base;
	}
</style>
