<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import Image from '$lib/helpers/Image.svelte';
	const favicon = '/assets/images/favicon.png';
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { getCachedCover, setCachedCover } from '$lib/utils/lastfm-cache';

	let { children } = $props();

	const pathname = $derived($page.url.pathname);
	const about = $derived(pathname === '/');
	const personal = $derived(pathname.startsWith('/personal'));
	const work = $derived(pathname.startsWith('/work'));
	const blog = $derived(pathname.startsWith('/blog'));

	const pageTitle = $derived(() => {
		if (about) return 'florina sutanto';
		if (work) return 'florina sutanto | work';
		if (personal) return 'florina sutanto | personal';
		if (blog) return 'florina sutanto | blog';
		return 'florina sutanto';
	});

	let mounted = $state(false);
	let lightboxImages = $state<{ src: string; alt: string }[]>([]);
	let lightboxIndex = $state(0);
	const lightboxSrc = $derived(lightboxImages[lightboxIndex]?.src ?? null);
	const lightboxAlt = $derived(lightboxImages[lightboxIndex]?.alt ?? '');

	async function preloadLastFmCovers() {
		try {
			const res = await fetch('/api/lastfm');
			const data = await res.json();
			const tracks = data.tracks;

			for (const track of tracks) {
				const cachedImage = getCachedCover(track.name, track.artist);

				if (cachedImage === undefined) {
					fetch(
						`/api/lastfm/covers?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(track.artist)}`
					)
						.then((res) => res.json())
						.then(({ image }) => {
							if (image !== null) {
								setCachedCover(track.name, track.artist, image);
							}
						})
						.catch((err) => console.error('Failed to preload cover:', err));

					await new Promise((resolve) => setTimeout(resolve, 1000));
				}
			}
		} catch (err) {
			console.error('Failed to preload Last.fm covers:', err);
		}
	}

	onMount(() => {
		mounted = true;
		preloadLastFmCovers();

		function handleImageClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (target.tagName === 'IMG' && target.hasAttribute('data-lightbox')) {
				e.preventDefault();
				e.stopPropagation();
				const clicked = target as HTMLImageElement;
				const all = [...document.querySelectorAll<HTMLImageElement>('img[data-lightbox]')];
				lightboxImages = all.map((img) => ({ src: img.src, alt: img.alt }));
				lightboxIndex = all.indexOf(clicked);
			}
		}

		document.addEventListener('click', handleImageClick, true);
		return () => document.removeEventListener('click', handleImageClick, true);
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (!lightboxSrc) return;
		if (e.key === 'Escape') lightboxImages = [];
		if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
		if (e.key === 'ArrowLeft')
			lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
	}}
/>

<svelte:head>
	<title>{pageTitle()}</title>
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="florina sutanto" href="/rss.xml" />
</svelte:head>

<div class="fixed inset-0 -z-10">
	<Image
		src="bg.webp"
		alt=""
		class="h-full w-full object-cover"
		lazy={false}
		width={1920}
		quality={80}
	/>
	<div class="absolute inset-0 bg-accent-green/40 mix-blend-color"></div>
	<div class="absolute inset-0 bg-black/30"></div>
</div>

<div class="max-w-screen-2xl mx-auto">
	<nav class="pt-navbar">
		<div
			class="w-4/5 mx-auto relative grid grid-cols-2 justify-items-center gap-4 md:flex md:flex-row justify-between items-start text-white"
		>
			<a href="/"
				><p class="nav-title hover:text-accent-blue {about ? 'text-accent-blue italic' : ''}">
					about
				</p></a
			>
			<a href="/work"
				><p class="nav-title hover:text-accent-purple {work ? 'text-accent-purple italic' : ''}">
					work
				</p></a
			>
			<a href="/personal"
				><p class="nav-title hover:text-accent-green {personal ? 'text-accent-green italic' : ''}">
					personal
				</p></a
			>
			<a href="/blog"
				><p class="nav-title hover:text-accent-pink {blog ? 'text-accent-pink italic' : ''}">
					blog
				</p></a
			>
		</div>
	</nav>
</div>

{#if lightboxSrc}
	<div
		data-lightbox-overlay
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 backdrop-blur-sm"
		onclick={() => (lightboxImages = [])}
		role="dialog"
		aria-modal="true"
		aria-label={lightboxAlt}
	>
		<img
			src={lightboxSrc}
			alt={lightboxAlt}
			class="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
		/>

		{#if lightboxImages.length > 1}
			<button
				class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
				onclick={(e) => {
					e.stopPropagation();
					lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
				}}
				aria-label="Previous image"
			>
				<iconify-icon icon="lucide:chevron-left" width="32"></iconify-icon>
			</button>
			<button
				class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
				onclick={(e) => {
					e.stopPropagation();
					lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
				}}
				aria-label="Next image"
			>
				<iconify-icon icon="lucide:chevron-right" width="32"></iconify-icon>
			</button>
		{/if}
	</div>
{/if}

<main class="relative py-8 md:py-16 max-w-screen-2xl mx-auto">
	{#if mounted}
		{#key pathname}
			<div in:fly|global={{ y: 40, duration: 600, easing: cubicOut }} class="mb-4">
				{@render children()}
			</div>
		{/key}
	{/if}
</main>

<style>
	@keyframes nav-fly-in {
		from {
			opacity: 0;
			transform: translateY(-40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	nav {
		animation: nav-fly-in 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.4s both;
	}
</style>
