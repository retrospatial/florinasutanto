<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/helpers/Image.svelte';
	import { isVideo } from '$lib/utils/video';
	import { onMount, onDestroy } from 'svelte';
	import Doodles from '$lib/components/defunct/Doodles.svelte';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const content = $derived(page.data);

	let rowRefs = $state<(HTMLElement | null)[]>([]);
	let mm = $state<any | undefined>(undefined);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		mm = gsap.matchMedia();

		setTimeout(() => {
			// projects
			mm.add('(min-width: 769px)', () => {
				rowRefs.forEach((el, i) => {
					if (!el) return;

					const fromX = i % 2 === 0 ? -85 : 85;

					gsap.fromTo(
						el,
						{ opacity: 0, x: fromX },
						{
							opacity: 1,
							x: 0,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: el,
								start: 'top 90%',
								end: 'top 55%',
								scrub: 0.6
							}
						}
					);
				});

				ScrollTrigger.refresh();
			});
		}, 100);
	});

	onDestroy(() => {
		mm?.revert();
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});
</script>

<section class="w-4/5 mx-auto body">
	<!-- mobile layout -->
	<div class="md:hidden mb-8 relative">
		<h2 class="heading-2 text-accent-green mb-4">fun & random projects</h2>

		<div class="relative">
			{#if content.featured}
				{@const item = content.featured}
				<a href={item.link} target="_blank" rel="noopener noreferrer" class="group">
					<div
						class="flex flex-col border-3 border-accent-green group-hover:bg-accent-green transition-colors duration-300"
					>
						<div class="w-full overflow-hidden">
							<video
								class="w-full h-auto object-cover"
								autoplay
								loop
								muted
								playsinline
								preload="auto"
								aria-label="screencapture"
							>
								<source src={`/assets/cover_vids/${item.cover}`} type="video/mp4" />
							</video>
						</div>

						<div
							class="flex flex-col gap-2 p-4 text-white group-hover:text-black transition-colors"
						>
							<h2 class="entry-heading lowercase">{item.title}</h2>
							<p class="entry-tag">{item.type}</p>
							<p class="entry-body text-balance">{item.desc}</p>
						</div>
					</div>
				</a>

				<div class="absolute z-50 -top-8 -right-6">
					<Image src="doodles/penguin.png" alt="penguin" class="rotate-5  w-16 " />
				</div>
				<div class="absolute z-50 -top-10 right-9">
					<Image src="doodles/penguin_hi2.png" alt="penguin" class="w-8 -rotate-5" />
				</div>
			{/if}
		</div>
	</div>

	<!-- desktop layout -->
	<div class="hidden md:block relative mb-8">
		<svg
			viewBox="-28 0 350 320"
			class="w-full max-w-md overflow-visible"
			role="img"
			aria-label="fun & random projects"
			preserveAspectRatio="xMinYMin meet"
		>
			<defs>
				<path
					id="corner"
					d="
					M 20 100
					V 300
					Q 0 40 200 40
					H 660
				"
				/>
			</defs>

			<text fill="var(--color-accent-green)" class="heading-2">
				<textPath href="#corner" startOffset="50%" text-anchor="middle">
					fun & random projects
				</textPath>
			</text>
		</svg>

		{#if content.featured}
			{@const item = content.featured}
			<a href={item.link} target="_blank" rel="noopener noreferrer" class="group">
				<div
					class="flex h-full max-h-74 rounded-tl-[160px] items-center flex-row justify-between border-3 border-accent-green group-hover:bg-accent-green transition-colors duration-300 gap-4 absolute left-25 right-0 bottom-4"
				>
					<div class="w-full max-w-md h-full overflow-hidden rounded-tl-[157px]">
						<video
							class="w-auto h-full object-cover"
							autoplay
							loop
							muted
							playsinline
							preload="auto"
							aria-label="screencapture"
						>
							<source src={`/assets/cover_vids/${item.cover}`} type="video/mp4" />
						</video>
					</div>

					<div
						class="flex flex-col gap-2 my-2 w-full text-white group-hover:text-black transition-colors mx-8 items-end text-right"
					>
						<h2 class="entry-heading lowercase">{item.title}</h2>
						<p class="entry-tag">{item.type}</p>
						<p class="entry-body text-balance">{item.desc}</p>
					</div>
				</div>
			</a>

			<div class="group">
				<div class="absolute z-50 top-14 -right-8">
					<Image src="doodles/penguin.png" alt="penguin" class="rotate-5  w-20 " />
				</div>
				<div
					class="absolute z-50 top-12 -right-14 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
				>
					<Image src="doodles/penguin_hi.png" alt="penguin" class="w-10" />
				</div>
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-8">
		{#each content.projects as item, i}
			<a href={item.link} target="_blank" rel="noopener noreferrer" class="group">
				<div
					bind:this={rowRefs[i]}
					class={`flex md:max-h-60 h-full items-center flex-col justify-between border-3 border-accent-green group-hover:bg-accent-green transition-colors duration-300 gap-4 ${
						i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
					}`}
				>
					<div class="aspect-video max-w-full w-full md:max-w-xs">
						{#if isVideo(item.cover)}
							<video
								class="w-full h-full object-cover"
								autoplay
								loop
								muted
								playsinline
								preload="auto"
								aria-label="screencapture"
							>
								<source src={`/assets/cover_vids/${item.cover}`} type="video/mp4" />
							</video>
						{:else}
							<Image
								src={`cover_imgs/${item.cover}`}
								alt={item.title}
								class="w-full h-full object-cover"
							/>
						{/if}
					</div>

					<div
						class={`flex flex-col gap-2 my-2 w-full  text-white group-hover:text-black transition-colors
						 md:mx-8 md:px-0 px-4 pb-4 md:pb-0
						${i % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}
					>
						<h2 class="entry-heading lowercase">{item.title}</h2>
						<p class="entry-tag">{item.type}</p>
						<p class="entry-body text-balance">{item.desc}</p>
					</div>
				</div>
			</a>
		{/each}

		<p class="entry-heading lowercase text-white">and more to come!</p>
	</div>
</section>
