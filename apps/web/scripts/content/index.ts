import { initializeMessaging } from './messaging';
import { injectScript } from './utils';

(async () => {
	await initializeMessaging();
	console.log('[walless/prod] messaging module intialzied..');

	setTimeout(() => {
		injectScript('injection.js');
	}, 1000); /* delay to make sure messaging ready to serve! */
})();
