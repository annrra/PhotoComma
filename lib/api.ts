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
                fileSize
                sourceUrl
                filePath
              }
            }
            nextHeroslidePosition {
              hersoSlidePosition
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
                file
                filePath
                fileSize
                databaseId
                sourceUrl
                slug
                srcSet
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
          uri
          content
          excerpt
          guid
          id
          link
          databaseId
          status
          slug
          featuredImage {
            node {
              altText
              caption
              databaseId
              file
              filePath
              fileSize
              link
              sourceUrl
              slug
              srcSet
              title
              uri
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
                srcSet
                uri
                title
                altText
                caption
              }
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
            uri
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
                    uri
                    title
                    sourceUrl
                    srcSet
                    slug
                    guid
                    fileSize
                    filePath
                    file
                    altText
                    caption
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