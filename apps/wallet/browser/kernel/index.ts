import { logger, runtime } from '@walless/core';
import { configure } from '@walless/store';
import { storage } from 'utils/storage/db';

import { keepBackgroundAlive } from './utils/extension';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

logger.info('Initializing kernel..');

configure(storage).then(initializeMessaging);

if (runtime.isExtension) {
	keepBackgroundAlive();
} else {
	configurePWA();
}
