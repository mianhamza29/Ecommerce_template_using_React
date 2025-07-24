import { useCallback, useMemo } from 'react';
import { useCartStore } from '../services/cartService';

// Custom hook for cart functionality
export const useCart = () => {
  const {
    items,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  } = useCartStore();

  // Memoized cart statistics
  const cartStats = useMemo(() => ({
    totalItems,
    totalAmount,
    itemCount: items.length,
    isEmpty: items.length === 0,
  }), [totalItems, totalAmount, items.length]);

  // Cart actions using useCallback
  const handleAddToCart = useCallback((product, quantity = 1) => {
    addToCart(product, quantity);
  }, [addToCart]);

  const handleRemoveFromCart = useCallback((productId) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  const handleUpdateQuantity = useCallback((productId, quantity) => {
    updateQuantity(productId, quantity);
  }, [updateQuantity]);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  const handleGetItemQuantity = useCallback((productId) => {
    return getItemQuantity(productId);
  }, [getItemQuantity]);

  const handleIsInCart = useCallback((productId) => {
    return isInCart(productId);
  }, [isInCart]);

  // Memoized cart actions
  const cartActions = useMemo(() => ({
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    getItemQuantity: handleGetItemQuantity,
    isInCart: handleIsInCart,
  }), [handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleClearCart, handleGetItemQuantity, handleIsInCart]);

  // Memoized cart items with additional computed properties
  const cartItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      formattedPrice: `$${item.price.toFixed(2)}`,
      formattedTotal: `$${item.total.toFixed(2)}`,
    }));
  }, [items]);

  // Memoized total amount formatted
  const formattedTotalAmount = useMemo(() => {
    return `$${totalAmount.toFixed(2)}`;
  }, [totalAmount]);

  return {
    // State
    items: cartItems,
    cartStats,
    formattedTotalAmount,
    
    // Actions
    ...cartActions,
  };
};

// Custom hook for cart item operations
export const useCartItem = (productId) => {
  const { getItemQuantity, isInCart, addToCart, removeFromCart, updateQuantity } = useCart();

  const quantity = getItemQuantity(productId);
  const inCart = isInCart(productId);

  const addItem = useCallback((product, quantity = 1) => {
    addToCart(product, quantity);
  }, [addToCart]);

  const removeItem = useCallback(() => {
    removeFromCart(productId);
  }, [removeFromCart, productId]);

  const updateItemQuantity = useCallback((newQuantity) => {
    updateQuantity(productId, newQuantity);
  }, [updateQuantity, productId]);

  return {
    quantity,
    inCart,
    addItem,
    removeItem,
    updateItemQuantity,
  };
};

// Custom hook for cart summary
export const useCartSummary = () => {
  const { cartStats, formattedTotalAmount } = useCart();

  const summary = useMemo(() => ({
    ...cartStats,
    formattedTotalAmount,
    hasItems: cartStats.itemCount > 0,
    itemText: cartStats.totalItems === 1 ? 'item' : 'items',
  }), [cartStats, formattedTotalAmount]);

  return summary;
}; 