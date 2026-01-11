<script lang="ts">
	import '$lib/styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();

	const pathname = $derived($page.url.pathname);
	const about = $derived(pathname === '/');
	const personal = $derived(pathname.startsWith('/personal'));
	const work = $derived(pathname.startsWith('/work'));
	const blog = $derived(pathname.startsWith('/blog'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="background fixed inset-0 -z-10"></section>

<nav class="pt-navbar">
	<div class="w-3/4 mx-auto relative flex flex-row justify-between items-start text-white">
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
			><p class="nav-title hover:text-accent-orange {blog ? 'text-accent-orange italic' : ''}">
				blog
			</p></a
		>
	</div>
</nav>

<main class="relative py-16">
	{@render children()}
</main>
