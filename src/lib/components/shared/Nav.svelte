<script lang="ts">
	import { page } from '$app/state';
	import Dropdown from '$lib/helpers/Dropdown.svelte';

	const routes = [
		{ href: '/', title: 'home' },
		{ href: '/work', title: 'work' },
		{ href: '/personal', title: 'personal' },
		{ href: '/blog', title: 'blog' }
	];

	const links = [
		// { href: '/about', title: 'about' },
		{ href: '/now', title: 'now' }
		// { href: '/bookshelf', title: 'books' },
		// { href: '/blogroll', title: 'blogroll' }
	];

	const allLinks = [...routes, ...links];

	const pathname = $derived(page.url.pathname);
	const activeRoute = $derived(routes.find((route) => route.href === pathname));
	const activeLink = $derived(links.find((link) => link.href === pathname));
	const activeAny = $derived(allLinks.find((l) => l.href === pathname));
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center py-4 px-8 animation-fly-down"
	style="--delay: 0.4s;"
>
	<a href="/" target="_self" rel="noopener noreferrer" class="shrink-0">
		<p class="text-2xl text-lime nav-icon">✧</p>
	</a>
	<div class="w-full h-0.5 bg-bone mx-4 nav-line transition-colors duration-300"></div>

	<!-- mobile dropdown -->
	<div class="md:hidden shrink-0">
		<Dropdown
			text="menu"
			items={allLinks}
			activeHref={pathname}
			triggerClass="hover:text-lime transition-colors duration-300 font-heading text-xl md:text-2xl cursor-pointer {activeAny
				? 'italic text-lime'
				: 'text-bone'}"
			itemClass="hover:text-lime text-center transition-colors duration-300 font-heading text-xl md:text-2xl whitespace-nowrap"
			activeClass="italic text-lime"
			dividerAfter={routes.length - 1}
		/>
	</div>

	<!-- desktop nav -->
	<div class="hidden md:flex flex-row gap-8 shrink-0">
		{#each routes as route}
			<a href={route.href}
				><p
					class="hover:text-lime transition-colors duration-300 font-heading text-2xl {activeRoute?.href ===
					route.href
						? 'italic text-lime'
						: 'text-bone'}"
				>
					{route.title}
				</p></a
			>
		{/each}

		<Dropdown
			text="more"
			items={links}
			activeHref={pathname}
			triggerClass="hover:text-lime transition-colors duration-300 font-heading text-2xl cursor-pointer {activeLink
				? 'italic text-lime'
				: 'text-bone'}"
			itemClass="hover:text-lime transition-colors duration-300 font-heading text-2xl whitespace-nowrap"
			activeClass="italic text-lime"
		/>
	</div>
</nav>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.nav-icon {
		transition: transform 1s ease;
	}

	nav:hover .nav-icon {
		transform: rotate(180deg);
	}

	nav:hover .nav-line {
		background-color: var(--color-lime);
	}
</style>
