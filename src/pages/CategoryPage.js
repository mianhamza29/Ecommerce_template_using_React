import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import '../pages/Home.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products, isLoading, error } = useProducts();

  // Normalize category name for comparison
  const normalizedCategory = categoryName.replace(/-/g, ' ').toLowerCase();

  // Filter products by category
  const filteredProducts = products
    ? products.filter(
        (product) => product.category.toLowerCase().replace(/&/g, 'and') === normalizedCategory
      )
    : [];

  return (
    <div className="home-page">
      <div className="home-content">
        <h2 className="categories-heading" style={{marginTop: '32px', marginBottom: '24px', textAlign: 'left'}}>
          {categoryName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Products
        </h2>
        <ProductList 
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CategoryPage; 