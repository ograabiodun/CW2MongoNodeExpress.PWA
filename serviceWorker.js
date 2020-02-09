var cacheName = 'v1';
var cacheFiles = [
    '../CW2MongoNodeExpress.PWA/',
    '../CW2MongoNodeExpress.PWA/pages/userBoard.html',
    '../CW2MongoNodeExpress.PWA/pages/adminBoard.html',
    '../CW2MongoNodeExpress.PWA/pages/login.html',
    '../CW2MongoNodeExpress.PWA/pages/register.html',
    '../CW2MongoNodeExpress.PWA/app.js',
    '../CW2MongoNodeExpress.PWA/manifest.json',
    '../CW2MongoNodeExpress.PWA/server.js',
    '../CW2MongoNodeExpress.PWA/serviceWorker.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/vue@2.6.11'
    
]


self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed")

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[Service] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(cachesNames.map(function(thisCacheName){
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    );

});
