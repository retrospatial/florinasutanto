import { WEATHER_API_KEY } from '$env/static/private';

export const GET = async () => {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Cambridge,MA`
	);
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
