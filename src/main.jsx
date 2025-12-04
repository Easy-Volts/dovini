import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Register service worker for caching with cache busting
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker is available, prompt user to reload
              if (confirm("A new version is available! Reload to update?")) {
                window.location.reload();
              }
            }
          });
        });

        // Listen for service worker messages
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data.type === "SW_UPDATED") {
            console.log("Service Worker updated successfully");
          }
        });
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Performance optimizations
const root = createRoot(document.getElementById("root"));

// Preload critical resources
if (import.meta.env.PROD) {
  const linkPreload = document.createElement("link");
  linkPreload.rel = "preload";
  linkPreload.href = "/src/index.css";
  linkPreload.as = "style";
  document.head.appendChild(linkPreload);
}

root.render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
