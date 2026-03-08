<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
</script>

<footer
	class="h-card w-1/2 pb-16 mx-auto body text-center gap-3 flex flex-col items-center justify-center text-white"
>
	<a class="u-url" href="https://florinasutanto.com" hidden
		><span class="p-name">Florina Sutanto</span></a
	>

	<div class="fish-row">
		<span class="fish" style="animation-delay: 0s">𓆝</span>
		<span class="fish" style="animation-delay: 0.4s">𓆟</span>
		<span class="fish" style="animation-delay: 0.8s">𓆞</span>
		<span class="fish" style="animation-delay: 1.2s">𓆝</span>
		<span class="fish" style="animation-delay: 1.6s">𓆟</span>
	</div>
	<p class="detail-md font-semibold">Thanks for visiting!</p>

	<!-- <div class="flex items-center justify-center gap-2">
		<a href="https://indieweb.org/">
			<Image
				src="/assets/images/badges/indieweb.png"
				alt="IndieWeb Webring"
				class="max-w-20 max-h-[15px]"
			/></a
		>

		<a href="https://xn--sr8hvo.ws/previous" aria-label="Previous" hidden></a>
		<a href="https://xn--sr8hvo.ws/next" aria-label="Next" hidden></a>

		<a href="https://microformats.org/wiki/Main_Page">
			<Image
				src="/assets/images/badges/microformats.png"
				alt="Microformats"
				class="max-w-20 max-h-[15px]"
			/></a
		>

		<a href="https://en.wikipedia.org/wiki/Pempek">
			<Image
				src="/assets/images/badges/indo.png"
				alt="Favorite food"
				class="max-w-20 max-h-[15px]"
			/></a
		>
	</div> -->
</footer>

<style>
	.fish-row {
		display: flex;
		gap: 0.5rem;
	}

	.fish {
		display: inline-block;
		animation: swim 2s ease-in-out infinite;
	}

	@keyframes swim {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}
</style>
