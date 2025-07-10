import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  name: string;
  image: string;
  price: string;
  brand?: string;
  author?: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  showToast: (msg: string) => void;
  toast: string | null;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const useToast = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useToast must be used within CartProvider');
  return { toast: ctx.toast, showToast: ctx.showToast };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.name === item.name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
    showToast('Added to cart!');
  };

  const updateQuantity = (name: string, quantity: number) => {
    setCart(prev => prev.map(i => i.name === name ? { ...i, quantity } : i));
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  const clearCart = () => setCart([]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart, showToast, toast }}>
      {children}
    </CartContext.Provider>
  );
}; 