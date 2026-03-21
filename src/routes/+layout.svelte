<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import Image from '$lib/helpers/Image.svelte';
	import Lightbox from '$lib/helpers/Lightbox.svelte';
	import Nav from '$lib/components/shared/Nav.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	const favicon = '/assets/images/favicon.png';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();

	const site = $derived(page.data?.site);
	const pathname = $derived(page.url.pathname);

	const pageTitle = $derived(() => {
		const postTitle = page.data?.post?.title;
		if (postTitle) return `florina sutanto | ${postTitle}`;
		if (pathname === '/') return 'florina sutanto';
		const segment = pathname.split('/').filter(Boolean)[0];
		return `florina sutanto | ${segment}`;
	});
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta name="description" content={site?.description} />
	<meta name="author" content={site?.author} />
	<meta name="keywords" content={site?.keywords} />
	<meta property="og:title" content={site?.title} />
	<meta property="og:description" content={site?.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={site?.url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={site?.title} />
	<meta name="twitter:description" content={site?.description} />
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="florina sutanto" href="/rss.xml" />
</svelte:head>

<div class="fixed inset-0 -z-10 background">
	<Image src="bg.webp" alt="" class="h-full w-full object-cover" lazy={false} width={1920} />
	<div class="absolute inset-0 bg-accent-green/40 mix-blend-color"></div>
	<div class="absolute inset-0 bg-black/30"></div>
</div>

<Nav />

<Lightbox />

<main class="relative py-8 md:py-12 max-w-screen-2xl mx-auto">
	{#key pathname}
		<div class="page-content">
			{@render children()}
		</div>
	{/key}
</main>

<Footer />

<style>
	.page-content {
		animation: page-fly-in 0.6s cubic-bezier(0.33, 1, 0.68, 1) both;
	}

	@keyframes page-fly-in {
		from {
			opacity: 0;
			transform: translateY(40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* @media (prefers-color-scheme: light) {
		.background {
			background-color: white;
		}
	} */
</style>
