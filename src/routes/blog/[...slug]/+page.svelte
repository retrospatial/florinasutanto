<!-- blog markdown is styled in app.css -->

<script lang="ts">
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import { formatDate } from '$lib/utils/blog';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import Section from '$lib/helpers/Section.svelte';
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

	function externalLinks(node: HTMLElement) {
		node.querySelectorAll('a[href^="http"]').forEach((link) => {
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});
	}
</script>

<Section small>
	<article class="h-entry flex flex-col gap-4">
		<h1 class="p-name heading-md normal-case mb-0">{post.title}</h1>
		<time class="dt-published detail-md text-center" datetime={post.date_published ?? ''}>
			{formattedDate}{formattedUpdatedDate ? ` • Updated ${formattedUpdatedDate}` : ''}
		</time>

		<div class="e-content mt-4 blog" use:addCopyButtons use:addLightbox use:externalLinks>
			<Content />
		</div>
		<span class="p-author h-card" hidden>Florina Sutanto</span>
	</article>

	<CommentBox />
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	:global {
		.blog {
			h1 {
				@apply font-heading mb-6 text-3xl leading-normal md:text-4xl;
			}
			h2 {
				@apply font-heading mb-2 text-2xl leading-normal underline md:text-3xl;
			}
			h3 {
				@apply font-heading mb-2 text-xl leading-normal md:text-2xl;
			}
			p {
				@apply body-lg;
				&:not(:last-child) {
					@apply mb-6;
				}
			}
			p strong,
			p b {
				font-weight: 400;
			}
			ul {
				@apply mb-4 list-inside list-disc text-base leading-normal md:text-lg;
			}
			ol {
				@apply mb-4 list-inside list-decimal text-base leading-normal md:text-lg;
			}
			li {
				@apply mb-2 text-base leading-normal md:text-lg;
			}
			blockquote {
				@apply border-orange my-8 border-l-4 pl-4 md:pl-6;
			}
			:not(pre) > code {
				@apply bg-blue/30 px-1 font-mono text-sm leading-normal md:text-base;
			}
			pre {
				@apply bg-dark-gray my-6 overflow-x-auto p-4;
			}
			pre::-webkit-scrollbar {
				height: 4px;
			}
			pre::-webkit-scrollbar-track {
				background: var(--color-dark-gray);
			}
			pre::-webkit-scrollbar-thumb {
				background: var(--color-orange);
			}
			pre code {
				@apply bg-transparent p-0 font-mono text-xs leading-normal md:text-sm;
			}
			img {
				@apply mx-auto my-8 w-full;
			}
			.caption {
				@apply -mt-4 mb-6 block text-center text-base italic md:text-lg;
			}
			input[type='checkbox'] {
				@apply border-orange mr-2 h-4 w-4 cursor-pointer appearance-none rounded-xs border-2 align-middle;
			}
			input[type='checkbox']:checked {
				@apply bg-orange;
				background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E");
				background-size: 120%;
				background-position: center;
				background-repeat: no-repeat;
			}
			li:has(input[type='checkbox']) {
				@apply flex list-none items-center;
			}
			li:has(input[type='checkbox']:checked) {
				@apply decoration-orange line-through;
			}
			ul:has(input[type='checkbox']) {
				@apply list-none;
			}
			a {
				@apply text-teal hover:text-orange transition-colors duration-300;
			}
		}
	}
</style>
