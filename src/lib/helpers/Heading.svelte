<script lang="ts">
	import { formatDate } from '$lib/utils/blog';

	interface Props {
		hed: string;
		dek?: string;
		published?: string | null;
		updated?: string | null;
		href?: string;
		class?: string;
	}

	let { hed, dek, published, updated, href, class: className = '' }: Props = $props();

	const publishedDate = $derived(formatDate(published ?? null));
	const revised = $derived(formatDate(updated ?? null));
	const dateText = $derived(
		publishedDate
			? `${publishedDate}${revised ? ` • Updated ${revised}` : ''}`
			: revised
				? `Updated ${revised}`
				: ''
	);
</script>

<header>
	<h1 class="p-name heading-md {className}">
		{#if href}
			<a {href} class="text-bone">{hed}</a>
		{:else}
			{hed}
		{/if}
	</h1>

	{#if dek}
		<div class="body-md desc max-w-3xl mx-auto">{@html dek}</div>
	{/if}

	{#if dateText}
		<time class="dt-published detail-sm time block text-center" datetime={published ?? updated}>
			{dateText}
		</time>
	{/if}
</header>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.desc {
		@apply mb-6 md:mb-6;
	}

	.time {
		@apply mb-6 md:mb-6;
	}
</style>
