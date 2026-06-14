import { pageUrl } from '../utils/paths';
import {
	SITE,
	FAQ_ITEMS,
	GOOGLE_REVIEWS_SUMMARY,
	TESTIMONIALS,
	PROCESS_STEPS,
	SERVICES,
	WORKSHOP_IMAGES,
} from './site';

const BUSINESS_ID = `${SITE.url}#business`;
const WEBSITE_ID = `${SITE.url}#website`;

function businessRef() {
	return { '@id': BUSINESS_ID };
}

export function getAutoRepairSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'AutoRepair',
		'@id': BUSINESS_ID,
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		telephone: `+92${SITE.phone.replace(/\s/g, '')}`,
		priceRange: SITE.priceRange,
		image: WORKSHOP_IMAGES.slice(0, 5).map((img) =>
			img.src.startsWith('http') ? img.src : new URL(img.src, SITE.url).href,
		),
		address: {
			'@type': 'PostalAddress',
			streetAddress: SITE.address.street,
			addressLocality: SITE.address.city,
			postalCode: SITE.address.postalCode,
			addressCountry: SITE.address.country,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: SITE.geo.latitude,
			longitude: SITE.geo.longitude,
		},
		hasMap: SITE.mapsPlaceUrl,
		sameAs: [SITE.mapsPlaceUrl, SITE.facebookUrl],
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '09:00',
			closes: '19:00',
		},
		areaServed: {
			'@type': 'City',
			name: SITE.areaServed,
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: GOOGLE_REVIEWS_SUMMARY.rating,
			reviewCount: GOOGLE_REVIEWS_SUMMARY.count,
			bestRating: 5,
			worstRating: 1,
		},
		review: TESTIMONIALS.slice(0, 5).map((t) => ({
			'@type': 'Review',
			author: { '@type': 'Person', name: t.name },
			reviewRating: {
				'@type': 'Rating',
				ratingValue: t.rating,
				bestRating: 5,
				worstRating: 1,
			},
			reviewBody: t.quote,
		})),
	};
}

export function getServiceSchema(serviceName: string, serviceDescription: string, slug: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: serviceName,
		description: serviceDescription,
		provider: { ...businessRef(), '@type': 'AutoRepair', name: SITE.name, url: SITE.url },
		areaServed: {
			'@type': 'City',
			name: SITE.areaServed,
		},
		url: pageUrl(`services/${slug}/`),
	};
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function getWebSiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		inLanguage: 'en',
		publisher: businessRef(),
	};
}

export function getFAQSchema(items: readonly { q: string; a: string }[] = FAQ_ITEMS) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.a,
			},
		})),
	};
}

export function getHowToSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: `How ${SITE.name} repairs your vehicle`,
		description: 'Our three-step process from consultation to completed repair.',
		step: PROCESS_STEPS.map((s, i) => ({
			'@type': 'HowToStep',
			position: i + 1,
			name: s.title,
			text: s.desc,
		})),
	};
}

export function getItemListSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Auto Repair Services',
		itemListElement: SERVICES.map((s, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: s.name,
			url: pageUrl(`services/${s.slug}/`),
			description: s.shortDesc,
		})),
	};
}

export function getContactPageSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: `Contact ${SITE.name}`,
		url: pageUrl('contact/'),
		mainEntity: businessRef(),
	};
}

export function getAboutPageSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		name: `About ${SITE.name}`,
		url: pageUrl('about/'),
		mainEntity: businessRef(),
	};
}

export function getSpeakableSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['#speakable-nap', '#quick-facts'],
		},
	};
}

export function getArticleSchema(title: string, description: string, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		url,
		author: businessRef(),
		publisher: businessRef(),
	};
}
