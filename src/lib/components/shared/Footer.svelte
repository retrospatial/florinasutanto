<script lang="ts">
	const links = [
		{ href: 'https://github.com/retrospatial', icon: 'mdi:github', title: 'GitHub' },
		{
			href: 'https://twitter.com/flosutanto',
			icon: 'mdi:twitter',
			title: 'Twitter'
		},
		{ href: '/rss.xml', icon: 'mdi:rss', title: 'RSS' },
		{
			href: 'hello@florinasutanto.com',
			icon: 'mdi:email',
			title: 'Email'
		}
	];

	let emailCopied = $state(false);

	async function copyEmail(email: string) {
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			const el = document.createElement('textarea');
			el.value = email;
			el.style.position = 'fixed';
			el.style.opacity = '0';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		}
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
					class="group mt-1 md:mt-0 cursor-pointer"
					title={emailCopied ? 'Copied!' : link.title}
				>
					<span
						class="detail-sm transition-colors duration-300 flex gap-1 items-center {emailCopied
							? 'text-orange'
							: 'group-hover:text-orange'}"
						>{link.title}
						<!-- inlined icon-park copy: iconify-icon reserves no space until its
						     data loads, which shifted this row when the footer scrolled in -->
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 48 48"
							aria-hidden="true"
							class="shrink-0 text-xs"
						>
							<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
								<path
									stroke-linecap="round"
									d="M13 12.432v-4.62A2.813 2.813 0 0 1 15.813 5h24.374A2.813 2.813 0 0 1 43 7.813v24.375A2.813 2.813 0 0 1 40.188 35h-4.672"
								/>
								<path
									fill={emailCopied ? 'currentColor' : 'none'}
									d="M32.188 13H7.811A2.813 2.813 0 0 0 5 15.813v24.374A2.813 2.813 0 0 0 7.813 43h24.375A2.813 2.813 0 0 0 35 40.188V15.811A2.813 2.813 0 0 0 32.188 13Z"
								/>
							</g>
						</svg>
					</span>
				</button>
			{:else}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="cursor-pointer no-link-decor hover:text-orange transition-colors duration-300"
					title={link.title}
				>
					<span class="detail-sm">{link.title}</span>
				</a>
			{/if}
		{/each}
	</div>
</footer>
