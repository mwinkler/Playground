
export async function postSubscribtion(subscription) {

    console.log('Registering subscription...');

	await fetch('/api/subscription', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: {
			'content-type': 'application/json'
		}
    });
    
	console.log('Subscription registered');
}

export async function postMessage(message) {

    console.log('Push message...');

    await fetch('/api/message', {
        method: 'POST',
        //body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    console.log('Message pushed');
}

export async function getSubscriptionKey() {

    console.log('Getting public vapid key');

    const keyResponse = await fetch('/api/key');
    const keyData = await keyResponse.json();

    console.log(`Recived vapid key '${keyData.key}'`);
    
    return keyData.key;
}