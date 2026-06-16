export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import {
  createCheckoutHandoff,
  type HandoffCartItem,
} from '@/lib/woocommerce/handoff';

type HandoffRequestBody = {
  items?: HandoffCartItem[];
};

function parseHandoffItems(items: unknown): HandoffCartItem[] | null {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const parsed: HandoffCartItem[] = [];

  for (const entry of items) {
    if (!entry || typeof entry !== 'object') return null;

    const productId = Number((entry as HandoffCartItem).productId);
    const variationId = Number((entry as HandoffCartItem).variationId);
    const quantity = Number((entry as HandoffCartItem).quantity);

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(variationId) ||
      variationId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return null;
    }

    parsed.push({ productId, variationId, quantity });
  }

  return parsed;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HandoffRequestBody;
    const items = parseHandoffItems(body.items);

    if (!items) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    const result = await createCheckoutHandoff(items);

    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error,
          details: result.details,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ checkoutUrl: result.checkoutUrl });
  } catch (err) {
    console.error('[API checkout/handoff] Server error:', err);

    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
