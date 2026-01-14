<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';
	import LastFM from '$lib/components/LastFM.svelte';
	import md from '$lib/utils/md';

	let content = page.data;
</script>

<!-- <div class="columns-3 gap-4 body-md">
	{#each content.about_long.text as item (item.title)}
		<div
			class="border-6 rounded border-accent-blue break-inside-avoid mb-4 p-4 hover:-translate-y-1 transition-all duration-400"
		>
			<h3 class="heading-3 uppercase">{item.title}</h3>
			{#if item.desc === 'music'}
				<div class="">
					<LastFM />
				</div>
			{:else}
				<p class="mb-0">{@html md(item.desc)}</p>
			{/if}
		</div>
	{/each}
</div> -->

<div class="columns-1 md:columns-3 gap-4 body-md">
	<!-- fav songs -->
	<div class="relative w-full max-w-80 overflow-hidden">
		<Image
			src="receipt.jpg"
			alt="receipt"
			class="w-full h-85 aspect-video object-cover scale-225"
		/>
		<div class="absolute inset-0 w-full h-full text-black flex items-center justify-center p-2">
			<LastFM />
		</div>
	</div>

	<!-- sports -->
	<div class="w-full">sports</div>
</div>
