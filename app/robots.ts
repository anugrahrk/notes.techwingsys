import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Hide your backend logic
    },
    sitemap: 'https://notes-techwingsys.vercel.app/sitemap.xml',
  }
}