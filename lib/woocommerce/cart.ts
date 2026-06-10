import type { CartItem } from '@/src/context/CartContext/types';

const API_URL = process.env.NEXT_PUBLIC_SHOP_API_URL;
const WC_SESSION_KEY = 'wc-session';

const CART_ITEM_FIELDS = `
  key
  quantity
  product {
    node {
      databaseId
      name
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  variation {
    node {
      databaseId
      ... on ProductVariation {
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
`;

export type WooCartNode = {
  key: string;
  quantity: number;
  product?: {
    node?: {
      databaseId?: number;
      name?: string;
      featuredImage?: { node?: { sourceUrl?: string } };
    };
  };
  variation?: {
    node?: {
      databaseId?: number;
      price?: string | number;
      attributes?: { nodes?: Array<{ name?: string; value?: string }> };
    };
  };
};

export function mapWooCartToItems(nodes: WooCartNode[]): CartItem[] {
  return nodes.map(item => ({
    key: item.key,
    productId: item.product?.node?.databaseId ?? 0,
    variationId: item.variation?.node?.databaseId ?? 0,
    title: item.product?.node?.name || '',
    image: item.product?.node?.featuredImage?.node?.sourceUrl || '',
    size: item.variation?.node?.attributes?.nodes?.[0]?.value || '',
    price: Number(item.variation?.node?.price ?? 0),
    quantity: item.quantity,
  }));
}

function getStoredSession(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(WC_SESSION_KEY);
}

function storeSession(token: string | null) {
  if (typeof window === 'undefined' || !token || token === 'false') return;

  const normalized = token.startsWith('Session ')
    ? token.slice('Session '.length)
    : token;

  localStorage.setItem(WC_SESSION_KEY, normalized);
}

function buildSessionHeaders(): Record<string, string> {
  const session = getStoredSession();
  if (!session) return {};

  return { 'woocommerce-session': `Session ${session}` };
}

function persistSessionFromResponse(res: Response) {
  const session = res.headers.get('woocommerce-session');
  if (session) {
    storeSession(session);
  }
}

export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>) {
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
        ...buildSessionHeaders(),
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (err) {
    console.error('[WooCart] Network error', err);
    return null;
  }

  if (!res.ok) {
    console.error('[WooCart] HTTP error', res.status);
    return null;
  }

  persistSessionFromResponse(res);

  const json = await res.json();

  if (json.errors) {
    console.error('[WooCart] GraphQL error', json.errors);
    return null;
  }

  return json.data as T;
}

export async function addToCart(
  productId: number,
  variationId: number,
  quantity: number
) {
  const data = await graphqlRequest<{
    addToCart: {
      cart: {
        contents: {
          nodes: WooCartNode[];
        };
      };
    };
  }>(
    `
      mutation AddToCart($input: AddToCartInput!) {
        addToCart(input: $input) {
          cart {
            contents {
              nodes {
                ${CART_ITEM_FIELDS}
              }
            }
          }
        }
      }
    `,
    {
      input: {
        productId,
        variationId,
        quantity,
      },
    }
  );

  return data?.addToCart ?? null;
}

export async function getCart() {
  const data = await graphqlRequest<{
    cart: {
      contents: {
        nodes: WooCartNode[];
      };
      total: string;
      subtotal: string;
    };
  }>(`
    query GetCart {
      cart {
        contents {
          nodes {
            ${CART_ITEM_FIELDS}
          }
        }
        total
        subtotal
      }
    }
  `);

  return data?.cart ?? null;
}

type WooCartPayload = {
  cart: {
    contents: {
      nodes: WooCartNode[];
    };
  };
};

const CART_CONTENTS_SELECTION = `
  cart {
    contents {
      nodes {
        ${CART_ITEM_FIELDS}
      }
    }
  }
`;

export async function resolveCartKey(variationId: number): Promise<string | null> {
  const cart = await getCart();
  const node = cart?.contents?.nodes?.find(
    item => item.variation?.node?.databaseId === variationId
  );

  return node?.key ?? null;
}

export async function removeItemsFromCart(keys: string[]) {
  const data = await graphqlRequest<{
    removeItemsFromCart: WooCartPayload;
  }>(
    `
      mutation RemoveItemsFromCart($input: RemoveItemsFromCartInput!) {
        removeItemsFromCart(input: $input) {
          ${CART_CONTENTS_SELECTION}
        }
      }
    `,
    { input: { keys } }
  );

  return data?.removeItemsFromCart ?? null;
}

export async function updateItemQuantities(
  items: Array<{ key: string; quantity: number }>
) {
  const data = await graphqlRequest<{
    updateItemQuantities: WooCartPayload;
  }>(
    `
      mutation UpdateItemQuantities($input: UpdateItemQuantitiesInput!) {
        updateItemQuantities(input: $input) {
          ${CART_CONTENTS_SELECTION}
        }
      }
    `,
    { input: { items } }
  );

  return data?.updateItemQuantities ?? null;
}

export async function emptyCart() {
  const data = await graphqlRequest<{
    emptyCart: WooCartPayload;
  }>(`
    mutation EmptyCart($input: EmptyCartInput!) {
      emptyCart(input: $input) {
        ${CART_CONTENTS_SELECTION}
      }
    }
  `, { input: {} });

  return data?.emptyCart ?? null;
}

export { buildSessionHeaders, getStoredSession };
