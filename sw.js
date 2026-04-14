const cacheName = 'music-downloader-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon.png'
];

// Sakinisha Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fanya kazi nje ya mtandao (Offline fetch)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
