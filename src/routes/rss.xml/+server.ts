export const prerender = true;

const SITE_URL = 'https://florinasutanto.com';
const SITE_TITLE = 'florina sutanto';
const SITE_DESCRIPTION = 'RSS feed for my blog posts';

interface PostMetadata {
	title?: string;
	desc?: string;
	tags?: string[];
	date?: string;
	slug?: string;
}

interface MdsvexModule {
	default: unknown;
	metadata: PostMetadata;
}

export const GET = async () => {
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', { eager: true });

	const posts = Object.entries(files)
		.map(([path, module]) => {
			const metadata = module.metadata;
			const fileSlug = path.replace('/content/posts/', '').replace('.md', '');
			const year = metadata.date ? new Date(metadata.date).getFullYear() : null;
			const slug = metadata.slug ? (year ? `${year}/${metadata.slug}` : metadata.slug) : fileSlug;
			return {
				slug,
				title: metadata.title ?? '',
				desc: metadata.desc ?? '',
				tags: metadata.tags ?? [],
				date: metadata.date ? new Date(metadata.date) : null
			};
		})
		.filter((p) => p.date)
		.sort((a, b) => b.date!.getTime() - a.date!.getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
