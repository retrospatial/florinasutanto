<script lang="ts">
	import { formatDate } from '$lib/utils/blog';
	import Section from '$lib/helpers/Section.svelte';

	let { data } = $props();
</script>

<Section class="flex flex-col md:flex-row md:gap-8 gap-2">
	<div class="flex flex-col gap-4 flex-2 md:sticky md:top-8 md:self-start">
		<h1 class="heading-2 lowercase text-accent-yellow text-balance md:max-w-sm">
			what i'm up to right now
		</h1>

		<a
			href="https://nownownow.com"
			target="_blank"
			rel="noopener noreferrer"
			class="detail-md hover:bg-accent-yellow hover:text-black transition-colors duration-300 w-fit px-1"
			>nownownow.com</a
		>
	</div>

	<div class="flex-3 mt-section flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<time class="detail-md" datetime={data.date}>
				Last Updated {formatDate(data.date)}
			</time>
			<div class="markdown">
				<data.component />
			</div>
		</div>
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.markdown :global(h1) {
		@apply bg-accent-yellow body-md mt-2 mb-2 w-fit px-1 font-mono leading-normal text-black;
	}

	.markdown :global(a) {
		@apply text-accent-yellow underline decoration-transparent underline-offset-4 transition-colors duration-300;

		&:hover {
			@apply decoration-accent-yellow;
		}
	}
</style>
