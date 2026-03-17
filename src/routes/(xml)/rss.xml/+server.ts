import { render } from 'svelte/server';
import { type MdsvexModule, getPostSlug } from '$lib/utils/blog';

export const prerender = true;

const SITE_URL = 'https://florinasutanto.com';
const SITE_TITLE = 'florina sutanto';
const SITE_DESCRIPTION = 'RSS feed for my blog posts';

function stripStyling(html: string): string {
	return html
		.replace(/\s+class="[^"]*"/g, '')
		.replace(/\s+style="[^"]*"/g, '')
		.replace(/\s+data-[\w-]+(?:="[^"]*")?/g, '')
		.replace(/<\/?span[^>]*>/g, '');
}

export const GET = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', { eager: true });

	const posts = Object.entries(files)
		.map(([path, module]) => {
			const metadata = module.metadata;
			const slug = getPostSlug(path, metadata);
			const { body } = render(module.default);
			return {
				slug,
				title: metadata.title ?? '',
				desc: metadata.desc ?? '',
				tags: metadata.tags ?? [],
				date: metadata.date_published
					? new Date(new Date(metadata.date_published).toISOString().split('T')[0] + 'T12:00:00Z')
					: null,
				html: stripStyling(body)
			};
		})
		.filter((p) => p.date)
		.sort((a, b) => b.date!.getTime() - a.date!.getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
			.map(
				(post) => `<item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.desc}]]></description>
      <content:encoded><![CDATA[${post.html}]]></content:encoded>
      <pubDate>${post.date!.toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
			)
			.join('\n    ')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
