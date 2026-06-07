import { CartItem, CartState } from './types';

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { variationId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { variationId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }
  | {
      type: 'SYNC_KEYS';
      payload: Array<{ variationId: number; key: string; quantity: number }>;
    };

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.payload };

    case 'ADD_ITEM': {
      const existing = state.items.find(
        item => item.variationId === action.payload.variationId
      );

      if (existing) {
        return {
          items: state.items.map(item =>
            item.variationId === action.payload.variationId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          item => item.variationId !== action.payload.variationId
        ),
      };

    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(item =>
          item.variationId === action.payload.variationId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { items: [] };

    case 'SYNC_KEYS':
      return {
        items: state.items.map(item => {
          const match = action.payload.find(
            entry => entry.variationId === item.variationId
          );

          return match
            ? { ...item, key: match.key, quantity: match.quantity }
            : item;
        }),
      };

    default:
      return state;
  }
}