import { logger, runtime } from '@walless/core';
import { configure, migrateDatabase } from '@walless/store';

import { keepBackgroundAlive } from './utils/extension';
import { storage } from './utils/storage';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

logger.info('Initializing kernel..');

configure(storage).then(async () => {
	await migrateDatabase(storage, 'kernel').catch(logger.error);
	initializeMessaging();
});

if (runtime.isExtension) {
	keepBackgroundAlive();
} else {
	configurePWA();
}
