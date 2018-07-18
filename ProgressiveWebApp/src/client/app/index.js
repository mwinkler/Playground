
import { registerServiceWorker } from './service.js'
import { initUi } from './ui.js'

(async () => {
    await registerServiceWorker();
    await initUi();
})();