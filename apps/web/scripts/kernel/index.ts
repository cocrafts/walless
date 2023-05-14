import { injectModules } from './utils/ioc';
import { initializeMessaging } from './messaging';

injectModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});
