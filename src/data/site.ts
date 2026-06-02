import googleReviews from './google-reviews.json';

export const SITE = {
	name: 'Fakhar Auto Workshop',
	shortName: 'Fakhar Auto Workshop',
	description: 'Professional auto repair services in Islamabad. Electrical, mechanical, denting, painting, AC repair. Quality service, fast turnaround.',
	url: 'https://fakharautoworkshop.com',
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
	icon: '/logo-icon.jpg',
	ogImage: '/og-image.jpg',
	ogImageAlt: 'Fakhar Auto Workshop – professional auto repair in Islamabad',
	ogImageWidth: 1200,
	ogImageHeight: 630,
} as const;

/** High-resolution photos from the Fakhar Auto Works Facebook page */
export const FACEBOOK_IMAGES = [
	{ src: '/images/facebook/fb-01.jpg', alt: 'Fakhar Auto Works workshop service in Islamabad' },
	{ src: '/images/facebook/fb-02.jpg', alt: 'Vehicle repair and maintenance at Fakhar Auto Works' },
	{ src: '/images/facebook/fb-03.jpg', alt: 'Auto workshop facility and service bay' },
	{ src: '/images/facebook/fb-05.jpg', alt: 'Automotive service at Fakhar Auto Works' },
	{ src: '/images/facebook/fb-06.jpg', alt: 'Professional car repair work' },
	{ src: '/images/facebook/fb-09.jpg', alt: 'Fakhar Auto Works team and workshop' },
	{ src: '/images/facebook/fb-10.jpg', alt: 'Car repair and maintenance work' },
	{ src: '/images/facebook/fb-11.jpg', alt: 'Workshop service bay in Islamabad' },
	{ src: '/images/facebook/fb-12.jpg', alt: 'Vehicle diagnostics at Fakhar Auto Works' },
	{ src: '/images/facebook/fb-13.jpg', alt: 'Auto repair facility and equipment' },
	{ src: '/images/facebook/fb-14.jpg', alt: 'Mechanical repair service' },
	{ src: '/images/facebook/fb-16.jpg', alt: 'Fakhar Auto Works repair work' },
	{ src: '/images/facebook/fb-17.jpg', alt: 'Workshop team servicing a vehicle' },
	{ src: '/images/facebook/fb-18.jpg', alt: 'Quality auto care at Fakhar Auto Workshop' },
] as const;

/** Additional photos from the Google Maps listing */
export const MAPS_IMAGES = [
	{ src: '/images/workshop/workshop-07.jpg', alt: 'Fakhar Auto Workshop exterior and service bay' },
	{ src: '/images/workshop/workshop-03.jpg', alt: 'Vehicle repair work at Fakhar Auto Workshop' },
	{ src: '/images/workshop/workshop-05.jpg', alt: 'Auto workshop facility in Islamabad' },
] as const;

export const WORKSHOP_IMAGES = [...FACEBOOK_IMAGES, ...MAPS_IMAGES] as const;

/** Shared slideshow images for hero and quote CTA */
export const QUOTE_CTA_IMAGES = [
	{ src: '/images/getquaoteimages/contactusbgimages1.jpeg', alt: 'Vehicle repair at Fakhar Auto Workshop' },
	{ src: '/images/getquaoteimages/contactusbgimages2.jpeg', alt: 'Auto service bay at Fakhar Auto Workshop' },
	{ src: '/images/getquaoteimages/contactusbgimages3.jpeg', alt: 'Mechanical repair work in Islamabad' },
	{ src: '/images/getquaoteimages/contactusbgimages4.jpeg', alt: 'Professional car maintenance and repair' },
	{ src: '/images/getquaoteimages/contactusbgimages5.jpeg', alt: 'Workshop diagnostics and vehicle care' },
	{ src: '/images/getquaoteimages/contactusbgimages6.jpeg', alt: 'Fakhar Auto Workshop repair service' },
] as const;

export const HERO_SLIDES = QUOTE_CTA_IMAGES;

export const SERVICES = [
	{ slug: 'electrical-repairs', name: 'Electrical Repairs', shortDesc: 'Complete electrical diagnostics and repairs for all vehicle systems', image: '/images/facebook/fb-06.jpg' },
	{ slug: 'mechanical-services', name: 'Mechanical Services', shortDesc: 'Expert engine repairs, transmission work, and general maintenance', image: '/images/facebook/fb-02.jpg' },
	{ slug: 'denting', name: 'Denting', shortDesc: 'Professional dent removal and body work restoration', image: '/images/facebook/fb-05.jpg' },
	{ slug: 'painting', name: 'Painting', shortDesc: 'High-quality paint jobs with color matching and finishing', image: '/images/facebook/fb-03.jpg' },
	{ slug: 'ac-repair', name: 'AC Repair', shortDesc: 'Air conditioning system diagnostics, repair, and recharging', image: '/images/facebook/fb-01.jpg' },
	{ slug: 'other-services', name: 'Other Services', shortDesc: 'Oil changes, brake services, tire rotation, and more', image: '/images/facebook/fb-09.jpg' },
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
		image: '/images/facebook/fb-05.jpg',
		imageAlt: 'Suspension and wheel alignment repair at Fakhar Auto Workshop',
		href: '/services/mechanical-services/',
	},
	{
		slug: 'engine-diagnostics',
		title: 'Engine Diagnostics & Tune-Up Case',
		desc: 'Full inspection, fault tracing, and performance restoration.',
		image: '/images/facebook/fb-02.jpg',
		imageAlt: 'Engine diagnostics and mechanical repair at Fakhar Auto Workshop',
		href: '/services/mechanical-services/',
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

export const FAQ_ITEMS = [
	{ q: 'How do you diagnose the issue?', a: 'We start with a full inspection using professional equipment. You receive a clear explanation of the problem and a transparent quote before any work begins.' },
	{ q: 'Do I need to leave my car for the whole day?', a: 'Not always. Minor repairs can be completed within the same day. For larger jobs, we will give you an exact timeline before we start.' },
	{ q: 'Will I get a warranty on the repair?', a: 'Yes, all services come with a warranty on both labor and parts. If something goes wrong, we fix it at no additional cost.' },
	{ q: 'How much will the repair cost?', a: 'Pricing depends on the specific issue. We provide an upfront estimate with no hidden fees or unexpected charges during the repair.' },
	{ q: 'Do you use original or aftermarket parts?', a: 'We offer both options. You choose between OEM parts for maximum reliability or high-quality aftermarket alternatives depending on your budget.' },
	{ q: 'Do you offer pick-up and drop-off services?', a: 'Yes. We can arrange pick-up and drop-off within Islamabad for your convenience. Mention it when you book and we will confirm availability and timing.' },
] as const;
