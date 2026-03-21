<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Image from '$lib/helpers/Image.svelte';
	import LastFM from '$lib/components/home/LastFM.svelte';
	import Books from '$lib/components/home/Books.svelte';
	import Polaroids from '$lib/components/home/Polaroids.svelte';
	import md from '$lib/utils/md';

	const content = page.data.scrapbook;
	let Piano: typeof import('svelte-piano').Piano | null = $state(null);

	let imgFolder = '/assets/images/scrapbook/';

	onMount(async () => {
		const module = await import('svelte-piano');
		Piano = module.Piano;
	});
</script>

<svelte:head>
	<style>
		nav,
		footer {
			display: none !important;
		}

		main {
			padding: 0 !important;
			margin: 0 !important;
			max-width: none !important;
			display: flex !important;
			flex-direction: column !important;
			height: 100vh !important;
			justify-content: center !important;
		}

		html,
		body {
			overflow: hidden !important;
			height: 100vh !important;
		}

		.background {
			display: none !important;
		}

		body {
			background: url('/assets/images/scrapbook/tilebg.jpg') repeat;
		}
	</style>
</svelte:head>

<section
	class="scrapbook-scroll lg:w-[90%] max-w-7xl mx-4 lg:mx-auto my-auto relative overflow-y-auto border-5 lg:border-15 border-y-[#975f20] border-x-[#c77b1e] h-[calc(100vh-2rem)] lg:h-[calc(100vh-5rem)]"
>
	<div class="cork-bg min-h-full relative lg:p-10 p-4 flex flex-col gap-4 lg:gap-0">
		<div class="flex flex-col lg:flex-row justify-between relative gap-10 lg:gap-0">
			<div class="relative block lg:hidden mx-auto w-fit mt-15 lg:mt-0">
				<Image src="{imgFolder}wes.png" alt="wes" class="flag " />
				<Image
					src="{imgFolder}pin.png"
					alt="pin"
					class="absolute top-0 left-1/3 translate-x-2 z-10 w-[25%]"
				/>
			</div>

			<div
				class="flex lg:flex-row flex-col gap-10 lg:max-h-[650px] w-full items-center justify-center relative mx-auto"
			>
				<!-- fav songs -->
				<div class="lg:translate-x-6 lg:translate-y-10">
					<LastFM />
				</div>

				<div class="flex flex-col gap-20 items-center lg:items-end xl:translate-x-8 justify-center">
					<!-- red line -->
					<Image
						src="{imgFolder}redline.webp"
						alt="redline"
						class="w-full max-w-sm h-auto  hover:scale-103 hover:-rotate-2 transition-all duration-300"
					/>

					<!-- reads -->
					<div
						class="w-full bg-linear-to-b from-[#f7e99d] to-[#f0e181] max-w-70 min-h-70 text-black rotate-4"
					>
						<div class="relative flex items-center justify-center w-full h-12">
							<div class="absolute inset-0 bg-[#f0e181]"></div>
							<p class="font-terminal text-4xl relative z-10 uppercase">
								{content.text[1].title}
							</p>
						</div>
						<ol class="flex flex-col px-6 py-4">
							{#each content.text[1].desc as item}
								<li class="font-terminal text-2xl">
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										class="hover:underline"
									>
										{item.title}
									</a>
								</li>
							{/each}
						</ol>
					</div>
				</div>
			</div>

			<div class="relative shrink-0 basis-1/4 hidden lg:block">
				<Image src="{imgFolder}wes.png" alt="wes" class="flag w-full" />
				<Image
					src="{imgFolder}pin.png"
					alt="pin"
					class="absolute top-0 left-1/3 translate-x-2 z-10 w-[25%]"
				/>
			</div>
		</div>

		<a href="/" target="_self">
			<Image
				src="{imgFolder}washi.png"
				alt="washi"
				class="absolute lg:top-0 -left-15 -rotate-30 -top-5 "
			/></a
		>

		<div class="w-full mx-auto lg:max-w-4/5 mt-12 lg:mt-0">
			<Polaroids />
		</div>

		<div
			class="flex flex-col lg:flex-row w-full justify-around items-center lg:gap-5 gap-10 mt-20 mb-4 lg:mb-0"
		>
			<Books />

			{#if Piano}
				<div class="rotate-2 flex flex-col items-end justify-end w-full max-w-lg gap-4">
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
</section>

<style>
	.scrapbook-scroll {
		scrollbar-width: none;
	}

	.scrapbook-scroll::-webkit-scrollbar {
		display: none;
	}

	.cork-bg {
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
			url('/assets/images/scrapbook/cork.webp');
		background-repeat: repeat;
	}

	:global(.flag) {
		transform-origin: top center;
		animation: sway var(--sway-duration, 3s) ease-in-out infinite;
		animation-delay: var(--sway-delay, 0s);
	}

	@keyframes sway {
		0%,
		100% {
			rotate: 0deg;
		}
		50% {
			rotate: -3deg;
		}
	}
</style>
