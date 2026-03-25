<script lang="ts">
	const links = [
		{ href: 'https://github.com/retrospatial', icon: 'mdi:github', title: 'GitHub' },
		{
			href: 'https://twitter.com/flosutanto',
			icon: 'mdi:twitter',
			title: 'Twitter'
		},
		{
			href: 'https://linkedin.com/in/florinasutanto',
			icon: 'mdi:linkedin',
			title: 'LinkedIn'
		},
		{
			href: 'florinasutanto@gmail.com',
			icon: 'mdi:email',
			title: 'Email'
		},
		{ href: '/rss.xml', icon: 'mdi:rss', title: 'RSS' }
	];

	let emailCopied = $state(false);

	async function copyEmail(email: string) {
		await navigator.clipboard.writeText(email);
		emailCopied = true;
		setTimeout(() => (emailCopied = false), 2000);
	}
</script>

<footer
	class="h-card w-full px-8 mx-auto text-center gap-2 flex flex-col justify-between text-bone items-center pb-8 pt-16 animation-fly-up"
	style="--delay: 0.8s;"
>
	<a class="u-url" href="https://florinasutanto.com" hidden
		><span class="p-name">Florina Sutanto</span></a
	>

	<div class="text-xl md:text-2xl lowercase font-heading">Thanks for visiting!</div>

	<div class=" text-lg">✦•┈๑⋅⋯ ⋯⋅๑┈•✦</div>

	<div class="flex flex-row gap-2 md:gap-4 items-center flex-wrap justify-center">
		{#each links as link}
			{#if link.title.toLowerCase().includes('email')}
				<button
					onclick={() => copyEmail(link.href)}
					class="group"
					title={emailCopied ? 'Copied!' : link.title}
				>
					<span
						class="detail-md group-hover:text-orange transition-colors duration-300 flex gap-1 items-center"
						>{link.title}
						<iconify-icon
							icon={emailCopied ? 'icon-park-solid:copy' : 'icon-park-outline:copy'}
							class="text-xs transition-colors duration-300 {emailCopied
								? 'text-orange'
								: 'text-bone group-hover:text-orange'}"
						></iconify-icon>
					</span>
				</button>
			{:else}
				<a href={link.href} target="_blank" rel="noopener noreferrer" class="" title={link.title}>
					<span class="detail-md icon">{link.title}</span>
				</a>
			{/if}
		{/each}
	</div>
</footer>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.icon {
		@apply hover:text-orange transition-colors duration-300;
	}
</style>
