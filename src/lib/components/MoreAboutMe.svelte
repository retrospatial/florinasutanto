<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';
	import LastFM from '$lib/components/LastFM.svelte';
	import md from '$lib/utils/md';

	let content = page.data.about_long;
</script>

<div class="flex md:flex-row flex-col gap-32 w-full items-center justify-center relative">
	<!-- fav songs -->
	<div class="relative w-full max-w-80 overflow-hidden">
		<Image src="receipt.jpg" alt="receipt" class="w-full h-full object-cover scale-225 min-h-120" />
		<div class="absolute inset-0 w-full h-full text-black flex items-center justify-center p-2">
			<LastFM />
		</div>
	</div>

	<!-- reads -->
	<div
		class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] aspect-square max-w-70 h-fit text-black rotate-4 mt-20"
	>
		<div class="relative flex items-center justify-center w-full h-12">
			<div class="absolute inset-0 bg-[#f0e181]"></div>
			<p class="font-terminal text-2xl md:text-4xl relative z-10 uppercase">
				{content.text[1].title}
			</p>
		</div>
		<ol class="flex flex-col px-6 py-4">
			{#each content.text[1].desc as item}
				<a href={item.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
					<li class="font-terminal text-xl md:text-2xl">
						{item.title}
					</li>
				</a>
			{/each}
		</ol>
	</div>

	<!-- red line lol -->
	<div class="absolute -top-[18vh] right-0">
		<Image src="redline.png" alt="redline" class="w-full max-w-sm h-auto" />
	</div>
</div>

<!-- 
SPORTS: parkour, aerials, climbing, scuba diving, swimming -->
