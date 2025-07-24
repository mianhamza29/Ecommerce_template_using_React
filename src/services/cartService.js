import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart item structure
const createCartItem = (product, quantity = 1) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  image: product.image,
  quantity,
  total: product.price * quantity,
});

// Cart store using Zustand with persistence
export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      totalItems: 0,
      totalAmount: 0,

      // Actions
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Update existing item
            const updatedItems = state.items.map(item =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    total: (item.quantity + quantity) * item.price,
                  }
                : item
            );
            
            return {
              items: updatedItems,
              totalItems: state.totalItems + quantity,
              totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0),
            };
          } else {
            // Add new item
            const newItem = createCartItem(product, quantity);
            const updatedItems = [...state.items, newItem];
            
            return {
              items: updatedItems,
              totalItems: state.totalItems + quantity,
              totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0),
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const itemToRemove = state.items.find(item => item.id === productId);
          const updatedItems = state.items.filter(item => item.id !== productId);
          
          return {
            items: updatedItems,
            totalItems: state.totalItems - (itemToRemove?.quantity || 0),
            totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0),
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === productId
              ? {
                  ...item,
                  quantity,
                  total: quantity * item.price,
                }
              : item
          );
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalAmount: updatedItems.reduce((sum, item) => sum + item.total, 0),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
        });
      },

      getItemQuantity: (productId) => {
        const state = get();
        const item = state.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId) => {
        const state = get();
        return state.items.some(item => item.id === productId);
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      partialize: (state) => ({ items: state.items }), // only persist items
    }
  )
);

// Cart service functions
export const cartService = {
  // Add product to cart
  addToCart: (product, quantity = 1) => {
    useCartStore.getState().addToCart(product, quantity);
  },

  // Remove product from cart
  removeFromCart: (productId) => {
    useCartStore.getState().removeFromCart(productId);
  },

  // Update product quantity in cart
  updateQuantity: (productId, quantity) => {
    useCartStore.getState().updateQuantity(productId, quantity);
  },

  // Clear entire cart
  clearCart: () => {
    useCartStore.getState().clearCart();
  },

  // Get cart state
  getCartState: () => {
    return useCartStore.getState();
  },

  // Get item quantity
  getItemQuantity: (productId) => {
    return useCartStore.getState().getItemQuantity(productId);
  },

  // Check if item is in cart
  isInCart: (productId) => {
    return useCartStore.getState().isInCart(productId);
  },
};

export default cartService; 