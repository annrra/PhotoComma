export type CartItem = {
  productId: number;
  variationId: string;

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
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (variationId: string) => void;
  updateQuantity: (variationId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
};