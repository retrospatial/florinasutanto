/**
 * Generates 1-bit ordered-dithered copies of images, in night/bone.
 *
 *   pnpm dither                                          # concert posters (default)
 *   pnpm dither static/assets/images/archive             # a folder, recursively
 *   pnpm dither static/assets/images/random/italy.png    # one image
 *   pnpm dither --width=900 static/assets/images/me      # bigger, if it renders large
 *
 * Writes `<name>-dither.png` next to each source and skips anything already up to
 * date. Sources are left untouched.
 */

import { execFile } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';

import { promisify } from 'node:util';

const run = promisify(execFile);

const DEFAULT_DIRS = ['static/assets/images/concerts'];
const DEFAULT_WIDTH = 440;
const SOURCE_EXT = /\.(webp|png|jpe?g|avif)$/i;
const SUFFIX = '-dither.png';

const args = process.argv.slice(2);
const width = Number(args.find((a) => a.startsWith('--width='))?.split('=')[1]) || DEFAULT_WIDTH;
const dirs = args.filter((a) => !a.startsWith('--'));
const targets = dirs.length ? dirs : DEFAULT_DIRS;

const DARK = '#181818'; // --color-night
const LIGHT = '#d7d3c7'; // --color-bone

const isSource = (name) => SOURCE_EXT.test(name) && !name.endsWith(SUFFIX);

/** expand a target into image paths — a single file stays as-is, a folder recurses */
async function collect(target) {
	if ((await stat(target)).isFile()) return isSource(target) ? [target] : [];

	const found = [];

	for (const entry of await readdir(target, { withFileTypes: true })) {
		const path = join(target, entry.name);

		if (entry.isDirectory()) found.push(...(await collect(path)));
		else if (isSource(entry.name)) found.push(path);
	}

	return found;
}

/** skip work when the dithered copy is already newer than its source */
async function isStale(source, output) {
	try {
		const [a, b] = await Promise.all([stat(source), stat(output)]);
		return a.mtimeMs > b.mtimeMs;
	} catch {
		return true; // no output yet
	}
}

async function dither(source) {
	const output = join(dirname(source), basename(source, extname(source)) + SUFFIX);

	if (!(await isStale(source, output))) return null;

	await run('magick', [
		source,
		'-colorspace',
		'Gray',
		// close to rendered size (~220 CSS px at 2x DPR): a 1-bit image downscaled
		// hard just averages its dots back into smooth grey. pass --width for
		// somewhere the image renders larger
		'-resize',
		`${width}x`,
		'-normalize',
		'-ordered-dither',
		'o4x4',
		'-colorspace',
		'sRGB',
		'+level-colors',
		`${DARK},${LIGHT}`,
		output
	]);

	return output;
}

try {
	await run('magick', ['-version']);
} catch {
	console.error('dither: ImageMagick not found — `brew install imagemagick`');
	process.exit(1);
}

const sources = (await Promise.all(targets.map(collect))).flat();
const written = (await Promise.all(sources.map(dither))).filter(Boolean);

console.log(
	written.length
		? `dither: wrote ${written.length} of ${sources.length}\n  ${written.join('\n  ')}`
		: `dither: all ${sources.length} images up to date`
);
