import { HARDCOVER_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const MAX_ATTEMPTS = 4;
const NO_CACHE = { 'cache-control': 'no-store' };

const book_fields = `
	title
	slug
	release_date
	contributions {
		author {
			name
		}
	}
	image {
		url
	}
`;

// a book's own image can be null while the edition the user shelved has a cover,
// so every query pulls the edition image to fall back on
const edition_fields = `
	edition {
		image {
			url
		}
	}
`;

function slateToHtml(nodes: any[]): string {
	if (!nodes || !Array.isArray(nodes)) return '';
	return nodes
		.map((node) => {
			if (node.text !== undefined) {
				let text = node.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
				if (node.bold) text = `<strong>${text}</strong>`;
				if (node.italic) text = `<em>${text}</em>`;
				if (node.underline) text = `<u>${text}</u>`;
				if (node.strikethrough) text = `<s>${text}</s>`;
				return text;
			}
			const children = slateToHtml(node.children);
			switch (node.type) {
				case 'paragraph':
					return `<p>${children}</p>`;
				case 'block-quote':
					return `<blockquote>${children}</blockquote>`;
				case 'bulleted-list':
					return `<ul>${children}</ul>`;
				case 'numbered-list':
					return `<ol>${children}</ol>`;
				case 'list-item':
					return `<li>${children}</li>`;
				case 'link':
					return `<a href="${node.url}">${children}</a>`;
				case 'heading-one':
					return `<h1>${children}</h1>`;
				case 'heading-two':
					return `<h2>${children}</h2>`;
				default:
					return children;
			}
		})
		.join('');
}

function mapBookData(item: any, hasRating: boolean = true) {
	const slate = item.review_slate;
	let reviewHtml: string | null = null;
	if (slate) {
		try {
			const parsed = typeof slate === 'string' ? JSON.parse(slate) : slate;
			const nodes = parsed?.document?.children ?? parsed;
			reviewHtml = Array.isArray(nodes) ? slateToHtml(nodes) : null;
		} catch {
			reviewHtml = null;
		}
	}

	return {
		title: item.book.title,
		slug: item.book.slug ?? null,
		pages: item.book.pages,
		release_date: item.book.release_date,
		last_read_date: item.user_book_reads?.[0]?.finished_at || item.date_added,
		authors: item.book.contributions?.map((c: any) => c.author.name).join(', ') || 'Unknown',
		rating: hasRating ? item.rating : null,
		dnf: item.status_id === 5,
		review: reviewHtml,
		reviewed_at: item.reviewed_at ?? null,
		image: item.book.image?.url ?? item.edition?.image?.url,
		url: item.book.slug ? `https://hardcover.app/books/${item.book.slug}` : null
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const listType = url.searchParams.get('list') || 'recent';
	const slug = url.searchParams.get('slug');

	let books_query: string;

	if (slug) {
		// single read book looked up by its hardcover slug — powers /bookshelf/[slug]
		books_query = `
			{
				user_books(
					where: {
						user_id: {_eq: 67914},
						book: {slug: {_eq: ${JSON.stringify(slug)}}}
					},
					limit: 1
				) {
					rating
					review_slate
					date_added
					last_read_date
					user_book_reads(order_by: {finished_at: desc}, limit: 1) {
						finished_at
					}
					book {
						${book_fields}
					}
					${edition_fields}
				}
			}
		`;
	} else if (listType === 'favorite') {
		// query for site-favorite list
		books_query = `
			{
				lists(
					where: {
						user_id: {_eq: 67914},
						slug: {_eq: "site-favorite"}
					}
				) {
					id
					slug
					name
					list_books(limit: 3, order_by: {date_added: desc}) {
						book {
							${book_fields}
						}
						${edition_fields}
					}
				}
			}
		`;
	} else if (listType === 'currently-reading') {
		// query for currently reading books (status id = 2)
		books_query = `
			{
				user_books(
					where: {
						user_id: {_eq: 67914},
						status_id: {_eq: 2}
					},
					order_by: {date_added: desc}
				) {
					rating
					review_slate
		date_added
					book {
						${book_fields}
					}
					${edition_fields}
				}
			}
		`;
	} else {
		// query for read (status id = 3) and did-not-finish (status id = 5) books
		books_query = `
			{
				user_books(
					where: {
						user_id: {_eq: 67914},
						status_id: {_in: [3, 5]}
					},
					order_by: {date_added: desc}
				) {
					book_id
					status_id
					rating
					review_slate
					reviewed_at
					date_added
					last_read_date
					user_book_reads(order_by: {finished_at: desc}, limit: 1) {
						finished_at
					}
					book {
						${book_fields}
					}
					${edition_fields}
				}
				# hardcover has no dnf date field, so take it from when the status changed to dnf
				dnf_activities: activities(
					where: {
						user_id: {_eq: 67914},
						event: {_eq: "UserBookActivity"},
						data: {_contains: {userBook: {statusId: 5}}}
					},
					order_by: {created_at: desc}
				) {
					book_id
					created_at
				}
			}
		`;
	}

	async function requestBooks(attempt = 1): Promise<any> {
		const response = await fetch('https://api.hardcover.app/v1/graphql', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${HARDCOVER_API_KEY}`
			},
			body: JSON.stringify({
				query: books_query
			})
		});

		if (!response.ok) {
			if (attempt < MAX_ATTEMPTS) {
				await new Promise((resolve) => setTimeout(resolve, attempt * 400));
				return requestBooks(attempt + 1);
			}
			throw new Error(`hardcover responded ${response.status} after ${attempt} attempts`);
		}

		return response.json();
	}

	try {
		const result = await requestBooks();

		if (result.errors) {
			console.error('GraphQL errors:', result.errors);
			return json({ error: 'Failed to fetch books' }, { status: 500, headers: NO_CACHE });
		}

		let books = [];

		if (listType === 'favorite' && result.data?.lists?.[0]?.list_books) {
			books = result.data.lists[0].list_books.map((item: any) => mapBookData(item, false));
		} else if (result.data?.user_books) {
			const dnfDates = new Map<number, string>();
			for (const activity of result.data.dnf_activities ?? []) {
				if (!dnfDates.has(activity.book_id)) dnfDates.set(activity.book_id, activity.created_at);
			}

			books = result.data.user_books.map((item: any) => {
				const book = mapBookData(item, true);
				const dnfDate = book.dnf && dnfDates.get(item.book_id);
				return dnfDate ? { ...book, last_read_date: dnfDate } : book;
			});
			books.sort(
				(a: any, b: any) =>
					new Date(b.last_read_date).getTime() - new Date(a.last_read_date).getTime()
			);
		}

		if (!books.length) {
			return json({ books }, { headers: NO_CACHE });
		}

		return json({ books }, { headers: { 'cache-control': 'public, max-age=0, s-maxage=86400' } });
	} catch (error) {
		console.error('Failed to fetch books:', error);
		return json({ error: 'Failed to fetch books' }, { status: 500, headers: NO_CACHE });
	}
};
