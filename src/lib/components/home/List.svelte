<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
	import { page } from '$app/state';

	let content = page.data.links_list;
</script>

<div class="flex flex-col w-full items-center justify-center">
	<div
		class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] border border-[#f7e99d] max-w-70 min-h-70 text-black rotate-4"
	>
		<header class="relative flex items-center justify-center w-full h-12">
			<div class="absolute inset-0 bg-[#f0e181]"></div>
			<p class="font-terminal text-3xl md:text-4xl relative z-10 uppercase">
				{content.socials.title}
			</p>
		</header>
		<ol class="flex flex-col px-6 py-4">
			{#each content.socials.links as social}
				<li class="font-terminal text-xl md:text-2xl">
					<a href={social.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
						{social.title}
					</a>
				</li>
			{/each}
		</ol>
	</div>

	<div
		class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] border border-[#f7e99d] max-w-70 min-h-70 text-black -rotate-3 -mt-10 ml-10"
	>
		<header class="relative flex items-center justify-center w-full h-12">
			<div class="absolute inset-0 bg-[#f0e181]"></div>
			<p class="font-terminal text-3xl md:text-4xl relative z-10 uppercase">
				{content.others.title}
			</p>
		</header>
		<ol class="flex flex-col px-6 py-4">
			{#each content.others.links as other}
				<li class="font-terminal text-xl md:text-2xl">
					<a href={other.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
						{other.title}
					</a>
				</li>
			{/each}
		</ol>
	</div>
</div>
