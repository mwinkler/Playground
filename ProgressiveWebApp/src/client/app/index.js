
import { registerServiceWorker, registerSubscription } from './serviceworker-registration.js'
import { initUi } from './ui.js'

(async () => {
    await registerServiceWorker();
    await registerSubscription();
})();

initUi();
