<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
	import { page } from '$app/state';

	let content = page.data.links_list;
</script>

<div class="flex flex-col w-full items-center justify-center gap-4">
	<div
		class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] max-w-70 min-h-70 text-black -rotate-2"
	>
		<div class="relative flex items-center justify-center w-full h-12">
			<div class="absolute inset-0 bg-[#f0e181]"></div>
			<p class="font-terminal text-3xl lg:text-4xl relative z-10 uppercase">
				{content.socials.title}
			</p>
		</div>
		<ol class="flex flex-col px-6 py-4">
			{#each content.socials.links as social}
				<a href={social.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
					<li class="font-terminal text-xl lg:text-2xl">
						{social.title}
					</li>
				</a>
			{/each}
		</ol>
	</div>

	<div
		class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] max-w-70 min-h-70 text-black rotate-8 -mt-10"
	>
		<div class="relative flex items-center justify-center w-full h-12">
			<div class="absolute inset-0 bg-[#f0e181]"></div>
			<p class="font-terminal text-3xl lg:text-4xl relative z-10 uppercase">
				{content.others.title}
			</p>
		</div>
		<ol class="flex flex-col px-6 py-4">
			{#each content.others.links as other}
				<a href={other.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
					<li class="font-terminal text-xl lg:text-2xl">
						{other.title}
					</li>
				</a>
			{/each}
		</ol>
	</div>
</div>
