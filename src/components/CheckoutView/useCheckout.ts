'use client';
import { useReducer, useState, useEffect } from 'react';
import { checkout } from './checkoutApi';
import { CheckoutState, CheckoutAction } from './checkoutTypes';
import { useCart } from '@/src/context/CartContext/CartContext';
import { validateCart } from './checkoutGuard';
import { getCart, mapWooCartToItems } from '@/lib/woocommerce/cart';
import { useRouter } from 'next/navigation';
import { CheckoutItem } from './checkoutTypes';
import { CartItem } from '@/src/context/CartContext/types';

export function mapCartToCheckoutItems(items: CartItem[]): CheckoutItem[] {
  return items
    .filter((i): i is CartItem & { key: string } => Boolean(i.key))
    .map((i) => ({
      key: i.key,
      title: i.title ?? 'Untitled',
      price: i.price,
      quantity: i.quantity,
    }));
}

const initialState: CheckoutState = {
  step: 'FORM',
  email: '',
  shipping: {
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    postcode: '',
    country: '',
  },
  paymentMethod: 'bacs',
};

function reducer(
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState {
  switch (action.type) {
    case 'SET': {
      return {
        ...state,
        ...action.payload,
        shipping: action.payload.shipping
          ? {
              ...state.shipping,
              ...action.payload.shipping,
            }
          : state.shipping,
      };
    }

    case 'STEP':
      return { ...state, step: action.step };

    case 'ERROR':
      return { ...state, step: 'ERROR', error: action.error };

    case 'SUCCESS':
      return { ...state, step: 'SUCCESS', order: action.order };

    default:
      return state;
  }
}

export function useCheckout() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items } = useCart(); // cart integration
  const [cartReady, setCartReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      await getCart(); // or CartContext hydration

      setCartReady(true);
    }

    init();
  }, []);

  async function submit() {
    try {
      // 1. BLOCK DOUBLE SUBMIT EARLY
      if (state.step === 'PROCESSING') return;

      dispatch({ type: 'STEP', step: 'PROCESSING' });

      // 2. GET AUTHORITATIVE CART FROM WOO
      const serverCart = await getCart();

      const syncedItems = mapWooCartToItems(
        serverCart?.contents?.nodes ?? []
      );

      // 3. VALIDATE SERVER CART
      const validation = validateCart(syncedItems);

      if (!validation.ok) {
        dispatch({
          type: 'ERROR',
          error: validation.error,
        });
        return;
      }

      // 4. DETECT DESYNC (optional)
      const localMismatch =
        syncedItems.length !== items.length;

      if (localMismatch) {
        dispatch({
          type: 'ERROR',
          error: 'Cart updated. Please review your order.',
        });
        return;
      }

      // 5. BUILD CHECKOUT FROM SERVER TRUTH
      const res = await checkout({
        clientMutationId: crypto.randomUUID(),

        billing: state.shipping,
        shipping: state.shipping,

        paymentMethod: state.paymentMethod,
      });

      console.log('Checkout response:', res);

      const data = res?.checkout;

      // 6. PAYMENT REDIRECT (PayPal / Stripe)
      const redirect = data?.redirect;
      if (redirect) {
        const isInternalWooPage =
          redirect.includes('/checkout/order-received') ||
          redirect.includes('/order-received');

        // prevent WordPress thank-you page
        if (isInternalWooPage) {
          router.push(
            `/checkout/success?order=${data.order?.orderNumber}`
          );
          return;
        }

        // PayPal / Stripe / external providers
        window.location.href = redirect;
        return;
      }

      // 7. SUCCESS
      if (data?.result === 'success' && data?.order) {
        dispatch({
          type: 'SUCCESS',
          order: data.order,
        });

        return;
      }

      throw new Error(
        data?.notices?.[0]?.message || 'Checkout failed'
      );

    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Checkout error';

      dispatch({
        type: 'ERROR',
        error: message,
      });
    }
  }

  return { state, dispatch, submit, items, cartReady };
}