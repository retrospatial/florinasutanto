<script lang="ts">
	import Radio from '$lib/helpers/Radio.svelte';
	import Image from '$lib/helpers/Image.svelte';
	import Window from '$lib/helpers/Window.svelte';
	import List from '$lib/components/home/List.svelte';
	import Section from '$lib/helpers/Section.svelte';
	import IntroCard from '$lib/components/home/IntroCard.svelte';

	import { isVideo } from '$lib/utils/video';
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount, tick } from 'svelte';

	const content = page.data;

	let contentHeight = $state(0);
	let emailCopied = $state(false);
</script>

<Section class="h-card flex flex-col lg:flex-row gap-4 lg:gap-8">
	<a class="u-url" href="https://florinasutanto.com" hidden>Florina Sutanto</a>
	<div class="w-full">
		<h1 class="heading-1 lowercase leading-normal mb-8 text-accent-blue">
			<span class="p-name">{content.intro.title}</span>
		</h1>

		<div class="flex flex-col lg:grid lg:grid-cols-[auto_1fr_225px] gap-6">
			<!-- first column -->
			<div class="flex flex-col gap-6 lg:max-w-xs self-start" bind:clientHeight={contentHeight}>
				<IntroCard />

				<!-- badges -->
				<Window color="bg-[#862400]" class="">
					<div class="grid grid-cols-3 gap-y-2 gap-x-4 self-center">
						{#each content.badges as badge}
							<a href={badge.href} target="_blank" rel="noopener noreferrer">
								<Image
									src={`/assets/images/badges/${badge.src}`}
									alt={badge.alt}
									class="w-20 h-full max-h-[31px]"
								/>
							</a>
						{/each}
					</div>
				</Window>
			</div>

			<!-- intro -->
			<Window
				class="text-pretty lg:overflow-hidden intro-window"
				style="--content-height: {contentHeight}px;"
				scrollbarThumb="var(--color-accent-blue)"
			>
				<h1 class="title">
					{content.intro.desc}
				</h1>
				<div class="p-note about-link">{@html md(content.intro.text)}</div>
			</Window>

			<div class="flex flex-col gap-6 justify-between w-full">
				<!-- social links -->
				<Window color="bg-[var(--color-home-green)]" class="h-fit">
					<h1 class="title">
						{content.links_list.socials.title}
					</h1>
					<ul class="gap-1 flex flex-col">
						{#each content.links_list.socials.links as link}
							<li class="text-sm lg:text-base group">
								{#if link.title.includes('Email')}
									{@const email = link.href}
									<button
										onclick={async () => {
											await navigator.clipboard.writeText(email);
											emailCopied = true;
											setTimeout(() => (emailCopied = false), 2000);
										}}
										class="group-hover:text-[var(--color-home-green)] links"
									>
										<iconify-icon icon={link.icon} class="text-[var(--color-home-green)] links-icon"
										></iconify-icon>
										{emailCopied ? 'Email copied!' : link.title}
									</button>
								{:else}
									<a
										href={link.href}
										target="_blank"
										rel="me noopener noreferrer"
										class="group-hover:text-[var(--color-home-green)] links"
									>
										<iconify-icon icon={link.icon} class="text-[var(--color-home-green)] links-icon"
										></iconify-icon>
										{link.title}
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</Window>

				<!-- misc links -->
				<Window color="bg-[var(--color-home-blue)]" class="h-full">
					<h1 class="title">
						{content.links_list.others.title}
					</h1>
					<div class="flex flex-col gap-2">
						<ul class="gap-1 flex flex-col">
							{#each content.links_list.others.links as link}
								<li class="text-sm lg:text-base gap-2 group">
									<a
										href={link.href}
										target="_self"
										rel="noopener noreferrer"
										class="group-hover:text-[var(--color-home-blue)] links"
									>
										<iconify-icon icon={link.icon} class="text-[var(--color-home-blue)] links-icon"
										></iconify-icon>
										{link.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</Window>
			</div>

			<!-- featured
						<Window color="bg-[#19a4cf]" class="w-full"
							><h1 class="title">
								{content.featured.title}
							</h1>
							<ul class="flex flex-row justify-around mb-2">
								{#each content.featured.features as feature}
									<div
										class="aspect-video max-w-full w-full border-outset hover:border-inset cursor-pointer lg:max-w-xs"
									>
										<a
											href={feature.href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="screencapture"
										>
											{#if isVideo(feature.cover)}
												<video
													class="w-full h-full object-cover"
													autoplay
													loop
													muted
													playsinline
													preload="metadata"
												>
													<source src={`/assets/${feature.cover}`} type="video/mp4" />
												</video>
											{:else if feature.cover.includes('youtube')}
												<iframe
													class="w-full h-full object-cover"
													src={feature.cover}
													title="YouTube video player"
													frameborder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerpolicy="strict-origin-when-cross-origin"
													allowfullscreen
												></iframe>
											{:else}
												<Image
													class="w-full h-full object-cover"
													src={`/assets/${feature.cover}`}
													alt=""
												/>
											{/if}
										</a>
									</div>
								{/each}
							</ul></Window
						> -->
		</div>
	</div>
</Section>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	:global(:root) {
		--color-home-green: #458876;
		--color-home-blue: #4057ba;
	}

	:global(.intro-window) {
		@media (min-width: 1024px) {
			max-height: var(--content-height);
		}
	}

	.title {
		@apply text-lg font-[375] uppercase lg:text-xl;
	}

	.about-link :global(.markdown a) {
		@apply bg-accent-blue/50 hover:bg-accent-blue/80 px-1 no-underline transition-colors duration-300 hover:text-black;
	}

	.links {
		@apply flex cursor-pointer items-center gap-3 transition-colors duration-300;
	}

	.links-icon {
		@apply inline-flex shrink-0 items-center;
	}
</style>
