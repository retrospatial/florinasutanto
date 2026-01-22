import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = 'src/lib/assets';
const OUTPUT_DIR = 'src/lib/assets';

const FORMATS = ['webp', 'avif'];
const QUALITY = { webp: 80, avif: 65 };

async function optimizeImages() {
	const files = await readdir(INPUT_DIR);
	const images = files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

	console.log(`Found ${images.length} images to optimize...\n`);

	for (const image of images) {
		const inputPath = join(INPUT_DIR, image);
		const { name } = parse(image);

		for (const format of FORMATS) {
			const outputPath = join(OUTPUT_DIR, `${name}.${format}`);

			// Skip if already exists
			if (existsSync(outputPath)) {
				console.log(`  ⏭ ${name}.${format} (exists)`);
				continue;
			}

			await sharp(inputPath)[format]({ quality: QUALITY[format] }).toFile(outputPath);

			console.log(`  ✓ ${name}.${format}`);
		}
	}

	console.log('\nDone!');
}

optimizeImages().catch(console.error);
