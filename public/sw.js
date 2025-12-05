const CACHE_NAME = "dovini-cache-v2";
const STATIC_CACHE = "dovini-static-v2";

const STATIC_ASSETS = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );

  self.clients.claim();

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "SW_UPDATED",
        message: "Service Worker updated successfully",
      });
    });
  });
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (!event.request.url.startsWith(self.location.origin)) return;

  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response.ok) return response;

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
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/");
          }
        });
      })
  );
});
