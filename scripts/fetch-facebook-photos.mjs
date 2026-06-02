import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const FB_URLS = [
	'https://www.facebook.com/people/Fakhar-Auto-Works/61553234962719/?sk=photos',
	'https://m.facebook.com/people/Fakhar-Auto-Works/61553234962719/?sk=photos',
];

const OUT_DIR = path.resolve('public/images/facebook');
mkdirSync(OUT_DIR, { recursive: true });

const savedBuffers = [];
const seenHashes = new Set();

function hash(buf) {
	let h = 0;
	for (let i = 0; i < Math.min(buf.length, 4000); i++) h = (h * 31 + buf[i]) | 0;
	return h;
}

function isPhotoBuffer(buf) {
	if (buf.length < 8000) return false;
	if (buf[0] === 0xff && buf[1] === 0xd8) return true;
	if (buf[0] === 0x89 && buf[1] === 0x50) return true; // png
	if (buf.slice(0, 4).toString() === 'RIFF') return true; // webp
	return false;
}

function isPhotoUrl(url) {
	if (!url.includes('fbcdn.net') && !url.includes('facebook.com')) return false;
	if (url.includes('emoji') || url.includes('/rsrc/')) return false;
	if (/p(16|20|24|32|40|50)x(16|20|24|32|40|50)/.test(url)) return false;
	if (url.includes('safe_image') && url.includes('w=32')) return false;
	return url.includes('scontent') || url.includes('/v/t39.') || url.includes('/v/t31.');
}

async function addBuffer(buf, url, label) {
	if (!isPhotoBuffer(buf)) return false;
	const h = hash(buf);
	if (seenHashes.has(h)) return false;
	seenHashes.add(h);
	savedBuffers.push({ buf, url });
	console.log(label, savedBuffers.length, buf.length, url?.slice(0, 85));
	return true;
}

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const context = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
});

for (const fbUrl of FB_URLS) {
	const page = await context.newPage();

	page.on('response', async (response) => {
		try {
			const url = response.url();
			if (!isPhotoUrl(url)) return;
			if (response.request().resourceType() !== 'image') return;
			if (response.status() !== 200) return;
			const buf = Buffer.from(await response.body());
			await addBuffer(buf, url, 'Net');
		} catch {
			/* ignore */
		}
	});

	console.log('Loading', fbUrl);
	await page.goto(fbUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
	await page.waitForTimeout(4000);

	for (const label of ['Allow all cookies', 'Accept All', 'Only allow essential cookies', 'Close']) {
		const btn = page.getByRole('button', { name: label });
		if (await btn.count()) {
			try {
				await btn.first().click({ timeout: 2000 });
				await page.waitForTimeout(1000);
			} catch {
				/* ignore */
			}
		}
	}

	for (let i = 0; i < 15; i++) {
		await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.9));
		await page.waitForTimeout(1200);
	}

	const domUrls = await page.evaluate(() => {
		const urls = new Set();
		const add = (src) => {
			if (src && (src.includes('fbcdn') || src.includes('scontent'))) urls.add(src);
		};
		document.querySelectorAll('img').forEach((img) => {
			add(img.currentSrc || img.src);
			add(img.getAttribute('data-src'));
		});
		document.querySelectorAll('[style*="background-image"]').forEach((el) => {
			const m = el.style.backgroundImage.match(/url\(["']?([^"')]+)/);
			if (m) add(m[1]);
		});
		return [...urls];
	});

	console.log('DOM urls', domUrls.length);

	for (const url of domUrls) {
		if (!isPhotoUrl(url)) continue;
		try {
			const res = await page.request.get(url, {
				headers: { Referer: 'https://www.facebook.com/' },
			});
			if (!res.ok()) continue;
			const buf = Buffer.from(await res.body());
			await addBuffer(buf, url, 'DOM');
		} catch {
			/* ignore */
		}
	}

	// Click photo links to open lightbox
	const photoLinks = page.locator('a[href*="/photo"], a[href*="fbid="]');
	const linkCount = await photoLinks.count();
	console.log('Photo links', linkCount);
	for (let i = 0; i < Math.min(linkCount, 8); i++) {
		try {
			await photoLinks.nth(i).click({ timeout: 2000 });
			await page.waitForTimeout(2000);
			await page.keyboard.press('Escape').catch(() => {});
		} catch {
			/* ignore */
		}
	}

	await page.close();
}

savedBuffers.sort((a, b) => b.buf.length - a.buf.length);

const files = [];
let saved = 0;
for (const { buf } of savedBuffers) {
	if (saved >= 20) break;
	const ext = buf[0] === 0x89 ? 'png' : buf.slice(0, 4).toString() === 'RIFF' ? 'webp' : 'jpg';
	const file = path.join(OUT_DIR, `fb-${String(saved + 1).padStart(2, '0')}.${ext}`);
	writeFileSync(file, buf);
	files.push(`/images/facebook/fb-${String(saved + 1).padStart(2, '0')}.${ext}`);
	saved++;
}

writeFileSync(
	path.join(OUT_DIR, 'manifest.json'),
	JSON.stringify({ source: FB_URLS[0], count: saved, files }, null, 2),
);

await browser.close();
console.log(`Done: ${saved} images`);
