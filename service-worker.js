
const CACHE_NAME = "aj-kalendarz-cache-v2";
const PRECACHE_URLS = ["/index.html", "/manifest.json", "/sw.js", "/icons/aj-192.png", "/icons/aj-512.png", "/icons/aj-180.png", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('/index.html')));
    return;
  }
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(req, clone));
      return resp;
    }).catch(() => caches.match('/index.html')))
  );
});
