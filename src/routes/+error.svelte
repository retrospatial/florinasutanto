<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="w-4/5 mx-auto flex flex-col items-center justify-center">
	<h1 class="heading-1 text-accent-blue mb-0">{$page.status}</h1>
	<p class="body-lg text-white">
		{#if $page.status === 404}
			Page not found
		{:else}
			{$page.error?.message || 'Something went wrong'}
		{/if}
	</p>
</section>
