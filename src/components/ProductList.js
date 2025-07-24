import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartItem } from '../hooks/useCart';
import './ProductList.css';
import { FaEllipsisV } from 'react-icons/fa';
import Alert from '../Alert';
import ConfirmModal from '../ConfirmModal';

function EditProductModal({ product, open, onClose, onSave }) {
  const [title, setTitle] = React.useState(product?.title || '');
  const [price, setPrice] = React.useState(product?.price || '');
  const [rating, setRating] = React.useState(product?.rating?.rate || 0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setTitle(product?.title || '');
      setPrice(product?.price || '');
      setRating(product?.rating?.rate || 0);
      setError('');
    }
  }, [open, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          rating: { rate: parseFloat(rating), count: product.rating?.count || 0 },
        }),
      });
      // Ignore the API response for rating, use the local value instead
      const updated = await res.json();
      onSave({
        ...updated,
        rating: { rate: parseFloat(rating), count: product.rating?.count || 0 }
      });
    } catch (err) {
      setError('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit} className="edit-modal-form">
          <label>Product Name
            <input value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label>Price
            <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
          </label>
          <label>Rating
            <input type="number" min="0" max="5" step="0.1" value={rating} onChange={e => setRating(Number(e.target.value))} required />
          </label>
          {error && <div className="edit-modal-error">{error}</div>}
          <div className="edit-modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const ProductList = ({ products = [], isLoading = false, error = null, searchQuery = null }) => {
  const navigate = useNavigate();
  const [productList, setProductList] = React.useState(products);
  const [editProduct, setEditProduct] = React.useState(null);
  const [alert, setAlert] = React.useState({ message: '', type: 'info' });
  const [deleteProduct, setDeleteProduct] = React.useState(null);
  React.useEffect(() => { setProductList(products); }, [products]);

  // Handle product click to navigate to details
  const handleProductClick = useCallback((productId) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, { method: 'DELETE' });
      setProductList((prev) => prev.filter((p) => p.id !== productId));
      setAlert({ message: 'Product deleted successfully.', type: 'success' });
    } catch (err) {
      setAlert({ message: 'Failed to delete product.', type: 'error' });
    }
    setDeleteProduct(null);
  };

  // Handle product update
  const handleUpdateProduct = (updated) => {
    setProductList((prev) =>
      prev.map(p =>
        p.id === updated.id
          ? {
              ...p,
              ...updated,
              rating: {
                rate:
                  (updated.rating && typeof updated.rating.rate === 'number')
                    ? updated.rating.rate
                    : (typeof updated.rate === 'number'
                        ? updated.rate
                        : (editProduct?.rating?.rate ?? p.rating?.rate)),
                count:
                  (updated.rating && typeof updated.rating.count === 'number')
                    ? updated.rating.count
                    : (editProduct?.rating?.count ?? p.rating?.count ?? 0),
              },
            }
          : p
      )
    );
    setEditProduct(null);
    setAlert({ message: 'Product updated successfully.', type: 'success' });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading products</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!products.length) {
    if (searchQuery) {
      return (
        <div className="empty-container">
          <h3>No products found</h3>
          <p>No products match your search for "{searchQuery}". Try adjusting your search terms.</p>
        </div>
      );
    }
    
    return (
      <div className="empty-container">
        <h3>No products available</h3>
        <p>Check back later for new products.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: '', type: 'info' })}
      />
      <ConfirmModal
        open={!!deleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteProduct?.title}"? This action cannot be undone.`}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={() => handleDeleteProduct(deleteProduct.id)}
        confirmText="Delete"
      />
      <EditProductModal
        product={editProduct}
        open={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSave={handleUpdateProduct}
      />
      <div className="product-grid">
        {productList.map((product, index) => (
          <ProductCard
            key={product.id + '-' + (product.rating?.rate ?? '')}
            product={product}
            onProductClick={handleProductClick}
            animationDelay={index * 0.1}
            onDelete={() => setDeleteProduct(product)}
            onEdit={setEditProduct}
          />
        ))}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, onProductClick, animationDelay = 0, onDelete, onEdit }) => {
  const cartItem = useCartItem(product.id);
  const { quantity, inCart, addItem } = cartItem;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCardClick = useCallback(() => {
    onProductClick(product.id);
  }, [onProductClick, product.id]);

  const handleAddToCartClick = useCallback((event) => {
    event.stopPropagation(); // Prevent navigation when clicking add to cart
    addItem(product, 1);
  }, [addItem, product]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  const handleMenuOption = (option, e) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (option === 'Delete') {
      onDelete(product.id);
    } else if (option === 'View') {
      onProductClick(product.id);
    } else if (option === 'Edit') {
      onEdit(product);
    }
  };

  return (
    <div 
      className="product-card hover-lift" 
      onClick={handleCardClick}
      style={{ animationDelay: `${animationDelay}s`, position: 'relative' }}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image floating-slow"
          loading="lazy"
        />
        <button className="product-menu-btn" onClick={handleMenuClick} tabIndex={0} aria-label="Product options">
          <FaEllipsisV />
        </button>
        {menuOpen && (
          <div className="product-menu-dropdown">
            <button onClick={(e) => handleMenuOption('View', e)}>View</button>
            <button onClick={(e) => handleMenuOption('Edit', e)}>Edit</button>
            <button onClick={(e) => handleMenuOption('Delete', e)}>Delete</button>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title gradient-text">{product.title}</h3>
        <p className="product-category stagger-1" style={{marginBottom: '8px'}}>{product.category}</p>
        <div className="product-price stagger-3" style={{marginBottom: '8px'}}>${product.price.toFixed(2)}</div>
        <div className="product-rating stagger-2">
          <span className="rating-stars floating">
            {'★'.repeat(Math.floor(product.rating?.rate || 0))}
            {'☆'.repeat(5 - Math.floor(product.rating?.rate || 0))}
          </span>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>
        
        <button
          className={`add-to-cart-btn hover-scale ${inCart ? 'in-cart glowing' : ''}`}
          onClick={handleAddToCartClick}
        >
          {inCart ? `In Cart (${quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductList; 