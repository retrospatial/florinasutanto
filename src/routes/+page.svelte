<script lang="ts">
	import Section from '$lib/helpers/Section.svelte';
	import IntroCard from '$lib/components/home/IntroCard.svelte';
	import Button from '$lib/helpers/Button.svelte';

	import { page } from '$app/state';
	import md from '$lib/utils/md';

	const content = page.data;

	const words = $derived(content.intro.title.split(' '));
	const wordOffsets = $derived(
		words.map((_: string, i: number) =>
			words.slice(0, i).reduce((sum: number, w: string) => sum + w.length + 1, 0)
		)
	);
</script>

<Section class="flex flex-col mx-auto items-center justify-center max-w-5xl grow ">
	<div class="flex flex-col items-center md:block">
		<!-- intro card -->
		<div class="md:float-left max-w-xs md:mr-12 mb-4 lg:mb-0 order-2 md:order-0 self-center">
			<IntroCard />
		</div>

		<!-- desc -->
		<p
			class="font-heading text-4xl md:text-5xl text-center md:text-left text-teal order-1 md:order-0"
		>
			{#each words as word, wi}
				<span class="inline-block whitespace-nowrap"
					>{#each word.split('') as char, ci}<span
							class="animation-text-wave {char === 'x' ? 'text-blue' : ''}"
							style="animation-delay: {(wordOffsets[wi] + ci) * 0.05}s">{char}</span
						>{/each}</span
				>{' '}
			{/each}
		</p>
		<p class="text-pretty body-lg order-3 md:order-0 mt-4 md:mt-0">
			{@html md(content.intro.text)}
		</p>
	</div>
</Section>
