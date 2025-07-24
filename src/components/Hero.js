import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title gradient-text">
            Discover Amazing Products
          </h1>
          <p className="hero-subtitle stagger-1">
            Shop the latest trends with unbeatable prices. Free shipping on orders over $50!
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="hero-btn hero-btn-primary hover-lift glowing">
              Shop Now
              <FaArrowRight className="floating-delayed" />
            </Link>
            <button className="hero-btn hero-btn-secondary hover-scale">
              <FaPlay className="floating" />
              Watch Video
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Modern Store Products"
            className="hero-image floating-slow"
          />
        </div>
      </div>
      
      {/* Featured Categories */}
      <h2 className="categories-heading">Shop by Category</h2>
      <div className="featured-categories">
        <Link to="/category/fashion" className="category-card hover-lift stagger-1">
          <div className="category-icon floating">👕</div>
          <div className="category-name">Fashion</div>
        </Link>
        <Link to="/category/electronics" className="category-card hover-lift stagger-2">
          <div className="category-icon floating-delayed">📱</div>
          <div className="category-name">Electronics</div>
        </Link>
        <Link to="/category/home-garden" className="category-card hover-lift stagger-3">
          <div className="category-icon floating-slow">🏠</div>
          <div className="category-name">Home & Garden</div>
        </Link>
        <Link to="/category/gaming" className="category-card hover-lift stagger-4">
          <div className="category-icon floating">🎮</div>
          <div className="category-name">Gaming</div>
        </Link>
      </div>
    </section>
  );
};

export default Hero; 