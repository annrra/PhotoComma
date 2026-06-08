'use client';

import { useReducer } from 'react';
import { checkout } from './checkoutApi';
import { CheckoutState } from './checkoutTypes';
import { useCart } from '@/src/context/CartContext/CartContext';

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
  const { items } = useCart(); // IMPORTANT: cart integration

  async function submit() {
    try {
      dispatch({ type: 'STEP', step: 'PROCESSING' });

      const res = await checkout({
        clientMutationId: crypto.randomUUID(),

        billing: state.shipping,
        shipping: state.shipping,

        paymentMethod: state.paymentMethod,
      });

      const data = res?.checkout;

      // 🔁 PayPal / Stripe redirect handling
      if (data?.redirect) {
        window.location.href = data.redirect;
        return;
      }

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
        error: err.message,
      });
    }
  }

  return { state, dispatch, submit, items };
}