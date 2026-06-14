/**
 * Central site configuration & business data.
 * Update contact details, social links and content here.
 */

export const site = {
    name: 'Lail O Nahar Machinery Rentals',
    shortName: 'Lail O Nahar',
    nameAr: 'ليل و نهار',
    url: 'https://lailonahar.ae',
    description:
        'Rent cranes and man-cranes across the UAE. 24/7 service in Dubai, Sharjah, Ajman & Abu Dhabi. Get a free quote from Lail O Nahar Machinery Rentals today.',
    locale: 'en_AE',
    defaultOgImage: '/og/og-default.jpg',
} as const;

export const contact = {
    // Replace with the real business number (digits only for wa.me / formatted for display).
    phoneDisplay: '+971 50 123 4567',
    phoneE164: '+971501234567',
    whatsapp: '971501234567',
    email: 'sales@lailonahar.ae',
    addressLine: 'Industrial Area, Sharjah, United Arab Emirates',
    // Latitude/longitude placeholder for the contact map.
    mapQuery: 'Sharjah Industrial Area, UAE',
    hours: 'Open 24/7 — Mon to Sun',
} as const;

export const social = {
    whatsapp: `https://wa.me/${contact.whatsapp}`,
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
} as const;

export const emirates = ['Dubai', 'Sharjah', 'Ajman', 'Abu Dhabi'] as const;

export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Fleet', href: '/fleet' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
] as const;

export const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '24/7', label: 'Service Availability' },
    { value: '4', label: 'Emirates Covered' },
    { value: '15+', label: 'Years Experience' },
] as const;

export const testimonials = [
    {
        quote:
            'Lail O Nahar delivered a 50-ton crane to our Dubai site within hours. Professional operators and zero downtime — exactly what a tight construction schedule needs.',
        author: 'Ahmed Al Mansoori',
        role: 'Site Manager, Emaar Contracting',
    },
    {
        quote:
            'Their man-crane fleet kept our facade maintenance project on track across Sharjah. Safety-first crews and well-maintained equipment every single time.',
        author: 'Rajesh Kumar',
        role: 'Operations Lead, Gulf Facilities',
    },
    {
        quote:
            'Reliable 24/7 support is rare in this industry. We call, they answer, the machine arrives. Our go-to partner for heavy lifting in the UAE.',
        author: 'Mohammed Saeed',
        role: 'Project Director, Al Naboodah Group',
    },
] as const;

/** Pre-built WhatsApp deep link with a default enquiry message. */
export function whatsappLink(message?: string): string {
    const text = encodeURIComponent(
        message ??
        "Hello Lail O Nahar! I found your website and I'm interested in equipment rental in the UAE. Can you send me a quote?"
    );
    return `https://wa.me/${contact.whatsapp}?text=${text}`;
}
