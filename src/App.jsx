import React, { Suspense, lazy,useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { AuthProvider } from './context/AuthContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';
import Chat from './components/Chat';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About'
import Profile from './pages/Profile';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashBoard from './pages/AdminDashBoard';


const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Products = lazy(() => import('./pages/Products'));
import ProductDetails from './pages/ProductDetails';
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Orders = lazy(() => import('./pages/Orders'));
const FlashDeals = lazy(() => import('./pages/FlashDeals'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSkeleton type="page" />
  </div>
);

const App = () => {
    
  return (
    <AuthProvider>
      <ChatProvider>
        <ReviewsProvider>
          <ToastProvider>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <CartProvider>
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow">
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/category/:id" element={<Category />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetails/>} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/admin" element={<AdminDashBoard />} />
                          <Route path="/my-account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                          <Route path="/myaccount/settings" element={<ProtectedRoute><AccountSettingsPage /></ProtectedRoute>} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/flash-deals" element={<FlashDeals />} />
                          <Route path="/about" element={<About />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <Footer />
                    <Chat />
                    <ScrollToTop />
                  </div>
                </CartProvider>
              </WishlistProvider>
            </RecentlyViewedProvider>
          </ToastProvider>
        </ReviewsProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;