# eCommerce Project

A modern e-commerce web application built with React, featuring product browsing, shopping cart management, and checkout functionality. The application utilizes the Fake Store API for product data and demonstrates best practices in React development.

## 🚀 Features

### Core Functionality
- **Product Browsing**: Browse all products with category filtering
- **Product Details**: View detailed product information with images and descriptions
- **Shopping Cart**: Add, remove, and update product quantities
- **Checkout Process**: Complete order placement with shipping details
- **Responsive Design**: Mobile-friendly interface

### Technical Features
- **SWR Integration**: Efficient data fetching with caching and revalidation
- **Zustand State Management**: Global cart state with persistence
- **React Router**: Client-side routing for seamless navigation
- **Axios**: HTTP client for API requests with error handling
- **Modern React Hooks**: useState, useMemo, useCallback for optimal performance

## 🛠️ Technologies Used

- **React 18.2.0**: Front-end library for building user interfaces
- **SWR 2.1.5**: React Hooks library for data fetching
- **Axios 1.4.0**: Promise-based HTTP client
- **Zustand 4.3.9**: State management library
- **React Router DOM 6.3.0**: Client-side routing
- **CSS3**: Modern styling with responsive design

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductList.js   # Product grid display
│   ├── ProductDetail.js # Individual product view
│   ├── Cart.js         # Shopping cart component
│   ├── OrderForm.js    # Checkout form
│   └── *.css          # Component styles
├── hooks/              # Custom React hooks
│   ├── useProducts.js  # Product data fetching
│   └── useCart.js     # Cart state management
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── *.css          # Page styles
├── services/           # API and business logic
│   ├── apiService.js   # API client and endpoints
│   └── cartService.js  # Cart state management
├── App.js              # Main application component
├── App.css             # Global styles
├── index.js            # Application entry point
└── index.css           # Base styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📋 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 🎯 Assessment Tasks Completed

### ✅ Task 1: Fetch Product Data
- Implemented SWR for efficient data fetching from Fake Store API
- Created `useProducts` hook with caching and error handling
- Display product list on Home page with `ProductList` component

### ✅ Task 2: View Product Details
- Implemented navigation to `ProductDetailsPage` when products are clicked
- Created `ProductDetail` component with comprehensive product information
- Added back navigation and quantity controls

### ✅ Task 3: Add to Cart
- Implemented add to cart functionality with quantity selection
- Cart state persists across page refreshes using Zustand persistence
- Visual feedback shows items in cart with quantity badges

### ✅ Task 4: Manage Cart State
- Used Zustand for global cart state management
- Implemented add, remove, update, and clear cart functions
- Created `useCart` hook for convenient cart operations

### ✅ Task 5: Checkout Process
- Created comprehensive checkout form with shipping details
- Implemented order placement simulation with API integration
- Added order success confirmation and cart clearing

### ✅ Task 6: Bonus Features
- Category filtering for products
- Responsive design for mobile and desktop
- Error handling and loading states
- Modern UI with smooth animations

## 🔧 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/docs) for:

- **Products**: Fetch all products, individual products, and category-based products
- **Categories**: Get available product categories
- **Orders**: Simulate order placement (POST requests)

### API Endpoints Used
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch individual product
- `GET /products/categories` - Fetch product categories
- `GET /products/category/:category` - Fetch products by category
- `POST /orders` - Place order (simulated)

## 🎨 Design Features

- **Modern UI**: Clean, professional design with consistent styling
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Loading States**: Spinner animations during data fetching
- **Error Handling**: User-friendly error messages and retry options
- **Smooth Animations**: Hover effects and transitions for better UX
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## 🔒 State Management

### Zustand Store Structure
```javascript
{
  items: [],           // Cart items array
  totalItems: 0,       // Total quantity of items
  totalAmount: 0,      // Total price
  addToCart(),         // Add product to cart
  removeFromCart(),    // Remove product from cart
  updateQuantity(),    // Update item quantity
  clearCart(),         // Clear entire cart
  // ... other methods
}
```

### SWR Configuration
- **Caching**: 1-minute deduplication interval
- **Revalidation**: On reconnect, not on focus
- **Error Retry**: 3 attempts with 5-second intervals
- **Optimistic Updates**: Immediate UI updates

## 🚀 Performance Optimizations

- **Memoization**: Used `useMemo` and `useCallback` for expensive operations
- **Lazy Loading**: Images load with `loading="lazy"` attribute
- **Code Splitting**: React Router enables automatic code splitting
- **SWR Caching**: Reduces unnecessary API calls
- **Zustand Persistence**: Cart state survives page refreshes

## 🧪 Error Handling

- **API Errors**: Graceful handling of network failures
- **Loading States**: Clear feedback during data fetching
- **Empty States**: Helpful messages when no data is available
- **Form Validation**: Client-side validation for checkout form
- **User Feedback**: Toast notifications and confirmation dialogs

## 🔮 Future Enhancements

- **User Authentication**: Login/signup functionality
- **Product Search**: Search and filter capabilities
- **Wishlist**: Save products for later
- **Order History**: View past orders
- **Payment Integration**: Real payment processing
- **Product Reviews**: User ratings and reviews
- **Admin Panel**: Product management interface

## 📄 License

This project is created for educational purposes as part of a React development assessment.

## 👨‍💻 Author

Built with ❤️ using modern React best practices and technologies.

---

**Note**: This is a demonstration project using the Fake Store API. In a production environment, you would integrate with real e-commerce APIs and implement proper security measures. 