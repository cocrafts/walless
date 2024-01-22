import { logger, runtime } from '@walless/core';

import { keepBackgroundAlive } from './utils/extension';
import { initModules } from './utils/init';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

logger.info('Initializing kernel..');

initModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});

if (runtime.isExtension) {
	keepBackgroundAlive();
} else {
	configurePWA();
}
