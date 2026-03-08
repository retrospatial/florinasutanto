export function isVideo(src?: string) {
	return !!src && /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

export function lazyVideo(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				const video = node as HTMLVideoElement;
				const source = video.querySelector('source');
				if (source?.dataset.src) {
					source.src = source.dataset.src;
					video.load();
				}
				observer.disconnect();
			}
		},
		{ rootMargin: '200px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
