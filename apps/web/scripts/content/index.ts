import { logger } from '@walless/core';

import { initializeMessaging } from './messaging';
import { injectScript } from './utils';

(async () => {
	await initializeMessaging();
	logger.info('Messaging module intialzied..');

	setTimeout(() => {
		injectScript('injection.js');
	}, 1000); /* delay to make sure messaging ready to serve! */
})();
