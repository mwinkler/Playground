
export function initUi() {

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
}
