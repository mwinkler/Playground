
import { registerServiceWorker, registerSubscription } from './serviceworker-registration.js'
import { initUi } from './ui.js'

(async () => {
    await registerServiceWorker();
    await registerSubscription();
})();

initUi();

navigator.serviceWorker.addEventListener('message', e => {
    console.log('Recive sw message', e.data);
});