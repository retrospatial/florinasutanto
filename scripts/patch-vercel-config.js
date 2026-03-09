import { readFileSync, writeFileSync } from 'fs';

const configPath = '.vercel/output/config.json';
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const rewrites = [
	{ src: '^/animorphs$', dest: 'https://retrospatial.github.io/animorphs/' },
	{ src: '^/animorphs/(.*)$', dest: 'https://retrospatial.github.io/animorphs/$1' },
	{ src: '^/tumblr-fandometrics$', dest: 'https://retrospatial.github.io/tumblr-fandometrics/' },
	{
		src: '^/tumblr-fandometrics/(.*)$',
		dest: 'https://retrospatial.github.io/tumblr-fandometrics/$1'
	},
	{ src: '^/buffy-podcasts$', dest: 'https://retrospatial.github.io/buffy-podcasts/' },
	{ src: '^/buffy-podcasts/(.*)$', dest: 'https://retrospatial.github.io/buffy-podcasts/$1' }
];

// Insert rewrites just before the catch-all route ("/.*")
const catchAllIndex = config.routes.findIndex((r) => r.src === '/.*');
if (catchAllIndex !== -1) {
	config.routes.splice(catchAllIndex, 0, ...rewrites);
	console.log(`Inserted ${rewrites.length} rewrite routes before catch-all`);
} else {
	config.routes.push(...rewrites);
	console.log(`Appended ${rewrites.length} rewrite routes (no catch-all found)`);
}

writeFileSync(configPath, JSON.stringify(config, null, '\t'));
