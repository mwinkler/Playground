'use strict';

const cacheName = 'app-v1'; // change when cached content is updated
const pathRoot = '/' // change to your directory
const filesToCache = [
	'',
	//'index.html',
	'app.js',
	//'style.css'
];

// Triggers when installing
self.addEventListener('install', ev => {

    console.info('[ServiceWorker] Installation');
    
	ev.waitUntil(caches
		.open(cacheName)
		.then(cache => {
			// cache all files from list
			console.info(`[ServiceWorker] Caching app into '${cacheName}'`);

			cache.addAll(filesToCache.map(el => pathRoot + el));
		})
		.catch(err => {
			console.error(`Error while open cache '${cacheName}'`, err);
		})
	);
});

// Triggers after install has finished
self.addEventListener('activate', ev => {

    console.info('[ServiceWorker] Activation');
    
	ev.waitUntil(caches
		.keys()
		.then(keyList => {
			// delete unused caches
			keyList.forEach(key => {
				if (key !== cacheName) {
					console.info(`[ServiceWorker] Delete '${key}' from cache '${cacheName}'`);
					caches.delete(key);
				}
			});
		})
	);
	
	return self.clients.claim();
});

// Triggers when a URL is requested
self.addEventListener('fetch', ev => {

    console.info(`[ServiceWorker] Try fetch '${ev.request.url}'`);
    
	ev.respondWith(caches
		.match(ev.request)
		.then(response => {

			// is it in the cache?
			if (response) { 

				console.info(`[ServiceWorker] Loading '${response.url}' from cache '${cacheName}'`);
				
				// If it's an HTML page change the response
				if (response.headers.get('Content-Type') === 'text/html') {
					return response.text().then(txt => {
						let head = {
							status: 200,
							statusText: "OK",
							headers: {'Content-Type': 'text/html'}
						};
						//let body = txt.replace(/<h1>/, '<h2>Diese Seite kommt aus dem Cache!</h2><h1>');
						return new Response(body, head);
					});
				}

				return response;
            }
			
			// Not found in cache: fetch it
			return fetch(ev.request) 
                .then(response => {

					console.info(`[ServiceWorker] Loading '${ response.url}' from network`);
					
                    if (!response.ok) {
                        if (response.type === 'opaque')
                            console.warn('No access to data', ev.request.url);
                        else
                            console.warn('URL error', response.status, response.url);
					}
					
                    return response;
                })
                .catch(err => {
                    console.error('[ServiceWorker] Loading from network has failed', err);
                });
		})
	)
});