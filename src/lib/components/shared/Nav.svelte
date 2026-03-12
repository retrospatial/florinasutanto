<script lang="ts">
	import { page } from '$app/state';

	const pathname = $derived(page.url.pathname);
	const home = $derived(pathname === '/');
	const work = $derived(pathname === '/work');
	const personal = $derived(pathname === '/personal');
	const blog = $derived(pathname === '/blog');
</script>

<div class="max-w-screen-2xl mx-auto">
	<nav class="pt-navbar">
		<div
			class="w-4/5 mx-auto relative grid grid-cols-2 justify-items-center gap-4 md:flex md:flex-row justify-between items-start"
		>
			<a href="/"
				><p class="nav-title hover:text-accent-blue {home ? 'text-accent-blue italic' : ''}">
					home
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
