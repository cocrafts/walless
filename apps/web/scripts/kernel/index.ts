import { initializeHooks } from './hooks';
import { initializeMessaging } from './messaging';
import { initializeSolanaSubscriber } from './subscriber';

(async () => {
	await initializeMessaging();
	await initializeHooks();
	await initializeSolanaSubscriber();
})();

export * from './messaging';
export * from './storage';
