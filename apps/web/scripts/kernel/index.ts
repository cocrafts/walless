import { injectModules } from './utils/ioc';
import { initializeMessaging } from './messaging';
import { configurePWA } from './pwa';

configurePWA();
injectModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});
