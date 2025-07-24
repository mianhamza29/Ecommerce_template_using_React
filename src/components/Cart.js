import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { items, cartStats, formattedTotalAmount, updateQuantity, removeFromCart, clearCart } = useCart();

  // Handle quantity update
  const handleQuantityUpdate = useCallback((productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  }, [updateQuantity]);

  // Handle remove item
  const handleRemoveItem = useCallback((productId) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  // Handle clear cart
  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  }, [clearCart]);

  // Handle checkout
  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  // Handle continue shopping
  const handleContinueShopping = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Memoized cart summary
  const cartSummary = useMemo(() => ({
    itemCount: cartStats.itemCount,
    totalItems: cartStats.totalItems,
    totalAmount: cartStats.totalAmount,
    formattedTotalAmount,
    isEmpty: cartStats.isEmpty,
  }), [cartStats, formattedTotalAmount]);

  if (cartSummary.isEmpty) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <div className="cart-summary">
            <span>{cartSummary.totalItems} {cartSummary.totalItems === 1 ? 'item' : 'items'}</span>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityUpdate={handleQuantityUpdate}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          <div className="cart-sidebar">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({cartSummary.totalItems}):</span>
                <span>{formattedTotalAmount}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formattedTotalAmount}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartSummary.isEmpty}
              >
                Proceed to Checkout
              </button>
              <button
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, onQuantityUpdate, onRemove }) => {
  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onQuantityUpdate(item.id, newQuantity);
    }
  }, [item.id, onQuantityUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-category">{item.category}</p>
        <div className="cart-item-price">{item.formattedPrice}</div>
      </div>
      
      <div className="cart-item-quantity">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="cart-item-total">
        <span className="total-amount">{item.formattedTotal}</span>
      </div>
      
      <div className="cart-item-actions">
        <button className="remove-item-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Cart; 