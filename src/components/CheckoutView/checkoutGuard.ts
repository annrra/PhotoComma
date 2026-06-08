import type { CartItem } from '@/src/context/CartContext/types';

export function validateCart(items: CartItem[]) {
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