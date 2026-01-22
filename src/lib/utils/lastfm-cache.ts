const CACHE_KEY = 'lastfm-covers-v2';
const CACHE_DURATION = 1000 * 60 * 5;

interface CachedCover {
	image: string | null;
	timestamp: number;
}

export function getCachedCover(track: string, artist: string): string | null | undefined {
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

export function setCachedCover(track: string, artist: string, image: string | null) {
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
