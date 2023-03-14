import '../kernel';

import { initializeMessaging } from './messaging';

(async () => {
	await initializeMessaging();

	console.log('background script ready!');
})();
