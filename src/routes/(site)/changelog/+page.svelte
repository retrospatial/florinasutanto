<script lang="ts">
	import { externalLinks } from '$lib/utils/external-links';
	import { marginNotes } from '$lib/utils/margin-notes';
	import type { Component } from 'svelte';
	import { addCopyButtons } from '$lib/helpers/CopyButton.svelte';
	import { addLightbox } from '$lib/helpers/Lightbox.svelte';
	import { formatDate } from '$lib/utils/blog';
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

	function dateHeadings(node: HTMLElement) {
		const ISO = /^\d{4}-\d{2}-\d{2}$/;

		node.querySelectorAll('h2').forEach((heading) => {
			const iso = heading.textContent?.trim() ?? '';
			if (!ISO.test(iso)) return;

			const time = document.createElement('time');
			time.dateTime = iso;
			time.textContent = formatDate(iso);
			heading.replaceChildren(time);
		});
	}
</script>

<Section small class="h-entry">
	<Heading hed={post.title} />

	<article class="flex flex-col gap-4">
		<div
			class="e-content changelog mt-4 blog"
			use:addCopyButtons
			use:addLightbox
			use:externalLinks
			use:dateHeadings
			use:marginNotes
		>
			<Content />
		</div>
		<span class="p-author h-card" hidden>Florina Sutanto</span>
	</article>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.changelog :global(h2) {
		@apply bg-bone body-lg w-fit px-2 text-black;
	}

	.changelog :global(h2:not(:first-child)) {
		@apply mt-8;
	}

	/* .changelog :global(p:not(:last-child)) {
		@apply mb-2;
	}

	.changelog :global(ul) {
		@apply mb-2;
	}

	.changelog :global(ul) {
		@apply mt-0;
	}

	.changelog :global(li:last-child) {
		@apply mb-0;
	} */
</style>
