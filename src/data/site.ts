import googleReviews from './google-reviews.json';
import { assetUrl, pageUrl, routeUrl } from '../utils/paths';

export const SITE = {
	name: 'Fakhar Auto Workshop',
	shortName: 'Fakhar Auto Workshop',
	description: 'Professional auto repair services in Islamabad. Electrical, mechanical, denting, painting, AC repair. Quality service, fast turnaround.',
	url: pageUrl(),
	phone: '03351908270',
	phoneDisplay: '0335 1908270',
	whatsappUrl: 'https://wa.me/923351908270',
	address: {
		street: 'Major Rd, F-11/4',
		city: 'Islamabad',
		postalCode: '44000',
		country: 'Pakistan',
	},
	addressSingleLine: 'Major Rd, F-11/4, Islamabad, 44000',
	mapsUrl: 'https://maps.app.goo.gl/Y1KWfi8mATbf4S6f7',
	mapsPlaceUrl:
		'https://www.google.com/maps/place/Fakhar+Auto+work+shop/@33.6836888,72.9911038,17z/data=!4m8!3m7!1s0x38dfbdf225f5e093:0xe3dc2b1542aa3611!8m2!3d33.6836888!4d72.9911038!16s%2Fg%2F11v0q8xqzv',
	mapsShareUrl: 'https://share.google/awtJM1BrlFP6CqmaT',
	googlePlaceId: 'ChIJ93BeJfWzDTkR8TYiqFQU3OM',
	knowledgeGraphId: '/g/11v0q8xqzv',
	geo: { latitude: 33.6836888, longitude: 72.9911038 },
	priceRange: '$$',
	facebookUrl: 'https://www.facebook.com/people/Fakhar-Auto-Works/61553234962719/',
	facebookPhotosUrl: 'https://www.facebook.com/people/Fakhar-Auto-Works/61553234962719/?sk=photos',
	hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
	credit: {
		label: 'Designed and developed by',
		name: 'Haroon Ali',
	},
	areaServed: 'Islamabad',
	repairsCount: '1,000+',
	locale: 'en_PK',
	icon: assetUrl('/logo-icon.jpg'),
	ogImage: assetUrl('/og-image.jpg'),
	ogImageAlt: 'Fakhar Auto Workshop – professional auto repair in Islamabad',
	ogImageWidth: 1200,
	ogImageHeight: 630,
} as const;

/** High-resolution photos from the Fakhar Auto Works Facebook page */
export const FACEBOOK_IMAGES = [
	{ src: assetUrl('/images/facebook/fb-01.jpg'), alt: 'Fakhar Auto Works workshop service in Islamabad' },
	{ src: assetUrl('/images/facebook/fb-02.jpg'), alt: 'Vehicle repair and maintenance at Fakhar Auto Works' },
	{ src: assetUrl('/images/facebook/fb-03.jpg'), alt: 'Auto workshop facility and service bay' },
	{ src: assetUrl('/images/facebook/fb-05.jpg'), alt: 'Automotive service at Fakhar Auto Works' },
	{ src: assetUrl('/images/facebook/fb-06.jpg'), alt: 'Professional car repair work' },
	{ src: assetUrl('/images/facebook/fb-09.jpg'), alt: 'Fakhar Auto Works team and workshop' },
	{ src: assetUrl('/images/facebook/fb-10.jpg'), alt: 'Car repair and maintenance work' },
	{ src: assetUrl('/images/facebook/fb-11.jpg'), alt: 'Workshop service bay in Islamabad' },
	{ src: assetUrl('/images/facebook/fb-12.jpg'), alt: 'Vehicle diagnostics at Fakhar Auto Works' },
	{ src: assetUrl('/images/facebook/fb-13.jpg'), alt: 'Auto repair facility and equipment' },
	{ src: assetUrl('/images/facebook/fb-14.jpg'), alt: 'Mechanical repair service' },
	{ src: assetUrl('/images/facebook/fb-16.jpg'), alt: 'Fakhar Auto Works repair work' },
	{ src: assetUrl('/images/facebook/fb-17.jpg'), alt: 'Workshop team servicing a vehicle' },
	{ src: assetUrl('/images/facebook/fb-18.jpg'), alt: 'Quality auto care at Fakhar Auto Workshop' },
] as const;

/** Additional photos from the Google Maps listing */
export const MAPS_IMAGES = [
	{ src: assetUrl('/images/workshop/workshop-07.jpg'), alt: 'Fakhar Auto Workshop exterior and service bay' },
	{ src: assetUrl('/images/workshop/workshop-03.jpg'), alt: 'Vehicle repair work at Fakhar Auto Workshop' },
	{ src: assetUrl('/images/workshop/workshop-05.jpg'), alt: 'Auto workshop facility in Islamabad' },
] as const;

export const WORKSHOP_IMAGES = [...FACEBOOK_IMAGES, ...MAPS_IMAGES] as const;

/** Shared slideshow images for hero and quote CTA */
export const QUOTE_CTA_IMAGES = [
	{ src: assetUrl('/images/getquaoteimages/contactusbgimages1.jpeg'), alt: 'Vehicle repair at Fakhar Auto Workshop' },
	{ src: assetUrl('/images/getquaoteimages/contactusbgimages2.jpeg'), alt: 'Auto service bay at Fakhar Auto Workshop' },
	{ src: assetUrl('/images/getquaoteimages/contactusbgimages3.jpeg'), alt: 'Mechanical repair work in Islamabad' },
	{ src: assetUrl('/images/getquaoteimages/contactusbgimages4.jpeg'), alt: 'Professional car maintenance and repair' },
] as const;

export const HERO_SLIDES = QUOTE_CTA_IMAGES;

export const SERVICES = [
	{ slug: 'electrical-repairs', name: 'Electrical Repairs', shortDesc: 'Complete electrical diagnostics and repairs for all vehicle systems', image: assetUrl('/images/facebook/fb-06.jpg') },
	{ slug: 'mechanical-services', name: 'Mechanical Services', shortDesc: 'Expert engine repairs, transmission work, and general maintenance', image: assetUrl('/images/facebook/fb-02.jpg') },
	{ slug: 'denting', name: 'Denting', shortDesc: 'Professional dent removal and body work restoration', image: assetUrl('/images/facebook/fb-05.jpg') },
	{ slug: 'painting', name: 'Painting', shortDesc: 'High-quality paint jobs with color matching and finishing', image: assetUrl('/images/facebook/fb-03.jpg') },
	{ slug: 'ac-repair', name: 'AC Repair', shortDesc: 'Air conditioning system diagnostics, repair, and recharging', image: assetUrl('/images/facebook/fb-01.jpg') },
	{ slug: 'other-services', name: 'Other Services', shortDesc: 'Oil changes, brake services, tire rotation, and more', image: assetUrl('/images/facebook/fb-09.jpg') },
] as const;

export const FEATURES = [
	{ icon: 'wallet', title: 'Honest Pricing', desc: 'Clear costs with no extras.' },
	{ icon: 'wrench', title: 'Repairs That Last', desc: 'Certified work with lasting results.' },
	{ icon: 'search', title: 'Accurate Diagnosis', desc: 'We identify the real issue.' },
	{ icon: 'clock', title: '24-Hour Turnaround', desc: 'Most repairs done within hours.' },
] as const;

export const PROCESS_STEPS = [
	{ step: '01', title: 'Free Consultation', desc: 'Reach out and get a quick estimate at no cost.' },
	{ step: '02', title: 'Full Inspection', desc: 'We check the entire system and confirm final pricing.' },
	{ step: '03', title: 'Expert Repair', desc: 'Skilled technicians complete the work with precision.' },
] as const;

export const REPAIR_CASES = [
	{
		slug: 'suspension-alignment',
		title: 'Suspension Alignment Correction Case',
		desc: 'Precise alignment and suspension calibration.',
		image: assetUrl('/images/facebook/fb-05.jpg'),
		imageAlt: 'Suspension and wheel alignment repair at Fakhar Auto Workshop',
		href: routeUrl('/services/mechanical-services/'),
	},
	{
		slug: 'engine-diagnostics',
		title: 'Engine Diagnostics & Tune-Up Case',
		desc: 'Full inspection, fault tracing, and performance restoration.',
		image: assetUrl('/images/facebook/fb-02.jpg'),
		imageAlt: 'Engine diagnostics and mechanical repair at Fakhar Auto Workshop',
		href: routeUrl('/services/mechanical-services/'),
	},
] as const;

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
	rating: number;
	source?: string;
};

/** Live stats from the Google Maps listing (refresh via `node scripts/fetch-google-reviews.mjs`) */
export const GOOGLE_REVIEWS_SUMMARY = {
	rating: 4.9,
	count: 24,
} as const;

export const TESTIMONIALS: readonly Testimonial[] = googleReviews;

export const SERVICE_AREAS = [
	'F-10, Islamabad',
	'F-11, Islamabad',
	'F-7, Islamabad',
	'G-series sectors, Islamabad',
	'All Islamabad sectors',
] as const;

export const ABOUT_CONTENT = {
	story:
		'Fakhar Auto Workshop has served drivers across Islamabad with honest, skilled auto repair. Based in F-11/4, we combine modern diagnostic equipment with experienced technicians to deliver reliable results on every job — from electrical faults to full body work.',
	team: [
		{
			name: 'Fakhar Auto Team',
			role: 'Workshop technicians',
			bio: 'Skilled mechanics trained in electrical, mechanical, denting, painting, and AC systems for all makes and models.',
		},
	],
	equipment: [
		'Professional diagnostic scanners for engine and electrical systems',
		'AC recovery and recharge equipment',
		'Wheel alignment and suspension calibration tools',
		'Paint booth and color-matching systems',
	],
	yearsInBusiness: 'Established workshop in F-11 Islamabad',
} as const;

export const FAQ_ITEMS = [
	{ q: 'How do you diagnose the issue?', a: 'We start with a full inspection using professional equipment. You receive a clear explanation of the problem and a transparent quote before any work begins.' },
	{ q: 'Do I need to leave my car for the whole day?', a: 'Not always. Minor repairs can be completed within the same day. For larger jobs, we will give you an exact timeline before we start.' },
	{ q: 'Will I get a warranty on the repair?', a: 'Yes, all services come with a warranty on both labor and parts. If something goes wrong, we fix it at no additional cost.' },
	{ q: 'How much will the repair cost?', a: 'Pricing depends on the specific issue. We provide an upfront estimate with no hidden fees or unexpected charges during the repair.' },
	{ q: 'Do you use original or aftermarket parts?', a: 'We offer both options. You choose between OEM parts for maximum reliability or high-quality aftermarket alternatives depending on your budget.' },
	{ q: 'Do you offer pick-up and drop-off services?', a: 'Yes. We can arrange pick-up and drop-off within Islamabad for your convenience. Mention it when you book and we will confirm availability and timing.' },
	{ q: 'Where is Fakhar Auto Workshop located in Islamabad?', a: 'We are at Major Rd, F-11/4, Islamabad, 44000, Pakistan. Find us on Google Maps or call 0335 1908270 for directions.' },
	{ q: 'What are your opening hours?', a: 'We are open Monday through Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays.' },
	{ q: 'Do you serve F-10, F-11, and other Islamabad sectors?', a: 'Yes. We serve all Islamabad sectors including F-10, F-11, F-7, and G-series areas. Pick-up and drop-off within Islamabad is also available.' },
	{ q: 'How much does car AC repair cost in Islamabad?', a: 'AC repair cost depends on the fault — a simple recharge costs less than compressor or leak repair. We inspect first and give you an upfront quote before any work.' },
	{ q: 'Do you offer same-day electrical repair?', a: 'Many electrical issues can be diagnosed and repaired the same day. After inspection we confirm whether same-day completion is possible.' },
	{ q: 'What is the difference between OEM and aftermarket parts?', a: 'OEM (original) parts are made by or for your vehicle manufacturer and offer maximum fit and reliability. Aftermarket parts are third-party alternatives that can be more affordable while still meeting quality standards.' },
	{ q: 'Is Fakhar Auto Workshop reliable?', a: 'Yes. We hold a 4.9 out of 5 rating on Google from 24 customer reviews. Customers consistently praise our honest pricing, quality work, and professional service in F-11 Islamabad.' },
	{ q: 'Do you provide a warranty on repairs?', a: 'Yes. All repairs include a warranty on both labor and parts. If an issue arises related to our work, we fix it at no additional cost.' },
	{ q: 'Can I get a free inspection before repair?', a: 'Yes. We offer a free consultation and inspection. You receive a clear explanation and quote before any repair work begins.' },
	{ q: 'Do you work on all car makes and models?', a: 'Yes. Our technicians work on all makes and models — Japanese, Korean, European, and local vehicles.' },
	{ q: 'How do I book an appointment?', a: 'Call 0335 1908270, message us on WhatsApp at wa.me/923351908270, or visit us at Major Rd, F-11/4 during opening hours.' },
	{ q: 'Is there parking at the workshop?', a: 'Yes. There is parking available near our workshop on Major Rd, F-11/4 for customers dropping off vehicles.' },
] as const;

export const SERVICE_FAQS: Record<string, readonly { q: string; a: string }[]> = {
	'electrical-repairs': [
		{ q: 'What electrical problems can you fix?', a: 'We diagnose and repair battery issues, alternator faults, starter motors, wiring problems, fuse failures, lighting issues, and ECU-related electrical faults.' },
		{ q: 'How long does an electrical diagnostic take?', a: 'Most electrical diagnostics are completed within 1–2 hours. We explain findings and provide a quote before starting repairs.' },
		{ q: 'Why does my car battery keep dying?', a: 'Common causes include a failing alternator, parasitic drain, old battery, or loose terminals. We test the full charging system to find the root cause.' },
	],
	'mechanical-services': [
		{ q: 'Do you do engine overhauls in Islamabad?', a: 'Yes. We handle engine diagnostics, tune-ups, timing work, gasket replacement, and full engine overhauls with upfront pricing.' },
		{ q: 'Can you fix suspension and alignment issues?', a: 'Yes. We repair suspension components, replace worn parts, and perform wheel alignment for stable handling and even tire wear.' },
		{ q: 'How often should I service my car?', a: 'Most vehicles need a service every 5,000–10,000 km or per manufacturer schedule. We can advise based on your car and driving conditions.' },
	],
	denting: [
		{ q: 'Do you offer paintless dent repair (PDR)?', a: 'Yes, for suitable dents we use paintless dent repair to restore panels without repainting, preserving your original finish.' },
		{ q: 'How long does dent repair take?', a: 'Small dents may be done in a few hours. Larger body damage can take 1–3 days depending on severity and paint work required.' },
		{ q: 'Can you match my car paint color?', a: 'Yes. We use professional color-matching systems to blend repairs with your existing paint for a seamless finish.' },
	],
	painting: [
		{ q: 'Do you do full car resprays in Islamabad?', a: 'Yes. We offer panel painting, spot repairs, and full resprays with proper surface preparation and clear coat finishing.' },
		{ q: 'How long does a paint job take?', a: 'A single panel may take 1–2 days. Full resprays typically take 3–7 days including drying time for a durable finish.' },
		{ q: 'What type of paint do you use?', a: 'We use quality automotive paints with proper primer and clear coat for durability and color accuracy.' },
	],
	'ac-repair': [
		{ q: 'Why is my car AC blowing warm air?', a: 'Common causes include low refrigerant, a leak, faulty compressor, blocked condenser, or electrical issues. We diagnose the system to find the exact cause.' },
		{ q: 'How often should I recharge car AC in Islamabad heat?', a: 'If your AC cools well, no recharge is needed. If cooling drops, there may be a leak or worn component — we inspect rather than just topping up refrigerant.' },
		{ q: 'Do you fix AC compressor problems?', a: 'Yes. We test, repair, or replace AC compressors, condensers, evaporators, and related components with proper recovery and recharge.' },
	],
	'other-services': [
		{ q: 'Do you do oil changes and brake service?', a: 'Yes. We offer oil and filter changes, brake pad and disc replacement, tire rotation, and general maintenance for all vehicles.' },
		{ q: 'How much does a brake pad replacement cost?', a: 'Cost depends on your vehicle and pad type. We inspect brakes first and quote before replacing pads, discs, or fluid.' },
		{ q: 'Do you rotate and balance tires?', a: 'Yes. Tire rotation and balancing are part of our maintenance services to extend tire life and improve ride quality.' },
	],
};
