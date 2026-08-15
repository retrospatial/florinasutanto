import { error } from '@sveltejs/kit';

// books come from the hardcover api at request time, so there are no build-time entries
export const prerender = false;

function hasReview(review: string | null | undefined): boolean {
	return !!review && review.replace(/<[^>]*>/g, '').trim().length > 0;
}

export const load = async ({ params, fetch, setHeaders }) => {
	const response = await fetch(`/api/books?slug=${encodeURIComponent(params.slug)}`);

	if (!response.ok) throw error(500, 'Could not reach the bookshelf right now');

	const result = await response.json();
	const book = result.books?.[0];

	if (!book || !hasReview(book.review)) throw error(404, 'No review for that book');

	setHeaders({ 'cache-control': 'max-age=0, s-maxage=3600' });

	return { book };
};
