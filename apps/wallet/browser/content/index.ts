import { logger } from '@walless/core';

import { initializeTezosWallet } from './tezos';
import { initializeMessaging, injectScript } from './utils';

(async () => {
	await initializeMessaging();
	initializeTezosWallet();
	logger.info('Messaging module initialized..');

	injectScript('injection.js');
})();
