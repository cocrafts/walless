import { initializeMessaging } from './messaging';
import { initializeSolanaSubscriber } from './subscriber';

(async () => {
	await Promise.all([initializeMessaging(), initializeSolanaSubscriber()]);
})();

export * from './messaging';
export * from './storage';
