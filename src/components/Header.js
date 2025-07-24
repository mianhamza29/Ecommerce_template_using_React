import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { cartStats } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo hover-lift" onClick={handleNavClick}>
          <span className="logo-icon floating">🛍️</span>
          <span className="gradient-text">ModernStore</span>
        </Link>

        {/* Search Bar */}
        <div className="search-container hover-glow">
          <FaSearch className="search-icon floating-delayed" />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
        </div>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link hover-scale stagger-1" onClick={handleNavClick}>
            Home
          </Link>
          <Link to="/products" className="nav-link hover-scale stagger-2" onClick={handleNavClick}>
            Products
          </Link>
          <Link to="/categories" className="nav-link hover-scale stagger-3" onClick={handleNavClick}>
            Categories
          </Link>
          <Link to="/deals" className="nav-link hover-scale stagger-4" onClick={handleNavClick}>
            Deals
          </Link>
        </nav>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-icon hover-lift glowing" onClick={handleNavClick}>
          <FaShoppingCart className="floating-slow" />
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn hover-scale" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="rotateIn" /> : <FaBars className="rotateIn" />}
        </button>
      </div>
    </header>
  );
};

export default Header; 