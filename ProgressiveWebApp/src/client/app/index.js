
import { registerServiceWorker } from './service.js'
import { initUi } from './ui.js'

(async () => {
    await registerServiceWorker();
})();

initUi();

// navigator.serviceWorker.addEventListener('message', e => {
//     console.log('Recive sw message', e.data);
// });