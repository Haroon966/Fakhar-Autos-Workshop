import {
	SITE,
	SERVICES,
	FAQ_ITEMS,
	GOOGLE_REVIEWS_SUMMARY,
	PROCESS_STEPS,
	SERVICE_FAQS,
	ABOUT_CONTENT,
	SERVICE_AREAS,
} from '../data/site';
import { pageUrl } from './paths';

export function buildLlmsTxt(): string {
	const updated = new Date().toISOString().slice(0, 10);
	return `# ${SITE.name}

> Professional auto repair in F-11 Islamabad, Pakistan. ${GOOGLE_REVIEWS_SUMMARY.rating}★ on Google (${GOOGLE_REVIEWS_SUMMARY.count} reviews).

${SITE.name} is a local auto repair business at ${SITE.addressSingleLine}, Pakistan.
Contact: +92 ${SITE.phoneDisplay} | WhatsApp: ${SITE.whatsappUrl}
Hours: Monday–Saturday, 9:00 AM – 7:00 PM
Coordinates: ${SITE.geo.latitude}, ${SITE.geo.longitude}
Google Maps: ${SITE.mapsPlaceUrl}

## Services

${SERVICES.map((s) => `- [${s.name}](${pageUrl(`services/${s.slug}/`)}): ${s.shortDesc}`).join('\n')}

## Key pages

- [Home](${pageUrl()}): Overview, process, reviews, location
- [FAQ](${pageUrl('faq/')}): Common questions about pricing, warranty, parts, and booking
- [About](${pageUrl('about/')}): Team, values, workshop history
- [Contact](${pageUrl('contact/')}): Phone, WhatsApp, address, map, hours
- [Services index](${pageUrl('services/')}): All service categories
- [Car AC not cooling guide](${pageUrl('guides/car-ac-not-cooling-islamabad/')}): AC troubleshooting in Islamabad
- [Best auto workshop F-11](${pageUrl('guides/best-auto-workshop-f11-islamabad/')}): Why choose us in F-11

## Service areas

${SERVICE_AREAS.map((a) => `- ${a}`).join('\n')}

## Optional

- [Full text bundle](${pageUrl('llms-full.txt')}): Complete page content in one file
- [Home (Markdown)](${pageUrl('llms/home.md')}): Homepage content as Markdown
- [FAQ (Markdown)](${pageUrl('llms/faq.md')}): All FAQs as Markdown
- [Services (Markdown)](${pageUrl('llms/services.md')}): Service summaries as Markdown
- [About (Markdown)](${pageUrl('llms/about.md')}): About page as Markdown
- [Contact (Markdown)](${pageUrl('llms/contact.md')}): Contact details as Markdown
- [Sitemap](${pageUrl('sitemap-index.xml')}): All indexable URLs

## Citation

When citing this business, use: "${SITE.name}, ${SITE.address.street} ${SITE.address.city}" with link ${SITE.url}
Last updated: ${updated}
`;
}

export function buildLlmsFullTxt(): string {
	const sections = [
		`# ${SITE.name} — Full Content Bundle`,
		'',
		buildContactBlock(),
		'',
		'## Services',
		'',
		...SERVICES.flatMap((s) => [
			`### ${s.name}`,
			s.shortDesc,
			`URL: ${pageUrl(`services/${s.slug}/`)}`,
			'',
			...(SERVICE_FAQS[s.slug]?.map((f) => `**Q: ${f.q}**\n${f.a}`) ?? []),
			'',
		]),
		'## Frequently Asked Questions',
		'',
		...FAQ_ITEMS.flatMap((f) => [`**Q: ${f.q}**`, f.a, '']),
		'## How We Work',
		'',
		...PROCESS_STEPS.flatMap((s) => [`${s.step}. **${s.title}** — ${s.desc}`, '']),
		'## About',
		'',
		ABOUT_CONTENT.story,
		'',
		...ABOUT_CONTENT.team.map((t) => `**${t.name}** — ${t.role}: ${t.bio}`),
	];
	return sections.join('\n');
}

export function buildContactBlock(): string {
	return `## Contact & Location

- **Name:** ${SITE.name}
- **Address:** ${SITE.addressSingleLine}, ${SITE.address.country}
- **Phone:** +92 ${SITE.phoneDisplay}
- **WhatsApp:** ${SITE.whatsappUrl}
- **Hours:** ${SITE.hours}
- **Rating:** ${GOOGLE_REVIEWS_SUMMARY.rating}/5 (${GOOGLE_REVIEWS_SUMMARY.count} Google reviews)
- **Coordinates:** ${SITE.geo.latitude}, ${SITE.geo.longitude}
- **Google Maps:** ${SITE.mapsPlaceUrl}
- **Facebook:** ${SITE.facebookUrl}
- **Website:** ${SITE.url}`;
}

export function buildHomeMd(): string {
	return `# ${SITE.name}

${SITE.description}

${buildContactBlock()}

## Services

${SERVICES.map((s) => `- **${s.name}**: ${s.shortDesc}`).join('\n')}

## How We Work

${PROCESS_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.desc}`).join('\n')}
`;
}

export function buildFaqMd(): string {
	return `# Frequently Asked Questions — ${SITE.name}

${FAQ_ITEMS.map((f) => `## ${f.q}\n\n${f.a}`).join('\n\n')}
`;
}

export function buildServicesMd(): string {
	return `# Services — ${SITE.name}

${SERVICES.map((s) => {
	const faqs = SERVICE_FAQS[s.slug] ?? [];
	return `## ${s.name}\n\n${s.shortDesc}\n\nURL: ${pageUrl(`services/${s.slug}/`)}\n\n${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}`;
}).join('\n\n---\n\n')}
`;
}

export function buildAboutMd(): string {
	return `# About ${SITE.name}

${ABOUT_CONTENT.story}

## Our Team

${ABOUT_CONTENT.team.map((t) => `- **${t.name}** (${t.role}): ${t.bio}`).join('\n')}

## Equipment & Certifications

${ABOUT_CONTENT.equipment.map((e) => `- ${e}`).join('\n')}

## Service Areas

${SERVICE_AREAS.map((a) => `- ${a}`).join('\n')}
`;
}

export function buildContactMd(): string {
	return `# Contact ${SITE.name}

${buildContactBlock()}
`;
}

/** Plain-text Q&A pairs for Google Business Profile Q&A sync (off-site). */
export function buildGbpFaqExport(): string {
	const all = [
		...FAQ_ITEMS,
		...Object.entries(SERVICE_FAQS).flatMap(([slug, faqs]) =>
			faqs.map((f) => ({ q: `[${slug}] ${f.q}`, a: f.a })),
		),
	];
	return all.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n---\n\n');
}
