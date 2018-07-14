'use strict'

+function() {

	if (!('serviceWorker' in navigator)) {
		alert('This Browser does not support ServiceWorkers.')
		return;
	}

	if (navigator.serviceWorker.controller) {
		console.info('ServiceWorker runs')
		return;
	}

    console.info('Registering ServiceWorker ...');
    
	navigator.serviceWorker
		.register('./serviceworker.js')
		.then(() => console.info('ServiceWorker has beed registered'))
        .catch(err => console.error('Error while register ServiceWorker', err));

}()