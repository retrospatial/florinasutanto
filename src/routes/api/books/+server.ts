import { HARDCOVER_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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
		pages: item.book.pages,
		release_date: item.book.release_date,
		last_read_date: item.user_book_reads?.[0]?.finished_at || item.date_added,
		authors: item.book.contributions?.map((c: any) => c.author.name).join(', ') || 'Unknown',
		rating: hasRating ? item.rating : null,
		review: reviewHtml,
		image: item.book.image?.url,
		url: item.book.slug ? `https://hardcover.app/books/${item.book.slug}` : null
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const listType = url.searchParams.get('list') || 'recent';

	let books_query;

	if (listType === 'favorite') {
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
				}
			}
		`;
	} else {
		// query for recently read books (status id = 3)
		books_query = `
			{
				user_books(
					where: {
						user_id: {_eq: 67914},
						status_id: {_eq: 3}
					},
					order_by: {date_added: desc}
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
				}
			}
		`;
	}

	try {
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

		const result = await response.json();

		if (result.errors) {
			console.error('GraphQL errors:', result.errors);
			return json({ error: 'Failed to fetch books' }, { status: 500 });
		}

		let books = [];

		if (listType === 'favorite' && result.data?.lists?.[0]?.list_books) {
			books = result.data.lists[0].list_books.map((item: any) => mapBookData(item, false));
		} else if (result.data?.user_books) {
			books = result.data.user_books.map((item: any) => mapBookData(item, true));
		}

		return json({ books });
	} catch (error) {
		return json({ error: 'Failed to fetch books' }, { status: 500 });
	}
};
