<script lang="ts">
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import Window from '$lib/helpers/Window.svelte';
	import type { TocItem } from '$lib/utils/toc';

	interface Props {
		data: {
			post: {
				title: string;
				desc: string;
				date_published: string | null;
				date_updated: string | null;
			};
			toc: TocItem[];
			Content: Component;
		};
	}

	let { data }: Props = $props();
	const { post, Content, toc } = data;

	function smoothJump(event: MouseEvent, slug: string) {
		const target = document.getElementById(slug);
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({
			behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
			block: 'start'
		});
		history.replaceState(history.state, '', `#${slug}`);
	}

	function externalLinks(node: HTMLElement) {
		node.querySelectorAll('a[href^="http"]').forEach((link) => {
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});
	}
</script>

<Section small class="h-entry">
	<Heading hed={post.title} updated={post.date_updated} />

	{#if toc.length}
		<Window color="bg-blue" class="mb-8">
			<nav class="toc" aria-label="Table of contents">
				{@render branch(toc, 0)}
			</nav>
		</Window>
	{/if}

	<article class="e-content blog cheatsheet" use:addCopyButtons use:addLightbox use:externalLinks>
		<Content />
	</article>
	<span class="p-author h-card" hidden>Florina Sutanto</span>

	<CommentBox />
</Section>

{#snippet branch(items: TocItem[], depth: number)}
	<ul
		class={depth === 0
			? 'flex list-none flex-col gap-2'
			: 'mt-2 ml-2 flex list-none flex-col gap-1.5 border-l border-black/20 pl-4'}
	>
		{#each items as item}
			<li>
				{#if depth === 0}
					<a
						class="detail-md flex gap-2 font-bold"
						href="#{item.slug}"
						onclick={(e) => smoothJump(e, item.slug)}
					>
						<span
							class="text-blue w-4 shrink-0 -translate-y-[0.08em] text-center"
							aria-hidden="true">✧</span
						>
						{item.title}
					</a>
				{:else}
					<a
						class="detail-sm {depth > 1 ? 'normal-case' : ''}"
						href="#{item.slug}"
						onclick={(e) => smoothJump(e, item.slug)}>{item.title}</a
					>
				{/if}

				{#if item.children.length}
					{@render branch(item.children, depth + 1)}
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

<style lang="postcss">
	@reference '$lib/styles/app.css';

	article :global(h2),
	article :global(h3),
	article :global(h4) {
		@apply scroll-mt-24;
	}

	article :global(h2:not(:first-child)) {
		@apply mt-24;
	}

	.toc :global(a) {
		@apply hover:text-blue text-black transition-colors duration-300;
	}

	.toc :global(a:focus-visible) {
		@apply outline-blue rounded-xs outline-2 outline-offset-2;
	}
	.toc :global(li:last-child) {
		@apply mb-0;
	}
</style>
