<script lang="ts">
	import { onMount } from 'svelte';
	import Image from '$lib/helpers/Image.svelte';
	import { getCachedCover, setCachedCover } from '$lib/utils/lastfm-cache';

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

	let track = $state<Track | null>(null);
	let audioEl = $state<HTMLAudioElement | null>(null);
	let playing = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);

	let pct = $derived(duration > 0 ? currentTime / duration : 0);
	let leftScale = $derived(1 - pct * 0.38);
	let rightScale = $derived(0.62 + pct * 0.38);

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
			queue = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? 'null');
		} catch {}

		if (!queue || queue.index >= queue.entries.length) {
			const res = await fetch('/api/lastfm');
			if (!res.ok) return null;
			const entries: QueueEntry[] = (await res.json()).tracks ?? [];
			if (!entries.length) return null;
			queue = { entries: shuffle(entries), index: 0 };
		}

		const entry = queue.entries[queue.index++];
		try {
			localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
		} catch {}
		return entry;
	}

	async function fetchApi(path: string, entry: QueueEntry) {
		const res = await fetch(
			`/api/lastfm/${path}?track=${encodeURIComponent(entry.name)}&artist=${encodeURIComponent(entry.artist)}`
		);
		return res.json();
	}

	async function getCover(entry: QueueEntry): Promise<string | null> {
		const cached = getCachedCover(entry.name, entry.artist);
		if (cached !== undefined) return cached;
		const { image } = await fetchApi('covers', entry);
		if (image !== null) setCachedCover(entry.name, entry.artist, image);
		return image;
	}

	async function loadTrack() {
		audioEl?.pause();
		playing = false;
		currentTime = 0;
		duration = 0;

		try {
			const entry = await getNextEntry();
			if (!entry) return;

			track = { ...entry, image: null, previewUrl: null };

			// Fetch cover and preview in parallel
			const [image, previewUrl] = await Promise.all([
				getCover(entry).catch(() => null),
				fetchApi('preview', entry)
					.then((d) => d.previewUrl)
					.catch(() => null)
			]);
			track = { ...entry, image, previewUrl };
		} catch (err) {
			console.error('Failed to load track:', err);
		}
	}

	onMount(loadTrack);

	function toggle() {
		if (!audioEl) return;
		playing ? audioEl.pause() : audioEl.play();
	}

	function seek(e: MouseEvent) {
		if (!audioEl || !duration) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		audioEl.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
	}

	function fmt(s: number) {
		if (!isFinite(s) || s < 0) return '0:00';
		return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
	}
</script>

{#if track}
<div
	class="relative w-full max-w-140 h-fit bg-blue rounded-lg overflow-hidden font-mono mx-4 md:mx-0"
>
	<Image
		src="textures/plastic.png"
		class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 pointer-events-none"
		alt=""
	/>

	{#if track.previewUrl}
		<audio
			bind:this={audioEl}
			src={track.previewUrl}
			onplay={() => (playing = true)}
			onpause={() => (playing = false)}
			onended={() => (playing = false)}
			ontimeupdate={() => audioEl && (currentTime = audioEl.currentTime)}
			onloadedmetadata={() => audioEl && (duration = audioEl.duration)}
		></audio>
	{/if}

	<div class="relative z-10 flex h-full flex-col gap-3 p-6">
		<div class="bg-[#ede4cc] px-4 py-2 body-lg w-fit -rotate-1 font-rock-salt capitalize my-1">
			let's jam!
		</div>

		<!-- casette -->
		<div
			class="flex flex-1 flex-col overflow-hidden rounded-sm border border-black/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]"
		>
			<!-- label -->
			<a
				href={track.url || undefined}
				target="_blank"
				rel="noreferrer"
				class="flex flex-1 items-center gap-3 bg-[#ede4cc] px-4 py-3 text-[#2a1a08] transition-colors hover:bg-[#e0d4b4]"
			>
				{#if track.image}
					<img
						src={track.image}
						alt=""
						class="size-20 md:size-30 shrink-0 border border-[#b09050]/40 object-cover"
					/>
				{:else}
					<div class="size-20 md:size-30 shrink-0 border border-[#b09050]/40 bg-[#d0c4a4]"></div>
				{/if}
				<div class="relative flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch py-2">
					<div class="pointer-events-none absolute inset-0 flex flex-col justify-around">
						{#each Array(5) as _, i (i)}
							<div class="h-px bg-[#b09050]/40"></div>
						{/each}
					</div>
					<span class="font-rock-salt text-wrap body-lg relative font-bold leading-relaxed"
						>{track.name}</span
					>
					<span class="detail-sm relative truncate uppercase text-[#2a1a08]/60"
						>{track.artist}</span
					>
				</div>
			</a>

			<!-- band -->
			<div
				class="flex items-center gap-3 px-5 py-3"
				style="background: linear-gradient(to bottom, #b02020 0%, #b02020 33.3%, #cc5010 33.3%, #cc5010 66.6%, #e88010 66.6%);"
			>
				{@render reel(leftScale, true)}

				<div
					class="relative h-12 flex-1 overflow-hidden rounded-sm bg-[#161616] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
				>
					<div class="absolute bottom-1 left-2 top-1 w-1 rounded-full bg-[#c0b49a]"></div>
					<div class="absolute bottom-1 right-2 top-1 w-1 rounded-full bg-[#c0b49a]"></div>
					<div class="absolute left-3 right-3 top-1/2 h-3 -translate-y-1/2 bg-[#3a2812]"></div>
				</div>

				{@render reel(rightScale, false)}
			</div>
		</div>

		<!-- controls -->
		<div class="flex items-center gap-2">
			<span class="shrink-0 detail-sm text-bone">{fmt(currentTime)}</span>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="slot-3d relative h-[6px] flex-1 cursor-pointer rounded-full bg-black/40"
				role="slider"
				aria-valuemin={0}
				aria-valuemax={duration || 1}
				aria-valuenow={currentTime}
				tabindex="0"
				onclick={seek}
			>
				<div
					class="h-full rounded-full bg-lime shadow-[0_0_4px_rgba(216,243,40,0.6)]"
					style="width:{pct * 100}%"
				></div>
			</div>

			<!-- <span class="shrink-0 detail-sm text-bone">{fmt(duration)}</span> -->

			{@render ctrlBtn(toggle, playing ? 'Pause' : 'Play', playing ? 'mdi:pause' : 'mdi:play')}
			{@render ctrlBtn(loadTrack, 'Play another song', 'mdi:shuffle')}
			{@render linkBtn('https://www.last.fm/user/sunmetric/', 'Open last.fm', 'fa7-brands:lastfm')}
		</div>
	</div>

	{#snippet screw(position: string)}
		<div class="absolute {position}">
			<div
				class="screw relative size-3 rounded-full bg-[#4a4a4a] shadow-[inset_1px_1px_0_#777,inset_-1px_-1px_0_#222]"
			></div>
		</div>
	{/snippet}

	{#snippet reel(scale: number, isLeft: boolean)}
		<div class="shrink-0 [transition:transform_2s_ease]" style="transform: scale({scale})">
			<div class="reel" class:reel-l={isLeft} class:spin={playing}></div>
		</div>
	{/snippet}

	{#snippet ctrlBtn(handler: () => void, label: string, icon: string)}
		<button
			onclick={handler}
			aria-label={label}
			class="btn-3d flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-lime hover:bg-lime hover:text-black"
		>
			<iconify-icon {icon} width="20" height="20"></iconify-icon>
		</button>
	{/snippet}

	{#snippet linkBtn(href: string, label: string, icon: string)}
		<a
			{href}
			target="_blank"
			rel="noreferrer"
			aria-label={label}
			class="btn-3d flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-lime hover:bg-lime hover:text-black"
		>
			<iconify-icon {icon} width="20" height="20"></iconify-icon>
		</a>
	{/snippet}

	{@render screw('top-[7px] left-[7px]')}
	{@render screw('top-[7px] right-[7px]')}
	{@render screw('bottom-[7px] left-[7px]')}
	{@render screw('bottom-[7px] right-[7px]')}
</div>
{/if}

<style>
	.screw::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 65%;
		height: 1.5px;
		background: #666;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.btn-3d {
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.55);
		transition:
			transform 110ms ease,
			box-shadow 110ms ease,
			background-color 110ms ease,
			color 110ms ease;
	}
	.btn-3d:hover {
		transform: translateY(-1px);
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.65);
	}
	.btn-3d:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}

	.slot-3d {
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.7),
			0 1px 0 rgba(255, 255, 255, 0.05);
		transition:
			box-shadow 110ms ease,
			background-color 110ms ease;
	}
	.slot-3d:hover {
		background-color: rgba(0, 0, 0, 0.55);
	}
	.slot-3d:active {
		box-shadow:
			inset 0 2px 3px rgba(0, 0, 0, 0.85),
			0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.reel {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: repeating-conic-gradient(#161616 0deg 35deg, #c0b49a 35deg 60deg);
		border: 2px solid #3a2812;
		position: relative;
		box-shadow:
			0 2px 5px rgba(0, 0, 0, 0.5),
			inset 0 1px 2px rgba(237, 228, 204, 0.15);
	}

	.reel::after {
		content: '';
		position: absolute;
		inset: 30%;
		border-radius: 50%;
		background: #ede4cc;
		border: 1.5px solid #3a2812;
	}

	.reel.spin {
		animation: spin-cw 2s linear infinite;
	}

	.reel-l.spin {
		animation: spin-ccw 2s linear infinite;
	}

	@keyframes spin-cw {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spin-ccw {
		to {
			transform: rotate(-360deg);
		}
	}
</style>
