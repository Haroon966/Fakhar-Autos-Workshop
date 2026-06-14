/**
 * Generate responsive WebP and JPEG variants for public images.
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const WIDTHS = [640, 960, 1280];
const SKIP_DIRS = new Set(['fonts', '.well-known']);
const IMAGE_EXT = /\.(jpe?g|png)$/i;

function walk(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		if (statSync(full).isDirectory()) {
			if (!SKIP_DIRS.has(entry)) walk(full, files);
		} else if (IMAGE_EXT.test(entry) && !/-\d+w\.(jpe?g|png)$/i.test(entry)) {
			files.push(full);
		}
	}
	return files;
}

let processed = 0;

for (const file of walk(PUBLIC_DIR)) {
	const ext = path.extname(file);
	const base = file.slice(0, -ext.length);

	for (const width of WIDTHS) {
		const webpOut = `${base}-${width}w.webp`;
		const jpegOut = `${base}-${width}w${ext}`;

		const pipeline = sharp(file).resize({ width, withoutEnlargement: true });

		await pipeline.clone().webp({ quality: 82 }).toFile(webpOut);
		if (/\.jpe?g$/i.test(ext)) {
			await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpegOut);
		} else if (/\.png$/i.test(ext)) {
			await pipeline.clone().png({ compressionLevel: 9 }).toFile(jpegOut);
		}
	}

	// Full-size WebP sibling (e.g. image.jpg → image.webp)
	const fullWebp = `${base}.webp`;
	if (!existsSync(fullWebp)) {
		await sharp(file).webp({ quality: 85 }).toFile(fullWebp);
	}

	processed++;
	console.log('Optimized', path.relative(PUBLIC_DIR, file));
}

console.log(`Done: ${processed} source images → ${WIDTHS.length} widths each`);
