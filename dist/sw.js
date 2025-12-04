// Service Worker for caching static assets
const CACHE_NAME = "dovini-cache-v2";
const STATIC_CACHE = "dovini-static-v2";

// Assets to cache immediately - only actual build artifacts
const STATIC_ASSETS = ["/", "/index.html"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete all old caches to prevent conflicts
          return caches.delete(cacheName);
        })
      );
    })
  );

  // Force clients to use the new service worker immediately
  self.clients.claim();

  // Notify all clients that service worker has been updated
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "SW_UPDATED",
        message: "Service Worker updated successfully",
      });
    });
  });
});

// Fetch event - serve from cache or network with cache busting
self.addEventListener("fetch", (event) => {
  // Only cache GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Skip API requests to avoid caching stale data
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-successful responses
        if (!response.ok) return response;

        // Only cache static assets (JS, CSS, images, HTML)
        const url = new URL(event.request.url);
        const shouldCache =
          url.pathname.endsWith(".js") ||
          url.pathname.endsWith(".css") ||
          url.pathname.endsWith(".html") ||
          url.pathname.endsWith(".ico") ||
          url.pathname.endsWith(".png") ||
          url.pathname.endsWith(".jpg") ||
          url.pathname.endsWith(".jpeg") ||
          url.pathname.endsWith(".gif") ||
          url.pathname.endsWith(".svg") ||
          url.pathname === "/";

        if (shouldCache) {
          // Cache successful responses
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed, try cache as fallback
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline fallback for HTML pages
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/");
          }
        });
      })
  );
});
