<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { isVideo } from '$lib/utils/video';
	import { onMount, onDestroy } from 'svelte';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const content = $derived(page.data);

	let rowRefs: (HTMLElement | null)[] = [];
	let mm: gsap.MatchMedia;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		mm = gsap.matchMedia();

		setTimeout(() => {
			// Desktop animations
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
	<div class="relative mb-8">
		<svg
			viewBox="0 0 360 320"
			class="w-full max-w-md mb-4 overflow-visible"
			role="img"
			aria-label="fun & random projects"
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

		<div class="w-[95%] bg-accent-blue h-40 absolute bottom-0 right-0"></div>
	</div>

	<div class="grid grid-cols-1 gap-8">
		{#each content.personal as item, i}
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
								<source src={`/assets/covers/${item.cover}`} type="video/mp4" />
							</video>
						{:else}
							<img
								src={`/assets/covers/${item.cover}`}
								alt={item.title}
								class="w-full h-full object-cover"
							/>
						{/if}
					</div>

					<div
						class={`flex flex-col gap-2 my-2 w-full md:max-w-lg text-white group-hover:text-black transition-colors
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
