<script lang="ts">
	import { formatDate } from '$lib/utils/blog';
	import Image from '$lib/helpers/Image.svelte';

	import Section from '$lib/helpers/Section.svelte';

	let { data } = $props();

	const posts = $derived(data.posts);
	const allTags = $derived(
		[...new Set(posts.flatMap((p: { tags: string[] }) => p.tags))].sort() as string[]
	);

	const tagCounts = $derived(
		Object.fromEntries(
			allTags.map((tag) => [
				tag,
				posts.filter((p: { tags: string[] }) => p.tags.includes(tag)).length
			])
		)
	);

	let selectedTag = $state<string | null>(null);
	const filteredPosts = $derived(
		selectedTag ? posts.filter((p: { tags: string[] }) => p.tags.includes(selectedTag!)) : posts
	);
</script>

<Section small class="justify-start ">
	<h1 class="heading-lg text-center w-full mb-6">more words</h1>

	<div class="flex flex-col mx-auto">
		<!-- tags -->
		<aside
			class="flex flex-row flex-wrap gap-2 mb-6 font-mono text-xs md:text-sm font-semibold justify-center w-full"
		>
			{#each ['all', ...allTags] as tag}
				{@const isActive = tag === 'all' ? selectedTag === null : selectedTag === tag}
				<button
					class="cursor-pointer border-[0.5px] px-2 py-1 uppercase transition-all duration-300 {isActive
						? 'bg-bone text-black'
						: 'border-bone/80 text-bone/80 hover:border-bone hover:text-bone'}"
					onclick={() => {
						selectedTag = tag === 'all' || selectedTag === tag ? null : tag;
					}}
				>
					{tag}
					{tag === 'all' ? posts.length : tagCounts[tag]}
				</button>
			{/each}
		</aside>

		<!-- posts -->
		{#each filteredPosts as post}
			<article class="hover:bg-bone group transition-colors duration-300 p-4">
				<a href="/blog/{post.slug}">
					<div class="flex flex-col md:flex-row justify-between md:gap-4 gap-2">
						<div class="flex flex-col gap-1 order-2 md:order-0">
							<h2
								class="font-heading text-xl md:text-2xl group-hover:text-black transition-colors duration-300"
							>
								{post.title}
							</h2>
							<p
								class="body-lg text-bone/80 group-hover:text-black/80 transition-colors duration-300"
							>
								{post.desc}
							</p>
						</div>

						<time
							class="detail-sm order-1 md:order-0 shrink-0 w-28 text-left md:text-right group-hover:text-black transition-colors duration-300"
						>
							{formatDate(post.date)}</time
						>
					</div>
				</a>
			</article>
		{/each}
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';
</style>
