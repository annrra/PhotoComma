const API_URL = process.env.NEXT_PUBLIC_SHOP_API_URL;

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

export async function getProducts() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        products(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            title
            uri
            slug
            databaseId
            status
            ... on ProductWithAttributes {
              defaultAttributes {
                nodes {
                  name
                  value
                }
              }
            }
            ... on VariableProduct {
              variations {
                nodes {
                  id
                  price(format: RAW)
                  attributes {
                    nodes {
                      name
                      value
                    }
                  }
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
                title
              }
            }
          }
        }
      }`
    }),
    next: { revalidate: 10 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getProduct(slug: string) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        product(id: "${slug}", idType: SLUG) {
          title
          uri
          slug
          databaseId
          description
          shortDescription
          ... on ProductWithAttributes {
            defaultAttributes {
              nodes {
                name
                value
              }
            }
          }
          ... on VariableProduct {
            variations {
              nodes {
                databaseId
                id
                price(format: RAW)
                attributes {
                  nodes {
                    name
                    value
                  }
                }
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              title
            }
          }
        }
      }`
    }),
    next: { revalidate: 10 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getPrivacyPolicy() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        page(id: "privacy-policy", idType: URI) {
          title
          slug
          content
          status
        }
      }`
    }),
    next: { revalidate: 10 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getTermsAndConditions() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        page(id: "terms-and-conditions", idType: URI) {
          title
          slug
          content
          status
        }
      }`
    }),
    next: { revalidate: 10 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}