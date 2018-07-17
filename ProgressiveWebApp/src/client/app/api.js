
export async function createUser(username, subscription) {

    console.log('Creating user', username, subscription);

	const response = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({ subscription, username }),
		headers: { 'content-type': 'application/json' }
    });

    if (!response.ok) {
        throw await response.text()
    }

    const user = await response.json();

    console.log('User created', user);

    return user;
}

export async function postMessage(message, userId) {

    console.log('Post message', message, userId);

    await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ message, userId }),
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