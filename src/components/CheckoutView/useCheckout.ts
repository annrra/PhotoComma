'use client';
import { useReducer, useState, useEffect } from 'react';
import { checkout } from './checkoutApi';
import { CheckoutState } from './checkoutTypes';
import { useCart } from '@/src/context/CartContext/CartContext';
import { validateCart } from './checkoutGuard';
import { getCart, mapWooCartToItems } from '@/lib/woocommerce/cart';

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
  paymentMethod: 'stripe',
};

function reducer(state: CheckoutState, action: any): CheckoutState {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload };

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

  useEffect(() => {
    async function init() {
      await getCart(); // or CartContext hydration

      setCartReady(true);
    }

    init();
  }, []);

  async function submit() {
    try {
      // 🧠 1. BLOCK DOUBLE SUBMIT EARLY
      if (state.step === 'PROCESSING') return;

      dispatch({ type: 'STEP', step: 'PROCESSING' });

      // 🧠 2. GET AUTHORITATIVE CART FROM WOO
      const serverCart = await getCart();

      const syncedItems = mapWooCartToItems(
        serverCart?.contents?.nodes ?? []
      );

      // 🧠 3. VALIDATE SERVER CART (IMPORTANT FIX)
      const validation = validateCart(syncedItems);

      if (!validation.ok) {
        dispatch({
          type: 'ERROR',
          error: validation.error,
        });
        return;
      }

      // 🧠 4. DETECT DESYNC (optional but correct)
      const localMismatch =
        syncedItems.length !== items.length;

      if (localMismatch) {
        dispatch({
          type: 'ERROR',
          error: 'Cart updated. Please review your order.',
        });
        return;
      }

      // 🧠 5. BUILD CHECKOUT FROM SERVER TRUTH (IMPORTANT)
      const res = await checkout({
        clientMutationId: crypto.randomUUID(),

        billing: state.shipping,
        shipping: state.shipping,

        paymentMethod: state.paymentMethod,
      });

      const data = res?.checkout;

      // 🧠 6. PAYMENT REDIRECT (PayPal / Stripe)
      if (data?.redirect) {
        window.location.href = data.redirect;
        return;
      }

      // 🧠 7. SUCCESS
      if (data?.order) {
        dispatch({
          type: 'SUCCESS',
          order: data.order,
        });
      } else {
        throw new Error('Checkout failed');
      }

    } catch (err: any) {
      dispatch({
        type: 'ERROR',
        error: err.message || 'Checkout error',
      });
    }
  }

  return { state, dispatch, submit, items, cartReady };
}