<script lang="ts">
	import { page } from '$app/state';
	import md from '$lib/utils/md';
	import Image from '$lib/helpers/Image.svelte';
	import { isVideo } from '$lib/utils/video';
	import { onMount, onDestroy } from 'svelte';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const content = $derived(page.data);

	const doodles = ['penguin', 'boat', 'bolt', 'swirl', 'catra', 'music', 'music2', 'scuba', 'book'];

	type AnimationType = 'rotate' | 'float' | 'spin';

	interface DoodlePosition {
		name: string;
		x: number;
		y: number;
		rotation: number;
		animation: AnimationType;
	}

	const animationTypes: AnimationType[] = ['rotate', 'float', 'spin'];

	function generateDoodlePositions(): DoodlePosition[] {
		const totalDoodles = 15;
		const minDistance = 18;
		const maxAttempts = 100;
		const minPos = 5;
		const maxPos = 85;
		const range = maxPos - minPos;
		const positions: DoodlePosition[] = [];

		for (let i = 0; i < totalDoodles; i++) {
			const doodleName = doodles[Math.floor(Math.random() * doodles.length)];
			const animation = animationTypes[i % animationTypes.length];
			let placed = false;

			for (let attempt = 0; attempt < maxAttempts; attempt++) {
				const x = minPos + Math.random() * range;
				const y = minPos + Math.random() * range;

				const hasOverlap = positions.some((pos) => {
					const dx = pos.x - x;
					const dy = pos.y - y;
					return Math.sqrt(dx * dx + dy * dy) < minDistance;
				});

				if (!hasOverlap) {
					positions.push({
						name: doodleName,
						x,
						y,
						rotation: Math.random() * 40 - 20,
						animation
					});
					placed = true;
					break;
				}
			}

			// Fallback: place anyway even if overlapping
			if (!placed) {
				positions.push({
					name: doodleName,
					x: minPos + Math.random() * range,
					y: minPos + Math.random() * range,
					rotation: Math.random() * 40 - 20,
					animation
				});
			}
		}

		return positions;
	}

	const doodlePositions = generateDoodlePositions();
	let doodleRefs: (HTMLElement | null)[] = [];
	let doodleContainer: HTMLElement | null = null;

	let rowRefs: (HTMLElement | null)[] = [];
	let mm: gsap.MatchMedia;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		mm = gsap.matchMedia();

		// doodles
		doodleRefs.forEach((el, i) => {
			if (!el || !doodleContainer) return;

			const doodle = doodlePositions[i];
			const baseRotation = doodle.rotation;

			switch (doodle.animation) {
				case 'rotate':
					gsap.set(el, { rotation: baseRotation });
					gsap.fromTo(
						el,
						{ rotateY: 0 },
						{
							rotateY: 360,
							ease: 'none',
							scrollTrigger: {
								trigger: doodleContainer,
								start: 'top 80%',
								end: 'bottom 20%',
								scrub: 1
							}
						}
					);
					break;
				case 'spin':
					gsap.fromTo(
						el,
						{ rotation: baseRotation },
						{
							rotation: baseRotation + 360,
							ease: 'none',
							scrollTrigger: {
								trigger: doodleContainer,
								start: 'top 80%',
								end: 'bottom 20%',
								scrub: 1
							}
						}
					);
					break;

				case 'float':
					gsap.set(el, { rotation: baseRotation });
					gsap.fromTo(
						el,
						{ yPercent: 0 },
						{
							yPercent: -80,
							ease: 'sine.inOut',
							scrollTrigger: {
								trigger: doodleContainer,
								start: 'top 80%',
								end: 'bottom 20%',
								scrub: 1
							}
						}
					);
					break;
			}
		});

		setTimeout(() => {
			// projects
			mm.add('(min-width: 769px)', () => {
				rowRefs.forEach((el, i) => {
					if (!el) return;

					const fromX = i % 2 === 0 ? -85 : 85;

					gsap.fromTo(
						el,
						{ opacity: 0, x: fromX },
						{
							opacity: 1,
							x: 0,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: el,
								start: 'top 90%',
								end: 'top 55%',
								scrub: 0.6
							}
						}
					);
				});

				ScrollTrigger.refresh();
			});
		}, 100);
	});

	onDestroy(() => {
		mm?.revert();
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});
</script>

<section class="w-4/5 mx-auto body">
	<div class="relative mb-8">
		<svg
			viewBox="0 0 360 320"
			class="w-full max-w-md mb-4 overflow-visible"
			role="img"
			aria-label="fun & random projects"
		>
			<defs>
				<path
					id="corner"
					d="
					M 20 100
					V 300
					Q 0 40 200 40
					H 660
				"
				/>
			</defs>

			<text fill="var(--color-accent-green)" class="heading-2">
				<textPath href="#corner" startOffset="50%" text-anchor="middle">
					fun & random projects
				</textPath>
			</text>
		</svg>

		<div
			bind:this={doodleContainer}
			class="absolute left-10 top-20 right-0 bottom-0 pointer-events-none overflow-hidden rounded-tl-[180px] h-full max-h-80"
			style="perspective: 1000px;"
		>
			{#each doodlePositions as doodle, i}
				<div
					bind:this={doodleRefs[i]}
					class="absolute"
					style="left: {doodle.x}%; top: {doodle.y}%; transform-style: preserve-3d;"
				>
					<Image
						src={`doodles/${doodle.name}.png`}
						alt={doodle.name}
						class="max-h-12 md:max-h-16 h-full w-auto"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>
