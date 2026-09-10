const CACHE_NAME = "brewline-shell-v1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/favicon.svg",
  "/favicon-16.png",
  "/favicon-32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/coffee-icon.png",
  "/recipes/cheesecake-hot.webp",
  "/recipes/cheesecake.webp",
  "/recipes/caramel-hot.webp",
  "/recipes/caramel.webp",
  "/recipes/sea-salt-hot.webp",
  "/recipes/sea-salt.webp",
  "/recipes/caramelized-patis-hot.webp",
  "/recipes/caramelized-patis.webp",
  "/recipes/matcha-hot.webp",
  "/recipes/matcha.webp",
  "/recipes/spanish-hot.webp",
  "/recipes/spanish.webp",
  "/recipes/matcha-spiced-hot.webp",
  "/recipes/matcha-spiced.webp",
  "/recipes/kape-tibuok-hot.webp",
  "/recipes/kape-tibuok.webp",
  "/recipes/spanish-cinnamon-hot.webp",
  "/recipes/spanish-cinnamon.webp",
  "/recipes/salted-caramel-hot.webp",
  "/recipes/salted-caramel.webp",
  "/recipes/dirty-matcha-hot.webp",
  "/recipes/dirty-matcha.webp",
  "/recipes/biscoff-hot.webp",
  "/recipes/biscoff.webp",
  "/recipes/matcha-caramel-hot.webp",
  "/recipes/matcha-caramel.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html")),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});
