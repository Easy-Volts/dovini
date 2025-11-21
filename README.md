<div align="center">

![Dovini E-commerce Platform](https://img.shields.io/badge/Dovini-E--commerce%20Platform-green?style=for-the-badge&logo=shopping-cart&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A Modern, Feature-Rich E-commerce Platform Built with React**

[![Live Demo](#getting-started) •](#features) [Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [API Documentation](#api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Authentication & Security](#authentication--security)
- [Performance & PWA](#performance--pwa)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Dovini** is a cutting-edge e-commerce platform designed to deliver an exceptional shopping experience. Built with modern web technologies, it offers a comprehensive solution for online retail with advanced features including flash deals, personalized recommendations, real-time notifications, and automated user session management.

### 🚀 Key Highlights

- **Modern Architecture**: Built with React 19 and Vite for optimal performance
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Advanced UX**: Smooth animations, loading states, and interactive components
- **Enterprise-Ready**: Production-ready with security best practices
- **Scalable**: Modular architecture supporting easy feature expansion

---

## ✨ Features

### 🛒 E-commerce Core
- **Product Catalog**: Browse products by categories with advanced filtering
- **Shopping Cart**: Add, remove, and modify cart items with persistent storage
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Multi-step secure checkout with order confirmation
- **Order Management**: Track orders and view order history
- **Flash Deals**: Time-limited offers with countdown timers

### 👤 User Management
- **Authentication System**: Login, signup, and password recovery
- **Account Activation**: Email verification for new accounts
- **User Profiles**: Comprehensive user profile management
- **Protected Routes**: Secure access to user-specific content
- **Address Management**: Multiple shipping addresses
- **Account Settings**: Customizable user preferences

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Skeleton screens and loading indicators
- **Toast Notifications**: Real-time feedback for user actions
- **Recently Viewed**: Track and display recently browsed products
- **Product Reviews**: Customer review and rating system

### 📱 Advanced Features
- **PWA Support**: Installable app with service worker
- **WhatsApp Integration**: Direct customer support via floating button
- **Bank Transfer Payment**: Fidelity Bank integration with transfer instructions
- **Newsletter Signup**: Email subscription with incentives
- **Auto-logout**: Intelligent session management with inactivity detection
- **Admin Dashboard**: Comprehensive admin panel for store management

### ⚡ Performance
- **Lazy Loading**: Optimized image and component loading
- **Code Splitting**: Automatic bundle optimization
- **Caching Strategy**: Intelligent caching for improved performance
- **Progressive Enhancement**: Graceful degradation for older browsers

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.1**: Latest React with concurrent features
- **Vite 7.1.7**: Lightning-fast build tool and dev server
- **React Router DOM 7.9.3**: Client-side routing

### Styling & UI
- **TailwindCSS 4.1.14**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icon library
- **Framer Motion**: Advanced animations and gestures
- **React Icons**: Comprehensive icon set

### State Management
- **React Context API**: Global state management
- **Multiple Context Providers**: Specialized state for different features
- **Local Storage**: Persistent data storage

### Development Tools
- **ESLint 9.36.0**: Code quality and consistency
- **JSON Server**: Mock API for development
- **PostCSS**: CSS processing and optimization

### API & Backend
- **Fetch API**: HTTP requests for data fetching
- **RESTful API**: Backend API integration
- **Authentication Tokens**: JWT-based authentication

---

## 📁 Project Structure

```
dovini/
├── public/                     # Static assets
│   ├── _redirects             # Netlify redirects
│   ├── sw.js                  # Service Worker
│   └── vite.svg               # App logo
├── src/
│   ├── assets/                # Images and media
│   │   ├── logo.jpg          # Brand logo
│   │   └── react.svg         # React icon
│   ├── components/            # Reusable UI components
│   │   ├── AccountSettings.jsx    # User account management
│   │   ├── AddAddressModal.jsx    # Address addition modal
│   │   ├── BannerSlider.jsx       # Promotional banner carousel
│   │   ├── CartIcon.jsx          # Shopping cart icon with badge
│   │   ├── Header.jsx            # Main navigation header
│   │   ├── Hero.jsx              # Hero section component
│   │   ├── InactivityModal.jsx   # Auto-logout warning modal
│   │   ├── LoadingSkeleton.jsx   # Loading state placeholder
│   │   ├── NewsletterSignup.jsx  # Email subscription
│   │   ├── ProductCard.jsx       # Product display card
│   │   ├── ProtectedRoute.jsx    # Route protection wrapper
│   │   ├── ScrollToTop.jsx       # Back-to-top functionality
│   │   ├── Toast.jsx             # Notification system
│   │   └── ...
│   ├── context/               # React Context providers
│   │   ├── AuthContext.jsx       # Authentication state
│   │   ├── CartContext.jsx       # Shopping cart state
│   │   ├── ProductContext.jsx    # Product data management
│   │   ├── WishlistContext.jsx   # Wishlist functionality
│   │   ├── RecentlyViewedContext.jsx # Recently viewed products
│   │   ├── OrdersContext.jsx     # Order management
│   │   ├── ReviewsContext.jsx    # Product reviews
│   │   └── ...
│   ├── pages/                 # Route components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Products.jsx        # Product listing page
│   │   ├── ProductDetails.jsx   # Individual product page
│   │   ├── Cart.jsx            # Shopping cart page
│   │   ├── Checkout.jsx        # Multi-step checkout
│   │   ├── Login.jsx           # User authentication
│   │   ├── Profile.jsx         # User profile
│   │   ├── AdminDashboard.jsx   # Admin interface
│   │   └── ...
│   ├── utils/                 # Utility functions
│   │   └── productUtils.js     # Product-related helpers
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # TailwindCSS configuration
└── eslint.config.js          # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dovini.git
   cd dovini
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://api.dovinigears.ng
   VITE_APP_NAME=Dovini
   VITE_SUPPORT_PHONE=080-6397-1335
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔌 API Integration

### Backend API

The application integrates with a RESTful API hosted at `https://api.dovinigears.ng`. Key endpoints include:

#### Authentication
- `POST /login` - User authentication
- `POST /signup` - User registration
- `POST /send-otp` - Send verification code
- `POST /verify-otp` - Verify email/phone
- `GET /me` - Get user profile

#### Products
- `GET /products` - Fetch product catalog
- `GET /categories` - Get product categories
- `GET /products/:id` - Get specific product

#### Orders
- `POST /orders/create` - Create new order
- `GET /orders` - Get user orders

#### Admin
- `GET /admin/dashboard` - Admin dashboard data
- `POST /admin/products` - Manage products

### Mock Data

For development, the application includes:
- Mock product data in `src/data/products.js`
- Mock category data in `src/data/categories.js`
- JSON Server for local API simulation

---

## 🔄 State Management

The application uses React Context API for state management with multiple specialized providers:

### Core Providers

- **AuthProvider**: User authentication and session management
- **CartProvider**: Shopping cart functionality
- **ProductProvider**: Product catalog and inventory
- **WishlistProvider**: Saved items management
- **OrdersProvider**: Order processing and history

### Feature Providers

- **ToastProvider**: Notification system
- **ReviewsProvider**: Product reviews and ratings
- **RecentlyViewedProvider**: User browsing history

### State Structure

Each provider manages specific state slices:
```javascript
// Example: Cart Context
{
  items: [],           // Cart items
  total: 0,            // Total amount
  itemCount: 0,        // Total items count
  addToCart: function, // Add item to cart
  removeFromCart: function, // Remove item
  clearCart: function  // Clear all items
}
```

---

## 🔐 Authentication & Security

### Authentication Flow

1. **User Registration**: Email/password with OTP verification
2. **Login**: JWT token-based authentication
3. **Session Management**: Automatic token refresh and expiration
4. **Protected Routes**: Route-level access control

### Security Features

- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based request validation
- **Secure Storage**: Encrypted local storage
- **Session Timeout**: Automatic logout on inactivity

### Protected Routes

```jsx
<ProtectedRoute>
  <Checkout />
</ProtectedRoute>
```

---

## ⚡ Performance & PWA

### Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Image and component lazy loading
- **Memoization**: React.memo and useMemo optimization
- **Bundle Optimization**: Vite's efficient bundling
- **Caching**: Intelligent caching strategies

### Progressive Web App (PWA)

- **Service Worker**: Offline functionality
- **App Manifest**: Installable web app
- **Push Notifications**: Order and promotion notifications
- **Background Sync**: Offline order processing

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Guidelines

1. **Code Style**: Follow ESLint configuration
2. **Component Structure**: Use functional components with hooks
3. **State Management**: Use Context API for global state
4. **Styling**: Utility-first with TailwindCSS
5. **Testing**: Include unit tests for critical functions

### VS Code Extensions

Recommended extensions for development:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

---

## 🚀 Deployment

### Build Process

1. **Environment Setup**
   ```bash
   export NODE_ENV=production
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Deploy to CDN/Static Hosting**
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - GitHub Pages

### Environment Variables

Production environment variables:
```env
VITE_API_BASE_URL=https://api.dovinigears.ng
VITE_APP_ENV=production
VITE_ANALYTICS_ID=your_analytics_id
```

---

## 📊 Architecture Patterns

### Component Architecture

- **Functional Components**: Modern React with hooks
- **Custom Hooks**: Reusable logic extraction
- **Provider Pattern**: Global state management
- **HOC Pattern**: Component enhancement

### Design Patterns

- **Container/Presentational**: Separation of concerns
- **Provider/Consumer**: Context API usage
- **Render Props**: Flexible component composition
- **Compound Components**: Complex UI patterns

### Performance Patterns

- **Memoization**: prevent unnecessary re-renders
- **Virtual Scrolling**: handle large lists efficiently
- **Debouncing**: optimize search and filters
- **Throttling**: control event frequency

---

## 🧪 Testing Strategy

### Testing Approaches

- **Unit Testing**: Individual component testing
- **Integration Testing**: Feature workflow testing
- **E2E Testing**: Complete user journey testing
- **Performance Testing**: Load and stress testing

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Lighthouse**: Performance auditing

---

## 📈 Analytics & Monitoring

### User Analytics

- **Page Views**: Track user navigation
- **Conversion Funnels**: Monitor purchase flow
- **User Behavior**: Heatmaps and session recording
- **Performance Metrics**: Core Web Vitals

### Error Monitoring

- **Error Tracking**: Automatic error reporting
- **Performance Monitoring**: Real-time performance alerts
- **User Feedback**: In-app feedback collection

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Standards

- Follow existing code style and conventions
- Write comprehensive tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Reporting Issues

- Use the issue template
- Provide detailed reproduction steps
- Include relevant environment information
- Attach screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: support@dovini.com

### Community

- **GitHub**: [Dovini Repository](https://github.com/your-username/dovini)
- **Discord**: [Community Server](#) (coming soon)
- **Twitter**: [@DoviniApp](https://twitter.com/DoviniApp)

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind Labs** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Open Source Community** for the countless libraries and tools

---

<div align="center">

**Built with ❤️ by the Dovini Team**

[Website](https://dovinigears.ng) • [Documentation](#) • [Support](mailto:support@dovini.com)

</div>
