'use strict'

const publicVapidKey = 'BJqpL34rJaUdm2lG6o_Min8riEf6o6NLhCspZsTcHvtQhagg9O-68QShLZ2Vz-utlJ3RXxQtfK3koqhWGYgwNRQ';

+ async function () {

	if (!('serviceWorker' in navigator)) {
		alert('This Browser does not support ServiceWorkers.')
		return;
	}

	if (navigator.serviceWorker.controller) {
		console.info('Service worker already registered and running')
		return;
	}

	// register service worker
	console.log('Registering service worker...');
	const register = await navigator.serviceWorker.register('/serviceworker.js', {
		scope: '/'
	});
	console.log('Service worker registered');

	// register push notification
	console.log('Subscribe for push notification...');
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});
	console.log('Push notification subscribed');

	// register subscription
	console.log('Registering subscription...');
	await fetch('/subscribe', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'content-type': 'application/json'
		}
	});
	console.log('Subscription registered');
}()

// dom ready
document.addEventListener('DOMContentLoaded', () => {

	// push button event
	document.getElementById('push').addEventListener('click', async () => {

		console.log('Push message...');
		await fetch('/push', {
			method: 'POST',
			//body: JSON.stringify(subscription),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('Message pushed');
	});
});

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}