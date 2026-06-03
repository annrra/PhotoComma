// /app/sitemap.ts
import { MetadataRoute } from 'next';
import { STATIC_PAGES, PUBLISHED_CATEGORIES } from '@/lib/siteRoutes';
import { fetchAllPublishedPosts } from '@/lib/publishedPosts';

type PostNode = {
  slug: string;
  modified: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.API_URL!;
  const SITE_URL = process.env.SITE_URL || 'https://photocomma.com';

  const categoryIds = PUBLISHED_CATEGORIES.map((category) => category.wpCategoryId);
  const posts = await fetchAllPublishedPosts(API_URL, categoryIds, {
    includeModified: true,
  });

  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },

    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    }) satisfies MetadataRoute.Sitemap[number]),

    ...PUBLISHED_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }) satisfies MetadataRoute.Sitemap[number]),

    ...posts
      .filter((post): post is PostNode => Boolean(post.modified))
      .map((post) => ({
        url: `${SITE_URL}/${post.slug}`,
        lastModified: new Date(post.modified!),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }) satisfies MetadataRoute.Sitemap[number]),
  ];

  return urls;
}
