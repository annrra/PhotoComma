'use client';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  ReactNode,
} from 'react';
import { CartContextType, CartItem } from './types';
import { cartReducer, initialCartState } from './cartReducer';
import {
  addToCart as wooAddToCart,
  emptyCart as wooEmptyCart,
  getCart,
  mapWooCartToItems,
  removeItemsFromCart,
  resolveCartKey,
  updateItemQuantities,
} from '@/lib/woocommerce/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

async function reloadFromWoo(
  dispatch: React.Dispatch<Parameters<typeof cartReducer>[1]>
) {
  const cart = await getCart();
  const items = cart?.contents?.nodes?.length
    ? mapWooCartToItems(cart.contents.nodes)
    : [];

  dispatch({ type: 'HYDRATE', payload: items });
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    async function loadCart() {
      await reloadFromWoo(dispatch);
      setIsHydrated(true);
    }

    loadCart();
  }, []);

  const addItem = (item: CartItem) => {
    const quantity = item.quantity ?? 1;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity,
      },
    });

    wooAddToCart(item.productId, item.variationId, quantity)
      .then(res => {
        if (!res?.cart?.contents?.nodes) {
          console.error('[Cart] Woo sync failed');
          return;
        }

        dispatch({
          type: 'SYNC_KEYS',
          payload: res.cart.contents.nodes.map(node => ({
            variationId: node.variation?.node?.databaseId ?? 0,
            key: node.key,
            quantity: node.quantity,
          })),
        });
      })
      .catch(err => {
        console.error('[Cart] Woo sync error', err);
      });
  };

  const removeItem = (variationId: number) => {
    const item = state.items.find(entry => entry.variationId === variationId);
    if (!item) return;

    dispatch({ type: 'REMOVE_ITEM', payload: { variationId } });

    (async () => {
      const key = item.key ?? (await resolveCartKey(variationId));

      if (!key) {
        console.error('[Cart] Missing cart key for removal');
        await reloadFromWoo(dispatch);
        return;
      }

      const result = await removeItemsFromCart([key]);

      if (!result) {
        console.error('[Cart] Woo remove failed');
        await reloadFromWoo(dispatch);
      }
    })().catch(err => {
      console.error('[Cart] Woo remove error', err);
      reloadFromWoo(dispatch);
    });
  };

  const updateQuantity = (variationId: number, quantity: number) => {
    const item = state.items.find(entry => entry.variationId === variationId);
    if (!item) return;

    const previousQuantity = item.quantity;

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { variationId, quantity },
    });

    (async () => {
      const key = item.key ?? (await resolveCartKey(variationId));

      if (!key) {
        console.error('[Cart] Missing cart key for quantity update');
        await reloadFromWoo(dispatch);
        return;
      }

      const result = await updateItemQuantities([{ key, quantity }]);

      if (!result) {
        console.error('[Cart] Woo quantity update failed');
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: { variationId, quantity: previousQuantity },
        });
        return;
      }

      dispatch({
        type: 'SYNC_KEYS',
        payload: result.cart.contents.nodes.map(node => ({
          variationId: node.variation?.node?.databaseId ?? 0,
          key: node.key,
          quantity: node.quantity,
        })),
      });
    })().catch(err => {
      console.error('[Cart] Woo quantity update error', err);
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { variationId, quantity: previousQuantity },
      });
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });

    wooEmptyCart().catch(err => {
      console.error('[Cart] Woo empty cart error', err);
      reloadFromWoo(dispatch);
    });
  };

  const totalItems = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const value: CartContextType & {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    isHydrated: boolean;
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
    isHydrated,
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
