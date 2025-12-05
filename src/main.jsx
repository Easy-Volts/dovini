import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// // Service Worker registration
// if ("serviceWorker" in navigator && import.meta.env.PROD) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);

//         registration.addEventListener("updatefound", () => {
//           const newWorker = registration.installing;
//           newWorker.addEventListener("statechange", () => {
//             if (
//               newWorker.state === "installed" &&
//               navigator.serviceWorker.controller
//             ) {
//               if (confirm("A new version is available! Reload to update?")) {
//                 window.location.reload();
//               }
//             }
//           });
//         });
//       })
//       .catch((e) => console.log("SW registration failed:", e));
//   });
// }

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* <ErrorBoundary> */}
            <App />
          {/* </ErrorBoundary> */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
