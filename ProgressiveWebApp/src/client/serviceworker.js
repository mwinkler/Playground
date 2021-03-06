'use strict';

const cacheName = 'app-v3'; // change when cached content is updated
const pathRoot = '/'
const filesToCache = [
	/*'',
	'app.js',
	'assets/normalize.css',
	'assets/skeleton.css',
	'assets/icon-48.png'*/
];
let lastMessage = undefined;

// triggers when installing
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

// triggers after install has finished
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

// triggers when a URL is requested
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

// triggers when recive push notification
self.addEventListener('push', e => {

	const data = e.data.json();

	console.log('[ServiceWorker] Push recieved:', data);

	// show notification
	self.registration.showNotification(data.message, {
		body: data.username,
		icon: 'https://my-pwa.azurewebsites.net/assets/icon-48.png',
		vibrate: [125],
		badge: 'https://my-pwa.azurewebsites.net/assets/badge-72.png',
		sound: 'https://my-pwa.azurewebsites.net/assets/notification.mp3'
	});

	// save timestamp of last message
	lastMessage = data._ts;
});

// triggers if the browser send a message
self.addEventListener('message', e => {

	console.log('[ServiceWorker] Message', e.data);

	switch(e.data.action) {

		case 'check-update-message':

			if (e.data.timestamp < lastMessage) {

				clients.matchAll().then(clients => {

					console.log(`[ServiceWorker] Found ${clients.length} clients`);
					
					clients.forEach(client => client.postMessage({ action: 'update-messages' }));
				});
			}

			break;
	}
});