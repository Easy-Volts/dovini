import React from 'react';
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
import Chat from './components/Chat';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About'
import Profile from './pages/Profile';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashBoard from './pages/AdminDashBoard';
import Privacy from './pages/Privacy';
import { ProductProvider } from './context/ProductContext';
import Home from './pages/Home';
import Category from './pages/Category';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Terms from './pages/Terms';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AccountActivation from './pages/AccountActivation';
import Orders from './pages/Orders';
import FlashDeals from './pages/FlashDeals';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <ReviewsProvider>
          <ToastProvider>
            <RecentlyViewedProvider>
              <WishlistProvider>
                <CartProvider>
                  <ProductProvider>
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow pb-16 lg:pb-0">
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
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/privacy-policies" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/account-activation" element={<AccountActivation />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/flash-deals" element={<FlashDeals />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                    <Chat />
                    <ScrollToTop />
                    </div>
                   </ProductProvider> 
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