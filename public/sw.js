const CACHE_NAME = "brewline-shell-__BUILD_ID__";
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
  "/recipes/salted-caramel-hot.webp",
  "/recipes/salted-caramel.webp",
  "/recipes/dirty-matcha-hot.webp",
  "/recipes/dirty-matcha.webp",
  "/recipes/biscoff-hot.webp",
  "/recipes/biscoff.webp",
  "/recipes/matcha-caramel-hot.webp",
  "/recipes/matcha-caramel.webp",
];

function storeResponse(request, response) {
  if (!response.ok) return response;

  const copy = response.clone();
  void caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, copy))
    .catch(() => undefined);
  return response;
}

function networkFirst(request, fallbackRequest = request) {
  return fetch(request, { cache: "no-cache" })
    .then((response) => storeResponse(fallbackRequest, response))
    .catch(() => caches.match(fallbackRequest));
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => storeResponse(request, response));
  });
}

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
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("brewline-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "/index.html"));
    return;
  }

  // Vite asset filenames include a content hash, so they are safe to cache long-term.
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Root-level public files keep stable names; revalidate them online so edits appear.
  event.respondWith(networkFirst(request));
});
