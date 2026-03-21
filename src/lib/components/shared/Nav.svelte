<script lang="ts">
	import { page } from '$app/state';

	const routes = [
		{ href: '/', title: 'home', color: 'text-accent-blue' },
		{ href: '/work', title: 'work', color: 'text-accent-purple' },
		{ href: '/personal', title: 'personal', color: 'text-accent-green' },
		{ href: '/blog', title: 'blog', color: 'text-accent-pink' }
	];

	const pathname = $derived(page.url.pathname);
	const activeRoute = $derived(routes.find((route) => route.href === pathname));
</script>

<div class="max-w-screen-2xl mx-auto">
	<nav class="pt-navbar">
		<div
			class="w-4/5 mx-auto relative grid grid-cols-2 justify-items-center gap-4 md:flex md:flex-row justify-between items-start"
		>
			{#each routes as route}
				<a href={route.href}
					><p
						class="nav-title hover:{route.color} {activeRoute?.href === route.href
							? `${route.color} italic`
							: ''}"
					>
						{route.title}
					</p></a
				>
			{/each}
		</div>
	</nav>
</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

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
