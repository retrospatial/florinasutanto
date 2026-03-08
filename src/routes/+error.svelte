<script lang="ts">
	import { page } from '$app/state';
	import Section from '$lib/helpers/Section.svelte';
</script>

<Section class="flex flex-col items-center justify-center gap-8">
	<h1 class="heading-1 text-accent-blue">{page.status}</h1>
	<p class="body-lg text-white">
		{#if page.status === 404}
			page not found
		{:else}
			{page.error?.message || 'Something went wrong'}
		{/if}
	</p>
</Section>
