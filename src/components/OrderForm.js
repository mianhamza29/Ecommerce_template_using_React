import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { orderAPI } from '../services/apiService';
import Alert from '../Alert';
import './OrderForm.css';
import ConfirmModal from '../ConfirmModal';

const OrderForm = () => {
  const navigate = useNavigate();
  const { items, cartStats, formattedTotalAmount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'info' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
  });

  // Memoized order summary
  const orderSummary = useMemo(() => ({
    itemCount: cartStats.itemCount,
    totalItems: cartStats.totalItems,
    totalAmount: cartStats.totalAmount,
    formattedTotalAmount,
    isEmpty: cartStats.isEmpty,
  }), [cartStats, formattedTotalAmount]);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (orderSummary.isEmpty) {
      setAlert({ message: 'Your cart is empty. Please add some products before checkout.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    try {
      // The Fake Store API doesn't actually support creating orders, so we simulate success.
      console.log('Simulating successful order placement...');
      
      setOrderSuccess(true);
      clearCart();

    } catch (error) {
      setAlert({ message: 'There was an error placing your order. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [items, orderSummary, formData, clearCart, navigate]);

  // Handle cancel order
  const handleCancel = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  if (orderSuccess) {
    return (
      <ConfirmModal
        open={true}
        title="Thank you for shopping!"
        message="Your order has been placed successfully. You will receive a confirmation email shortly."
        onConfirm={() => navigate('/')}
        onCancel={() => navigate('/')}
        confirmText="Continue Shopping"
        showCancel={false}
      />
    );
  }

  if (orderSummary.isEmpty) {
    return (
      <div className="order-empty">
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: 'info' })}
        />
        <div className="order-empty-content">
          <h2>Your cart is empty</h2>
          <p>Please add some products to your cart before proceeding to checkout.</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form">
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: '', type: 'info' })}
      />
      <div className="order-form-container">
        <div className="order-form-header">
          <h1>Checkout</h1>
          <p>Complete your order by filling out the form below</p>
        </div>
        <div className="order-form-content">
          <div className="order-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Shipping Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method *</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={isSubmitting || orderSummary.isEmpty}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="order-item-info">
                      <span className="order-item-title">{item.title}</span>
                      <span className="order-item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="order-item-price">{item.formattedTotal}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span>{formattedTotalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm; 