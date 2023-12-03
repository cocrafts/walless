import { runtime } from '@walless/core';

import { keepBackgroundAlive } from './utils/extension';
import { injectModules } from './utils/ioc';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

console.log(new Date().toISOString(), 'Initializing kernel..');

injectModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});

if (runtime.isExtension) {
	keepBackgroundAlive();
} else {
	configurePWA();
}
