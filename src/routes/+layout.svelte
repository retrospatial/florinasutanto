<script lang="ts">
	import '$lib/styles/app.css';
	import 'iconify-icon';
	import Lightbox from '$lib/helpers/Lightbox.svelte';
	import Nav from '$lib/components/shared/Nav.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	const favicon = '/assets/images/favicon.png';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();

	afterNavigate(({ to }) => {
		const hash = to?.url.hash;
		if (!hash) return;

		document.fonts?.ready.then(() =>
			requestAnimationFrame(() => {
				try {
					document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' });
				} catch {
					// hash isn't a usable selector
				}
			})
		);
	});

	const site = $derived(page.data?.site);
	const pathname = $derived(page.url.pathname);

	const pageTitle = $derived(() => {
		const postTitle = page.data?.post?.title ?? page.data?.book?.title;
		if (postTitle) return `florina sutanto | ${postTitle}`;
		if (pathname === '/') return 'florina sutanto';
		const segment = pathname.split('/').filter(Boolean)[0];
		return `florina sutanto | ${segment}`;
	});

	const pageDescription = $derived(() => {
		const postDesc = page.data?.post?.description;
		if (postDesc) return postDesc;
		const segment = pathname === '/' ? 'home' : pathname.split('/').filter(Boolean)[0];
		return site?.descriptions?.[segment] ?? site?.description;
	});
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta name="description" content={pageDescription()} />
	<meta name="author" content={site?.author} />
	<meta name="keywords" content={site?.keywords} />
	<meta property="og:title" content={pageTitle()} />
	<meta property="og:description" content={pageDescription()} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site?.title} />
	<meta property="og:url" content={site?.url} />
	<meta property="og:image" content="https://florinasutanto.com{site?.thumbnail}" />
	<meta name="twitter:card" content={site?.thumbnail ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={pageTitle()} />
	<meta name="twitter:description" content={pageDescription()} />
	<meta name="twitter:image" content="https://florinasutanto.com{site?.thumbnail}" />
	<link rel="icon" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="florina sutanto" href="/rss.xml" />
</svelte:head>

<Lightbox />

<div class="app-shell min-h-screen flex flex-col">
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
