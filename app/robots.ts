import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/',
                '/dashboard/',
                '/mistakes/', // Personal content
                '/account/',
                '/_next/'
            ],
        },
        sitemap: 'https://intellect.education/sitemap.xml',
    }
}
