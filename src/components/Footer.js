import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Handle newsletter subscription
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const handleSocialClick = (platform) => {
    // Handle social media clicks
    console.log(`Clicked on ${platform}`);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section stagger-1">
            <h3 className="gradient-text">🛍️ ModernStore</h3>
            <p>Your one-stop destination for quality products. We bring you the best deals and exceptional customer service.</p>
            <div className="social-links">
              <button onClick={() => handleSocialClick('Facebook')} className="social-link hover-scale floating"><FaFacebook /></button>
              <button onClick={() => handleSocialClick('Twitter')} className="social-link hover-scale floating-delayed"><FaTwitter /></button>
              <button onClick={() => handleSocialClick('Instagram')} className="social-link hover-scale floating-slow"><FaInstagram /></button>
              <button onClick={() => handleSocialClick('LinkedIn')} className="social-link hover-scale floating"><FaLinkedin /></button>
              <button onClick={() => handleSocialClick('YouTube')} className="social-link hover-scale floating-delayed"><FaYoutube /></button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section stagger-2">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="hover-scale">Home</Link></li>
              <li><Link to="/products" className="hover-scale">Products</Link></li>
              <li><Link to="/categories" className="hover-scale">Categories</Link></li>
              <li><Link to="/deals" className="hover-scale">Deals</Link></li>
              <li><Link to="/about" className="hover-scale">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section stagger-3">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/contact" className="hover-scale">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover-scale">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover-scale">Returns</Link></li>
              <li><Link to="/faq" className="hover-scale">FAQ</Link></li>
              <li><Link to="/support" className="hover-scale">Support</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-section stagger-4">
            <h4>Account</h4>
            <ul className="footer-links">
              <li><Link to="/login" className="hover-scale">Login</Link></li>
              <li><Link to="/register" className="hover-scale">Register</Link></li>
              <li><Link to="/orders" className="hover-scale">My Orders</Link></li>
              <li><Link to="/wishlist" className="hover-scale">Wishlist</Link></li>
              <li><Link to="/profile" className="hover-scale">Profile</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section stagger-5">
            <h4>Newsletter</h4>
            <p>Subscribe to get special offers and updates!</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-wrapper hover-glow">
                <FaEnvelope className="newsletter-icon floating" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn hover-lift glowing">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 ModernStore. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="hover-scale">Privacy Policy</Link>
              <Link to="/terms" className="hover-scale">Terms of Service</Link>
              <Link to="/cookies" className="hover-scale">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 