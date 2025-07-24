import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCartItem } from '../hooks/useCart';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id);
  const cartItem = useCartItem(id);
  const [quantity, setQuantity] = useState(1);

  // Memoized product data
  const productData = useMemo(() => {
    if (!product) return null;
    
    return {
      ...product,
      formattedPrice: `$${product.price.toFixed(2)}`,
      ratingStars: '★'.repeat(Math.floor(product.rating?.rate || 0)) + 
                   '☆'.repeat(5 - Math.floor(product.rating?.rate || 0)),
    };
  }, [product]);

  // Handle quantity change
  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  }, []);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    if (productData) {
      cartItem.addItem(productData, quantity);
    }
  }, [productData, quantity, cartItem]);

  // Handle quantity update in cart
  const handleUpdateQuantity = useCallback((newQuantity) => {
    cartItem.updateItemQuantity(newQuantity);
  }, [cartItem]);

  // Handle remove from cart
  const handleRemoveFromCart = useCallback(() => {
    cartItem.removeItem();
  }, [cartItem]);

  // Handle go back
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading product</h3>
        <p>{error.message}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="empty-container">
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Products
        </button>
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <img
                src={productData.image}
                alt={productData.title}
                className="product-detail-image"
              />
            </div>
          </div>
          
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{productData.title}</h1>
              <p className="product-category">{productData.category}</p>
            </div>
            
            <div className="product-rating">
              <span className="rating-stars">{productData.ratingStars}</span>
              <span className="rating-rate">({productData.rating?.rate || 0})</span>
              <span className="rating-count">• {productData.rating?.count || 0} reviews</span>
            </div>
            
            <div className="product-price">
              <span className="price-amount">{productData.formattedPrice}</span>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{productData.description}</p>
            </div>
            
            <div className="product-actions">
              {/* Quantity and Add to Cart section removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 