import { readFileSync, writeFileSync } from 'fs';

const configPath = '.vercel/output/config.json';
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const slugs = ['animorphs', 'tumblr-fandometrics', 'buffy-podcasts', 'html-comment-box-demo'];

const rewrites = slugs.flatMap((slug) => [
	{ src: `^/${slug}$`, headers: { Location: `/${slug}/` }, status: 308 },
	{ src: `^/${slug}/(.*)$`, dest: `https://retrospatial.github.io/${slug}/$1` }
]);

const catchAllIndex = config.routes.findIndex((r) => r.src === '/.*');
if (catchAllIndex !== -1) {
	config.routes.splice(catchAllIndex, 0, ...rewrites);
	console.log(`Inserted ${rewrites.length} rewrite routes before catch-all`);
} else {
	config.routes.push(...rewrites);
	console.log(`Appended ${rewrites.length} rewrite routes (no catch-all found)`);
}

writeFileSync(configPath, JSON.stringify(config, null, '\t'));
