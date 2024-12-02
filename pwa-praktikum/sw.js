const CACHE_NAME = 'pwa-demo-v1';
const urlsToCache = [
    '/pwa-praktikum/',
    '/pwa-praktikum/index.html',
    '/pwa-praktikum/about.html',
    '/pwa-praktikum/styles.css',
    '/pwa-praktikum/app.js',
    '/pwa-praktikum/images/icons/icon-192x192.png',
    '/pwa-praktikum/images/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache terbuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});