<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Image from '$lib/helpers/Image.svelte';
	import LastFM from '$lib/components/LastFM.svelte';
	import Books from '$lib/components/Books.svelte';
	import Polaroids from '$lib/components/Polaroids.svelte';
	import md from '$lib/utils/md';

	let content = page.data.about_long;
	let Piano: typeof import('svelte-piano').Piano | null = $state(null);

	onMount(async () => {
		const module = await import('svelte-piano');
		Piano = module.Piano;
	});
</script>

<div class="relative">
	<div class="-z-10">
		<div class="cork-bg absolute inset-0"></div>
		<div class="bg-black/10 absolute inset-0"></div>
	</div>

	<div
		class="flex flex-col gap-10 relative py-16 px-4 border-5 lg:border-15 border-y-[#975f20] border-x-[#c77b1e]"
	>
		<div
			class="flex lg:flex-row flex-col gap-20 lg:gap-32 w-full items-center justify-center relative lg:max-w-3/4 mx-auto"
		>
			<!-- fav songs -->
			<LastFM />

			<div class="flex flex-col gap-20 items-center justify-center">
				<!-- red line -->
				<Image
					src="redline.png"
					alt="redline"
					class="w-full max-w-sm h-auto  hover:scale-103 hover:-rotate-2 transition-all duration-300"
				/>

				<!-- reads -->
				<div
					class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] max-w-70 min-h-70 text-black rotate-4"
				>
					<div class="relative flex items-center justify-center w-full h-12">
						<div class="absolute inset-0 bg-[#f0e181]"></div>
						<p class="font-terminal text-3xl lg:text-4xl relative z-10 uppercase">
							{content.text[1].title}
						</p>
					</div>
					<ol class="flex flex-col px-6 py-4">
						{#each content.text[1].desc as item}
							<a href={item.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
								<li class="font-terminal text-xl lg:text-2xl">
									{item.title}
								</li>
							</a>
						{/each}
					</ol>
				</div>
			</div>
		</div>

		<div class="w-full lg:max-w-3/4 mx-auto mt-10">
			<Polaroids />
		</div>

		<div
			class="flex flex-col lg:flex-row w-full justify-around items-center lg:gap-5 gap-10 -mt-10 lg:mt-0"
		>
			<Books />

			{#if Piano}
				<div class="-rotate-2 flex flex-col items-end justify-end w-full max-w-lg gap-4">
					<Piano --width="100%" --height="250px" />
					<div
						class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] max-w-50 min-h-50 text-black rotate-4 items-center justify-center flex mr-10"
					>
						<div class="h-8 bg-[#f0e181] absolute inset-0"></div>

						<p class="font-rock-salt text-sm lg:text-base text-black text-center p-4">
							{@html content.text[3].desc}
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.cork-bg {
		background-image: url('/assets/images/cork.webp');
		background-repeat: repeat;
	}
</style>
