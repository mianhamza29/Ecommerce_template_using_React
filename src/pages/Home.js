import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useProducts';
import './Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading, error } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get search query from URL
  const searchQuery = searchParams.get('q');

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Handle category selection
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  // Memoized filtered categories
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return ['all', ...categories];
  }, [categories]);

  return (
    <div className="home-page">
      {/* Hero Section - Only show on main page */}
      {!searchQuery && (
        <Hero />
      )}

      {/* Main Content */}
      <div className="home-content">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="search-results-header">
            <h2>Search Results for "{searchQuery}"</h2>
            <p>{filteredProducts.length} products found</p>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="filters-section">
          <div className="filters-container">
            {/* Category Filter */}
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={categoriesLoading}
                className="filter-select"
              >
                {filteredCategories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label htmlFor="sort-filter">Sort by:</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="results-count">
              <span>{filteredProducts.length} products</span>
            </div>
          </div>
        </div>

        {/* Product List */}
        <ProductList 
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Home; 