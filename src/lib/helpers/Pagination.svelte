<script lang="ts">
	import { Pagination } from 'bits-ui';

	interface Props {
		count: number;
		perPage?: number;
		page?: number;
	}

	let { count, perPage = 10, page = $bindable(1) }: Props = $props();
</script>

{#if count > perPage}
	<Pagination.Root {count} {perPage} bind:page>
		{#snippet children({ pages, range })}
			<div class="my-8 flex items-center justify-center gap-2 font-mono">
				<Pagination.PrevButton class="pagination-button">&lt;</Pagination.PrevButton>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<span class="px-1 text-xs text-white/50">...</span>
					{:else}
						<Pagination.Page {page} class="pagination-button">
							{page.value}
						</Pagination.Page>
					{/if}
				{/each}
				<Pagination.NextButton class="pagination-button">&gt;</Pagination.NextButton>
			</div>
			<!-- <p class="text-center font-mono text-xs uppercase tracking-widest text-white/50">
				{range.start}–{range.end} of {count}
			</p> -->
		{/snippet}
	</Pagination.Root>
{/if}

<style lang="postcss">
	@reference '$lib/styles/app.css';

	:global(.pagination-button) {
		@apply inline-flex size-8 cursor-pointer items-center justify-center rounded border border-white/50 text-sm text-white/80 transition-all duration-200 hover:border-white/80 hover:text-white disabled:cursor-not-allowed disabled:opacity-30;
	}

	:global(.pagination-button[data-selected]) {
		@apply border-accent-pink bg-accent-pink/20 text-white;
	}
</style>
