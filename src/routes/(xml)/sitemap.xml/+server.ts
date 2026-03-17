import { type MdsvexModule, getPostSlug } from '$lib/utils/blog';

export const prerender = true;

const SITE_URL = 'https://florinasutanto.com';

export const GET = async () => {
	const pages = import.meta.glob('/src/routes/**/+page.svelte', { eager: false });

	const staticRoutes = Object.keys(pages)
		.map(
			(path) =>
				path
					.replace('/src/routes', '')
					.replace('/+page.svelte', '')
					.replace(/\/\([^)]+\)/g, '') // strip route groups like (standalone), (xml)
		)
		.filter((route) => !route.includes('[')) // exclude dynamic routes like [slug]
		.map((route) => route || '/') // empty string becomes root
		.sort();

	// Blog posts from markdown files
	const files = import.meta.glob<MdsvexModule>('/content/posts/**/*.md', { eager: true });

	const postUrls = Object.entries(files)
		.map(([path, module]) => {
			const slug = getPostSlug(path, module.metadata);
			const date = module.metadata.date_published
				? new Date(module.metadata.date_published).toISOString().split('T')[0]
				: null;
			return { url: `/blog/${slug}`, date };
		})
		.filter((p) => p.date);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
		.map(
			(route) => `<url>
    <loc>${SITE_URL}${route}</loc>
  </url>`
		)
		.join('\n  ')}
  ${postUrls
		.map(
			(post) => `<url>
    <loc>${SITE_URL}${post.url}</loc>
    <lastmod>${post.date}</lastmod>
  </url>`
		)
		.join('\n  ')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
