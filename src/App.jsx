import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { AuthProvider } from "./context/AuthContext";
import { ReviewsProvider } from "./context/ReviewsContext";
import CookieConsent from "./components/CookieConsent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Profile from "./pages/Profile";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ShowReactivation from "./components/ShowReactivation";
import AdminDashBoard from "./pages/admin/AdminDashBoard.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import Privacy from "./pages/Privacy";
import { ProductProvider } from "./context/ProductContext";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Terms from "./pages/Terms";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AccountActivation from "./pages/AccountActivation";
import Orders from "./pages/Orders";
import FlashDeals from "./pages/FlashDeals";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { OrdersProvider } from "./context/OrdersContext";
import { AdminProvider } from "./context/AdminContext";
import ProtectedAdmin from "./components/ProtectedAdmin";
import {
  Focus,
  Cpu,
  Video,
  Lightbulb,
  Zap,
  Package,
  SunMedium,
  BatteryCharging,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [showReactivationModal, setShowReactivationModal] = useState(false);
  const location = useLocation();
  const hideHeaderOn = [
    "/my-account",
    "/myaccount/settings",
    "/app/admin/login",
    "/app/admin/dashboard",
  ];
  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);
  const hideFooterOn = ["/app/admin/login", "/app/admin/dashboard"];
  const shouldShowFooter = !hideFooterOn.includes(location.pathname);
  const [sessions, setSessions] = useState(0);

  const trackSession = () => {
    const today = new Date().toDateString();
    const lastSession = localStorage.getItem("lastSessionDate");

    if (lastSession !== today) {
      let count = JSON.parse(localStorage.getItem("sessions") || "0");
      count += 1;

      localStorage.setItem("sessions", count);
      localStorage.setItem("lastSessionDate", today);

      setSessions(count);
    } else {
      const current = JSON.parse(localStorage.getItem("sessions") || "0");
      setSessions(current);
    }
  };

  useEffect(() => {
    trackSession();
  }, []);

  const CATEGORY_IMAGES = [
    "https://images.openai.com/thumbnails/url/WSbURnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70cw1NrwoO8Y7MLAkrcNTNKAmszC1zS88xNbNIyc8Ny6kw9jLLTYuPd3VNVyu2NTQAAB6oJYw",

    "https://images.unsplash.com/photo-1574281813181-02b512471486?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "https://burst.shopifycdn.com/photos/black-microphone-set-against-a-pink-background.jpg?exif=0&format=pjpg&iptc=0&width=1000",

    "https://lumecube.com/cdn/shop/files/Studio_Panel_Lighting_Kit_UCSD-09339-1160x1500-64b44e5_1160x.jpg?v=1704215663",

    "https://www.lighting-geek.com/wp-content/uploads/2023/05/14-3-1-e1689965711325.png",

    "https://freestockfootagearchive.com/wp-content/uploads/2019/08/Glitchy-Shapes-Strobe-Light-Overlay-Effect.jpeg",

    "https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-studio-lighting-isolated-on-black02-11-10-e852f1a4722511624c5d4d237891e5857f2abad0c0b13f9912f6708d40fc8dfd.jpg",
    "https://www.ulanzi.com/cdn/shop/files/2_2x-2.png?v=1753167291",
  ];

  const CATEGORY_ICONS = [
    SunMedium,
    Focus,
    Cpu,
    Zap,
    Lightbulb,
    BatteryCharging,
    Package,
    Video,
  ];

  const getRandomImage = () => {
    return CATEGORY_IMAGES[Math.floor(Math.random() * CATEGORY_IMAGES.length)];
  };

  const getRandomIcon = () => {
    return CATEGORY_ICONS[Math.floor(Math.random() * CATEGORY_ICONS.length)];
  };

  const extraCategoryData = {
    1: {
      image:
        "https://images.openai.com/thumbnails/url/WSbURnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70cw1NrwoO8Y7MLAkrcNTNKAmszC1zS88xNbNIyc8Ny6kw9jLLTYuPd3VNVyu2NTQAAB6oJYw",
      icon: SunMedium,
    },
    2: {
      image:
        "https://images.unsplash.com/photo-1574281813181-02b512471486?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      icon: Focus,
    },
    3: {
      image:
        "https://burst.shopifycdn.com/photos/black-microphone-set-against-a-pink-background.jpg?exif=0&format=pjpg&iptc=0&width=1000",
      icon: Cpu,
    },
    4: {
      image:
        "https://lumecube.com/cdn/shop/files/Studio_Panel_Lighting_Kit_UCSD-09339-1160x1500-64b44e5_1160x.jpg?v=1704215663",
      icon: Zap,
    },
    5: {
      image:
        "https://www.lighting-geek.com/wp-content/uploads/2023/05/14-3-1-e1689965711325.png",
      icon: Lightbulb,
    },
    6: {
      image:
        "https://freestockfootagearchive.com/wp-content/uploads/2019/08/Glitchy-Shapes-Strobe-Light-Overlay-Effect.jpeg",
      icon: BatteryCharging,
    },
    7: {
      image:
        "https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-studio-lighting-isolated-on-black02-11-10-e852f1a4722511624c5d4d237891e5857f2abad0c0b13f9912f6708d40fc8dfd.jpg",
      icon: Package,
    },
    8: {
      image: "https://www.ulanzi.com/cdn/shop/files/2_2x-2.png?v=1753167291",
      icon: Video,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.dovinigears.ng/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();

        const mergedCategories = data.data.map((cat) => {
          return {
            ...cat,
            image: extraCategoryData[cat.id]?.image || getRandomImage(),
            icon: extraCategoryData[cat.id]?.icon || getRandomIcon(),
          };
        });

        setCategories(mergedCategories);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AuthProvider>
      <ReviewsProvider>
        <ToastProvider>
          <RecentlyViewedProvider>
            <WishlistProvider>
              <CartProvider>
                <ProductProvider>
                  <OrdersProvider>
                    <AdminProvider>
                      <div className="min-h-screen flex flex-col">
                        {shouldShowHeader && <Header />}
                        <ShowReactivation
                          showReactivationModal={showReactivationModal}
                          setShowReactivationModal={setShowReactivationModal}
                        />
                        <main className="flex-grow lg:pb-0">
                          <Routes>
                            <Route
                              path="/"
                              element={<Home categories={categories} />}
                            />
                            <Route
                              path="/category/:id"
                              element={<Category />}
                            />
                            <Route path="/products" element={<Products />} />
                            <Route
                              path="/product/:id"
                              element={<ProductDetails />}
                            />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route
                              path="/checkout"
                              element={
                                <ProtectedRoute>
                                  <Checkout />
                                </ProtectedRoute>
                              }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                            path="/app/admin/dashboard"
                            element={
                              <ProtectedAdmin>
                                <AdminDashBoard sessions={sessions} categories={categories} setCategories={setCategories} />
                              </ProtectedAdmin>
                            }
                          />
                            <Route
                              path="/app/admin/login"
                              element={<AdminLogin />}
                            />
                            <Route
                              path="/my-account"
                              element={
                                <ProtectedRoute>
                                  <Profile />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/myaccount/settings"
                              element={
                                <ProtectedRoute>
                                  <AccountSettingsPage
                                    setShowReactivationModal={
                                      setShowReactivationModal
                                    }
                                  />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/forgot-password"
                              element={<ForgotPassword />}
                            />

                            <Route
                              path="/privacy-policies"
                              element={<Privacy />}
                            />
                            <Route path="/terms" element={<Terms />} />
                            <Route
                              path="/account-activation"
                              element={<AccountActivation />}
                            />
                            <Route
                              path="/orders"
                              element={
                                <ProtectedRoute>
                                  <Orders />
                                </ProtectedRoute>
                              }
                            />
                            <Route
                              path="/flash-deals"
                              element={<FlashDeals />}
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        {shouldShowFooter && <Footer />}

                        <CookieConsent />
                        <ScrollToTop />
                      </div>
                    </AdminProvider>
                  </OrdersProvider>
                </ProductProvider>
              </CartProvider>
            </WishlistProvider>
          </RecentlyViewedProvider>
        </ToastProvider>
      </ReviewsProvider>
    </AuthProvider>
  );
};

export default App;
