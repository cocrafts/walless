import { injectModules } from './utils/ioc';
import { initializeMessaging } from './messaging';

console.log('Init kernel', new Date().toISOString());

injectModules().then(async () => {
	await Promise.all([initializeMessaging()]);
});
