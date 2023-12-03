import { runtime } from '@walless/core';

import { injectModules } from './utils/ioc';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

console.log(new Date().toISOString(), 'initializing kernel..');

injectModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});

if (!runtime.isExtension) {
	configurePWA();
}
