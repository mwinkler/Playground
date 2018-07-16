
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
	const register = await navigator.serviceWorker.register('/serviceworker.js', {
		scope: '/'
	});
	
	// wait until service worker is ready
	await navigator.serviceWorker.ready;
	console.log('Service worker registered');

	// get public vapi key
	console.log('Getting public vapid key')
	const keyResponse = await (await fetch('/subscribe/key')).json();
	console.log(`Recived vapid key '${keyResponse.key}'`)

	// register push notification
	console.log('Subscribe for push notification...');
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(keyResponse.key)
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
};

