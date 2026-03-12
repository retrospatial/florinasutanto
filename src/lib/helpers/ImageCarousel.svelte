<script lang="ts">
	import Image from '$lib/helpers/Image.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		images: { src: string; alt: string }[];
		class?: ClassValue;
		style?: string;
		currentIndex?: number;
	}

	let { images, class: classes = '', style = '', currentIndex = $bindable(0) }: Props = $props();

	let position = $state(1);
	let dragOffset = $state(0);
	let dragging = $state(false);
	let animating = $state(true);

	let startX = 0;
	let containerWidth = 0;
	let slider: HTMLDivElement;

	const slides = $derived([images[images.length - 1], ...images, images[0]]);
	const isRealPosition = $derived(position >= 1 && position <= images.length);

	function goToPosition(next: number) {
		animating = true;
		position = next;
	}

	function moveBy(step: number) {
		goToPosition(position + step);
	}

	// carousel position -> parent currentIndex
	$effect(() => {
		if (isRealPosition) {
			currentIndex = position - 1;
		}
	});

	// parent currentIndex -> carousel position
	$effect(() => {
		const nextPosition = currentIndex + 1;

		if (isRealPosition && nextPosition !== position) {
			goToPosition(nextPosition);
		}
	});

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		animating = false;
		startX = e.clientX;
		containerWidth = slider.offsetWidth;
		slider.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		dragOffset = e.clientX - startX;
	}

	function onPointerUp() {
		if (!dragging) return;

		dragging = false;
		const threshold = containerWidth * 0.2;

		if (dragOffset < -threshold) moveBy(1);
		else if (dragOffset > threshold) moveBy(-1);
		else animating = true;

		dragOffset = 0;
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') moveBy(1);
		if (e.key === 'ArrowLeft') moveBy(-1);
	}

	function onTransitionEnd() {
		let resetTo: number | null = null;

		if (position === 0) resetTo = images.length;
		else if (position === slides.length - 1) resetTo = 1;

		if (resetTo === null) return;

		animating = false;
		position = resetTo;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				animating = true;
			});
		});
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative overflow-hidden cursor-grab select-none {classes}"
	{style}
	class:cursor-grabbing={dragging}
	bind:this={slider}
	tabindex="0"
	role="listbox"
	aria-label="Image carousel"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onkeydown={onKeyDown}
>
	<div
		class="flex h-full"
		class:transition-transform={animating}
		class:duration-300={animating}
		class:ease-out={animating}
		style="transform: translateX(calc({-position * 100}% + {dragOffset}px))"
		ontransitionend={onTransitionEnd}
	>
		{#each slides as img, i}
			<div class="h-full w-full shrink-0">
				<Image
					src={img.src}
					alt={img.alt}
					class="pointer-events-none h-full w-full object-cover object-[center_30%]"
					lazy={i > 1}
				/>
			</div>
		{/each}
	</div>
</div>
