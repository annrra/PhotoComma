// /app/sitemap.ts
import { MetadataRoute } from 'next';

type PostNode = {
  slug: string;
  modified: string | null;
};

type PostsResponse = {
  data?: {
    posts?: {
      nodes: PostNode[];
    };
  };
  errors?: unknown;
};

type ChangeFreq = 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never';

type StaticPage = {
  slug: string;
  priority: number;
  changefreq: ChangeFreq;
};

async function fetchPostsByCategory(API_URL: string, categoryId: number[]) {
  const query = `
    query ($cats: [ID!]) {
      posts(first: 100, where: { categoryIn: $cats, status: PUBLISH }) {
        nodes {
          slug
          modified
        }
      }
    }
  `;

  const res = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { cats: categoryId },
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('Failed to fetch posts', await res.text());
    return [];
  }

  const data: PostsResponse = await res.json();

  if (data?.errors) {
    console.error('GraphQL errors:', data.errors);
    return [];
  }

  return data?.data?.posts?.nodes ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.API_URL!;
  const SITE_URL = process.env.SITE_URL || 'https://photocomma.com';

  const staticPages: StaticPage[] = [
    { slug: 'apropos', priority: 0.9, changefreq: 'monthly' },
    { slug: 'prints', priority: 0.9, changefreq: 'monthly' },
  ];

  // GraphQL query to get posts
  // run all category queries in parallel
  const [galleryPosts, gardenPosts, greenlinePosts] = await Promise.all([
    fetchPostsByCategory(API_URL, [2]),
    fetchPostsByCategory(API_URL, [8]),
    fetchPostsByCategory(API_URL, [13]),
  ]);

  const posts = [...galleryPosts, ...gardenPosts, ...greenlinePosts];

  // Build sitemap
  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },

    ...staticPages.map(page => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    }) satisfies MetadataRoute.Sitemap[number]),

    ...posts
      .filter((post): post is PostNode & { modified: string } => Boolean(post.modified))
      .map(post => ({
        url: `${SITE_URL}/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'monthly',
        priority: 0.7,
      }) satisfies MetadataRoute.Sitemap[number]),
  ];

  return urls;
}