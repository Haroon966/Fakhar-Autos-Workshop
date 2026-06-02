import { SITE, FAQ_ITEMS, GOOGLE_REVIEWS_SUMMARY, TESTIMONIALS } from './site';

export function getAutoRepairSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'AutoRepair',
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		telephone: `+92${SITE.phone.replace(/\s/g, '')}`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: SITE.address.street,
			addressLocality: SITE.address.city,
			postalCode: SITE.address.postalCode,
			addressCountry: SITE.address.country,
		},
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
		provider: {
			'@type': 'AutoRepair',
			name: SITE.name,
			url: SITE.url,
		},
		areaServed: {
			'@type': 'City',
			name: SITE.areaServed,
		},
		url: `${SITE.url}/services/${slug}/`,
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
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		inLanguage: 'en',
		publisher: {
			'@type': 'AutoRepair',
			name: SITE.name,
			url: SITE.url,
		},
	};
}

export function getFAQSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQ_ITEMS.map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.a,
			},
		})),
	};
}
