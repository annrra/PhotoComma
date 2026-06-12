import { randomUUID } from 'crypto';
import { WooSessionClient } from './server-graphql';

export type HandoffCartItem = {
  productId: number;
  variationId: number;
  quantity: number;
};

export type CheckoutHandoffResult =
  | { ok: true; checkoutUrl: string }
  | { ok: false; error: string; details?: string[] };

const FILL_CART_MUTATION = `
  mutation FillCart($input: FillCartInput!) {
    fillCart(input: $input) {
      cart {
        contents {
          itemCount
        }
      }
      cartErrors {
        type
        reasons
      }
    }
  }
`;

const UPDATE_SESSION_AND_CHECKOUT_MUTATION = `
  mutation UpdateSessionAndCheckout($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      customer {
        checkoutUrl
      }
    }
  }
`;

function createClientSessionMeta() {
  const clientSessionId = randomUUID();
  const expiration = Math.floor(Date.now() / 1000) + 3600;

  return [
    { key: 'client_session_id', value: clientSessionId },
    {
      key: 'client_session_id_expiration',
      value: String(expiration),
    },
  ];
}

function formatGraphqlErrors(errors?: Array<{ message: string }>): string[] {
  return errors?.map(entry => entry.message) ?? [];
}

export async function createCheckoutHandoff(
  items: HandoffCartItem[]
): Promise<CheckoutHandoffResult> {
  console.log('HANDOFF START');
  console.log('SHOP API:', process.env.NEXT_PUBLIC_SHOP_API_URL);
  console.log('ITEMS:', items);
  const client = new WooSessionClient();
  console.log(
    'HANDOFF ITEMS:',
    JSON.stringify(items, null, 2)
  );

  const fillResponse = await client.request<{
    fillCart: {
      cart?: { contents?: { itemCount?: number } };
      cartErrors?: Array<{ type?: string; reasons?: string[] }>;
    };
  }>(FILL_CART_MUTATION, {
    input: {
      items: items.map(item => ({
        productId: item.productId,
        variationId: item.variationId,
        quantity: item.quantity,
      })),
    },
  });
  console.log(
    'FILL CART RESPONSE:',
    JSON.stringify(fillResponse, null, 2)
  );

  if (fillResponse.errors?.length) {
    return {
      ok: false,
      error: 'Failed to populate WooCommerce cart',
      details: formatGraphqlErrors(fillResponse.errors),
    };
  }

  const fillPayload = fillResponse.data?.fillCart;
  const cartErrors = fillPayload?.cartErrors?.filter(
    entry => entry.reasons && entry.reasons.length > 0
  );

  if (cartErrors?.length) {
    return {
      ok: false,
      error: 'Some cart items could not be added',
      details: cartErrors.flatMap(entry => entry.reasons ?? []),
    };
  }

  const itemCount = fillPayload?.cart?.contents?.itemCount ?? 0;
  if (itemCount === 0) {
    return {
      ok: false,
      error: 'WooCommerce cart is empty after handoff',
    };
  }

  const checkoutResponse = await client.request<{
    updateSession?: {
      customer?: { checkoutUrl?: string | null };
    };
  }>(UPDATE_SESSION_AND_CHECKOUT_MUTATION, {
    input: { sessionData: createClientSessionMeta() },
  });

  if (checkoutResponse.errors?.length) {
    return {
      ok: false,
      error: 'Failed to generate checkout URL',
      details: formatGraphqlErrors(checkoutResponse.errors),
    };
  }

  const checkoutUrl =
    checkoutResponse.data?.updateSession?.customer?.checkoutUrl;

  if (!checkoutUrl) {
    return {
      ok: false,
      error:
        'Checkout URL unavailable. Enable "Checkout URL" under WooGraphQL session transfer settings and flush permalinks.',
    };
  }

  console.log('CHECKOUT URL:', checkoutUrl);

  return { ok: true, checkoutUrl };
}
