'use client';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from 'react';
import { CartContextType, CartItem } from './types';
import { cartReducer, initialCartState } from './cartReducer';

const CART_STORAGE_KEY = 'photocomma-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Hydrate from localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (stored) {
      dispatch({
        type: 'HYDRATE',
        payload: JSON.parse(stored),
      });
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state.items)
    );
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 },
    });
  };

  const removeItem = (variationId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { variationId },
    });
  };

  const updateQuantity = (variationId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { variationId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const value: CartContextType = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};