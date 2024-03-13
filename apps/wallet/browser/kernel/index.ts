import { logger, runtime } from '@walless/core';
import { configure, migrateDatabase } from '@walless/store';
// TODO: need to initialize storage separately for kernel
import { storage } from 'utils/storage/db';

import { keepBackgroundAlive } from './utils/extension';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

logger.info('Initializing kernel..');

configure(storage).then(() => {
	migrateDatabase(storage, 'kernel').catch(logger.error);
	initializeMessaging();
});

if (runtime.isExtension) {
	keepBackgroundAlive();
} else {
	configurePWA();
}
