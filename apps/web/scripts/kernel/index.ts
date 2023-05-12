import { initializeMessaging } from './messaging';

(async () => {
	await Promise.all([initializeMessaging()]);
})();
