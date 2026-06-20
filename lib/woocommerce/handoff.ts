import { createHmac, randomUUID } from 'crypto';

export type HandoffCartItem = {
  productId: number;
  variationId: number;
  quantity: number;
};

export type CheckoutHandoffResult =
  | { ok: true; checkoutUrl: string }
  | { ok: false; error: string; details?: string[] };

type HandoffPayload = {
  items: HandoffCartItem[];
  exp: number;
  jti: string;
  redirect: 'checkout' | 'cart';
};

const SHOP_URL =
  process.env.NEXT_PUBLIC_SITE_SHOP_URL ?? 'https://shop.photocomma.com';

function getHandoffSecret(): string | null {
  const secret = process.env.CHECKOUT_HANDOFF_SECRET;
  return secret && secret.length > 0 ? secret : null;
}

function encodePayload(payload: HandoffPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function signPayload(encodedPayload: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url');
}

export async function createCheckoutHandoff(
  items: HandoffCartItem[]
): Promise<CheckoutHandoffResult> {
  const secret = getHandoffSecret();

  if (!secret) {
    return {
      ok: false,
      error: 'Checkout handoff is not configured',
      details: ['Set CHECKOUT_HANDOFF_SECRET in the Next.js environment'],
    };
  }

  if (items.length === 0) {
    return {
      ok: false,
      error: 'Cart is empty',
    };
  }

  const payload: HandoffPayload = {
    items,
    exp: Math.floor(Date.now() / 1000) + 15 * 60,
    jti: randomUUID(),
    redirect: 'checkout',
  };

  const encodedPayload = encodePayload(payload);
  const signature = signPayload(encodedPayload, secret);
  const checkoutUrl = `${SHOP_URL}/checkout-handoff/?payload=${encodedPayload}&sig=${signature}`;

  return { ok: true, checkoutUrl };
}
