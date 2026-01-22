<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import Image from '$lib/helpers/Image.svelte';
	import gsap from 'gsap';
	import Observer from 'gsap/Observer';

	let { selectedOption } = $props();

	let pathEl = $state<SVGPathElement | undefined>(undefined);
	let revealImgEl = $state<HTMLElement | undefined>(undefined);
	let tl = $state<gsap.core.Timeline | undefined>(undefined);
	let obs = $state<any | undefined>(undefined);

	const SENSITIVITY = 0.0009;
	const START = 0.23;

	function clamp01(n: number) {
		return Math.max(0, Math.min(1, n));
	}

	function killDraw() {
		obs?.kill();
		obs = undefined;
		tl?.kill();
		tl = undefined;
	}

	function initDraw() {
		killDraw();
		if (!pathEl) return;

		gsap.registerPlugin(Observer);

		// hide image initially
		if (revealImgEl) gsap.set(revealImgEl, { autoAlpha: 0 });

		const length = pathEl.getTotalLength();
		const startOffset = length;

		// set starting stroke
		gsap.set(pathEl, {
			strokeDasharray: length,
			strokeDashoffset: startOffset
		});

		// timeline - finish drawing + reveal image
		tl = gsap.timeline({ paused: true });
		tl.to(pathEl, { strokeDashoffset: 0, ease: 'none', duration: 1 });
		if (revealImgEl) {
			tl.to(revealImgEl, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '>');
		}

		let progress = START;
		tl.progress(progress);

		obs = Observer.create({
			target: window,
			type: 'wheel,touch',
			preventDefault: false,
			wheelSpeed: 1,
			onChange: (self: any) => {
				progress = clamp01(progress + self.deltaY * SENSITIVITY);
				tl?.progress(progress);
			}
		});
	}

	onMount(() => {
		if (selectedOption === 'short') initDraw();
		return () => killDraw();
	});

	onDestroy(() => killDraw());

	$effect(() => {
		if (selectedOption === 'short') tick().then(initDraw);
		else killDraw();
	});
</script>

<div class="relative w-full max-w-[340px] cursor-cell" title="Keep scrolling!">
	<div bind:this={revealImgEl} class="absolute inset-0 w-full h-full">
		<Image src="me.png" alt="pic of me" class="w-full h-full object-contain" />
	</div>

	<svg
		class="relative z-10 w-full h-auto"
		viewBox="0 0 303 531"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="outline"
	>
		<path
			bind:this={pathEl}
			d="M19.0159 220.74
            L31.5671 192.233
            L33.1799 157.039
            L37.997 136.783
            L37.0493 118.101
            L31.5162 94.5001
            L30.0162 81.5001
            L25.5161 76.5
            L18.5163 71.0001
            L18.5162 63.5
            L24.5161 54.5
            L24.5161 41
            L30.0162 26.5
            L41.0161 12.5
            L48.0161 8.5
            L53.0161 7
            L63.0161 5.00003
            L72.5161 5.00003
            L85.5161 5
            L101.516 15
            L109.016 35
            L128.516 65.5
            L128.516 65.5
            L158.844 80.2529
            L169.046 91.8926
            L183.905 94.1
            L190.335 101.925
            L284.248 158.543
            L297.421 181.832
            L295.529 194.568
            L243.39 229.126
            L214.516 242.5
            L228.516 271.5
            L238.354 306.838
            L235.043 329.125
            L218.59 349.822
            L216.975 421.534
            L219.015 463.78
            L221.879 494.396
            L214.016 521
            L191.016 525.013
            L153.99 514.502
            L148.047 500.964
            L139.4 444.5
            L130.531 394.952
            L116.016 451.5
            L117.554 472.57
            L112.246 508.3
            L82.0161 508.3
            L59.1815 500.417
            L61.0161 463.78
            L59.5183 412.967
            L58.5161 359
            L46.0161 371
            L38.0161 366
            L42.0161 349
            L42.0161 335
            L48.4454 285.495
            L39.8743 289.645
            L20.6174 278.107
            L5.6096 257.437
            
            Z"
			stroke="var(--color-accent-blue)"
			stroke-width="10"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>
