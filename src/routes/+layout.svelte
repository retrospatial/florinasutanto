<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let { children } = $props();

	const pathname = $derived($page.url.pathname);
	const about = $derived(pathname === '/');
	const personal = $derived(pathname.startsWith('/personal'));
	const work = $derived(pathname.startsWith('/work'));
	const blog = $derived(pathname.startsWith('/blog'));

	let mounted = $state(false);

	// preload song covers
	async function preloadLastFmCovers() {
		try {
			const res = await fetch('/api/lastfm');
			const data = await res.json();
			const tracks = data.tracks;

			for (const track of tracks) {
				const cachedImage = getLastFmCachedCover(track.name, track.artist);

				if (cachedImage === undefined) {
					fetch(
						`/api/lastfm/covers?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(track.artist)}`
					)
						.then((res) => res.json())
						.then(({ image }) => {
							if (image !== null) {
								setLastFmCachedCover(track.name, track.artist, image);
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

	function getLastFmCachedCover(track: string, artist: string): string | null | undefined {
		try {
			const cached = localStorage.getItem('lastfm-covers-v2');
			if (!cached) return undefined;

			const cache = JSON.parse(cached);
			const key = `${artist}::${track}`;
			const entry = cache[key];
			const CACHE_DURATION = 1000 * 60 * 5;

			if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
				return entry.image;
			}
			return undefined;
		} catch {
			return undefined;
		}
	}

	function setLastFmCachedCover(track: string, artist: string, image: string | null) {
		try {
			const cached = localStorage.getItem('lastfm-covers-v2');
			const cache = cached ? JSON.parse(cached) : {};
			const key = `${artist}::${track}`;

			cache[key] = {
				image,
				timestamp: Date.now()
			};

			localStorage.setItem('lastfm-covers-v2', JSON.stringify(cache));
		} catch (err) {
			console.error('Failed to cache cover:', err);
		}
	}

	onMount(() => {
		mounted = true;
		preloadLastFmCovers();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="background fixed inset-0 -z-10"></section>

<div class="max-w-screen-2xl mx-auto">
	{#if mounted}
		<nav class="pt-navbar" in:fly|global={{ y: -40, duration: 600, easing: cubicOut, delay: 400 }}>
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
					><p
						class="nav-title hover:text-accent-green {personal ? 'text-accent-green italic' : ''}"
					>
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
	{/if}
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
