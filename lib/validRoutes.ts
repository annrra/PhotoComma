import { PUBLISHED_CATEGORIES, STATIC_PAGES } from '@/lib/siteRoutes';
import { fetchAllPublishedPosts } from '@/lib/publishedPosts';

/** Pathnames that exist in the app and should be tracked in analytics. */
export async function getValidRoutes(): Promise<string[]> {
  const apiUrl = process.env.API_URL;
  const staticPaths = STATIC_PAGES.map((page) => `/${page.slug}`);
  const categoryPaths = PUBLISHED_CATEGORIES.map(
    (category) => `/category/${category.slug}`,
  );

  if (!apiUrl) {
    console.error('API_URL is not defined.');
    return ['/', ...staticPaths, ...categoryPaths];
  }

  const categoryIds = PUBLISHED_CATEGORIES.map((category) => category.wpCategoryId);
  const posts = await fetchAllPublishedPosts(apiUrl, categoryIds);
  const postPaths = [...new Set(posts.map((post) => `/${post.slug}`))];

  return ['/', ...staticPaths, ...categoryPaths, ...postPaths];
}
