<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
	import { page } from '$app/state';

	let content = page.data.about_long;

	interface Track {
		name: string;
		artist: string;
		playcount: number;
		url: string;
		image: string | null;
	}

	interface CachedCover {
		image: string | null;
		timestamp: number;
	}

	let tracks = $state<Track[]>([]);
	let loading = $state(true);

	const CACHE_KEY = 'lastfm-covers-v2';
	const CACHE_DURATION = 1000 * 60 * 5;

	function getCachedCover(track: string, artist: string): string | null | undefined {
		try {
			const cached = localStorage.getItem(CACHE_KEY);
			if (!cached) return undefined;

			const cache = JSON.parse(cached);
			const key = `${artist}::${track}`;
			const entry: CachedCover | undefined = cache[key];

			if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
				return entry.image;
			}
			return undefined;
		} catch {
			return undefined;
		}
	}

	function setCachedCover(track: string, artist: string, image: string | null) {
		try {
			const cached = localStorage.getItem(CACHE_KEY);
			const cache = cached ? JSON.parse(cached) : {};
			const key = `${artist}::${track}`;

			cache[key] = {
				image,
				timestamp: Date.now()
			};

			localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
		} catch (err) {
			console.error('Failed to cache cover:', err);
		}
	}

	async function loadTracks() {
		try {
			const res = await fetch('/api/lastfm');
			const data = await res.json();
			tracks = data.tracks;
			loading = false;

			for (let i = 0; i < tracks.length; i++) {
				const track = tracks[i];

				const cachedImage = getCachedCover(track.name, track.artist);

				if (cachedImage !== undefined) {
					console.log(`Using cached cover for ${track.name}`);
					tracks[i] = { ...tracks[i], image: cachedImage };
				} else {
					const coverRes = await fetch(
						`/api/lastfm/covers?track=${encodeURIComponent(track.name)}&artist=${encodeURIComponent(track.artist)}`
					);
					const { image } = await coverRes.json();
					tracks[i] = { ...tracks[i], image };

					if (image !== null) {
						setCachedCover(track.name, track.artist, image);
					}

					if (i < tracks.length - 1) {
						await new Promise((resolve) => setTimeout(resolve, 1000));
					}
				}
			}
		} catch (err) {
			console.error('Failed to load tracks:', err);
			loading = false;
		}
	}

	$effect(() => {
		loadTracks();
	});
</script>

<div
	class="relative w-full max-w-80 overflow-hidden h-full -rotate-2 text-black flex items-center justify-center px-2 py-2 md:py-4"
>
	<Image
		src="receipt.jpg"
		alt="receipt"
		class="w-full h-full object-cover scale-225 absolute inset-0"
	/>
	<div class="tracking-tighter flex items-center justify-center flex-col mx-4 relative min-h-110">
		<div class="flex items-center justify-center relative mb-4">
			<div class="heading-3 text-black/85 w-full max-w-2/3 flex text-balance text-center">
				{content.text[0].title}
			</div>
			<Image
				src="vinyl.png"
				alt="vinyl"
				class="w-full h-auto max-w-8 md:max-w-10 animate-spin-slow absolute -bottom-1 right-7"
			/>
		</div>
		<div class="w-full">
			{#each tracks as t (t.url)}
				<a class="body-md" href={t.url} target="_blank" rel="noreferrer">
					<div class="flex flex-row gap-4 items-start justify-start py-2">
						{#if t.image}
							<img src={t.image} alt="" class="max-w-12 w-full max-h-12 h-auto" />
						{:else}
							<div class="w-full max-w-12 h-12 bg-accent-blue"></div>
						{/if}

						<div class="flex justify-center flex-col uppercase text-black/80">
							<div class="body-md mb-0 font-bold font-courier leading-tight">{t.name}</div>
							<div class="body-sm mb-0 font-courier leading-tight">{t.artist}</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	:global(.animate-spin-slow) {
		animation: spin 5s linear infinite;
	}
</style>
