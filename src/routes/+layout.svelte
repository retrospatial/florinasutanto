<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
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
