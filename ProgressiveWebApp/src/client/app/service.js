
import { createUser, getVapidKey, getMessages } from './api.js'

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

	if (!('serviceWorker' in window.navigator)) {
		alert('This Browser does not support ServiceWorkers.')
		return;
	}

	if (window.navigator.serviceWorker.controller) {
		console.info('Service worker already registered and running')
		return;
	}
	
	// register service worker
	console.log('Registering service worker...');
	await window.navigator.serviceWorker.register('/serviceworker.js');
	
	// wait until service worker is ready
	await window.navigator.serviceWorker.ready;
	console.log('Service worker registered');
};

export async function registerUser(username) {

	const register = await navigator.serviceWorker.getRegistration();

	if (!register) {
		throw 'No registered service worker found'
	}

	// get public vapi key
	const vapidKey = await getVapidKey();

	// register push notification
	console.log('Subscribe for push notification');

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(vapidKey)
	});

	if (!subscription) {
		throw 'Unable to subscribe for push notification'
	}

	// create user
	const user = await createUser(username, subscription);

	// save user in local storage
	localStorage.setItem('user', JSON.stringify(user));

	return user;
}

export function getUser() {

	const data = localStorage.getItem('user');

	if (!data) {
		return undefined;
	}

	const user = JSON.parse(data);

	return user;
}

export function handleServiceWorkerEvent(app) {

	window.navigator.serviceWorker.addEventListener('message', async e => {

		console.log('Recive service worker message', e.data);

		switch (e.data.action) {

			case 'update-messages':

				app.messages = await getMessages();

				break;
		}
	});
}

export function callingServiceWorkerForMessageUpdate(app) {

	setInterval(() => {

		if (!window.navigator.serviceWorker.controller) {
			return;
		}

		window.navigator.serviceWorker.controller.postMessage({
			action: 'check-update-message',
			timestamp: app.messages.length === 0 ? 0 : app.messages[app.messages.length - 1]._ts
		})
	}, 1000);
}