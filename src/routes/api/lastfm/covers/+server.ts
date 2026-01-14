import { json } from '@sveltejs/kit';
import { DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET } from '$env/static/private';

const DISCOGS_BASE = 'https://api.discogs.com';

async function getCoverArt(track: string, artist: string, fetch: typeof global.fetch) {
	try {
		const searchParams = new URLSearchParams({
			q: `${artist} ${track}`,
			type: 'release',
			per_page: '5',
			key: DISCOGS_CONSUMER_KEY,
			secret: DISCOGS_CONSUMER_SECRET
		});

		console.log(`Searching Discogs for: ${artist} - ${track}`);

		const searchRes = await fetch(`${DISCOGS_BASE}/database/search?${searchParams}`, {
			headers: {
				'User-Agent': 'personal-site/1.0 (florinasutanto@gmail.com)'
			}
		});

		if (!searchRes.ok) {
			console.log(`Discogs search failed: ${searchRes.status}`);
			return null;
		}

		const searchData = await searchRes.json();
		const results = searchData?.results ?? [];

		console.log(`Found ${results.length} results on Discogs`);

		for (const result of results) {
			if (result.cover_image && result.cover_image !== '') {
				console.log(`✓ Cover art found: ${result.title}`);
				return result.cover_image;
			}

			if (result.thumb && result.thumb !== '') {
				console.log(`✓ Cover art (thumb) found: ${result.title}`);
				return result.thumb;
			}
		}

		console.log(`❌ No cover art found for "${artist} - ${track}"`);
		return null;
	} catch (err) {
		console.error(`Cover art error for ${artist} - ${track}:`, err);
		return null;
	}
}

export async function GET({ url, fetch }) {
	const track = url.searchParams.get('track');
	const artist = url.searchParams.get('artist');

	if (!track || !artist) {
		return json({ image: null });
	}

	const image = await getCoverArt(track, artist, fetch);

	return json({ image }, { headers: { 'cache-control': 'public, max-age=3600' } });
}
