
export async function postSubscribtion(subscription) {

    console.log('Register subscription', subscription);

	await fetch('/api/subscription', {
		method: 'POST',
		body: JSON.stringify(subscription),
		headers: { 'content-type': 'application/json' }
    });
}

export async function postMessage(message, username) {

    console.log('Post message', message);

    await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ message, username }),
        headers: { 'content-type': 'application/json' }
    });
}

export async function getMessages() {

    console.log('Get messages');

    const response = await fetch('/api/message');
    const messages = await response.json();

    return messages;
}

export async function getVapidKey() {

    console.log('Getting vapid key...');

    const keyResponse = await fetch('/api/key');
    const keyData = await keyResponse.json();

    console.log(`Recived vapid key '${keyData.key}'`);
    
    return keyData.key;
}