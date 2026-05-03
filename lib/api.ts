const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Timeout in ms for WordPress API calls. Prevents hanging and "Connection closed" when hosting is slow. */
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response | null> {
  const { timeout = FETCH_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return res;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[api] Request timeout:', url);
    } else {
      console.error('[api] Request failed:', err);
    }
    return null;
  } finally {
    clearTimeout(id);
  }
}

export async function getHomePage() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        nodeByUri(uri: "/") {
          isFrontPage
          ... on Page {
            content
            slug
            uri
            title
            id
            meta {
              metaDescription
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getHeroSlides() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        posts(where: {categoryName: "heroslides"}) {
          nodes {
            title
            uri
            slug
            featuredImage {
              node {
                altText
                file
                sourceUrl
                mediaDetails {
                  sizes(include: THUMBNAIL) {
                    sourceUrl
                  }
                }
              }
            }
            nextHeroslidePosition {
              hersoSlidePosition
              heroSlideTextColor
              heroSlidePostUrl
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getMainNavigation() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        menu(id: "main-navigation", idType: SLUG) {
          slug
          menuItems {
            nodes {
              url
              uri
              menuItemId
              label
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getAboutPage() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        page(id: "apropos", idType: URI) {
          nextAbout {
            nextAboutSectionOne
            nextAboutSectionTwo
            nextAboutFeaturedMedia {
              node {
                altText
                databaseId
                sourceUrl
                slug
                title
              }
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getPost(slug: string) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "${slug}", idType: SLUG) {
          title
          excerpt
          id
          databaseId
          status
          slug
          featuredImage {
            node {
              altText
              databaseId
              sourceUrl
              slug
              title
              mediaDetails {
                width
                height
                sizes(include: THUMBNAIL) {
                  sourceUrl
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getMetaBySlug(slug: string) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return null;
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "${slug}", idType: SLUG) {
          title
          excerpt
          uri
          slug
          status
          meta {
            metaTitle
            metaDescription
            metaOpengraphimage {
              node {
                sourceUrl
                title
                altText
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return null;
  }

  const json = await res.json();
  return json.data ?? null;
}

export async function getCategory(
  slug: string,
  first: number = 18,
  after: string | null = null
) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query GetCategory($slug: ID!, $first: Int!, $after: String) {
          category(id: $slug, idType: SLUG) {
            slug
            name
            description
            link
            posts(first: $first, after: $after, where: { status: PUBLISH }) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                title
                slug
                databaseId
                featuredImage {
                  node {
                    title
                    sourceUrl
                    slug
                    altText
                    mediaDetails {
                      sizes(include: THUMBNAIL) {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
        first,
        after
      }
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

type AdjacentPost = {
  title: string;
  slug: string;
  databaseId: number;
};

type AdjacentPostsResult = {
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
};

type CategoryPostsPage = {
  nodes: AdjacentPost[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

async function getCategoryPostsPage(
  categorySlug: string,
  first: number,
  after: string | null
): Promise<CategoryPostsPage | null> {
  if (!API_URL) {
    console.error('API_URL is not defined.');
    return null;
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query GetCategoryPostsPage($slug: ID!, $first: Int!, $after: String) {
          category(id: $slug, idType: SLUG) {
            posts(first: $first, after: $after, where: { status: PUBLISH }) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                title
                slug
                databaseId
              }
            }
          }
        }
      `,
      variables: {
        slug: categorySlug,
        first,
        after
      }
    }),
    next: { revalidate: 60 },
  });

  if (!res || !res.ok) {
    return null;
  }

  const json = await res.json();
  const posts = json?.data?.category?.posts;

  if (!posts) {
    return null;
  }

  return {
    nodes: posts.nodes ?? [],
    pageInfo: posts.pageInfo ?? { hasNextPage: false, endCursor: null },
  };
}

export async function getAdjacentPostsInCategory(
  categorySlug: string,
  currentSlug: string,
  pageSize: number = 20,
  maxPages: number = 10
): Promise<AdjacentPostsResult> {
  const collectedPosts: AdjacentPost[] = [];
  let after: string | null = null;

  for (let page = 0; page < maxPages; page++) {
    const pageData = await getCategoryPostsPage(categorySlug, pageSize, after);

    if (!pageData) {
      break;
    }

    collectedPosts.push(...pageData.nodes);

    const currentIndex = collectedPosts.findIndex((p) => p.slug === currentSlug);
    if (currentIndex !== -1) {
      const prevPost = currentIndex > 0 ? collectedPosts[currentIndex - 1] : null;

      if (currentIndex < collectedPosts.length - 1) {
        return {
          prevPost,
          nextPost: collectedPosts[currentIndex + 1],
        };
      }

      if (pageData.pageInfo.hasNextPage && pageData.pageInfo.endCursor) {
        const nextPage = await getCategoryPostsPage(categorySlug, 1, pageData.pageInfo.endCursor);
        const nextPost = nextPage?.nodes?.[0] ?? null;
        return { prevPost, nextPost };
      }

      return { prevPost, nextPost: null };
    }

    if (!pageData.pageInfo.hasNextPage || !pageData.pageInfo.endCursor) {
      break;
    }

    after = pageData.pageInfo.endCursor;
  }

  return { prevPost: null, nextPost: null };
}