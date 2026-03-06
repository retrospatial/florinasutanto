<!-- blog markdown is styled in app.css -->

<script lang="ts">
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import { formatDate } from '$lib/utils/blog';
	import CommentBox from '$lib/helpers/CommentBox.svelte';

	interface Props {
		data: {
			post: {
				slug: string;
				title: string;
				desc: string;
				cover: string;
				tags: string[];
				date_published: string | null;
				date_updated: string | null;
			};
			Content: Component;
		};
	}

	let { data }: Props = $props();
	const { post, Content } = data;

	const formattedDate = formatDate(post.date_published);
	const formattedUpdatedDate = formatDate(post.date_updated);
</script>

<section class="w-4/5 md:w-3/5 mx-auto body text-white">
	<article class="flex flex-col gap-4">
		<h1 class="blog-title">{post.title}</h1>
		<time class="blog-date" datetime={post.date_published ?? ''}>
			{formattedDate}{formattedUpdatedDate ? ` • Updated ${formattedUpdatedDate}` : ''}
		</time>
		{#if post.tags && post.tags.length > 0}
			<ul class="blog-tags flex flex-row gap-2">
				{#each post.tags as tag}
					<li class="blog-tag border-[0.5px] border-white rounded px-2 py-1">{tag}</li>
				{/each}
			</ul>
		{/if}
		<div class="mt-8 markdown" use:addCopyButtons use:addLightbox>
			<Content />
		</div>
	</article>

	<CommentBox />
</section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.blog-title {
		@apply font-exposure text-3xl leading-normal font-[375] md:text-5xl;
	}

	.blog-tag {
		@apply font-mono text-xs leading-none uppercase md:text-sm;
	}

	time.blog-date {
		@apply font-mono text-sm leading-normal uppercase md:text-base;
	}
</style>
