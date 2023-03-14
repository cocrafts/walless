import { initializeHooks } from './utils/hooks';
import { initializeMessaging } from './utils/messaging';

(async () => {
	await initializeMessaging();
	await initializeHooks();
})();
