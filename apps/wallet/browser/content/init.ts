import { logger } from '@walless/core';

import { initializeTezosWallet } from './tezos';
import { initializeMessaging, injectScript } from './utils';

export const initializeContentScript = async () => {
	initializeTezosWallet();
	await initializeMessaging();
	logger.info('Messaging module initialized..');

	injectScript('injection.js');
};
