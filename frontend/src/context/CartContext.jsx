import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/cartService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], subtotal: 0, item_count: 0 });
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], subtotal: 0, item_count: 0 });
      return;
    }
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1, selectedVariant = null) => {
    if (!user) {
      // In a real app, you might use localStorage for guest carts
      alert("Please login to add items to cart.");
      return;
    }
    setLoading(true);
    try {
      const updatedCart = await cartService.addToCart(productId, quantity, selectedVariant);
      setCart(updatedCart);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const updatedCart = await cartService.removeCartItem(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ items: [], subtotal: 0, item_count: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider value={{
      cart, loading, isDrawerOpen,
      addToCart, updateQuantity, removeItem, clearCart,
      openDrawer, closeDrawer, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
