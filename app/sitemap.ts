import { MetadataRoute } from 'next'
import { notionRef } from './lib/notion';

// Mock function representing your database call
async function getTrackSlugs() {
 const { blogs } = await notionRef()
 const track=blogs.map((item:any)=>item.slug)
 return track
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://notes-techwingsys.vercel.app'
  
  // 1. Fetch dynamic slugs from your database
  const slugs = await getTrackSlugs();

  // 2. Map slugs to sitemap format
  const trackUrls = slugs.map((slug:string) => ({
    url: `${baseUrl}/track/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Return static pages + dynamic pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...trackUrls,
  ];
}