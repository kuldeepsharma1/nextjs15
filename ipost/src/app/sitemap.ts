import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const today = new Date();
    const baseUrl = process.env.APP_URL || '';

    return [
        {
            url: `${baseUrl}/`, // Home route
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`, // About page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`, // FAQ page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`, // Contact page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/community`, // Community page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        {
            url: `${baseUrl}/login`, // Login page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/register`, // Register page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/forgot`, // Forgot password page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/reset`, // Reset password page
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },

        {
            url: `${baseUrl}/blogs`, // Blog listing page
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.6,
        }



    ]
}
