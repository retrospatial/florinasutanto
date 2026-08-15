import { render } from 'svelte/server';
import { type MdsvexModule, getPostSlug } from '$lib/utils/blog';

// not prerendered: book reviews come from Hardcover at runtime, so a build-time
// feed would only pick up new ones on a redeploy. the s-maxage below keeps
// Hardcover to roughly one request an hour.
const SITE_URL = 'https://florinasutanto.com';
const SITE_TITLE = 'florina sutanto';
const SITE_DESCRIPTION = 'RSS feed for my blog posts and book reviews';

interface FeedItem {
	title: string;
	link: string;
	desc: string;
	html: string;
	date: Date;
	categories: string[];
}

function hasReview(review: string | null | undefined): boolean {
	return !!review && review.replace(/<[^>]*>/g, '').trim().length > 0;
}

/**
 * Reviewed books, as feed items.
 *
 * Goes through /api/books rather than Hardcover directly so the GraphQL query,
 * the Slate→HTML conversion and the API key all stay in one place. Returns []
 * on any failure — an upstream outage should cost the feed its books, not its
 * posts.
 */
async function bookItems(fetch: typeof globalThis.fetch): Promise<FeedItem[]> {
	try {
		const res = await fetch('/api/books?list=recent');
		if (!res.ok) return [];

		const { books = [] } = await res.json();

		return books
			.filter((book: any) => hasReview(book.review) && book.slug && book.last_read_date)
			.map((book: any) => ({
				title: book.authors ? `${book.title} by ${book.authors}` : book.title,
				link: `${SITE_URL}/bookshelf/${book.slug}`,
				desc: `A book review of ${book.title}.`,
				html: stripStyling(book.review),
				date: new Date(book.last_read_date),
				categories: ['books']
			}))
			.filter((item: FeedItem) => !Number.isNaN(item.date.getTime()));
	} catch {
		return [];
	}
}

function stripStyling(html: string): string {
	return html
		.replace(/\s+class="[^"]*"/g, '')
		.replace(/\s+style="[^"]*"/g, '')
		.replace(/\s+data-[\w-]+(?:="[^"]*")?/g, '')
		.replace(/<\/?span[^>]*>/g, '');
}

export const GET = async ({ fetch }) => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', { eager: true });

	const posts = Object.entries(files)
		.map(([path, module]) => {
			const metadata = module.metadata;
			const slug = getPostSlug(path, metadata);
			const { body } = render(module.default);
			return {
				title: metadata.title ?? '',
				link: `${SITE_URL}/blog/${slug}`,
				desc: metadata.desc ?? '',
				categories: metadata.tags ?? [],
				date: metadata.date_published
					? new Date(new Date(metadata.date_published).toISOString().split('T')[0] + 'T12:00:00Z')
					: null,
				html: stripStyling(body)
			};
		})
		.filter((p): p is FeedItem => p.date !== null);

	const items = [...posts, ...(await bookItems(fetch))].sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
			.map(
				(item) => `<item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.desc}]]></description>
      <content:encoded><![CDATA[${item.html}]]></content:encoded>
      <pubDate>${item.date.toUTCString()}</pubDate>
      ${item.categories.map((category) => `<category>${category}</category>`).join('\n      ')}
    </item>`
			)
			.join('\n    ')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			// one Hardcover call a day; a new review takes up to 24h to reach the feed
			'Cache-Control': 'max-age=0, s-maxage=86400'
		}
	});
};
