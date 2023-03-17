import { initializeHooks } from './hooks';
import { initializeMessaging } from './messaging';

(async () => {
	await initializeMessaging();
	await initializeHooks();
})();
