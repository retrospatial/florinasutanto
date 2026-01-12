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

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="background fixed inset-0 -z-10"></section>

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
{/if}

<main class="relative py-8 md:py-16">
	{#if mounted}
		{#key pathname}
			<div in:fly|global={{ y: 40, duration: 600, easing: cubicOut }}>
				{@render children()}
			</div>
		{/key}
	{/if}
</main>
