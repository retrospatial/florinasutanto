<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
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

<Lightbox />

<div class="min-h-screen flex flex-col">
	<Nav />

	<main class="grow flex flex-col">
		{#key pathname}
			<div class="animation-fly-up grow flex flex-col">
				{@render children()}
			</div>
		{/key}
	</main>

	<Footer />
</div>
