<script lang="ts">
	import { onMount } from 'svelte';
	import { getCachedCover, setCachedCover } from '$lib/utils/lastfm-cache';
	import Casette from '$lib/components/home/Casette.svelte';

	interface QueueEntry {
		name: string;
		artist: string;
		playcount: number;
		url: string;
	}

	interface Track extends QueueEntry {
		image: string | null;
		previewUrl: string | null;
	}

	const QUEUE_KEY = 'lastfm-queue-v1';

	function shuffle<T>(arr: T[]): T[] {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	async function getNextEntry(): Promise<QueueEntry | null> {
		let queue: { entries: QueueEntry[]; index: number } | null = null;
		try {
			const stored = localStorage.getItem(QUEUE_KEY);
			if (stored) queue = JSON.parse(stored);
		} catch {}

		if (!queue || queue.index >= queue.entries.length) {
			const res = await fetch('/api/lastfm');
			if (!res.ok) return null;
			const data = await res.json();
			const entries: QueueEntry[] = data.tracks ?? [];
			if (!entries.length) return null;
			queue = { entries: shuffle(entries), index: 0 };
		}

		const entry = queue.entries[queue.index];
		queue.index++;
		try {
			localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
		} catch {}
		return entry;
	}

	let track = $state<Track | null>(null);

	async function loadTrack() {
		try {
			const entry = await getNextEntry();
			if (!entry) return;

			track = { ...entry, image: null, previewUrl: null };

			// Fetch cover and preview in parallel
			const [coverResult, previewResult] = await Promise.allSettled([
				(async () => {
					const cached = getCachedCover(entry.name, entry.artist);
					if (cached !== undefined) return cached;
					const res = await fetch(
						`/api/lastfm/covers?track=${encodeURIComponent(entry.name)}&artist=${encodeURIComponent(entry.artist)}`
					);
					const { image } = await res.json();
					if (image !== null) setCachedCover(entry.name, entry.artist, image);
					return image;
				})(),
				(async () => {
					const res = await fetch(
						`/api/lastfm/preview?track=${encodeURIComponent(entry.name)}&artist=${encodeURIComponent(entry.artist)}`
					);
					const { previewUrl } = await res.json();
					return previewUrl;
				})()
			]);

			track = {
				...entry,
				image: coverResult.status === 'fulfilled' ? coverResult.value : null,
				previewUrl: previewResult.status === 'fulfilled' ? previewResult.value : null
			};
		} catch (err) {
			console.error('Failed to load track:', err);
		}
	}

	onMount(() => {
		loadTrack();
	});
</script>

<div class="flex flex-1 items-center justify-center">
	{#if track}
		<Casette
			src={track.previewUrl ?? ''}
			image={track.image}
			name={track.name}
			artist={track.artist}
			url={track.url}
			onShuffle={loadTrack}
		/>
	{/if}
</div>

<!-- <div class="body-sm mx-auto text-center italic ">{@html md(content.note)}</div> -->
