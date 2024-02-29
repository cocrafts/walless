import { logger } from '@walless/core';

import { initializeMessaging, injectScript } from './utils';

(async () => {
	await initializeMessaging();
	logger.info('Messaging module initialized..');

	injectScript('injection.js');
})();
