<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Heading from '$lib/helpers/Heading.svelte';
	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	interface Node {
		title: string;
		url: string;
		subpages?: Node[];
	}
</script>

<Section
	medium
	class="flex flex-col lg:flex-row gap-6 lg:gap-18 items-start relative justify-center  mx-auto"
>
	<div
		class="relative h-[10vh] w-full shrink-0 overflow-hidden lg:h-auto lg:w-100 lg:max-w-full lg:self-stretch"
	>
		<Image
			src="random/italy.png"
			alt="Dithered image of a view in Italy"
			class="absolute top-1/2 left-1/2 w-full max-w-none -translate-x-1/2 -translate-y-[80%] lg:inset-0 lg:h-full lg:w-full lg:translate-none lg:object-cover"
			lightbox={true}
		/>
	</div>

	<div class="flex flex-col max-w-md mx-auto">
		<Heading hed={content.title} dek={md(content.desc)} />

		<main class="tree columns-2 gap-4 mx-auto">
			{#each content.map as item}
				<section class="break-inside-avoid pb-4">
					<h2 class="body-xl mb-2 font-heading">{item.category}</h2>
					<div class="ml-4 sitemap-content detail-sm lowercase">
						{@render branch(item.pages)}
					</div>
				</section>
			{/each}
		</main>
	</div>
</Section>

<!-- recursive so a branch can nest to any depth -->
{#snippet branch(nodes: Node[])}
	<ul class="list-none">
		{#each nodes as node}
			<li class="">
				<span class="flex items-center gap-2">
					<span class="-scale-x-100 text-teal">𓆟</span>

					{#if node.url.startsWith('http')}
						<a href={node.url} target="_blank" rel="noopener noreferrer">{node.title}</a>
					{:else}
						<a href={node.url}>{node.title}</a>
					{/if}
				</span>

				{#if node.subpages?.length}
					{@render branch(node.subpages)}
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.sitemap-content :global(a) {
		@apply text-bone hover:text-teal transition-colors duration-300;
	}

	.tree ul {
		margin: 0;
		padding: 0;
	}

	.tree li {
		line-height: 1.9;
		margin: 0;
	}

	.tree ul ul {
		padding-left: 1.5rem;
	}
</style>
