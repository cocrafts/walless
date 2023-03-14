import { initializeMessaging } from './messaging';
import { injectScript } from './utils';

(async () => {
	await initializeMessaging();
	injectScript('injection.js');

	console.log('content script loaded');
})();
