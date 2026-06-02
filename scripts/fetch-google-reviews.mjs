/**
 * Fetch Google Maps reviews for Fakhar Auto Workshop.
 * Requires: npm install google-maps-review-scraper
 *
 * Usage: node scripts/fetch-google-reviews.mjs
 */
import { scraper } from 'google-maps-review-scraper';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const MAPS_PLACE_URL =
	'https://www.google.com/maps/place/Fakhar+Auto+work+shop/@33.6836888,72.9911038,17z/data=!4m8!3m7!1s0x38dfbdf225f5e093:0xe3dc2b1542aa3611!8m2!3d33.6836888!4d72.9911038!16s%2Fg%2F11v0q8xqzv';
const OUT_JSON = path.resolve('src/data/google-reviews.json');

function formatReviewDate(published) {
	if (!published) return undefined;
	const ms = Number(String(published).slice(0, 13));
	if (!Number.isFinite(ms)) return undefined;
	return new Date(ms).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function toSiteReview(r) {
	const date = formatReviewDate(r.time?.published);
	return {
		quote: r.review.text.trim(),
		name: r.author.name,
		role: date ? `Google review · ${date}` : 'Google review',
		rating: r.review.rating ?? 5,
		source: 'Google',
	};
}

mkdirSync(path.dirname(OUT_JSON), { recursive: true });

console.log('Fetching reviews from Google Maps…');
const raw = await scraper(MAPS_PLACE_URL, { clean: true, pages: 'max' });

if (!Array.isArray(raw) || raw.length === 0) {
	console.error('No reviews returned. Check the Maps URL or try again later.');
	process.exit(1);
}

const reviews = raw.filter((r) => r.review?.text?.trim()).map(toSiteReview);

writeFileSync(OUT_JSON, JSON.stringify(reviews, null, 2), 'utf8');
console.log(`Saved ${reviews.length} reviews to ${OUT_JSON}`);
