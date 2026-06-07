export type CartItem = {
  key?: string;
  productId: number;
  variationId: number;

  title: string;
  image: string;

  size: string;

  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variationId: number) => void;
  updateQuantity: (variationId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};