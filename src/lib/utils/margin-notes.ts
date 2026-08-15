const XL = 1280;

export function marginNotes(node: HTMLElement) {
	function place() {
		const wide = window.innerWidth >= XL;

		const notes = [...node.querySelectorAll<HTMLElement>('aside')];
		if (!notes.length) return;

		const markers = [...node.querySelectorAll<HTMLElement>('.aside-marker')].filter(
			(marker) => !marker.closest('aside')
		);

		const base = wide ? node.getBoundingClientRect().top : 0;

		notes.forEach((note, i) => {
			const marker = markers[i];

			if (!wide || !marker) {
				note.style.top = '';
				return;
			}

			note.style.top = `${marker.getBoundingClientRect().top - base}px`;
		});
	}

	let frame = 0;
	function schedule() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(place);
	}

	place();

	const observer = new ResizeObserver(schedule);
	observer.observe(node);
	window.addEventListener('resize', schedule);

	document.fonts?.ready.then(place);

	return {
		destroy() {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('resize', schedule);
		}
	};
}
