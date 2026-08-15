<!-- blog markdown is styled in $lib/styles/prose.css -->

<script lang="ts">
	import { externalLinks } from '$lib/utils/external-links';
	import { marginNotes } from '$lib/utils/margin-notes';
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import CommentBox from '$lib/helpers/CommentBox.svelte';
	import Section from '$lib/helpers/Section.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
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
</script>

<Section small class="h-entry">
	<Heading
		hed={post.title}
		published={post.date_published}
		updated={post.date_updated}
		class="normal-case"
	/>

	<article>
		<div
			class="e-content mt-4 blog"
			use:addCopyButtons
			use:addLightbox
			use:externalLinks
			use:marginNotes
		>
			<Content />
		</div>
		<span class="p-author h-card" hidden>Florina Sutanto</span>
	</article>

	<CommentBox />
</Section>
