import { json, error } from '@sveltejs/kit';
import { LASTFM_API_KEY, LASTFM_USER } from '$env/static/private';

const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/';

export async function GET({ url, fetch }) {
	const user = url.searchParams.get('user') ?? LASTFM_USER;
	if (!user) throw error(400, 'Missing user');

	const params = new URLSearchParams({
		method: 'user.gettoptracks',
		user,
		period: '7day',
		limit: '3',
		api_key: LASTFM_API_KEY,
		format: 'json'
	});

	const res = await fetch(`${LASTFM_BASE}?${params}`);
	if (!res.ok) throw error(res.status, 'Last.fm request failed');

	const data = await res.json();

	const tracks = (data?.toptracks?.track ?? []).slice(0, 3).map((t: any) => ({
		name: t.name,
		artist: t.artist?.name ?? t.artist?.['#text'],
		playcount: Number(t.playcount ?? 0),
		url: t.url,
		image: null
	}));

	return json(
		{ user, period: '7day', tracks },
		{ headers: { 'cache-control': 'public, max-age=300' } }
	);
}
