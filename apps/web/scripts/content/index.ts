import { logger } from '@walless/core';

import './tezos';

import { initializeMessaging } from './messaging';
import { injectScript } from './utils';

(async () => {
	await initializeMessaging();
	logger.info('Messaging module initialized..');

	setTimeout(() => {
		injectScript('injection.js');
	}, 1000); /* delay to make sure messaging ready to serve! */
})();
