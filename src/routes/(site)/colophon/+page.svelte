<script lang="ts">
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';

	interface Props {
		data: {
			post: {
				title: string;
				desc: string;
				date_published: string | null;
				date_updated: string | null;
			};
			Content: Component;
		};
	}

	let { data }: Props = $props();
	const { post, Content } = data;

	function externalLinks(node: HTMLElement) {
		node.querySelectorAll('a[href^="http"]').forEach((link) => {
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
		});
	}
</script>

<Section small class="h-entry">
	<Heading hed={post.title} updated={post.date_updated} />

	<article class="e-content blog" use:addCopyButtons use:addLightbox use:externalLinks>
		<Content />
	</article>
	<span class="p-author h-card" hidden>Florina Sutanto</span>

	<CommentBox />
</Section>
