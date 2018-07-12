'use strict';

const cacheName = 'app-v3'; // change when cached content is updated
const pathRoot = '/' // change to your directory
const filesToCache = [
	'',
	'app.js',
	'assets/normalize.css',
	'assets/skeleton.css',
	'assets/icon-48.png'
];

// Triggers when installing
self.addEventListener('install', ev => {

    console.info('[ServiceWorker] Install');
    
	ev.waitUntil(caches
		.open(cacheName)
		.then(cache => {
			// cache all files from list
			console.info(`[ServiceWorker] Caching app into '${cacheName}'`);

			cache.addAll(filesToCache.map(el => pathRoot + el));
		})
	);
});

// Triggers after install has finished
self.addEventListener('activate', ev => {

    console.info('[ServiceWorker] Activate');
    
	ev.waitUntil(caches
		.keys()
		.then(keyList => {
			// delete unused caches
			keyList.forEach(key => {
				if (key !== cacheName) {
					console.info(`[ServiceWorker] Delete '${key}' from cache`);
					caches.delete(key);
				}
			});
		})
	);
	
	return self.clients.claim();
});

// Triggers when a URL is requested
self.addEventListener('fetch', ev => {

    console.info(`[ServiceWorker] Fetch '${ev.request.url}'`);
    
	ev.respondWith(caches
		.match(ev.request)
		.then(response => {

			// is it in the cache?
			if (response) { 

				console.info(`[ServiceWorker] Loading '${response.url}' from cache '${cacheName}'`);
				
				return response;
            }
			
			// Not found in cache: fetch it
			console.info(`[ServiceWorker] Loading '${ev.request.url}' from network`);

			return fetch(ev.request);
		})
	)
});