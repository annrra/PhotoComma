'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { CartContextType, CartItem } from './types';
import { cartReducer, initialCartState } from './cartReducer';

const CART_STORAGE_KEY = 'photocomma-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

function isValidCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;

  const item = value as CartItem;

  return (
    Number.isInteger(item.productId) &&
    item.productId > 0 &&
    Number.isInteger(item.variationId) &&
    item.variationId > 0 &&
    typeof item.title === 'string' &&
    typeof item.image === 'string' &&
    typeof item.size === 'string' &&
    typeof item.price === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function persistCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [checkoutTransition, setCheckoutTransition] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState('');

  const skipPersistRef = useRef(true);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadStoredCart() });
    skipPersistRef.current = false;
  }, []);

  useEffect(() => {
    if (skipPersistRef.current) return;
    persistCart(state.items);
  }, [state.items]);

  const addItem = (item: CartItem) => {
    const quantity = item.quantity ?? 1;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity,
      },
    });
  };

  const removeItem = (variationId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { variationId } });
  };

  const updateQuantity = (variationId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { variationId, quantity },
    });
  };

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('photocomma-cart');
  }, []);

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const value: CartContextType & {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    checkoutTransition: boolean;
    setCheckoutTransition: (v: boolean) => void;
    checkoutStatus: string;
    setCheckoutStatus: (v: string) => void;
  } = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    isCartOpen,
    openCart,
    closeCart,
    checkoutTransition,
    setCheckoutTransition,
    checkoutStatus,
    setCheckoutStatus,
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
