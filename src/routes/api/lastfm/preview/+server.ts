import { json } from '@sveltejs/kit';

const ITUNES_BASE = 'https://itunes.apple.com';

const clean = (s: string) =>
	s.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

function trackNameMatches(itunesName: string, nameLower: string, originalName: string): boolean {
	const rt = clean(itunesName);
	if (!rt) return false;
	if (rt === nameLower || rt.includes(nameLower) || nameLower.includes(rt)) return true;
	// Handle censored names like "F**k" matching "Fuck"
	if (itunesName.includes('*')) {
		try {
			const pattern =
				'^' +
				itunesName
					.split(/\*+/)
					.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
					.join('\\w*') +
				'$';
			return new RegExp(pattern, 'i').test(originalName);
		} catch {
			return false;
		}
	}
	return false;
}

function bestMatch(results: any[], nameLower: string, originalName: string): any | null {
	const matches = results.filter((r) => trackNameMatches(r.trackName ?? '', nameLower, originalName));
	if (!matches.length) return null;
	// Prefer exact match, then shortest name (avoids "(iTunes Originals Version)" etc.)
	matches.sort((a, b) => {
		const ca = clean(a.trackName ?? '');
		const cb = clean(b.trackName ?? '');
		if (ca === nameLower && cb !== nameLower) return -1;
		if (cb === nameLower && ca !== nameLower) return 1;
		return ca.length - cb.length;
	});
	return matches[0];
}

export async function GET({ url, fetch }) {
	const track = url.searchParams.get('track') ?? '';
	const artist = url.searchParams.get('artist') ?? '';
	if (!track || !artist) return json({ previewUrl: null });

	try {
		const nameLower = clean(track);

		// Step 1: get artist ID
		const artistRes = await fetch(
			`${ITUNES_BASE}/search?${new URLSearchParams({ term: artist, entity: 'musicArtist', limit: '1' })}`
		);
		if (!artistRes.ok) return json({ previewUrl: null });
		const artistData = await artistRes.json();
		const artistId = artistData?.results?.[0]?.artistId;
		if (!artistId) return json({ previewUrl: null });

		// Step 2: get full catalog for that artist
		const catalogRes = await fetch(
			`${ITUNES_BASE}/lookup?${new URLSearchParams({ id: String(artistId), entity: 'song', limit: '200' })}`
		);
		if (!catalogRes.ok) return json({ previewUrl: null });
		const catalogData = await catalogRes.json();
		const songs = (catalogData?.results ?? []).filter((r: any) => r.wrapperType === 'track');

		const match = bestMatch(songs, nameLower, track);

		return json(
			{ previewUrl: match?.previewUrl ?? null },
			{ headers: { 'cache-control': 'public, max-age=86400' } }
		);
	} catch {
		return json({ previewUrl: null });
	}
}
