
const cacheName = 'v2';

const cacheAssets = [
    'about.html',
    'index.html',
    '/js/main.js'
]


self.addEventListener('install', e => {
    console.log('Service Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then( () => self.skipWaiting())
    )

});

self.addEventListener('activate', e => {
    console.log('Service Activated');
    e.waitUntil(
        caches.keys().then( cacheName => {
            return Promise.all(
                cacheName.map(cache =>{
                    if(cache != cacheName){
                        console.log('Clearing old caches');
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', f =>{
    console.log('Fetching');
    f.respondWith(fetch(f.request).catch(() => caches.match(f.request)))
})