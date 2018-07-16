
import { postSubscribtion, getSubscriptionKey } from './api.js'

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

export async function registerServiceWorker() {

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
	await navigator.serviceWorker.register('/serviceworker.js');
	
	// wait until service worker is ready
	await navigator.serviceWorker.ready;
	console.log('Service worker registered');
};

export async function registerSubscription() {

	const register = await navigator.serviceWorker.getRegistration();

	if (!register) {
		throw 'Service worker registration not found'
	}

	// get public vapi key
	const vapidKey = await getSubscriptionKey();

	// register push notification
	console.log('Subscribe for push notification...');
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(vapidKey)
	});
	console.log('Push notification subscribed');

	// register subscription
	await postSubscribtion(subscription);
}
