const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addToCart(
  productId: number,
  variationId: number,
  quantity: number
) {
  if (!API_URL) {
    console.error('[WooCart] API_URL is not defined');
    return null;
  }

  let res: Response;

  try {
    res = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation AddToCart($input: AddToCartInput!) {
            addToCart(input: $input) {
              cart {
                contents {
                  nodes {
                    key
                    quantity
                    variation {
                      node {
                        databaseId
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            productId,
            variationId,
            quantity,
          },
        },
      }),
    });
  } catch (err) {
    console.error('[WooCart] Network error', err);
    return null;
  }

  if (!res || !res.ok) {
    console.error('[WooCart] HTTP error', res?.status);
    return null;
  }

  const json = await res.json();

  if (json.errors) {
    console.error('[WooCart] GraphQL error', json.errors);
    return null;
  }

  return json.data?.addToCart ?? null;
}

export async function getCart() {
  if (!API_URL) {
    console.error('[WooCart] API_URL is not defined');
    return null;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetCart {
          cart {
            contents {
              nodes {
                key
                quantity
                product {
                  node {
                    databaseId
                    name
                  }
                }
                variation {
                  node {
                    databaseId
                  }
                }
              }
            }
            total
            subtotal
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    console.error('[WooCart] Failed to fetch cart', res.status);
    return null;
  }

  const json = await res.json();

  if (json.errors) {
    console.error('[WooCart] GraphQL error', json.errors);
    return null;
  }

  return json.data?.cart ?? null;
}
