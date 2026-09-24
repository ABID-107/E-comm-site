import { CartItem, Product } from "../types";

export interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}