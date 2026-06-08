import type { CartItem } from '@/src/context/CartContext/types';

export type CartValidation =
  | { ok: true }
  | { ok: false; error: string };

export function validateCart(items: CartItem[]): CartValidation {
  if (!items || items.length === 0) {
    return {
      ok: false,
      error: 'Your cart is empty',
    };
  }

  const invalidItem = items.find(
    i =>
      !i.productId ||
      !i.quantity ||
      i.quantity <= 0
  );

  if (invalidItem) {
    return {
      ok: false,
      error: 'Cart contains invalid items',
    };
  }

  return { ok: true };
}