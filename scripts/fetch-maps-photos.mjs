import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const MAPS_URL = 'https://maps.app.goo.gl/Y1KWfi8mATbf4S6f7';
const OUT_DIR = path.resolve('public/images/workshop');

mkdirSync(OUT_DIR, { recursive: true });

const savedBuffers = [];
const seenHashes = new Set();

function hash(buf) {
	let h = 0;
	for (let i = 0; i < Math.min(buf.length, 2000); i++) h = (h * 31 + buf[i]) | 0;
	return h;
}

const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

page.on('response', async (response) => {
	try {
		const url = response.url();
		if (!url.includes('googleusercontent.com')) return;
		if (response.request().resourceType() !== 'image') return;
		if (response.status() !== 200) return;
		const buf = Buffer.from(await response.body());
		if (buf.length < 15000) return;
		const h = hash(buf);
		if (seenHashes.has(h)) return;
		seenHashes.add(h);
		savedBuffers.push(buf);
		console.log('Captured', savedBuffers.length, buf.length, url.slice(0, 100));
	} catch {
		/* ignore */
	}
});

await page.goto(MAPS_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(6000);

for (const label of ['Accept all', 'Reject all', 'Accept']) {
	const btn = page.getByRole('button', { name: label });
	if (await btn.count()) {
		try {
			await btn.first().click({ timeout: 2000 });
			await page.waitForTimeout(1500);
		} catch {
			/* ignore */
		}
	}
}

// Open photos
for (const sel of [
	'button[aria-label*="Photos"]',
	'[role="tab"]:has-text("Photos")',
	'button:has-text("Photos")',
]) {
	const el = page.locator(sel).first();
	if (await el.count()) {
		try {
			await el.click({ timeout: 4000 });
			await page.waitForTimeout(3000);
			break;
		} catch {
			/* ignore */
		}
	}
}

// Click thumbnails in grid
const thumbs = page.locator('button[jsaction*="photo"] img, [data-photo-index] img, div[role="listitem"] img');
const count = await thumbs.count();
console.log('Thumbnails', count);
for (let i = 0; i < Math.min(count, 12); i++) {
	try {
		await thumbs.nth(i).click({ timeout: 2000 });
		await page.waitForTimeout(1500);
		await page.keyboard.press('Escape').catch(() => {});
		await page.waitForTimeout(300);
	} catch {
		/* ignore */
	}
}

// Gallery navigation
for (let i = 0; i < 20; i++) {
	await page.keyboard.press('ArrowRight').catch(() => {});
	await page.waitForTimeout(700);
}

await page.waitForTimeout(2000);

let saved = 0;
const files = [];
for (const buf of savedBuffers) {
	if (saved >= 10) break;
	const file = path.join(OUT_DIR, `workshop-${String(saved + 1).padStart(2, '0')}.jpg`);
	writeFileSync(file, buf);
	files.push(`/images/workshop/workshop-${String(saved + 1).padStart(2, '0')}.jpg`);
	saved++;
}

writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify({ mapsUrl: MAPS_URL, files }, null, 2));

await browser.close();
console.log(`Done: ${saved} images saved`);
