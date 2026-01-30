<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import Image from '$lib/helpers/Image.svelte';
	const favicon = '/assets/images/favicon.png';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
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
	});
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<link rel="icon" href={favicon} />
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

	.dot-pattern {
		background-image:
			radial-gradient(circle, rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px),
			radial-gradient(circle, rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px);
		background-size: 8px 12px;
		background-position:
			0 0,
			4px 6px;
	}
</style>
