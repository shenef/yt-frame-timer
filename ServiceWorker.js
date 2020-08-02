self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('ffxtracker-static').then(function(cache) {
      return cache.addAll([
        './index.html',
        './icon.png',
        './icon-512.png',
        './style.css',
        './main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try cache
    caches.match(event.request).then(function(response) {
      // Fallback to network
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('./index.html');
    })
  );
});
