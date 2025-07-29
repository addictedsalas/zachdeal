'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  createCart, 
  addLinesToCart,
  getCart, 
  updateLineItem,
  removeLineItem
} from '@/lib/shopify';

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage?: {
        url: string;
        altText: string | null;
      };
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity?: number;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  itemCount: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  // Calculate total item count
  const itemCount = cart?.totalQuantity || cart?.lines.edges.reduce(
    (total, { node }) => total + node.quantity,
    0
  ) || 0;

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCartId(storedCartId);
      loadCart(storedCartId);
    }
  }, []);

  const loadCart = async (id: string) => {
    try {
      setIsLoading(true);
      const cartData = await getCart(id);
      if (cartData) {
        setCart(cartData);
      } else {
        // Cart not found, clear localStorage
        localStorage.removeItem('cartId');
        setCartId(null);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      localStorage.removeItem('cartId');
      setCartId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const ensureCart = async (): Promise<string> => {
    if (cartId) return cartId;

    try {
      const newCart = await createCart();
      setCart(newCart); // Set the full cart object
      setCartId(newCart.id);
      localStorage.setItem('cartId', newCart.id);
      return newCart.id;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  };

  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    try {
      setIsLoading(true);
      const id = await ensureCart();
      const updatedCart = await addLinesToCart(id, [{ merchandiseId: variantId, quantity }]);
      setCart(updatedCart);
      openCart(); // Open cart drawer when item is added
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      if (quantity === 0) {
        const updatedCart = await removeLineItem(cartId, lineId);
        setCart(updatedCart);
      } else {
        const updatedCart = await updateLineItem(cartId, lineId, quantity);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cartId) return;

    try {
      setIsLoading(true);
      const updatedCart = await removeLineItem(cartId, lineId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const toggleCart = () => setIsOpen(!isOpen);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
